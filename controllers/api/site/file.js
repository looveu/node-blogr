'use strict';

var app = require('../../../index');
var _ = require('lodash');
var path = require('path');
var fs = require('fs');

module.exports = function (router) {
	router.get('/query', function (req, res) {
		fs.readdir(path.join(__dirname ,'../../../public/upload/'), function(error, files){
			if(error){
				return res.error(error);
			}
			return res.ok(files);
		});
	});
	router.post('/del', function (req, res) {
		
	});
	router.post('/upload', function (req, res) {
		
	});
	
};