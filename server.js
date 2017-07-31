'use strict';

const express = require('express');
const PORT = process.env.PORT || 5000;
const proxyRequest = require('express-request-proxy');
//bodyParser help returning json objects
const bodyParser = require('body-parser');
const DATABASE_URL = process.env.DATABASE_URL || `postgres://postgres:${process.env.PG_PASSWORD}@localhost:5432/kilovolt`;
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

app.use(bodyParser.json());
app.use(bodyParser.urlcoded({extended: true}));


const app = express();

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



function loadDb(){
  students.query(
    CREATE TABLE IF NOT EXISTS
    students()
  )
}

app.get('*', function(req, res) {
  res.sendFile('./index.html');
})

app.listen(PORT, function() {
  console.info(`App is runnig on port: ${PORT}`);
})
