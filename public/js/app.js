'use strict';

// var _ = require('lodash');

// var socket = io('http://127.0.0.1:8818');
// socket.on('news', function (data) {
// 	console.log(data);
// 	socket.emit('my other event', { my: 'data' });
// });
// socket.on('news-', function(data){
// 	console.log(data);
// });

// var A = ['a', 's', 'd'];

// var aS = _.map(A, function(a){
// 	return a === 's';
// });

// console.log(aS);

var payargs = {};
function onBridgeReady(){
WeixinJSBridge.invoke('getBrandWCPayRequest', payargs, function(res){
  if(res.err_msg == "get_brand_wcpay_request:ok"){
    alert("支付成功");
    // 这里可以跳转到订单完成页面向用户展示
  }else{
    alert("支付失败，请重试");
  }
});
}

if (typeof WeixinJSBridge == "undefined"){
    if( document.addEventListener ){
        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
    }else if (document.attachEvent){
        document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
    }
}else{
    onBridgeReady();
}