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
  project: {
		type: Schema.Types.ObjectId,
	 	ref: 'Project'
	},
  numberOfCommits: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

mongoose.model('ProjectAward', schema);
