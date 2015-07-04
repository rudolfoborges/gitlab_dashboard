'use strict';

module.exports = function(){
  var mongoose = require('mongoose'),
      ProjectAward = mongoose.model('ProjectAward'),
      Commit = mongoose.model('Commit'),
      Project = mongoose.model('Project');

  var date = new Date();
  var firstDayOfMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
  var lastDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 0);

  var maxNumberOfCommits = 0;
  var projectRef;

  function findAllProjects(callback){
    Project.find({}, function(err, data){
      if(!err) callback(data);
    });
  }

  function processProject(project){
    var query = Commit.find({projectId: project.remoteId});
    query.where('createdAt').gte(firstDayOfMonth);
    query.where('createdAt').lte(lastDayOfMonth);
    query.count();
    query.exec(function(err, data){
      if(data > 0 && data > maxNumberOfCommits){
        maxNumberOfCommits = data;
        projectRef = project;
      }
    });
  }

  this.start = function(){
      findAllProjects(function(projects){
        projects.forEach(function(project){
          processProject(project);
        });
        setTimeout(function () {
          if(projectRef){
            var award = new ProjectAward();
            award.month = firstDayOfMonth.getMonth() + 1;
            award.year = firstDayOfMonth.getFullYear();
            award.project = projectRef;
            award.numberOfCommits = maxNumberOfCommits;
            award.save(function(err){
              if(err) console.log(err);
            });
            console.log('Process completed. Project award is: ', projectRef.name);
          }
        }, 5000);

      });
  }
}
