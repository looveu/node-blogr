'use strict';

var _ = require('lodash');
var EventProxy = require('eventproxy');
var gameAndMeDataBase = require('../../models/gameAndMe/index');
var Account = gameAndMeDataBase.Account;
var platformAccount = gameAndMeDataBase.platformAccount;
var pref = function (p, s) {
	return p + '_' + s;
};
/**
 * 
 */
module.exports = function (platform_id, userinfo, platform, os, loginState, fn) {
	var AuthPrefix = function(s){
		return pref(platform, s);
	};
	var ep = new EventProxy();
	var OS = os || 'H5';
	ep.all('AccountSaved', 'platformAccountSaved', function (account, platformaccount) {
		var cpObj = {
			access_token: account.access_token[OS],
			email: account.email,
			name: account.name,
			phone: account.phone,
			uniq_id: account.uniq_id
		};
		return fn(null, cpObj);
	});
	// 找到对应账户  进行第三方登录逻辑
	ep.once('Found', function (platformaccount) {
		platformaccount.name= userinfo.name || '';
		platformaccount.nick= userinfo.nick || '';
		platformaccount.avarta= userinfo.avarta || '';
		platformaccount.area= userinfo.area || '';
		platformaccount.sex= userinfo.sex || '';
		platformaccount.loginState = loginState;
		platformaccount.save(function (error, pa) {
			if (error) {
				return fn(error);
			}
			ep.emit('platformAccountSaved', pa);
		});
		Account.findById(platformaccount.account_id).exec(function (error, account) {
			if (error) {
				return fn(error);
			}
			if (!account) {
				return fn(error);
			}
			if(!account.name.indexOf('匿')){
				account.name = platformaccount.nick;
			}
			if(!account.avarta){
				account.avarta = platformaccount.avarta;
			}
			account.access_token[OS] = OS + '_' + account.generateRandomToken();
			account.save(function (error, a) {
				if (error) {
					return fn(error);
				}
				ep.emit('AccountSaved', a);
			});
		});
	});
	// 没有找到对应账户  进行注册逻辑
	ep.once('notFound', function () {
		var now = Date.now();
		var baseNumber = _.random(1, 100000000) + 1000000000;
		var phoneNumber = baseNumber;
		var email = baseNumber + '@thisis.afakeemail';
		var password = (baseNumber * now).toString(36);

		var account = new Account({
			phone: phoneNumber,
			email: email,
			password: password
		});
		account.name = userinfo.nick;
		account.access_token[OS] = OS + '_' + account.generateRandomToken();
		account.save(function (error, _account) {
			if (error) {
				return fn(error);
			}
			var platformaccount = new platformAccount({
				account_id: account._id,
				platform_id: AuthPrefix(platform_id),
				platform: platform,
				name: userinfo.name || '',
				nick: userinfo.nick || '',
				avarta: userinfo.avarta || '',
				area: userinfo.area || '',
				sex: userinfo.sex || '',
				loginState: loginState || ''
			});
			platformaccount.save(function (error, data) {
				if (error) {
					return fn(error);
				}
				var cpObj = {
					access_token: account.access_token[OS],
					email: account.email,
					name: account.name,
					phone: account.phone,
					uniq_id: account.uniq_id
				};
				return fn(null, cpObj);
			});
		});
	});
	platformAccount.findOne({
		platform_id: AuthPrefix(platform_id)
	}).exec(function (error, data) {
		if (error) {
			return fn(error);
		}
		if (!data) {
			return ep.emit('notFound');
		}
		return ep.emit('Found', data);
	});
};