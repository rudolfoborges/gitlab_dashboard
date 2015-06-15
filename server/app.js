'use strict';

module.exports = {
	bootstrap: function(env, __basedir, callback){
		var express = require('express'),
			path = require('path'),
			bodyParser = require('body-parser'),
			mongoose = require('mongoose'),
			fs = require('fs'),
			GitlabWorker = require('./gitlab.worker'),
			CronJob = require('cron').CronJob,
			app = express();

		var gitlab = require('gitlab')({
  			url:   'http://example.com',
  			token: 'abcdefghij123456'
		});

		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({ extended: false }));
		app.set('views', path.join(__basedir, 'public'));
		app.set('view engine', 'ejs');
		app.engine('html', require('ejs').renderFile);

		app.use(express.static(path.join(__basedir, 'public')));

		app.get('/', function(req, res) {
			res.render('index');
		});

		mongoose.connect(env.mongo.url);

		// Bootstrap models
		fs.readdirSync(path.join(__basedir, '/server/models')).forEach(function (file) {
		  if (~file.indexOf('.js')) require(__basedir + '/server/models/' + file);
		});

		var worker = new GitlabWorker(gitlab);

		var job = new CronJob(env.cron.time, function(){
			worker.start();
			console.log('Start all Jbos' + new Date());
		}, function(){

		}, true, env.cron.timezone);

		module.exports = app;

		callback(app);
	}
};




