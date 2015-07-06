'use strict';

var mongoose = require('mongoose'),
    UserAward = mongoose.model('UserAward'),
    ProjectAward = mongoose.model('ProjectAward');

exports.users = function(req, res){
  var query = UserAward.find();
  query.populate('user');
  query.sort({createdAt: -1});
  query.exec(function(err, data){
    if(!err) res.status(200).json(data);
    else res.status(500).json({error: err});
  });
}

exports.projects = function(req, res){
  var query = ProjectAward.find();
  query.populate('project');
  query.sort({createdAt: -1});
  query.exec(function(err, data){
    if(!err) res.status(200).json(data);
    else res.status(500).json({error: err});
  });
}
