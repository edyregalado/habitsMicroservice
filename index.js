'use strict';

//set default node enviroment to development
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//Export the app
module.exports = require('./app');