'use strict';

var mongoose = require('mongoose'),
	Commit = mongoose.model('Commit'),
	CommitsNumber = mongoose.model('CommitsNumber');


exports.index = function(req, res){
	Commit.find(function(err, data){
		if(!err) res.status(200).json(data);
		else res.status(500).json({error: err});
	});
}

exports.commitsForNumbers = function(req, res){
	var now = new Date();
	var limitDate = new Date((now.getFullYear() - 1).toString() + '-' + '12' + '-' + '31');
	CommitsNumber.find().where('createdAt').gt(limitDate).sort({createdAt: 1}).exec(function(err, data){
		if(!err) res.status(200).json(data);
		else res.status(500).json({error: err});
	});
}