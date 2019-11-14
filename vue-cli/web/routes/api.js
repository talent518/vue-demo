var express = require('express');
var router = express.Router();
var db = require('../models/db');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('api');
});

router.get('/tables', function(req, res, next) {
	db.query('SHOW TABLES', db.column(0, req, res, next));
});

module.exports = router;
