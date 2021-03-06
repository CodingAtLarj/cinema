'use strict';

const express = require('express');
const PORT = process.env.PORT || 3000;
const proxyRequest = require('express-request-proxy');
//bodyParser help returning json objects
const bodyParser = require('body-parser');
//requiring super agent for back end node
let request = require('superagent');

// This will choose the correct scheme given the plattomr. darwin here means mac.
let localdbURL = 'postgres://' + (process.platform === 'darwin' ? '' : `postgres:${process.env.PG_PASSWORD}@`) + 'localhost:5432/kilovolt'

const DATABASE_URL = process.env.DATABASE_URL || localdbURL;
//requiring pg: your postgres
const pg = require('pg');

//create a new a dabase clien with our connection string: linking it togather
const dbClient = new pg.Client(DATABASE_URL);
//connect it immediatly
dbClient.connect();
//check db for errors
dbClient.on('error', function(err) {
  console.error(err);
})

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static('.'));

app.get('/github/*', function(req, res) {
  let headers = process.env.GITHUB_TOKEN ? {
    Authorization: `token ${process.env.GITHUB_TOKEN}`
  } : {};
  let url = `${req.params[0]}`;
  (proxyRequest({
    url: url,
    headers: headers
  }))(req, res);
})

app.get('/getPeopleMoviesFavCount', function(req, res) {
  dbClient.query(
    `SELECT userid,  movieid, COUNT(*) FROM favorites GROUP BY userid, movieid;`
  )
  .then(results => res.send(results.rows))
  .catch(console.error);
});

//POST FOVORITES TO FAVORITES TABLE
app.post('/addFavorite', function(req, res) {
  dbClient.query(
    `INSERT INTO favorites (userid, movieid, dateliked) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING;`, [req.headers.userid, req.headers.movieid, new Date()]
  ).then(() => res.send('Update complete')).catch(() => res.send('Update failed'))
})

function getMoviesFromApi() {
  request.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.MOVIEDBTOKEN}&language=en-US&page=1`).end(function(err, res) {
    processMoviesResponse(res.body)
  })
}


// GET ALL FAVORITES LIKES

app.get('/getUserFavorites',function(req,res){
  dbClient.query(
    'SELECT * from favorites;'
)
.then(results => res.send(results.rows))
.catch(console.error);
});

// GET ALL USERS WITH THEIR FAVORITES MOVIES
app.get('/getAllUsers',function(req,res){
  dbClient.query(
    `SELECT * from users;`
)
.then(results => res.send(results.rows))
.catch(console.error);
});

app.get('/getMovie/:id', function(req, res){
  dbClient.query(`SELECT * from movies where movieid=$1`, [req.params.id]).then(results => res.send(results.rows))
})

app.get('/getUser/:id', function(req, res){
  dbClient.query(`SELECT * from users where userid=$1`, [req.params.id]).then(results => res.send(results.rows))
})

//GET 12 MOVIES FROM LIST OF API MOVIES
app.get('/get12movies', function(req, res) {
  dbClient.query(`SELECT * FROM movies ORDER BY releasedate DESC LIMIT 12;`).then(results => res.send(results.rows))
})

function processMoviesResponse(moviesResponse) {
  moviesResponse.results.forEach(function(movie) {
    let url = 'https://image.tmdb.org/t/p/w500' + movie.poster_path
    dbClient.query(`INSERT INTO movies (category, name, releasedate, urlphoto) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING;`, ['Now Playing', movie.title, movie.release_date, url])
  })
}

/// Loads the users and inserts them in the DB and update if it doesnt exist.
function processSlackResponse(channel, allUsers) {
  let classMemberIDs = channel.channel.members
  let channelName = channel.channel.name
  let allUsersJSON = allUsers.members
  let classUsers = allUsersJSON.filter(function(user) {
    if (classMemberIDs.includes(user.id)) {
      if (user.deleted === true || user.real_name === '') {
        return false;
      }
      return true;
    } else {
      return false;
    }
  })
 for(let user of classUsers){
   insertUsersIntoDb(channelName, user)
 }
}

let classRoomName = process.env.CLASSNAME || 'seattle-301d27'

function fetchUsersFromSlack() {
  let channelsListUrl = `https://slack.com/api/channels.list?token=${process.env.SLACKTOKEN}&pretty=1`
  let usersListUrl = `https://slack.com/api/users.list?token=${process.env.SLACKTOKEN}&pretty=1 `

  request.get(channelsListUrl).end(function(err, res) {
    let allChannels = res.body.channels
    let classroom_id = 'C5WHR2FNG'
    for(let each of allChannels) {
      if(each.name === classRoomName) {
        classroom_id = each.id
        break;
      }
    }
    let channelsInfoUrl = `https://slack.com/api/channels.info?token=${process.env.SLACKTOKEN}&channel=${classroom_id}&pretty=1`
    request.get(channelsInfoUrl).end(function(err, res) {
      let channelResponse = res.body
      request.get(usersListUrl)
        .end(function(err, res) {
          processSlackResponse(channelResponse, res.body)
        })
    })
  })
}

function loadDb() {
  // USER Creation
  dbClient.query(
      `CREATE TABLE IF NOT EXISTS
       users (
         userid SERIAL PRIMARY KEY,
         urlphoto VARCHAR(255) NOT NULL,
         name TEXT UNIQUE NOT NULL,
         course VARCHAR (255) NOT NULL
       );
    `
    ).then(fetchUsersFromSlack)
    .catch(console.error);

  // Get the hard coded Movies JSON file and put it in the database
  dbClient.query(
      `CREATE TABLE IF NOT EXISTS
       movies (
         movieid SERIAL PRIMARY KEY,
         category VARCHAR(255) NULL,
         name TEXT UNIQUE NOT NULL,
         releasedate DATE,
         urlphoto VARCHAR(255) NULL
       );
    `
    ).then(getMoviesFromApi)
    .catch(console.error);

  dbClient.query(
    `CREATE TABLE IF NOT EXISTS
       favorites (
         id SERIAL PRIMARY KEY,
         userid INTEGER NOT NULL REFERENCES users(userid),
         movieid INTEGER NOT NULL REFERENCES movies(movieid),
         dateliked DATE
       );
    `
  ).catch(console.error);
}

//this take our user object from the returning slack api call
function insertUsersIntoDb(channelName, slackUser) {
  let imageUrl = slackUser.profile.image_original || slackUser.profile.image_1024 || slackUser.profile.image_512 || slackUser.profile.image_192 || slackUser.profile.image_72
  dbClient.query(
      `INSERT INTO users (name, urlphoto, course) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING `, [slackUser.real_name, imageUrl, channelName]
    ),
    function(err) {
      if (err) {
        console.error(err);
      }
    }
}


loadDb();
app.get('*', function(req, res) {
  res.sendFile('index.html', {
    root: './'
  });
})

app.listen(PORT, function() {
  console.info(`App is running on port: ${PORT}`);
})
