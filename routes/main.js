/**
 * Created by Bartek on 13.09.2015.
 */
var express = require('express');
var User = require('../models/user.js');
var router = express.Router();

router.get('/login', function (req, res, next) {
    res.render('index', {title: 'Login'});
});

router.post('/login', function (req, res, next) {
    var user = new User(req.body.username, req.body.password);
    if (isUserExists(user) != -1) {
        res.redirect('/main', user);
    }
    else {
        res.render('index', {errorBlock: 'Invalid login or password. Try again!' })
    }
});

router.post('/signUp', function (req, res, next) {
    res.redirect('/register');
});

module.exports = router;
