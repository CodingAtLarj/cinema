'use strict';

const express = require('express');
const PORT = process.env.PORT || 5000;
const proxyRequest = require('express-request-proxy');
const app = express();


app.use(express.static('.'));

app.get('/github/*', function(req, res) {
  let headers = process.env.GITHUB_TOKEN ? {
    Authorization: `token ${process.env.GITHUB_TOKEN}`
  } : {};
  let url = `$${req.params[0]}`;
  (proxyRequest({
    url: url,
    headers: headers
  }))(req, res);
})

app.get('*', function(req, res) {
  res.sendFile('./index.html');
})

app.listen(PORT, function() {
  console.info(`App is runnig on port: ${PORT}`);
})
