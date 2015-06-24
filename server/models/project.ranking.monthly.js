'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var schema = new Schema({
	project: {
		type: Schema.Types.ObjectId,
	 	ref: 'Project'
	},
	commits : {
		type: Number,
		default: 0
	},
	createdAt: {
		type: Date,
		default: Date.now()
	}
});

mongoose.model('ProjectRankingMonthly', schema);