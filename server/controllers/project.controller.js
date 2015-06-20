'use strict';

var mongoose = require('mongoose'),
	Project = mongoose.model('Project'),
	ProjectCommit = mongoose.model('ProjectCommit');


exports.index = function(req, res){
	Project.find(function(err, data){
		if(!err) res.status(200).json(data);
		else res.status(500).json({error: err});
	});
}

exports.commits = function(req, res){
	ProjectCommit.find().populate('project').sort({commits: -1}).limit(8).exec(function(err, data){
		if(!err) res.status(200).json(data);
		else res.status(500).json({error: err});
	});
}