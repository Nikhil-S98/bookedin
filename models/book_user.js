const books_users = [
    {bookId: "0", userEmail: "nynik98@gmail.com", status: "finished"},
    {bookId: "1", userEmail: "nynik98@gmail.com", status: "reading"},
    {bookId: "2", userEmail: "nynik98@gmail.com", status: "todo"},
    {bookId: "3", userEmail: "nynik98@gmail.com", status: "todo"}
];

exports.statuses = [
  "todo","reading","finished"
]

exports.add = (bookUser) => {
  booksUsers.push(bookUser);
}

exports.get = (bookId, userEmail) => {
  return booksUsers.find((bu) => {
    return bu.bookId === bookId && bu.userEmail === userEmail;
  })
}

exports.allForUser = (userEmail) => {
  return booksUsers.filter((bu) => {
    return bu.userEmail === userEmail;
  })
}

exports.update = (idx, bookUser) => {
  booksUsers[idx] = bookUser;
}

exports.upsert = (bookUser) => {
  let idx = booksUsers.findIndex((bu)=>{
    return bu.bookId === bookUser.bookId &&
      bu.userEmail === bookUser.userEmail;
  })
  idx < 0 ? exports.add(bookUser) : exports.update(idx, bookUser);
}
  