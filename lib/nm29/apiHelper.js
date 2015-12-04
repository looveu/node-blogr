/**
 * Created by dom on 15/8/17.
 */
'use strict';
// var uuid = require('node-uuid');
var util = require('util');

module.exports = function(){
    return function apiHelper(req, res, next){
        // res.json.ok = function(data, message){
        //     var theJson = {data: data};
        //     if(message){
        //         theJson.message = message;
        //     }
        //     theJson.status = 'OK';
        //     res.json(theJson);
        // };
        // res.json.error = function(error, message){
        //     console.error('========>>', req.route, error);
        //     if(process.env.NODE_ENV === 'production'){
        //         error = '服务器繁忙';
        //     }
        //     var theJson = {error: error};
        //     theJson.message = message || error;
        //     theJson.status = 'ERROR';
        //     res.json(theJson);
        // };
        // req.requestId = uuid.v1();
        req.debuglog = util.debuglog('DEBUG');
        res.locals.locale = (req.get('accept-language') || '').split(/(\;|\,)/ig)[0];
        res.ok = function(data, message){
            var theJson = {data: data};
            if(message){
                theJson.message = message;
            }
            theJson.status = 'OK';
            this.json(theJson);
        };
        res.error = function(error, message){
            console.error('========>>', req.route, error);
            if(process.env.NODE_ENV === 'production'){
                error = '服务器繁忙';
            }
            var theJson = {error: error};
            theJson.message = message || error;
            theJson.status = 'ERROR';
            this.json(theJson);
        };
        next();
    };
};