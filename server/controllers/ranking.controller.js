'use strict';

var mongoose = require('mongoose'),
	Ranking = mongoose.model('Ranking');


exports.index = function(req, res){
	Ranking.find().where('commits').gt(0).sort({commits: -1}).populate('user').exec(function(err, data){
		if(!err) res.status(200).json(data);
		else res.status(500).json({error: err});
	});
}