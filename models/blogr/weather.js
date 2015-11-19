'use strict';

var mongoose = require('mongoose');


var Schema = mongoose.Schema;

module.exports = new Schema({
	city: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		required: true
	},
	weather: Object
});