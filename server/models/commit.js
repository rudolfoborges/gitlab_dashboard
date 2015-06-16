'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var commitSchema = new Schema({
	hash: {
		type: String
	},
	shortHash: {
		type: String
	},
	authorName: {
		type: String
	},
	authorEmail: {
		type: String
	},
	project: {
		type: Schema.Types.ObjectId,
	 	ref: 'Project'
	},
	user: {
		type: Schema.Types.ObjectId,
	 	ref: 'User'
	},
	createdAt: {
		type: Date
	}
});

mongoose.model('Commit', commitSchema);