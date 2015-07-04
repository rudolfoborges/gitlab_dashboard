'use strict';

var mongoose = require('mongoose'),
	Project = mongoose.model('Project'),
	ProjectCommit = mongoose.model('ProjectCommit'),
	Commit = mongoose.model('Commit');

exports.param = function(req, res, next, id) {
	req.id = id;
	next();
}

exports.index = function(req, res){
	Project.find().sort({name: 1}).exec(function(err, data){
		if(!err) res.status(200).json(data);
		else res.status(500).json({error: err});
	});
}

exports.commits = function(req, res){
	ProjectCommit.find().populate('project').sort({commits: -1}).limit(10).exec(function(err, data){
		if(!err) res.status(200).json(data);
		else res.status(500).json({error: err});
	});
}

exports.findOne = function(req, res){
	Project.findById(req.id, function(err, data){
		if(!err) res.status(200).json(data);
		else res.status(500).json({error: err});
	})
}

exports.fndAllCommitsByProject = function(req, res){
	Project.findById(req.id, function(err, data){
		if(!err) findAllCommitsByRemoteId(data.remoteId, null, res, null);
		else console.log(err);
	});
}

exports.findCommitsGroupByDay = function(req, res){
	var hash = new Hash();
	var now = new Date();
	var limitDate = new Date((now.getFullYear() - 1), 12, 31);
	Project.findById(req.id, function(err, data){
		if(!err && data) findAllCommitsByRemoteId(data.remoteId, limitDate, res, groupCommitsByDay);
		else res.status(500).json({error: 'User not found'});
	});

	function groupCommitsByDay(res, commits){
		Date.prototype.dateFormat = function(){
			return this.getFullYear().toString() + '-' + (this.getMonth()).toString() + '-' + this.getDate().toString();
		}

		commits.forEach(function(commit){
			processCommit(commit);
		});

		var data = [];
		var keys = hash.getKeys();
		keys.forEach(function(createdAt){
			var commits = hash.get(createdAt);
			data.push({createdAt: createdAt, commits: commits});
		});

		res.status(200).json(data);
	}

	function processCommit(commit){
		var createdAt = commit.createdAt.dateFormat();
		if(!hash.contains(createdAt)){
			hash.push(createdAt, 0);
		}

		var countCommits = hash.get(createdAt) + 1;
		hash.push(createdAt, countCommits);
	}
}

function findAllCommitsByRemoteId(remoteId, limitDate, res, fn){
		var query = Commit.find({projectId: remoteId});
		if(limitDate) query.where('createdAt').gt(limitDate);
		query.sort({createdAt: -1});
		query.exec(function(err, data){
			if(!err && !fn) res.status(200).json(data);
			else if (!err && fn) fn(res, data);
			else res.status(500).json({error: err});
		});
}
