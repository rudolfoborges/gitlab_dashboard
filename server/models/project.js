'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var projectSchema = new Schema({
	id: {
		type: Number,
		unique: true
	},
	name: {
		type: String
	},
	path: {
		type: String
	},
	defaultBranch: {
		type: String
	},
	isPrivate: {
		type: Boolean
	},
	owner: {
		type: String
	},
	createdAt: {
		type: Date
	}
});


mongoose.model('Project', projectSchema);