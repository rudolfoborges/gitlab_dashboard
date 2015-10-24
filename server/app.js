'use strict';

function App(name){
	this.name = name;
}

App.prototype.bootstrap = function(env, __basedir, callback){
	var express = require('express'),
		path = require('path'),
		bodyParser = require('body-parser'),
		mongoose = require('mongoose'),
		fs = require('fs'),
		GitlabWorker = require('./jobs/gitlab.worker'),
		UserAwardWorker = require('./jobs/user.award.worker'),
		ProjectAwardWorker = require('./jobs/project.award.worker'),
		CronJob = require('cron').CronJob,
		context = express();

	var gitlab = require('gitlab')({
			url: env.gitlab.host,
			token: env.gitlab.token
	});

	context.use(bodyParser.json());
	context.use(bodyParser.urlencoded({ extended: false }));
	context.set('views', path.join(__basedir, 'www'));
	context.set('view engine', 'ejs');
	context.engine('html', require('ejs').renderFile);

	context.use(express.static(path.join(__basedir, 'www')));

	mongoose.connect(env.mongo.url);

	// Bootstrap models
	fs.readdirSync(path.join(__basedir, '/server/models')).forEach(function (file) {
	  if (~file.indexOf('.js')) require(__basedir + '/server/models/' + file);
	});

	context.get('/', function(req, res) {
		res.render('index');
	});

	context.use('/api/v1', require(__basedir + '/server/routes'));

	var worker = new GitlabWorker(gitlab);
	worker.start();

	var userAwardWorker = new UserAwardWorker();
	userAwardWorker.start();

	var projectAwardWorker = new ProjectAwardWorker();
	projectAwardWorker.start();

	var job = new CronJob(env.cron.time, function(){
		//console.log('Start all Jbos' + new Date());
		//worker.start();
	}, function(){

	}, true, env.cron.timezone);

	module.exports = context;

	callback(context);
}

exports.App = App;
