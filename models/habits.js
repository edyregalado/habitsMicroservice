'use strict'

//dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*easy: Number, // Score +2
medium: Number, // Score +4
hard: Number // Score +6*/
//define model
var habitsSchema = new Schema({
	userid: String,
	name: String,
	//type: String,
		/*good: String,
		bad: String, 
		both: String*/
	difficulty: {type: Number, min: 2, max: 6},
	//range: {type: Number},
		/*Red: String, // Negative
		Orange: Number, //0-10
		Yellow: Number, //10-40
		Green: Number, //40-50
		Blue: Number //50+*/
	//mark: {type: String, enum: ['good','bad']}
		//Good, if the score is on the Green Range It will sum only half of the points
		//If the score is on the Blue Range you will add only 1 point
		//Bad, if the score is on the Orange Range it will reduce 1.5 times the points
		//If the score is on the Red Range it will reduce twice the points
}
,{
	versionKey: false // You should be aware of the outcome after set to false
});


module.exports = mongoose.model('Habit', habitsSchema);