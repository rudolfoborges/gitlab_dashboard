'use strict';

var express = require('express'),
	router = express.Router();

//Projects Routes
(function(){
	var controller = require('./controllers/project.controller');
	router.route('/projects').get(controller.index);
	router.route('/projects/commits').get(controller.commits);
	router.route('/projects/:id').get(controller.findOne);
	router.route('/projects/:id/commits').get(controller.fndAllCommitsByProject);
	router.route('/projects/:id/commits/groupByDay').get(controller.findCommitsGroupByDay);

	router.param('id', controller.param);
})();


//Users Routes
(function(){
	var controller = require('./controllers/user.controller');
	router.route('/users').get(controller.index);
	router.route('/users/:id').get(controller.findOne);
	router.route('/users/:id/commits').get(controller.findCommits);
	router.route('/users/:id/commits/groupByDay').get(controller.findCommitsGroupByDay);

	router.param('id', controller.param);
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
	router.route('/ranking/users').get(controller.userAll);
	router.route('/ranking/users/monthly').get(controller.userMonthly);

	router.route('/ranking/projects').get(controller.projectAll);
	router.route('/ranking/projects/monthly').get(controller.projectMonthly);
})();

(function(){
	var controller = require('./controllers/award.controller');
	router.route('/awards/user').get(controller.users);
	router.route('/awards/project').get(controller.projects);
})();

module.exports = router;
