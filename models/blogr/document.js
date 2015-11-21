'use strict';

var mongoose = require('mongoose');


var Schema = mongoose.Schema;

module.exports = new Schema({
	title: {
		type: String,
		required: true,
		unique: true
	},
	category: {
		type: String,
		required: true,
		unique: true
	},
	tags: {
		type: Array,
		required: true,
		unique: true
	},
	author: {
		type: Schema.Types.ObjectId,
		required: true,
		unique: true
	}
});