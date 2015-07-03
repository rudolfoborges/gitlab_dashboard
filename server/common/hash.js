'use strict';

module.exports = function(){
	var keys = [],
			values = [];

	function indexOf(key){
		return keys.indexOf(key);
	}

	this.put = function(key, value){
		var index = indexOf(key);
		if(index >= 0){
			values[index] = value;
		} else{
			keys.push(key);
			values.push(value);
		}
	}

	this.get = function(key){
		var index = indexOf(key);
		if(index >= 0){
			return values[index];
		}
	}

	this.contains = function(key){
		return indexOf(key) >= 0;
	}

	this.getKeys = function(){
		return keys;
	}
}
