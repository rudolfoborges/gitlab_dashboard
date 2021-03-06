'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var userSchema = new Schema({
	remoteId: {
		type: Number,
		unique: true
	},
	email: {
		type: String,
		unique: true
	},
	name: {
		type: String
	},
	username: {
		type: String
	},
	createdAt: {
		type: Date
	}
});

mongoose.model('User', userSchema);