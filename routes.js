/**
* Main app routes
*/

'use strict';

var logger = require('winston');
var express = require('express');
//var User = require('./models/users');
var Habit = require('./models/habits');
// var nocache = require('superagent-no-cache');
var request = require('superagent');
// var prefix = require('superagent-prefix')('/static');

module.exports = function (app) {
	// Routes for the API

	var host = "https://usersmicroservice.herokuapp.com/api/users/"
	var router = express.Router();

	router.use(function(err, req, res, next) {
		res.status(err.status || 500);
	    res.render('error', {
	        message: err.message,
	        error: err
	    });
	});

	//General routes
	router.get('/', function (req, res) {
		res.json({
			provider: 'http://eduardoregalado.me',
			owner: 'Eduardo Regalado',
			contact: 'eduardoregalado [at] gmail [dot] com'
		});
	});

	/*router.get('/users', function  (req, res) {
		User.find(function  (err, users) {
			if(err)
				res.send(err);
			res.json(users);
		});
	});
	*/

	//create user
	router.post('/habits', function  (req, res) {
		request
		    .post(host+""+req.body.userid)
		    .set('Content-Type', 'application/x-www-form-urlencoded')
		    .end(function(err, response){
		    	//console.log(response);
		    	var habit = new Habit();
				habit.name = req.body.name;
				habit.userid = response.body._id;
				habit.difficulty = response.body.difficulty;
				
				//saving the habit
				habit.save(function(err){
					if(err) throw err;
					//res.json({message:'habit saved', name: habit.name})
			    	res.json(habit);
				});
		    // Calling the end function will send the request 
		});
	});

	//create user
	//api/habit/summary/range/ --> How many habits per range
	router.get('/users/habits/summary/range', function  (req, res) {
		User.find(function  (err, users) {
			if(err)
				res.send(err);
			res.json(users.habits);
		});
	});

	//delete user
	router.delete('/habits/:id', function (req, res) {
		Habit.remove({
            _id: req.params.id
        }, function(err, user) {
            if (err)
                res.send(err);
            res.json({ message: 'Habit successfully deleted' });
        });
	});

	app.use('/api', router);
};