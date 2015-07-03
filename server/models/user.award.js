'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
  month: {
    type: Number
  },
  year: {
    type: Number
  },
  user: {
		type: Schema.Types.ObjectId,
	 	ref: 'User'
	},
  numberOfCommits: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

mongoose.model('UserAward', schema);
