const express = require('express');
const bodyParser = require('body-parser');

const feedRoutes = require('./routes/feed');

const app = express();

app.use(bodyParser.json());
// now we use bodyParser.json, since we're working 
// with JSON, we expect JSON, earlier in the course 
// we used bodyParser.urlencoded, not anymore 

app.use('/feed', feedRoutes);
// so any request that starts with /feed will be 
// forwarded to the feedRoutes, into routes/feed.js
// where we handle one request for now '/posts' 

app.listen(8080);