'use strict';

var app = require('../../../index');
var _ = require('lodash');
var nm29DataBase = require('../../../models/blogr/index');
var Category = nm29DataBase.category;

module.exports = function (router) {
	router.post('/new', function (req, res) {
		var c = new Category(req.body);
		c.save(function(error, ca){
			if(error){
				return res.error(error);
			}
			return res.ok(ca);
		});
	});
	router.get('/query', function (req, res) {
		Category.find(req.query)
		.limit(50)
		.exec(function(error, ca){
			if(error){
				return res.error(error);
			}
			return res.ok(ca);
		});
	});
	router.get('/get', function (req, res) {
		Category.findById(req.query.id)
		.exec(function(error, ca){
			if(error){
				return res.error(error);
			}
			return res.ok(ca);
		});
	});
	router.post('/update', function (req, res) {
		Category.findByIdAndUpdate(req.body.id, req.body, {
			new: true
		}, function(error, ca){
			if(error){
				return res.error(error);
			}
			return res.ok(ca);
		});
	});
	router.post('/delete', function (req, res) {
		Category.findByIdAndRemove(req.body.id, function(error, ca){
			if(error){
				return res.error(error);
			}
			return res.ok(ca);
		});
	});
};