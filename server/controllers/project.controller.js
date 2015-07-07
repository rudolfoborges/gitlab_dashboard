'use strict';

var mongoose = require('mongoose'),
	Project = mongoose.model('Project'),
	ProjectCommit = mongoose.model('ProjectCommit'),
	Commit = mongoose.model('Commit'),
	ProjectAward = mongoose.model('ProjectAward'),
	Hash = require('../common/hash');

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
		var project = data;
		if(!err && project) {
			var query = ProjectAward.find({project: project});
			query.sort({createdAt: -1});
			query.exec(function(err, awards){
				if(!err){
					findAllCommitsByRemoteId(project.remoteId, null, res, function(res, commits){
						findAllContributors(res, commits, function(contributors){
								res.status(200).json({project: project, awards: awards, contributors: contributors});
						})
					});
				}

			});
		}
		else res.stats(500).json({error: err});
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

function findAllCommitsByRemoteId(projectId, limitDate, res, fn){
		var query = Commit.find({projectId: projectId});
		if(limitDate) query.where('createdAt').gt(limitDate);
		query.populate('user');
		query.sort({createdAt: -1});
		query.exec(function(err, data){
			if(!err && !fn) res.status(200).json(data);
			else if (!err && fn) fn(res, data);
			else res.status(500).json({error: err});
		});
}

function findAllContributors(res, commits, callback){
		var hash = new Hash();
		commits.forEach(function(commit){
			if(commit.user && !hash.contains(commit.user)){
				hash.push(commit.user, 0);
			}

			if(commit.user){
				var key = commit.user;
				var countCommits = hash.get(key) + 1;
				hash.push(key, countCommits);
			}
		});
		var contributors = [];
		hash.getKeys().forEach(function(key){
			contributors.push({user: key, numberOfCommits: hash.get(key)});
		});

		contributors.sort(function(a, b){
			return b.numberOfCommits - a.numberOfCommits;
		});

		callback(contributors);
}
