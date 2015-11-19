'use strict';

var baidu = require('../../../lib/3rdApi/baidu');
var _ = require('lodash');

module.exports = function (router) {
	router.get('/', function queryQuranSectionQuery(req, res) {
		var ip = req.query.ip;
		if(!ip){
			ip = (req.headers['x-forwarded-for'] || '').split(',')[0] || req.connection.remoteAddress;
		}
		baidu.ipLookUp(ip, function (error, resPonse) {
			if (error) {
				return res.error(error.stack, '远方服务器出错');
			}
			var ipInfo = {};
			try {
				ipInfo = JSON.parse(resPonse.text);
			} catch (e) {
				return res.error('远方服务器有问题', '远方服务器有问题');
			}
			if (ipInfo.errNum !== 0) {
				return res.error(ipInfo, '远方服务器有问题');
			}
			res.ok(ipInfo.retData);
		});
	});
};