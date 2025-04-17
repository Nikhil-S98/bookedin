const express = require('express');
const Book = require('../models/book');
const Author = require('../models/author');
const Genre = require('../models/genre');
const router = express.Router();
const helpers = require('./helpers');
const BookUser = require('../models/book_user');
const Comment = require('../models/comment')

router.get('/', function(req, res, next) {
  const books = Book.all
  res.render('books/index', { title: 'BookedIn || books', books: books });
});

router.get('/form', async (req, res, next) => {
  res.render('books/form', { title: 'BookedIn || Books', authors: Author.all, genres: Genre.all });
});

router.post('/upsert', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body))
  Book.upsert(req.body);
  let createdOrupdated = req.body.id ? 'updated' : 'created';
  req.session.flash = {
    type: 'info',
    intro: 'Success!',
    message: `the book ${req.body.title} has been ${createdOrupdated}!`,
  };
  res.redirect(303, '/books')
});

router.get('/edit', async (req, res, next) => {
  let bookIndex = req.query.id;
  let book = Book.get(bookIndex);
  res.render('books/form', {
    title: 'BookedIn || Books',
    book: book,
    bookIndex: bookIndex,
    authors: Author.all,
    genres: Genre.all
  });
});

router.get('/show/:id', async (req, res, next) => {
  let templateVars = {
    title: 'BookedIn || Books',
    book: Book.get(req.params.id),
    bookId: req.params.id,
    statuses: BookUser.statuses,
    comments: Comment.AllForBook(req.params.id)
  }
  /*
  if (templateVars.book.authorIds) {
    templateVars['authors'] = templateVars.book.authorIds.map((authorId) => Author.get(authorId));
  }
  */
  if (templateVars.book.genreId) {
    templateVars['genre'] = Genre.get(templateVars.book.genreId);
  }
  if (req.session.currentUser) {
    templateVars['bookUser'] = BookUser.get(req.params.id, req.session.currentUser.email);
  }
  res.render('books/show', templateVars);
});

router.post('/comment', (req, res, next) => {
  if (!req.session.currentUser) {
    req.session.flash = {
      type: 'danger',
      intro: 'Error!',
      message: 'You must be logged in to leave a comment.',
    };
    return res.redirect(303, '/books/show/' + req.body.bookId);
  }
  const comment = {
    bookId: req.body.bookId,
    userEmail: req.session.currentUser.email,
    text: req.body.text
  }
  Comment.add(comment)
  req.session.flash = {
    type: 'success',
    intro: 'Success!',
    message: 'Your comment has been added.',
  };
  res.redirect(303, '/books/show/' + req.body.bookId);
});

router.get('/comment/edit/:id', (req, res, next) => {
  const comment = Comment.get(req.params.id);
  
  // Check if comment exists
  if (!comment) {
    req.session.flash = {
      type: 'danger',
      intro: 'Error!',
      message: 'Comment not found.',
    };
    return res.redirect(303, '/books');
  }
  if (!req.session.currentUser || comment.userEmail !== req.session.currentUser.email) {
    req.session.flash = {
      type: 'danger',
      intro: 'Error!',
      message: 'You can only edit your own comments.',
    };
    return res.redirect(303, '/books/show/' + comment.bookId);
  }
  res.render('books/comment-edit', {
    title: 'BookedIn || Edit Comment',
    comment: comment,
    bookId: comment.bookId
  });
});

router.post('/comment/update', (req, res, next) => {
  const comment = Comment.get(req.body.id);
  if (!comment) {
    req.session.flash = {
      type: 'danger',
      intro: 'Error!',
      message: 'Comment not found.',
    };
    return res.redirect(303, '/books');
  }
  if (!req.session.currentUser || comment.userEmail !== req.session.currentUser.email) {
    req.session.flash = {
      type: 'danger',
      intro: 'Error!',
      message: 'You can only edit your own comments.',
    };
    return res.redirect(303, '/books/show/' + comment.bookId);
  }
  comment.text = req.body.text;
  Comment.update(comment);
  req.session.flash = {
    type: 'success',
    intro: 'Success!',
    message: 'Your comment has been updated.',
  };
  res.redirect(303, '/books/show/' + comment.bookId);
});

module.exports = router;