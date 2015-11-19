'use strict';

var request = require('superagent');

var ipLookUp = function ipLookUp(ip, callback) {
    request.get('http://apis.baidu.com/apistore/iplookupservice/iplookup')
        .query({
            ip: ip
        })
        .set('user-agent', 'newMoonBot/1.2.0')
        .set('Accept', 'application/json')
        .set('apikey', '1cbecad8b36c7293759db4976733f683')
        .end(callback);
};

var aqiCityList = function aqiCityList(callback) {
    request.get('http://apis.baidu.com/apistore/aqiservice/citylist')
        .set('user-agent', 'newMoonBot/1.2.0')
        .set('Accept', 'application/json')
        .set('apikey', '1cbecad8b36c7293759db4976733f683')
        .end(callback);
};

var aqi = function aqi(city, callback) {
    request.get('http://apis.baidu.com/apistore/aqiservice/aqi')
        .query({
            city: city
        })
        .set('user-agent', 'newMoonBot/1.2.0')
        .set('Accept', 'application/json')
        .set('apikey', '1cbecad8b36c7293759db4976733f683')
        .end(callback);
};


exports.ipLookUp = ipLookUp;
exports.aqiCityList = aqiCityList;
exports.aqi = aqi;