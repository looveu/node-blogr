'use strict';

var app = require('../../index');
var bunyan = require('bunyan');
var bunyanMiddleware = require('bunyan-middleware');

var serverName = app.kraken.get('server:name');
var logger = bunyan.createLogger({ name: serverName });
/**
 * json方式的访问日志
 */
function bunyanM() {
    return bunyanMiddleware({
    	logger: logger
    });
};
module.exports = bunyanM;