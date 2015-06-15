'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var projectSchema = new Schema({
	remoteId: {
		type: Number,
		unique: true
	},
	name: {
		type: String
	},
	path: {
		type: String
	},
	owner: {
		type: String
	},
	createdAt: {
		type: Date
	}
});


mongoose.model('Project', projectSchema);