/*!
 * Created by dom on 15/8/15.
 */

'use strict';

var mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10,
    EventProxy = require('eventproxy'),
    // app=  require('../../index'),
    _ = require('lodash'),
    uuid = require('node-uuid');

var utypeEnum = _.keys(require('../../config/account/utypes.json'));

var Schema = mongoose.Schema;

var accountSchema = new Schema({
    status: {
        type: String,
        default: 'NORMAL',
        required: true,
        enum: ['NORMAL', 'FROZEN']
    },
    phone: {
        type: Number,
        unique: true,
        required: true
    },
    name: {
        type: String,
        default: uName
    },
    access_token: {
        H5: String,
        IOS: String,
        ANDROID: String,
        GAME: String
    },
    email: {
        type: String,
        required: true,
        uppercase: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    g: {
        type: String,
        required: true,
        unique: true,
        default: gCode
    },
    active: {
        type: Boolean,
        default: false
    },
    utype: {
        type: String,
        default: 'NORMAL',
        required: true,
        enum: utypeEnum
    },
    coins: {
        type: Number,
        required: true,
        default: 0
    },
    uniq_id: {
        type: String,
        required: true,
        default: uuid.v1
    },
    avarta: String,
    description: String
});

function gCode() {
    return parseInt(_.random(1,10000000000)+_.random(1,8)/10*80000000000)+'';
}
function uName() {
    return '匿名者'+gCode().toString(36);
}

// Bcrypt middleware
accountSchema.pre('save', function (next) {
    var user = this,
        ep = new EventProxy(), E;
    if (!user.isModified('password')) {
        return next();
    }
    //console.log('i am start hash',user.password);
    ep.on('hashed', function (hash) {
        //console.log('hashed', hash, user);
        user.password = hash;
        next();
    });
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) {
            E = new Error(err);
            return next(E);
        }

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) {
                E = new Error(err);
                return next(E);
            }
            ep.emit('hashed', hash);
        });
    });
});

// Password verification
accountSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

// Remember Me implementation helper method
accountSchema.methods.generateRandomToken = function() {
    var user = this,
        chars = '-!abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
        token = (Date.now()).toString(36) + '_';
    for (var x = 0; x < 32; x++) {
        var i = Math.floor(Math.random() * 62);
        token += chars.charAt(i);
    }
    return token;
};

module.exports = accountSchema;