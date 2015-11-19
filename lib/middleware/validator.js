'use strict';

var expressValidator = require('express-validator');

module.exports = function() {
    return expressValidator({
    	customValidators: {
			isArray: function(value) {
			    return Array.isArray(value);
			},
			gte: function(param, num) {
			    return param >= num;
			},
			inList: function(value, list) {
				return !~list.indexOf(value);
			}
		}
    });
};