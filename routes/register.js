/**
 * Created by Bartek on 12.09.2015.
 */
var express = require('express');
var User = require('../models/User');
var fs = require('fs');
var router = express.Router();

router.get('/register', function(req, res, next) {
    res.render('register', { title: 'Register' });
});

router.post('/register', function(req, res, next){
    var user = new User(req.body.username, req.body.password, req.body.email);
    saveUser(user);
});

router.post('/backToLogin', function(req, res, next){
   res.redirect('/login');
});

var saveUser = function(user){
    var xml = fs.readFileSync('../dataBase/users.xml').toString();

    var parser = require('xmldom').DOMParser;
    var xmlData = new parser().parseFromString(xml,"text/xml");


    var newUser = xmlData.createElement('user');

    var usernameNode = xmlData.createElement('username');
    var username = xmlData.createTextNode(user.getUsername());
    usernameNode.appendChild(username);

    var passwordNode = xmlData.createElement('password');
    var password = xmlData.createTextNode(user.getPassword());
    passwordNode.appendChild(password);

    var emailNode = xmlData.createElement('email');
    var email = xmlData.createTextNode(user.getEmail());
    emailNode.appendChild(email);

    newUser.appendChild(usernameNode);
    newUser.appendChild(passwordNode);
    newUser.appendChild(emailNode);

    xmlData.documentElement.appendChild(newUser);
    var string = xmlData.getElementsByTagName('username');
};

module.exports = router;
