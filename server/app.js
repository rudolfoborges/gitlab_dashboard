'use strict';

module.exports = {
	bootstrap: function(env, __basedir, callback){
		var express = require('express'),
			path = require('path'),
			bodyParser = require('body-parser'),
			mongoose = require('mongoose'),
			fs = require('fs'),
			GitlabWorker = require('./jobs/gitlab.worker'),
			AwardWorker = require('./jobs/award.worker'),
			CronJob = require('cron').CronJob,
			app = express();

		var gitlab = require('gitlab')({
  			url: env.gitlab.host,
  			token: env.gitlab.token
		});

		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({ extended: false }));
		app.set('views', path.join(__basedir, 'www'));
		app.set('view engine', 'ejs');
		app.engine('html', require('ejs').renderFile);

		app.use(express.static(path.join(__basedir, 'www')));

		mongoose.connect(env.mongo.url);

		// Bootstrap models
		fs.readdirSync(path.join(__basedir, '/server/models')).forEach(function (file) {
		  if (~file.indexOf('.js')) require(__basedir + '/server/models/' + file);
		});

		app.get('/', function(req, res) {
			res.render('index');
		});

		app.use('/api/v1', require(__basedir + '/server/routes'));

		var worker = new GitlabWorker(gitlab);
		//worker.start();

		var awardWorker = new AwardWorker();
		//awardWorker.start();

		var job = new CronJob(env.cron.time, function(){
			//console.log('Start all Jbos' + new Date());
			//worker.start();
		}, function(){

		}, true, env.cron.timezone);

		module.exports = app;

		callback(app);
	}
};
