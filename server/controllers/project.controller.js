'use strict';

var mongoose = require('mongoose'),
	Project = mongoose.model('Project');


exports.index = function(req, res){
	Project.find(function(err, data){
		if(!err) res.status(200).json(data);
		else res.status(500).json({error: err});
	});
}