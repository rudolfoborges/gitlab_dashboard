'use strict';

module.exports = function(gitlab){

	var async = require('async'),
		Promise = require('promise'),
		mongoose = require('mongoose'),
		Hash = require('./common/hash'),
		User = mongoose.model('User'),
		Project = mongoose.model('Project'),
		Commit = mongoose.model('Commit'),
		Ranking = mongoose.model('Ranking'),
		ProjectCommit = mongoose.model('ProjectCommit');


	function projects(){
		return new Promise(function(resolve, reject){

			Project.remove({}, function(err){
				if(!err) load();
				else reject(500);
			});

			function load() {
				gitlab.projects.all({per_page:10000}, function(projects) {
					projects.forEach(function(project){
						saveProject(project);
					});
					resolve(projects);
				});
			}

			function saveProject(data) {
				var project = new Project();
				project.remoteId = data.id;
				project.name = data.name;
				project.owner = data.owner.name;
				project.path = data.path;
				project.createdAt = data.created_at;
				project.save(function(err){
					if(err) console.log(err);
				});	
			}

		});
	}

	function users() {
		return new Promise(function(resolve, reject){

			User.remove({}, function(err){
				if(!err) load();
				else reject(500);
			});

			function load() {
				gitlab.users.all({per_page:10000}, function(users) {
					users.forEach(function(user) {
						saveUser(user);
					});
					resolve(users);
				});
			}

			function saveUser(data) {
				var user = new User();
				user.remoteId = data.id;
				user.email = data.email;
				user.name = data.name;
				user.username = data.username;
				user.createdAt = data.created_at;
				user.save(function(err){
					if(err) console.log(err);
				});
			}

		});
	}

	function commtis(){

		return new Promise(function(resolve, reject) {

			Commit.remove({}, function(err){
				if(!err) getAllProjects();
				else console.log(err);
			});

			function getAllProjects() {
				Project.find({}, function(err, projects) {
					projects.forEach(function(project){
						getCommitsByProject(project);
					});
				});
			}

			function getCommitsByProject(project){
				gitlab.projects.listCommits({id: project.remoteId, per_page:10000}, function(commits){
					commits.forEach(function(data){
						saveCommit(data, project);
					});
				});
			}

			function saveCommit(data, project){
				var commit = new Commit();
				commit.hash = data.id;
				commit.shortHash = data.short_id;
				commit.authorName = data.author_name;
				commit.authorEmail = data.author_email;
				commit.createdAt = data.created_at;
				commit.project = project;

				User.findOne({name: data.name}, function(err, user){
					if(user) { 
						commit.user = user;
					}
					commit.save(function(err){
						if(err) console.log(err);
					});
				});	
			}

			setTimeout(function(){
				resolve('done');	
			}, 60000);
		});
	}

	function ranking(){
		return new Promise(function(resolve, reject){

			Ranking.remove({}, function(err){
				if(!err) getAllUsers();
				else console.log(err);
			});

			function getAllUsers(){
				User.find({}, function(err, users){
					users.forEach(function(user){
						rankingByUser(user);
					});
				});
			}

			function rankingByUser(user){
				Commit.find({})
					.populate('user')
					.or([{ authorName: user.username }, { authorName: user.name }, { authorEmail: user.email }])
					.count()
					.exec(function(err, data){
						var ranking = new Ranking();
						ranking.user = user;
						ranking.commits = data;
						ranking.save(function(err){
							if(err) console.log(err);
						});
					});
			}

			setTimeout(function(){
				resolve('done');	
			}, 60000);

		});
	}

	function commitsByProject(){
		return new Promise(function(resolve, reject){
			var hash = new Hash();

			ProjectCommit.remove({}, function(err){
				if(!err) getAllCommits();
				else console.log(err);
			});

			function getAllCommits(){
				Commit.find().sort({createdAt: -1}).populate('project').exec(function(err, commits){
					commits.forEach(function(commit){
						processCommit(commit);
					});

					setTimeout(function(){
						var keys = hash.getKeys();
						keys.forEach(function(project){
							var commits = hash.get(project);
							saveProjectCommits(project, commits);
						});
						resolve('done');
					}, 60000);
					
				});
			}

			function processCommit(commit){
				var project = commit.project;
				if(!hash.contains(project)){
					hash.push(project, 0);
				}

				var countCommits = hash.get(project) + 1;
				hash.push(project, countCommits);
			}

			function saveProjectCommits(project, commits){
				var projectCommit = new ProjectCommit();
				projectCommit.project = project;
				projectCommit.commits = commits;
				projectCommit.save(function(err){
					if(err) console.log(err);
				});
			}

		});
	}

	var clazz = {
		start: function(){
			async.waterfall([
				function(callback){
					users().then(function(data, err){
						if(!err) {console.log('Import Users'); callback();}
						else console.log(err);
					})
				},
				function(callback){
					projects().then(function(data, err){
						if(!err) {console.log('Import Projects'); callback();}
						else console.log(err);
					})
				},
				function(callback){
					commtis().then(function(data, err){
						if(!err) {console.log('Import Commits'); callback();}
						else console.log(err);
					});
				},
				function(callback){
					ranking().then(function(data, err){
						if(!err) {console.log('Create Ranking'); callback();}
						else console.log(err);
					});
				},
				function(callback){
					commitsByProject().then(function(data, err){
						if(!err) console.log('Create Projects Commits'); 
						else console.log(err);
					});
				}
			]);

			
		}		
	}

	return clazz;
}


