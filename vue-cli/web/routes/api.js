const express = require('express');
const router = express.Router();
const db = require('../models/db');
const elastic = require('../models/elastic');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('api');
});

router.get('/tables', function(req, res, next) {
	db.query('SHOW TABLES', db.column(0, req, res, next));
});

// index progress
router.get('/files', elastic.progress);

// create index and make document
router.post('/files', elastic.make);

// search index
router.put('/files', elastic.search);

module.exports = router;
