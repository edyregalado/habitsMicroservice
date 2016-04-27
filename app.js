/**
* Main app file
*/
'use strict';

//Dependencies
var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');

// Connect to MongoDB
//'mongodb://localhost/movieTracking' , { db:{safe:true }}
//config.mongoDB.uri, config.mongoDB.options
mongoose.connect(config.mongoDB.uri, config.mongoDB.options);
mongoose.connection.on('error',function  (err) {
	console.log('MongoDB connection error: ' + err );
	process.exit(-1);
});

//Setup Server
var app = express();
//app.use(express.bodyParser());
require('./config/express')(app);
require('./routes')(app);

app.listen(config.port);
console.log('Server listening on port: ' + config.port);

module.exports = app;
