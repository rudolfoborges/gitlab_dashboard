'use strict';

function Environment(){
	this.load = function(){
		return require('./env/' + (process.env.NODE_ENV || 'development'));
	}
}

exports.Environment = new Environment();
