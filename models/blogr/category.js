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
		type: Number,
		required: true,
		unique: true
	},
	belong: {
		type: Schema.Types.ObjectId,
		required: true,
		unique: true
	}
});