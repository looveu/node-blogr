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
		required: true
	},
	content: {
		type: String,
		required: true
	},
	tags: {
		type: Array,
		required: true
	},
	author: {
		type: Schema.Types.ObjectId
	}
});