'use strict';

var request = require('superagent');
var nm29DataBase = require('../../../models/nm29/index');
var Weather = nm29DataBase.weather;
// var access = require('safe-access');

var cityWeather = function cityWeather(name, callback) {
    console.log('city name', name);
    var _now = new Date();
    var date = _now.getFullYear() + ' ' + (_now.getMonth() + 1) + '-' + _now.getDate();
    if(!name){
        return callback(new Error('请明确城市'));
    }
    Weather.findOne({
        city: name,
        date: date
    }).exec(function (error, weather) {
        if (error) {
            return callback(error);
        }
        if (weather) {
            return callback(null, weather.weather);
        }
        request.get('https://api.heweather.com/x3/weather')
            .query({
                city: name,
                key: 'aa763d7dc80043adae97370ba6f2cf46'
            })
            .set('user-agent', 'newMoonBot/1.2.0')
            .set('Accept', 'application/json')
            .end(function (error, resp) {
                if (error) {
                    return callback(error);
                }
                var weather = {}, res = {};
                try {
                    weather = JSON.parse(resp.text);
                    console.log('weather',weather);
                    res = weather['HeWeather data service 3.0'][0];
                    if (res.status !== 'ok') {
                        return callback(new Error(res.status));
                    }
                } catch (e) {
                    return callback(new Error('远方服务器有问题'));
                }
                // var access = require('safe-access');
                var data = {
                    date: date,
                    city: name,
                    weather: res
                }
                Weather.findOneAndUpdate({
                    date: date,
                    city: name
                }, data, {
                        upsert: true,
                        multi: true
                    }).exec(function (error, weather) {
                        if (error) {
                            return callback(error);
                        }
                        return callback(null, res);
                    });
            });
    });
};




exports.cityWeather = cityWeather;