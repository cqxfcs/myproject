var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbs = require('../dbs/dbs')(router);


router.post('/select',dbs.getData, function (req, res) {
    res.send(res.locals.newsinfo);
});

router.get('/show', function (req, res, next) {
    res.render('show.ejs');
});

router.get('/showbg', function (req, res, next) {
    res.render('background.ejs');
});

router.post('/add',dbs.addData, function (req, res) {
    res.send(res.locals.newsinfo);
});

router.post('/update',dbs.updateData, function (req, res) {
   res.send(res.locals.newsinfo)
});

module.exports = router;
