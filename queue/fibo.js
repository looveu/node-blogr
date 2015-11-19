var redis = require("redis");
var Computecluster = require('compute-cluster');
var path = require('path');

var sub = redis.createClient();
sub.subscribe('compute fibo');
sub.on('message', function (channel, message) {
    console.log('do queue',channel, message);
    var cc = new Computecluster({ module: path.join(__dirname, '../', 'lib/worker/fibo.js') });
    cc.enqueue({ input: message }, function (error, result) {
        console.log('hello i am fibo ret : ' + result);
    });
});