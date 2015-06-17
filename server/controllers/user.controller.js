'use strict';

var mongoose = require('mongoose'),
	User = mongoose.model('User');


exports.index = function(req, res){
	User.find(function(err, data){
		if(!err) res.status(200).json(data);
		else res.status(500).json({error: err});
	});
}