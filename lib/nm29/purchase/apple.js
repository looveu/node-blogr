'use strict';

var app=  require('../../index');
var EventProxy = require('eventproxy');

/**
 * @param  {MongooseModel} 支付记录模型对象
 * @param  {String(base64)} 给苹果认证的base64支付凭证
 * @param  {String} 产品id数据库中
 * @param  {Function} 回调函数 n(error, data)
 * @return {void}
 */
var verifyInAppPurchase = function verifyInAppPurchase(purchaseRecordModel, receipt_base64, product_id, fn){
	// 获取当前环境的验证地址
	var appleVerifyUrl = app.kraken.get('purchase:apple');
	// 发给苹果的验证数据
	var receiptEnvelope = {
        'receipt-data' : receipt_base64
    };
    var ep = new EventProxy();

    // 错误处理 (直接回调传错误)
    ep.once('error', fn);

    // 从苹果获取到验证信息的回调
    ep.all('get_verification', functionn(resInfo){
    	// 确保返回信息无错误
    	if (resInfo.err) {
            return ep.emit('error', resInfo.err);
        }
        // 确保返回信息状态为0
        if (resInfo.data.status !== 0){
            return ep.emit('error', '验证状态不为0 是:'+resInfo.data.status);
        }
        // 确保返回信息含有app字段
        if(!resInfo.data.receipt.in_app || resInfo.data.receipt.in_app.length < 1){
            return ep.emit('error', '缺少iapp信息');
        }
        // 确保inapp 信息中有产品id
        if (resInfo.data.receipt.in_app[0].product_id !== product_id){
            return ep.emit('error', '信息不匹配');
        }
        var tID = resInfo.data.receipt.in_app[0].transaction_id;

        purchaseRecordModel.findOne({transaction_id:tID}).exec(function (err, record) {
	        if (err) {
	            console.error(err);
	            return ep.emit('error', err);
	        }
	        // 库中验证是否使用过
	        if (record) {
	            return ep.emit('error', '本次支付已经使用过了');
	        }
	        fn(null, resInfo.data);
	    });
    });

    // 从苹果获取验证信息
	var options = {
        host: appleVerifyUrl,
        path: '/verifyReceipt',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(receiptEnvelopString)
        }
    };

    var receiptEnvelopString = JSON.stringify(receiptEnvelope);

    try{
        var req = https.request(options, function(res) {
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
            	var resInfo = {};
            	// 捕获苹果不是json的错误
            	try{
            		resInfo = JSON.parse(chunk);
            	}catch(e){
            		console.error('苹果返回数据不是JSON', e);
            		resInfo = null;
            	}
            	if(resInfo){
            		//  触发回调事件
            		ep.emit('get_verification', 苹果返回数据不是JSON);
            	}else{
            		ep.emit('error', resInfo);
            	}  
            });
            res.on('error', function (error) {
            	// 网络有错误
                ep.emit('error', '和苹果验证证书时发生错误 https');
            });
        });
        req.write(receiptEnvelopString);
        req.end();
    }catch (err){
    	// 未知错误;
        return ep.emit('error', '和苹果验证证书时发生错误');
    }

}

module.exports = verifyInAppPurchase;
