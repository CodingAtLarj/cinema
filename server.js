'use strict';

const express = require('express');
const PORT = process.env.PORT || 3000;
const proxyRequest = require('express-request-proxy');
//bodyParser help returning json objects
const bodyParser = require('body-parser');
// windows and Linux `postgres://postgres:${process.env.PG_PASSWORD}@localhost:5432/kilovolt`
const DATABASE_URL = process.env.DATABASE_URL || `postgres://postgres:${process.env.PG_PASSWORD}@localhost:5432/kilovolt`
// `postgres://localhost:5432/kilovolt`;
//requiring pg: your postgres
const pg = require('pg');

//create a new a dabase clien with our connection string: linking it togather
const dbClient = new pg.Client(DATABASE_URL);
//connect it immediatly
dbClient.connect();
//check db for errors
dbClient.on('error', function(err){
  console.error(err);
})

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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

function loadMoviesFromJSON(){
  // THis is going to load the moves from a JSON file into the DB.
}

/// TODO Load the users from the github repo and insert them in the DB and update if it doesnt exist.

function fetchUsersFromSlack(){
  // This can be used to support additional channels or classrooms:
  // let channelsListUrl = `https://slack.com/api/channels.list?token=${SLACKTOKEN}&pretty=1`
  let classroom_id = 'C5WHR2FNG'
  let channelsInfoUrl = `https://slack.com/api/channels.info?token=${process.env.SLACKTOKEN}&channel=${classroom_id}&pretty=1`
  let usersListUrl = `https://slack.com/api/users.list?token=${process.env.SLACKTOKEN}&pretty=1 `
  let request = require('superagent');
  request.get(channelsInfoUrl).end( function(err, res){
    console.log(res.body);
  })
}

function loadDb(){
  // USER Creation
  dbClient.query(
    `CREATE TABLE IF NOT EXISTS
       users (
         userid SERIAL PRIMARY KEY,
         urlphoto VARCHAR(255) NOT NULL,
         name VARCHAR (255) NOT NULL,
         course VARCHAR (255) NOT NULL
       );
    `
  ) .then(fetchUsersFromSlack)
  .catch(console.error);

  // Get the hard coded Movies JSON file and put it in the database
  dbClient.query(
    `CREATE TABLE IF NOT EXISTS
       movies (
         movieid SERIAL PRIMARY KEY,
         category VARCHAR(255) NULL,
         name VARCHAR(255) NULL,
         releasedate DATE,
         urlphoto VARCHAR(255) NULL
       );
    `
  ) .then(loadMoviesFromJSON)
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

loadDb();
app.get('*', function(req, res) {
  res.sendFile('index.html', {root: './'});
})

app.listen(PORT, function() {
  console.info(`App is runnig on port: ${PORT}`);
})
