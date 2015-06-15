'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ProjectSchema = new Schema({
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
	default_branch: {
		type: String
	},
	is_private: {
		type: Boolean
	},
	owner: {
		type: String
	},
	created_at: {
		type: Date
	}
});


mongoose.model('Project', ProjectSchema);