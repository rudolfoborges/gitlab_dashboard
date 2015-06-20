'use strict';

var express = require('express'),
	router = express.Router();

//Projects Routes
(function(){
	var controller = require('./controllers/project.controller');
	router.route('/projects').get(controller.index);
	router.route('/projects/commits').get(controller.commits);
})();


//Users Routes
(function(){
	var controller = require('./controllers/user.controller');
	router.route('/users').get(controller.index);
})();


//Commits Routes
(function(){
	var controller = require('./controllers/commit.controller');
	router.route('/commits').get(controller.index);
	router.route('/commits/numbers').get(controller.commitsForNumbers);
})();

//Ranking Routes
(function(){
	var controller = require('./controllers/ranking.controller');
	router.route('/ranking').get(controller.index);
})();

module.exports = router;