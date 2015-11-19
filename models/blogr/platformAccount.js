'use strict';

var mongoose = require('mongoose');


var Schema = mongoose.Schema;

module.exports = new Schema({
    platform_id: {
        type: String,
        required: true,
        unique: true
    },
    account_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Account'
    },
    platform: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    nick: String,
    avarta: String,
    description: String,
    area: String,
    sex: String,
    loginState: String,
    token: String
});