/**
 * Created by Bartek on 12.09.2015.
 */
var express = require('express');
var User = require('../models/User');
var fs = require('fs');
var router = express.Router();

router.get('/register', function (req, res, next) {
    res.render('register', {title: 'Register'});
});

router.post('/register', function (req, res, next) {
    var user = new User(req.body.username, req.body.password, req.body.email);
    var repeatedPassword = req.body.repeatedPassword;
    switch(validateRegister(user, repeatedPassword)) {
        case 0:
            res.render('register',{errorBlock: 'Passwords must be the same!'});
            break;
        case 1:
            res.render('register',{errorBlock: 'Username is used!'});
            break;
        case 2:
            res.render('register',{errorBlock: 'Email is used'});
            break;
        case 3:
            saveUser(user);
            res.render('index',{errorBlock: 'Account created!'})
            break;
    }
});

router.post('/backToLogin', function (req, res, next) {
    res.redirect('/login');
});

var saveUser = function (user) {
    var xml = fs.readFileSync('../dataBase/users.xml').toString();

    var parser = require('xmldom').DOMParser;
    var xmlData = new parser().parseFromString(xml, "text/xml");


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

    console.log('Registering new user: ' + newUser);
    xmlData.documentElement.appendChild(newUser);

    console.log('Saving: ' + xmlData);
    fs.writeFileSync('../dataBase/users.xml', xmlData);
};

var validateRegister = function (user, repeatedPassword){
    var xml = fs.readFileSync('../dataBase/users.xml').toString();

    var parser = require('xmldom').DOMParser;
    var xmlData = new parser().parseFromString(xml, "text/xml");

    if(user.getPassword() != repeatedPassword){
        return 0
    }

    var userElements = xmlData.getElementsByTagName('username');
    var isUsernameUsed = isExists(userElements, user.getUsername());
    if(isUsernameUsed){
        return 1;
    }

    var emailElements = xmlData.getElementsByTagName('email');
    var isEmailUsed = isExists(emailElements, user.getEmail());
    if(isEmailUsed){
        return 2;
    }

    return 3;
};

var isExists = function (tab, value){
    for (i = 0; i < tab.length; i++) {
        if (tab.item(i).textContent == value) {
            return true;
        }
    }
};

module.exports = router;
