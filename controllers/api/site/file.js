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
			var rst = _.chain(files)
			.map(function(file){
				return '/upload/'+file;
			})
			.filter(function(file){
				return /(jpg|jpeg|png|gif)$/ig.test(file.toLowerCase());
			});
			return res.ok(rst);
		});
	});
	// router.post('/del', function (req, res) {
		
	// });
	router.post('/upload', function (req, res) {
		// console.dir(req.files.file);
		if(!req.files.file){
			return false;
		}
		var file = req.files.file;
		// var filename = file.path[file.path.length-1];
		
		
		// var fs = require('fs');
		var readStream = fs.createReadStream(file.path);
		var writeStream = fs.createWriteStream(path.join(__dirname ,'../../../public/upload/',file.name));
		
		
		readStream.pipe(writeStream);
		// readStream.on('data', function(chunk) { // 当有数据流出时，写入数据
		// 	writeStream.write(chunk);
		// });
		
		// readStream.on('end', function() { // 当没有数据时，关闭数据流
		// 	writeStream.end();
		// });
		res.ok({url:'/upload/'+file.name});
	});
	
};