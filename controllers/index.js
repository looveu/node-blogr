'use strict';

var nm29DataBase = require('../models/blogr/index');
var _ = require('lodash');
var Category = nm29DataBase.category;


module.exports = function (router) {
    router.get('/', function (req, res) {
        Category.find().exec()
            .then(function (ca) {
                var topMenu = _.filter(ca, function (n) {
                    return n.level === 1;
                });
                var sonMenu = _.filter(ca, function (n) {
                    return n.level === 2;
                });
                var menuMap = _.map(topMenu, function (m) {
                    m._doc.menus = _.filter(sonMenu, function (n) {
                        // console.log('n.belong === m.title ', n.belong, m.title)
                        return n.belong === m.title;
                    });
                    return m._doc;
                });
                res.render('index', {
                    navs: menuMap
                });
            })
            .catch(function (error) {
                console.error(error);
                res.error(error);
            });

        // res.render('index', {
        //     name: 'TouchCrab'
        // });
        // res.send('BUCKLE YOUR SEATBELT COMMANDER COZ KANSAS IS GOING BEY-BEY');
    });
};
