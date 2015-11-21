'use strict';

var mongoose = require('mongoose');


var Schema = mongoose.Schema;

module.exports = new Schema({
	title: {
		type: String,
		required: true,
		unique: true
	},
	level: {
		type: Number
	},
	belong: {
		type: Schema.Types.ObjectId
	},
	sort: {
		type: Number,
		default: 1
	}
});