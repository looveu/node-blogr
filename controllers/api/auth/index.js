/**
 * Created by dom on 15/8/19.
 */


'use strict';
var passport = require('passport');
var blogrDataBase = require('../../../models/blogr');
var Account = blogrDataBase.Account;
var serverListModel = blogrDataBase.ServerList;
var forgetPassword = blogrDataBase.ForgetPassword;
var authMiddle = require('../../../lib/middleware/auth');
var nm29Crypto = require('../../../lib/nm29/crypto');
var sendEmail = require('../../../lib/nm29/sendEmail');
var request = require('superagent');
var _ = require('lodash');


function code() {
    return (parseInt(_.random(1,1000000)+_.random(1,8)/10*800000)).toString(36).toUpperCase();
}

function expire() {
    return new Date(Date.now()+600000);
}


module.exports = function (router) {
    router.post('/login', function (req, res, next) {
        passport.authenticate('local', {
                badRequestMessage: '邮箱或者密码错误'
            },
            function (err, account) {
                if (err) {
                    return next(err);
                }
                if (!account) {
                    return res.error('邮箱或者密码错误', '邮箱或者密码错误请重试');
                }
                req.logIn(account, function (error) {
                    if(error){
                        return next(error);
                    }
                    var OS = req.body.os || 'H5'; // IOS  H5  ANDROID GAME
                    account.access_token[OS] = OS+'_'+account.generateRandomToken();
                    account.save(function(error, _account){
                        if(error){
                            return res.error(error, '登录失败请重试');
                        }
                        res.ok({
                            uniq_id: _account.uniq_id,
                            token: _account.access_token[OS]
                        });
                    });
                });
            })(req, res, next);
    });
    router.get('/logout', authMiddle.ensureTokenAuthenticated, function(req, res){
        var account = req.user;
        var OS = req.body.os || 'H5';
        account.access_token[OS] = OS+'_'+account.generateRandomToken();
        account.save(function(error){
            if(error){
                return res.error(error, '登出失败请重试');
            }
            res.ok({}, '成功登出');
        });
    });
    router.get('/userInfo', authMiddle.ensureTokenAuthenticated, function(req, res){
        var account = _.omit(req.user._doc,['password', 'access_token', '_id']);
        var emails = account.email.split('@');
        emails[0] = emails[0].substr(0,3)+'***';
        account.email = emails.join('@');
        return res.ok(account);
    });
    router.post('/sendEmail', authMiddle.ensureTokenAuthenticated, function(req, res){
        sendEmail(req.user.email, 'GameAnd.Me 用户激活', '激活链接: http://gameand.me/#/active/'+req.user._id, function(error){
            if(error){
                return res.error('失败','激活邮件发送失败请稍后重试.');
            }
            return res.ok({},'激活邮件发送成功');
        });
    });
    router.post('/forgetPassword', function(req, res){
        if(!req.body.email){
            return res.error('参数错误','不存在的邮箱.');
        }
        Account.findOne({
            email: req.body.email.toUpperCase()
        }).exec(function(error, account){
            if(error){
                return res.error('查找用户失败','找回密码失败,请稍候再试.');
            }
            if(!account){
                return res.error('不存在的邮箱','不存在的邮箱.');
            }
            forgetPassword.findOne({
                account_id: account._id
            }).exec(function(error, iForgot){
                if(error){
                    return res.error(error,'找回密码失败请重试.');
                }
                if(!iForgot){
                    iForgot = new forgetPassword({
                        account_id: account._id
                    });
                }else{
                    iForgot.code = code();
                    iForgot.expire = expire();
                }
                iForgot.save(function (error, iforgot) {
                    if(error){
                        return res.error('找回密码失败','找回密码失败,请稍候再试.');
                    }
                    sendEmail(req.body.email,
                        'GameAnd.Me 找回密码',
                        '验证链接: http://gameand.me' +
                        '/#/resetPassword/'+
                        iforgot.code+
                        '<br> 验证码:'+iforgot.code,
                        function(error){
                            if(error){
                                return res.error(error.stack, '邮件发送失败请稍后重试.');
                            }
                            return res.ok(_.omit(iforgot._doc, ['code', 'account_id', '_id']), '邮件已经发送至您的邮箱请查收.');
                        });
                });
            });
            
        });
    });
    router.post('/resetPassword', function (req, res) {
        if(!req.body.code || !req.body.password){
            return res.error('参数错误','重设密码失败,请稍候再试.');
        }
        forgetPassword.findOne({
            code: req.body.code.toUpperCase()
        }).exec(function (error, forgot) {
            if(error){
                return res.error('重设密码失败','重设密码失败,请稍候再试.');
            }
            if(!forgot){
                return res.error('不存在口令','重设密码口令错误.');
            }
            var _now = Date.now();
            // forgot.remove();
            if(forgot.expire.getTime() < _now){
                return res.error('口令过期','重设密码口令过期,请重新找回.');
            }
            forgot.expire = new Date(_now);
            forgot.save();
            Account.findById(forgot.account_id)
                .exec(function (error, account) {
                    if(error){
                        return res.error('重设密码失败','重设密码失败,请稍候再试.');
                    }
                    if(!account){
                        return res.error('不存在账户','重设密码失败,请稍候再试.');
                    }
                    account.password = req.body.password;
                    account.save(function(error){
                        if(error){
                            return res.error('重设密码失败','重设密码失败,请稍候再试.');
                        }
                        res.ok({},'密码设置成功请登录');
                    });
                });
        });
    });
    router.post('/setInfo', authMiddle.ensureTokenAuthenticated, function(req, res){
        var hasSetRE = new RegExp('.*?\@THISIS\.AFAKEEMAIL$');
        if(!hasSetRE.test(req.user.email)){
            return res.error('您已经设置过信息了', '您已经设置过信息了');
        }
        if(!req.body.email || !req.body.password){
            return res.error('缺少必要字段', '缺少必要字段');
        }
        req.user.email = req.body.email;
        req.user.password = req.body.password;
        req.user.save(function(error, account){
            if(error){
                return res.error('设置失败','设置失败请稍候再试.');
            }
            sendEmail(req.user.email, 'GameAnd.Me 用户激活', '激活链接: http://gameand.me/#/active/'+req.user._id, function(){});
            return res.ok(_.omit(account._doc, ['password', 'access_token']),'账号设置成功,激活链接已经发送到您的邮箱,请及时修改密码!');
        });
    });
    router.get('/active', function(req, res){
        if(!req.query.code){
            return res.error('失败','缺少激活码.');
        }
        Account.findById(req.query.code).exec(function(error, account){
            if(error){
                return res.error('激活失败','激活失败稍后重试.');
            }
            if(!account){
                return res.error('激活失败','激活码不存在请重新发送激活邮件.');
            }
            if(account.active){
                return res.error('重复激活','您的帐号已经激活.');
            }
            account.active = true;
            account.save(function (error) {
                if(error){
                    return res.error('激活失败','激活失败稍后重试.');
                }
                return res.ok({},'帐号激活成功');
            });
        });
    });


    router.post('/syncAccount', authMiddle.ensureTokenAuthenticated, function(req, res){
        var server_id = req.body.server_id;
        if(!server_id){
            return res.error('未知服务', '没有标识的服务器');
        }
        var now = Date.now()+180000;
        serverListModel.findById(server_id).exec(function (error, server) {
            if(error){
                return res.error(error.stack, '获取服务器出错');
            }
            var OS = (req.body.os || 'game').toUpperCase();   
            if(!server){
                return res.error('不存在的服务器');
            }
            request.post('http://'+server.host+':'+server.port+'/sync_account')
                .send({
                    time: now,
                    cpmsg: nm29Crypto('encode', 'gtba', 'server', now, 'gtbaLoveGTBA918SERVER@'+req.user.access_token[OS]),
                    email: req.body.email,
                    password: req.body.password,
                    account_id: req.user._id,
                    user_count: server.user_count,
                    limit: server.limit
                })
                .set('user-agent','blogr/1.2.0')
                .set('Accept', 'application/json')
                .end(function(err, requestRes){
                    if(err){
                        return res.error(err.stack, '远方服务器出错');
                    }
                    var body = {};
                    try{
                        body = JSON.parse(requestRes.text);
                    }catch(e){
                        return res.error('远方服务器有问题','远方服务器有问题');
                    }
                    if(body.status === 'ERROR'){
                        return res.error(body.error);
                    }
                    server.user_count = body.data.count;
                    server.save(function(error, server){
                        if(error){
                            return res.error(error.stack, '服务器数据同步失败');
                        }
                        res.ok(server);
                    });
                });
        });
    });
    router.post('/signup', function(req, res){
        var baseNumber = _.random(1,100000000) + 1000000000;
        var cpmsg = req.body.cpmsg;
        var time = 0;
        if(req.body.time){
            time = parseInt(req.body.time);
        }
        var now = Date.now();
        if(cpmsg && time){
            if(time < now){
                return res.error('过期', '请求过期');
            }
            console.log(req.body);
            if(nm29Crypto('decode', 'gtba', 'client', time, cpmsg) !== 'gtbaLoveGTBA918'){
                return res.error('验证失败', '客户端验证失败');
            }
        }else{
            if(!req.body.email || !req.body.password){
                return res.error('验证失败', '邮箱或者密码没有填');
            }
        }
        var OS =  req.body.os || 'H5';
        var phoneNumber = req.body.phone || baseNumber;
        var email = req.body.email || baseNumber + '@thisis.afakeemail';
        var password = req.body.password || (baseNumber*now).toString(36);

        var account = new Account({
            phone: phoneNumber,
            email: email,
            password: password
        });
        account.access_token[OS] = OS+'_'+account.generateRandomToken();
        console.log('account.access_token[OS]',account.access_token[OS]);
        account.save(function (error, _account) {
            if(error){
                return res.error(error, '注册失败请重试');
            }
            var cpObj = {
                access_token: _account.access_token[OS],
                email: _account.email,
                name: _account.name,
                phone: _account.phone,
                uniq_id: _account.uniq_id,
                password: password
            };
            console.log('_account.access_token[OS]',_account.access_token[OS]);
            if(cpmsg && time){
                var cpStr = JSON.stringify(cpObj);
                return res.ok(nm29Crypto('encode', 'gtba', 'client', time, cpStr));
            }
            sendEmail(cpObj.email, 'GameAnd.Me 用户激活', '激活链接: http://gameand.me/#/active/'+_account._id, function(error){
                if(error){
                    return res.error('失败','激活邮件发送失败请稍后重试.');
                }
                return res.ok(cpObj,'账号密码设置成功,激活链接已经发送到您的邮箱.');
            });
        });
    });
};