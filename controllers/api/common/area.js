'use strict';

var app = require('../../../index');
var _ = require('lodash');
var nm29DataBase = require('../../../models/blogr/index');
var District = nm29DataBase.district;

module.exports = function (router) {
	router.get('/province', function queryQuranChapterQuery(req, res) {
		var city = app.kraken.get('common:city');
		res.ok(_.keys(city));
	});
	router.get('/city', function queryQuranChapterQuery(req, res) {
		var city = app.kraken.get('common:city');
		var rst = {};
		if (req.query.province) {
			rst = city[req.query.province];
		} else {
			rst = _.union.apply(this, _.values(city));
		}
		res.ok(rst);
	});
	router.get('/district', function queryQuranChapterQuery(req, res) {
		District.find(req.query).limit(req.query.limit || 20).sort('district_code')
			.select('-_id')
			.exec(function (error, districts) {
				if (error) {
					return res.error(error, '服务器繁忙');
				}
				return res.ok(districts);
			});
	});
};