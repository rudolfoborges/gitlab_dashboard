'use strict';

var app = require('./server/app'),
	env = require('./config/env').load();

app.bootstrap(env, __dirname, function(server){
	var port = process.env.PORT || 3000;
	server.listen(port, function() {
		console.log("Listening on " + port);
	});
});
