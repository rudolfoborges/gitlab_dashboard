'use strict';


var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var UserSchema = new Schema({
	id: {
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
	created_at: {
		type: Date
	}
});

mongoose.model('User', UserSchema);