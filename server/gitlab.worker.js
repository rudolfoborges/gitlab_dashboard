'use strict';

module.exports = function(gitlab){

	var Promise = require('promise');

	function allProjects(){
		return new Promise(function(resolve, reject){
			gitlab.projects.all(function(projects) {
			  for (var i = 0; i < projects.length; i++) {
			    console.log("#" + projects[i].id + ": " + projects[i].name + ", path: " + projects[i].path + ", default_branch: " + projects[i].default_branch + ", private: " + projects[i]["private"] + ", owner: " + projects[i].owner.name + " (" + projects[i].owner.email + "), date: " + projects[i].created_at);
			  }
			});
		});

	}

	function allUsers(){
		return new Promise(function(resolve, reject){
			gitlab.users.all(function(users) {
			  for (var i = 0; i < users.length; i++) {
			    console.log("#" + users[i].id + ": " + users[i].email + ", " + users[i].name + ", " + users[i].created_at);
			  }
			});
		});
	}

	function allCommtis(){

	}

	function createRanking(){

	}

	var clazz = {
		start: function(){
			/*
			allUsers().then(function(users, err){
				if(err) console.log(users);
			});

			allProjects().then(function(projects, err){
				if(err) console.log(projects);
			});	
			*/
		}		
	}

	return clazz;
}


