const express = require('express');
const router = express.Router();

const Genre = require('../models/genre');

const helpers = require('./helpers');

router.get('/', async (req, res, next) => {
  let genres = await Genre.all();
  res.render('genres/index', { title: 'BookedIn || Genres', genres: genres });
});

/*
router.get('/form', async (req, res, next) => {
  res.render('genres/form', { title: 'BookedIn || Genres' });
});

router.post('/upsert', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body))
  Genre.upsert(req.body);
  let createdOrupdated = req.body.id ? 'updated' : 'created';
  req.session.flash = {
    type: 'info',
    intro: 'Success!',
    message: `the genre ${req.body.genre} has been ${createdOrupdated}!`,
  };
  res.redirect(303, '/genres')
});

router.get('/edit', async (req, res, next) => {
  let genreIndex = req.query.id;
  let genre = Genre.get(genreIndex);
  res.render('genres/form', { title: 'BookedIn || Genres', genre: genre, genreIndex: genreIndex });
});
*/

router.get('/form', async (req, res, next) => {
  let templateVars = { title: 'BookedIn || Genres' }
  if (req.query.id) {
    let genre = await Genre.get(req.query.id)
    if (genre) {templateVars['genre'] = genre}
  }
  res.render('genres/form', templateVars);
 });
 
 router.post('/upsert', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body))
  await Genre.upsert(req.body);
  req.session.flash = {
    type: 'info',
    intro: 'Success!',
    message: 'the genre has been created!',
  };
  res.redirect(303, '/genres')
 });
 

router.get('/register', async (req, res, next) => {
  if (helpers.isLoggedIn(req, res)) {
    return
  };
});

module.exports = router;