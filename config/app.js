'use strict';

module.exports = {
	bootstrap: function(env, callback){
		var express = require('express'),
			path = require('path'),
			bodyParser = require('body-parser'),
			mongoose = require('mongoose'),
			fs = require('fs'),
			app = express();

		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({ extended: false }));
		app.set('views', path.join(__dirname, '/public'));
		//app.set('view engine', 'ejs');
		//app.engine('html', require('ejs').renderFile);

		mongoose.connect(env.mongo.url);
		module.exports = app;

		callback(app);
	}
};




