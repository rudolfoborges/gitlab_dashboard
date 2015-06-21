'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var schema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
	 	ref: 'User'
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

mongoose.model('RankingMonthly', schema);