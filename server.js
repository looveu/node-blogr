'use strict';

var app = require('./index');
var http = require('http');





var server, myPort;

/*
 * Create and start HTTP server.
 */

server = http.createServer(app);
/*
 * Creat socket.io
 */

app.on('start', function () {
    console.log('Application ready to serve requests.');
    console.log('Environment: %s', app.kraken.get('env:env'));
    myPort = app.kraken.get('server:port');
	server.listen(myPort || 9001);
	server.on('listening', function () {
	    console.log('Server listening on http://localhost:%d', this.address().port);
	});
});