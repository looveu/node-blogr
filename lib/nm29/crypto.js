/**
 * Created by dom on 15/8/22.
 */
'use strict';

var app=  require('../../index');

var crypto = require('crypto');
//解密
function decode(cryptkey, iv, secretdata) {
    var decipher = crypto.createDecipheriv('aes-256-cbc', cryptkey, iv),
        decoded  = decipher.update(secretdata, 'base64', 'utf8');
    decoded += decipher.final( 'utf8' );
    return decoded;
}
//加密
function encode(cryptkey, iv, cleardata) {
    var encipher = crypto.createCipheriv('aes-256-cbc', cryptkey, iv),
        encoded  = encipher.update(cleardata, 'utf8', 'base64');
    encoded += encipher.final( 'base64' );
    return encoded;
}

module.exports = function(mod, project, side, timeStamp, msg){
    var preObj = app.kraken.get('crypto:'+project+':'+side);
    var cryptkey = crypto.createHash('sha256').update(preObj.key+timeStamp).digest();
    var iv = preObj.iv;
    try{
        if(mod === 'encode'){
            return encode(cryptkey, iv, msg);
        }else{
            return decode(cryptkey, iv, msg);
        }
    }
    catch(e){
        return 'ERROR';
    }

}

