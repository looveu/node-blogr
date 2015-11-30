'use strict';

var app = require('../../../index');
var _ = require('lodash');
var nm29DataBase = require('../../../models/blogr/index');
var Category = nm29DataBase.category;

module.exports = function (router) {
	router.post('/new', function (req, res) {
		var c = new Category(req.body);
		c.save().then(function(ca){
			return res.ok(ca);
		}).catch(function(error){
			return res.error(error);
		});
	});
	router.get('/query', function (req, res) {
		Category.find(req.query)
		.limit(50)
		.exec().then(function(ca){
			return res.ok(ca);
		}).catch(function(error){
			return res.error(error);
		});
	});
	router.get('/get', function (req, res) {
		Category.findById(req.query.id)
		.exec().then(function(ca){
			return res.ok(ca);
		}).catch(function(error){
			return res.error(error);
		});
	});
	router.post('/update', function (req, res) {
		Category.findByIdAndUpdate(req.body.id, req.body, {
			new: true
		}).exec().then(function(ca){
			return res.ok(ca);
		}).catch(function(error){
			return res.error(error);
		});
	});
	router.post('/delete', function (req, res) {
		Category.findByIdAndRemove(req.body.id)
		.exec().then(function(ca){
			return res.ok(ca);
		}).catch(function(error){
			return res.error(error);
		});
	});
};