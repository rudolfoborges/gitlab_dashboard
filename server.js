'use strict';

var app = require('./server/app'),
		environment = require('./config/env').Environment,
		config = environment.load();

app.bootstrap(config, __dirname, function(server){
	var port = process.env.PORT || 3000;
	server.listen(port, function() {
		console.log("Listening on " + port);
	});
});
