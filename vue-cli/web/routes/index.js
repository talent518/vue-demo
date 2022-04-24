var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', vuedir: path.join(__dirname, '../../') });
});

router.use('/api', require('./api'));

module.exports = router;
