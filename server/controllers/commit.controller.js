'use strict';

var mongoose = require('mongoose'),
	Commit = mongoose.model('Commit');


exports.index = function(req, res){
	Commit.find(function(err, data){
		if(!err) res.status(200).json(data);
		else res.status(500).json({error: err});
	});
}