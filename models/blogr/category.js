'use strict';

var mongoose = require('mongoose');


var Schema = mongoose.Schema;

module.exports = new Schema({
	title: {
		type: String,
		required: true
	},
	level: {
		type: Number,
		default: 1
	},
	belong: {
		type: String
	},
	sort: {
		type: Number,
		default: 1
	}
});