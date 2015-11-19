'use strict';

var app=  require('../../index');
var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

// 获取数据库连接配置
var blogrDataBaseConfig = app.kraken.get('mongodbs:blogr');
var blogrDataBaseOptions = {
    server: {poolSize: 20}
};
if(blogrDataBaseConfig.pass){
    blogrDataBaseOptions.user = blogrDataBaseConfig.user;
    blogrDataBaseOptions.pass = blogrDataBaseConfig.pass;
    blogrDataBaseOptions.auth = {
       authdb: 'admin'
    };
}

// 建立数据连接
var blogrDataBase = mongoose.createConnection(blogrDataBaseConfig.uri, blogrDataBaseOptions);


// 获取数据模型定义
var accountSchema = require('./account');
accountSchema.plugin(timestamps);
var ForgetPasswordSchema = require('./forgetPassword');
ForgetPasswordSchema.plugin(timestamps);
// 区域库
var districtSchema = require('./district');
districtSchema.plugin(timestamps);
// 天气
var weatherSchema = require('./weather');
weatherSchema.plugin(timestamps);




// export 模型






// export 模型
exports.Account = blogrDataBase.model('Account', accountSchema);
exports.ForgetPassword = blogrDataBase.model('ForgetPassword', ForgetPasswordSchema);
// 区域库
exports.district = blogrDataBase.model('district', districtSchema);
// 天气
exports.weather = blogrDataBase.model('weather', weatherSchema);