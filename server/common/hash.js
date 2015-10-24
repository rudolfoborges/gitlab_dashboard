'use strict';

function Hash(){
	this.keys = [];
	this.values = [];
}

Hash.prototype.indexOf = function(key){
	return this.keys.indexOf(key);
}

Hash.prototype.push = function(key, value){
	var index = this.indexOf(key);
	if(index >= 0){
		this.values[index] = value;
	} else{
		this.keys.push(key);
		this.values.push(value);
	}
}

Hash.prototype.get = function(key){
	var index = this.indexOf(key);
	if(index >= 0){
		return this.values[index];
	}
}

Hash.prototype.contains = function(key){
	return this.indexOf(key) >= 0;
}

module.exports = Hash;
