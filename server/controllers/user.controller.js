'use strict';

var mongoose = require('mongoose'),
		User = mongoose.model('User'),
		Commit = mongoose.model('Commit'),
		UserAward = mongoose.model('UserAward'),
		Hash = require('../common/hash');

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
	User.findById(req.id, function(err, data){
		var user = data;
		if(!err && user) {
			var query = UserAward.find({user: user});
			query.sort({createdAt: -1});
			query.exec(function(err, data){
				if(!err) {
					res.status(200).json({user: user, awards: data});
				}
			});
		}
		else res.stats(500).json({error: err});
	});
}

exports.findCommits = function(req, res){
	User.findById(req.id, function(err, data){
		if(!err && data) findAllCommitsByRemoteId(data.remoteId, null, res);
		else res.status(500).json({error: 'User not found'});
	});
}

exports.findCommitsGroupByDay = function(req, res){
	var hash = new Hash();
	var now = new Date();
	var limitDate = new Date((now.getFullYear() - 1), 12, 31);
	User.findById(req.id, function(err, data){
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
		var query = Commit.find({userId: remoteId});
		if(limitDate) query.where('createdAt').gt(limitDate);
		query.populate('project')
		query.sort({createdAt: -1})
		query.exec(function(err, data){
		if(!err && !fn) res.status(200).json(data);
		else if (!err && fn) fn(res, data);
		else res.status(500).json({error: err});
	});
}
