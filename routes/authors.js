const express = require('express');
const router = express.Router();

const helpers = require('./helpers')

const Author = require('../models/author');

router.get('/', async function(req, res, next) {
  const authors = await Author.all()
  res.render('authors/index', { title: 'BookedIn || Authors', authors: authors });
});

/*
router.get('/form', async (req, res, next) => {
  if (helpers.ForceLoggedInUser(req, res)) {
      return
  }
  res.render('authors/form', { title: 'BookedIn || Authors' });
});
*/

router.get('/form', async (req, res, next) => {
  let templateVars = { title: 'BookedIn || Authors' }
  if (req.query.id) {
    let author = await Author.get(req.query.id)
    if (author) {templateVars['author'] = author}
  }
  res.render('authors/form', templateVars);
});

/*
router.post('/upsert', async (req, res, next) => {
  if (helpers.ForceLoggedInUser(req, res)) {
    return
  }
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
  if (helpers.ForceLoggedInUser(req, res)) {
    return
  }
  let authorIndex = req.query.id;
  let author = Author.get(authorIndex);
  res.render('authors/form', { title: 'BookedIn || Authors', author: author, authorIndex: authorIndex });
});
*/

router.post('/upsert', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body))
  await Author.upsert(req.body);
  req.session.flash = {
    type: 'info',
    intro: 'Success!',
    message: 'the author has been created!',
  };
  res.redirect(303, '/authors')
 });
 
module.exports = router;