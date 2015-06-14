'use strict';

module.exports = {
	load: function(){
		return require('./env/' + (process.env.NODE_ENV || 'development'));
	}
};	

