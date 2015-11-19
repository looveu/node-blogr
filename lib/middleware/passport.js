/**
 * Created by dom on 15/8/19.
 */
'use strict';


var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    BearerStrategy = require('passport-http-bearer').Strategy,
    gameAndMeDataBase = require('../../models/gameAndMe'),
    Account = gameAndMeDataBase.Account,
    uuid = require('node-uuid');


passport.serializeUser(function(account, done) {
    done(null, account._id);
});

passport.deserializeUser(function(id, done) {
    Account.findById(id, function(err, account) {
        done(err, account);
    });
});

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function (email, password, done) {
        var query = {};
        query.email = email.toUpperCase();
        Account.findOne(query, function (err, account) {
            if (err) {
                return done(err);
            }
            if (!account) {
                return done(null, false, {
                    message: '不存在账户: ' + email
                });
            }
            account.comparePassword(password, function (err, isMatch) {
                if (err) {
                    return done(err);
                }
                if (isMatch) {
                    if(!account.uniq_id){
                        account.uniq_id = uuid.v1();
                        account.save(function(err, _account){
                            if (err) {
                                return done(err);
                            }
                            return done(null, _account);
                        });
                    }
                    return done(null, account);
                } else {
                    return done(null, false, {
                        message: '账号或密码错误'
                    });
                }
            });
        });
    }));

passport.use(new BearerStrategy({},
    function (token, done) {
        var OS = 'ANDROID';
        var query = {};
        if(!token.indexOf('H5')){
            OS = 'H5';
        }else if(!token.indexOf('IOS')){
            OS = 'IOS';
        }else if(!token.indexOf('GAME')){
            OS = 'GAME';
        }
        query['access_token.'+OS] = token;
        console.log('os is -->', OS, query);
        Account.findOne(query, done);
    }));
module.exports = function() {
    return passport.initialize();
};