'use strict';

module.exports = {
	bootstrap: function(env, __basedir, callback){
		var express = require('express'),
			path = require('path'),
			bodyParser = require('body-parser'),
			mongoose = require('mongoose'),
			fs = require('fs'),
			app = express();

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
		module.exports = app;

		callback(app);
	}
};




