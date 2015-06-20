'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var schema = new Schema({
	day: {
		type: Date
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

mongoose.model('CommitsNumber', schema);