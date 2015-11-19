'use strict';

var request = require('superagent');

var cityWeather = function cityWeather(name, callback){
    console.log('city name', name);
    
	request.get('http://apis.baidu.com/apistore/weatherservice/weather')
                .query({
                    cityname: name
                })
                .set('user-agent','newMoonBot/1.2.0')
                .set('Accept', 'application/json')
				.set('apikey', '1cbecad8b36c7293759db4976733f683')
                .end(callback);
};


exports.cityWeather = cityWeather;