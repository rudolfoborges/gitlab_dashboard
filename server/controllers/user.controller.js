'use strict';

var mongoose = require('mongoose'),
	User = mongoose.model('User');

exports.param = function(req, res, next, id) {
	req.id = id;
	next();
}

exports.index = function(req, res){
	User.find(function(err, data){
		if(!err) res.status(200).json(data);
		else res.status(500).json({error: err});
	});
}

exports.findOne = function(req, res){
	User.findOne({_id: req.id}, function(err, data){
		if(!err) res.status(200).json(data);
		else res.stats(500).json({error: err});
	});
}
