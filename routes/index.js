var express = require('express');
var User = require('../models/user.js');
var fs = require('fs');
var router = express.Router();

router.get('/login', function(req, res, next) {
  res.render('index', { title: 'Login' });
});

router.post('/login', function (req, res, next) {
  var user = new User(req.body.username, req.body.password);
  if(isUserExists(user)) {
    res.redirect('/main', user);
  }
});

router.post('/signUp', function(req, res, next){
  res.redirect('/register');
});

var isUserExists = function(user){

  var xml = fs.readFileSync('../dataBase/users.xml').toString();

  var parser = require('xmldom').DOMParser;
  var xmlData = new parser().parseFromString(xml,"text/xml");
  var userElements = xmlData.getElementsByTagName('username');

  var i = 0;
  var len = userElements.length;
  for (; i < len; ) {
    if(userElements.item(i).textContent == user.getUsername()){
      var passwordElements = xmlData.getElementsByTagName('password');
      return isPasswordCorrect(passwordElements.item(i).textContent, user);
    }
    i++;
  }
  return 0;
};

var isPasswordCorrect = function(password, user){
  return password == user.getPassword();
};



module.exports = router;
