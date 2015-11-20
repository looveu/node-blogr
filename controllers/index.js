'use strict';
module.exports = function (router) {
    router.get('/', function (req, res) {
        res.render('index', {
            name: 'TouchCrab'
        });
        // res.send('BUCKLE YOUR SEATBELT COMMANDER COZ KANSAS IS GOING BEY-BEY');
    });
};
