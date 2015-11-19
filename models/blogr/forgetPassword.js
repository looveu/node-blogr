/**
 * Created by dom on 15/8/26.
 */
'use strict';

var mongoose = require('mongoose');
var _ = require('lodash');


var Schema = mongoose.Schema;

module.exports = new Schema({
    expire: {
        type: Date,
        default: expire,
        required: true
    },
    code: {
        type: String,
        default: code,
        unique: true,
        required: true
    },
    account_id: {
        type: Schema.Types.ObjectId,
        required: true
    }
});

function code() {
    return (parseInt(_.random(1,1000000)+_.random(1,8)/10*800000)).toString(36).toUpperCase();
}

function expire() {
    return new Date(Date.now()+600000);
}