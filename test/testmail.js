/**
 * Created by dom on 15/8/25.
 */
'use strict';

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var moment = require('moment');

var mailOptions = {
    host:"smtp.exmail.qq.com",
    port: 465,
    auth: {
        user: 'gameandme@nm29.com',
        pass: 'Qq123456qQ'
    },
    maxConnections: 5,
    maxMessages: 10,
    secure: true
};

    var transporter = nodemailer.createTransport(smtpTransport(mailOptions));
    console.log('正在发送邮件');
    moment.locale('zh-CN');
    var mailSendOptions = {
        from: 'GameAndMe<gameandme@nm29.com>', // sender address
        to: 'i@looveu.com', // list of receivers
        subject: 'dddd'+' '+moment().format('lll'),
        html: 'test'+
        '<br><br> -----GameAnd.Me'
    };
    transporter.sendMail(mailSendOptions, function (a, b) {
        console.log(a,b)
    });
