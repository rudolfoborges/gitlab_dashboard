'use strict';

var App = require('./server/app').App,
		environment = require('./config/env').Environment,
		config = environment.load();

var app = new App('gitdash');
app.bootstrap(config, __dirname, listen);

function listen(server){
	var port = process.env.PORT || 3000;
	server.listen(port, function() {
		console.log("Listening on " + port);
	});
}