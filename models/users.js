'use strict'

//dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//define model
var userSchema = new Schema({
	email: {type: String, required: true, unique: true},
	name: String,
	birthday: Date,
	password: String
},{
	versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('User', userSchema);