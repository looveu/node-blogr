'use strict';

var heWeatherApi = require('../../../lib/3rdApi/heWeather');
var _ = require('lodash');

module.exports = function (router) {
	router.get('/', function queryQuranSectionQuery(req, res) {
		var city = req.query.city;
		heWeatherApi.cityWeather(city, function (error, resPonse) {
			if (error) {
				return res.error(error.stack, '远方服务器出错');
			}
			res.ok(resPonse);
		});
	});
};