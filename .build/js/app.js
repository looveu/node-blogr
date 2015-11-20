(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9rcmFrZW4tZGV2dG9vbHMtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2RvbS9EZXYvTG9vdmV1L2Jsb2dyL3B1YmxpYy9qcy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbi8vIHZhciBfID0gcmVxdWlyZSgnbG9kYXNoJyk7XG5cbi8vIHZhciBzb2NrZXQgPSBpbygnaHR0cDovLzEyNy4wLjAuMTo4ODE4Jyk7XG4vLyBzb2NrZXQub24oJ25ld3MnLCBmdW5jdGlvbiAoZGF0YSkge1xuLy8gXHRjb25zb2xlLmxvZyhkYXRhKTtcbi8vIFx0c29ja2V0LmVtaXQoJ215IG90aGVyIGV2ZW50JywgeyBteTogJ2RhdGEnIH0pO1xuLy8gfSk7XG4vLyBzb2NrZXQub24oJ25ld3MtJywgZnVuY3Rpb24oZGF0YSl7XG4vLyBcdGNvbnNvbGUubG9nKGRhdGEpO1xuLy8gfSk7XG5cbi8vIHZhciBBID0gWydhJywgJ3MnLCAnZCddO1xuXG4vLyB2YXIgYVMgPSBfLm1hcChBLCBmdW5jdGlvbihhKXtcbi8vIFx0cmV0dXJuIGEgPT09ICdzJztcbi8vIH0pO1xuXG4vLyBjb25zb2xlLmxvZyhhUyk7XG5cbnZhciBwYXlhcmdzID0ge307XG5mdW5jdGlvbiBvbkJyaWRnZVJlYWR5KCl7XG5XZWl4aW5KU0JyaWRnZS5pbnZva2UoJ2dldEJyYW5kV0NQYXlSZXF1ZXN0JywgcGF5YXJncywgZnVuY3Rpb24ocmVzKXtcbiAgaWYocmVzLmVycl9tc2cgPT0gXCJnZXRfYnJhbmRfd2NwYXlfcmVxdWVzdDpva1wiKXtcbiAgICBhbGVydChcIuaUr+S7mOaIkOWKn1wiKTtcbiAgICAvLyDov5nph4zlj6/ku6Xot7PovazliLDorqLljZXlrozmiJDpobXpnaLlkJHnlKjmiLflsZXnpLpcbiAgfWVsc2V7XG4gICAgYWxlcnQoXCLmlK/ku5jlpLHotKXvvIzor7fph43or5VcIik7XG4gIH1cbn0pO1xufVxuXG5pZiAodHlwZW9mIFdlaXhpbkpTQnJpZGdlID09IFwidW5kZWZpbmVkXCIpe1xuICAgIGlmKCBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyICl7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ1dlaXhpbkpTQnJpZGdlUmVhZHknLCBvbkJyaWRnZVJlYWR5LCBmYWxzZSk7XG4gICAgfWVsc2UgaWYgKGRvY3VtZW50LmF0dGFjaEV2ZW50KXtcbiAgICAgICAgZG9jdW1lbnQuYXR0YWNoRXZlbnQoJ1dlaXhpbkpTQnJpZGdlUmVhZHknLCBvbkJyaWRnZVJlYWR5KTsgXG4gICAgICAgIGRvY3VtZW50LmF0dGFjaEV2ZW50KCdvbldlaXhpbkpTQnJpZGdlUmVhZHknLCBvbkJyaWRnZVJlYWR5KTtcbiAgICB9XG59ZWxzZXtcbiAgICBvbkJyaWRnZVJlYWR5KCk7XG59Il19
