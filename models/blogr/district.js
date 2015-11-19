'use strict';

var mongoose = require('mongoose');


var Schema = mongoose.Schema;

module.exports = new Schema({
	district_code: {
		type: Number,
		required: true,
		unique: true
	},
	district: {
		type: String,
		required: true,
		unique: true
	},
	city: {
		type: String,
		required: true,
		unique: true
	},
	province: {
		type: String,
		required: true,
		unique: true
	}
});