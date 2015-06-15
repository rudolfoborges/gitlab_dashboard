'use strict';

module.exports = function(gitlab){

	var async = require('async'),
		Promise = require('promise'),
		mongoose = require('mongoose'),
		User = mongoose.model('User'),
		Project = mongoose.model('Project'),
		Commit = mongoose.model('Commit');


	function allProjects(){
		return new Promise(function(resolve, reject){
			gitlab.projects.all({per_page:100000}, function(projects) {
				for (var i = 0; i < projects.length; i++) {
					var project = new Project();
					project.remoteId = projects[i].id;
					project.name = projects[i].name;
					project.owner = projects[i].owner.name;
					project.path = projects[i].path;
					project.createdAt = projects[i].created_at;
					//project.save(function(err){
						//if(err) console.log(err);
					//});

				}
				resolve(projects);
			});
		});
	}

	function allUsers(){
		return new Promise(function(resolve, reject){
			gitlab.users.all({per_page:100000}, function(users) {
				for (var i = 0; i < users.length; i++) {
					var user = new User();
					user.remoteId = users[i].id;
					user.email = users[i].email;
					user.name = users[i].name;
					user.createdAt = users[i].created_at;
					//user.save(function(err){
						//if(err) console.log(err);
					//});
				}
				resolve(users);
			});
		});
	}

	function allCommtis(){
		return new Promise(function(resolve, reject) {
			Project.find({}, function(err, projects) {
				for(var i = 0; i < projects.length; i++) {
					gitlab.projects.listCommits({id: projects[i].remoteId, per_page:100000}, function(commits){
						console.log(commits);
						for(var j = 0; j < commits.length; j++) {
							var commit = new Commit();
							commit.hash = commits[j].id;
							commit.shortHash = commits[j].short_id;
							commit.authorName = commits[j].author_name;
							commit.authorEmail = commits[j].author_email;
							commit.createdAt = commits[j].created_at;
							commit.project = projects[i];
							User.findOne({email: commits[j].author_email}, function(err, user){
								if(user) { 
									commit.user = user;
									commit.save(function(err){
										if(err) console.log(err);
									})
								}
							});
						}
					});
					resolve('done');
				}
				
			});
		});
	}

	function createRanking(){

	}

	var clazz = {
		start: function(){
			async.waterfall([
				function(callback){
					allUsers().then(function(data, err){
						if(!err) callback();
					})
				},
				function(callback){
					allProjects().then(function(data, err){
						if(!err) callback();
					})
				},
				function(callback){
					allCommtis().then(function(data, err){
						if(!err) callback();
					});
				}
			]);
		}		
	}

	return clazz;
}


