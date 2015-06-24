'use strict';

var mongoose = require('mongoose'),
	UserRanking = mongoose.model('UserRanking'),
	UserRankingMonthly = mongoose.model('UserRankingMonthly'),
	ProjectCommit = mongoose.model('ProjectCommit'),
	ProjectRankingMonthly = mongoose.model('ProjectRankingMonthly');


exports.userAll = function(req, res){
	UserRanking.find().where('commits').gt(0).sort({commits: -1}).populate('user').exec(function(err, data){
		if(!err) res.status(200).json(data);
		else res.status(500).json({error: err});
	});
}


exports.userMonthly = function(req, res){
	UserRankingMonthly.find().where('commits').gt(0).sort({commits: -1}).populate('user').exec(function(err, data){
		if(!err) res.status(200).json(data);
		else res.status(500).json({error: err});
	});
}

exports.projectAll = function(req, res){
	ProjectCommit.find().where('commits').gt(0).sort({commits: -1}).populate('project').exec(function(err, data){
		if(!err) res.status(200).json(data);
		else res.status(500).json({error: err});
	});
}


exports.projectMonthly = function(req, res){
	ProjectRankingMonthly.find().where('commits').gt(0).sort({commits: -1}).populate('project').exec(function(err, data){
		if(!err) res.status(200).json(data);
		else res.status(500).json({error: err});
	});
}