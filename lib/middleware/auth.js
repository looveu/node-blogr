// Simple route middleware to ensure user is authenticated.  Otherwise send to login page.
'use strict';

var passport = require('passport');
var app=  require('../../index');

/**
 * 确认用户登录中间件
 * Example
 * ```
 * router.get('/someRout', auth.ensureAuthenticated, function(){
 * });
 * ```
 * @param  {Object}   req  request 对象
 * @param  {Object}   res  response 对象
 * @param  {Function} next expess next 函数       
 */
exports.ensureAuthenticated = function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({
        error: 401,
        message: '请登录',
        status: 'ERROR'
    });
};

/**
 * 用token方式确认用户登录
 * @param  {Object}   req  request 对象
 * @param  {Object}   res  response 对象
 * @param  {Function} next expess next 函数  
 */
exports.ensureTokenAuthenticated = function(req, res, next){
    passport.authenticate('bearer', {session: false}, function(err, user){
        if (err) { return next(err); }
        if (!user) {
            return res.status(401).json({
                error: 401,
                message: '请登录',
                status: 'ERROR'
            });
        }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            next();
        });
    })(req, res, next);
};
/**
 * 用户权限验证中间件
 * @param  {Number} Num 权限数字
 */
exports.authPolice = function (Num){
    var utypes = app.kraken.get('account:utypes');
    return function (req, res, next){
        if(utypes[req.user.utype] <= Num){
            return next();
        }
        res.status(403).json({
            error: 403,
            message: '权限不足',
            status: 'ERROR'
        });
    };
};