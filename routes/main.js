/**
 * Created by Bartek on 13.09.2015.
 */
var express = require('express');
var router = express.Router();

router.get('/main', function (req, res, next) {
    res.render('main', {title: 'Main site'});
});

module.exports = router;
