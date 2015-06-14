'use strict';

var app = require('./config/app'),
	env = require('./config/env').load();

app.bootstrap(env, __dirname, function(context){
	var port = process.env.PORT || 3000;
	context.listen(port, function() {
		console.log("Listening on " + port);
	});
});
