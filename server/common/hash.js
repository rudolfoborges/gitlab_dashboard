'use strict';

module.exports = function(){
	var keys = [],
		values = [];

	function indexOf(key){
		return keys.indexOf(key);
	}

	var clazz = {

		push: function(key, value){
			var index = indexOf(key);
			if(index >= 0){
				values[index] = value;
			} else{
				keys.push(key);
				values.push(value);
			}
		},

		get: function(key){
			var index = indexOf(key);
			if(index >= 0){
				return values[index];
			}
		},

		contains: function(key){
			return indexOf(key) >= 0;
		},

		getKeys: function(){
			return keys;
		}

	};

	return clazz;
}