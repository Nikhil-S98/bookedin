const express = require('express');
const router = express.Router();

const Author = require('../models/author');

const helpers = require('./helpers');

router.get('/', async (req, res, next) => {
  let authors = await Author.all();
  res.render('authors/index', { title: 'BookedIn || Authors', authors: authors });
 });
 
/*
router.get('/', function(req, res, next) {
  const authors = Author.all
  res.render('authors/index', { title: 'BookedIn || Authors', authors: authors });
});
*/

router.get('/form', async (req, res, next) => {
  res.render('authors/form', { title: 'BookedIn || Authors' });
});

router.post('/upsert', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body))
  Author.upsert(req.body);
  let createdOrupdated = req.body.id ? 'updated' : 'created';
  req.session.flash = {
    type: 'info',
    intro: 'Success!',
    message: `the author ${req.body.firstName} ${req.body.lastName} has been ${createdOrupdated}!`,
  };
  res.redirect(303, '/authors')
});

router.get('/edit', async (req, res, next) => {
  let authorIndex = req.query.id;
  let author = Author.get(authorIndex);
  res.render('authors/form', { title: 'BookedIn || Authors', author: author, authorIndex: authorIndex });
});

router.get('/register', async (req, res, next) => {
  if (helpers.isLoggedIn(req, res)) {
    return
  };
});

module.exports = router;