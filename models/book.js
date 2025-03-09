const books = [
  {title: "Leviathan Wakes", publishingYear: 2011, authorIds: ["0","1"], genreIds: "0"},
  {title: "Caliban’s War", publishingYear: 2012, genreId: "0"}
];

exports.all = books

exports.get = (idx) => {
  return books[idx];
}

exports.add = (book) => {
  books.push(book);
}

exports.update = (book) => {
  books[book.id] = book;
}

exports.upsert = (book) => {
  if (book.authorIds && ! Array.isArray(book.authorIds)) {
    book.authorIds = [book.authorIds];
  }
  if (!book.genreId) {
    book.genreId = "";
  }
  if (book.id) {
    exports.update(book);
  } else {
    exports.add(book);
  }
}