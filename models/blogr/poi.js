'use strict';

var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var poi = new Schema({
	loc: {
		type: {
			type: String
		},
		coordinates: []
	},
	name: {
		type: String,
		required: true
	},
	cover: {
		type: String,
		required: true
	},
	images: [
		{
			type: String
		}
	],
	discription: {
		type: String,
		required: true
	},
	tags: {
		type: String,
		required: true
	},
	address: {
		type: String,
		required: true
	},
	district: {
		type: String,
		required: true
	},
	city: {
		type: String,
		required: true
	},
	province: {
		type: String,
		required: true
	}
});
poi.index({ loc: '2dsphere' });
module.exports = poi;