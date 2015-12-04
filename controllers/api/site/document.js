'use strict';

var app = require('../../../index');
var _ = require('lodash');
var nm29DataBase = require('../../../models/blogr/index');
var Doc = nm29DataBase.document;
var xss = require('xss');
// var xssFilters = require('xss-filters');

module.exports = function (router) {
	router.post('/new', function (req, res) {
		req.body.content = xss(req.body.content)
		var c = new Doc(req.body);
		c.save().then(function(ca){
			return res.ok(ca);
		}).catch(function(error){
			return res.error(error);
		});
	});
	router.get('/query', function (req, res) {
		Doc.find(req.query)
		.limit(50)
		.exec().then(function(ca){
			return res.ok(ca);
		}).catch(function(error){
			return res.error(error);
		});
	});
	router.get('/get', function (req, res) {
		Doc.findById(req.query.id)
		.exec().then(function(ca){
			return res.ok(ca);
		}).catch(function(error){
			return res.error(error);
		});
	});
	router.post('/update', function (req, res) {
		req.body.content = xss(req.body.content)
		Doc.findByIdAndUpdate(req.body._id, req.body)
		.exec().then(function(ca){
			return res.ok(ca);
		}).catch(function(error){
			return res.error(error);
		});
	});
	router.post('/delete', function (req, res) {
		Doc.findByIdAndRemove(req.body.id)
		.exec().then(function(ca){
			return res.ok(ca);
		}).catch(function(error){
			return res.error(error);
		});
	});
};