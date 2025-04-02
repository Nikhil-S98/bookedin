const express = require('express');
const router = express.Router();
const helpers = require('./helpers');

router.get('/', function(req, res, next) {
  res.render('index', {title: "BookedIn"});
});

module.exports = router;
