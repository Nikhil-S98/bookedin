const db = require('../database')

exports.all = async () => {
 const { rows } = await db.getPool().query("select * from authors order by id");
 return db.camelize(rows);
}

 const authors = [
  {firstName: "James", lastName: "S. A. Corey"},
  {firstName: "Craig", lastName: "Alanson"},
  {firstName: "Cixin", lastName: "Liu"},
  {firstName: "David", lastName: "Grann"},
]

// exports.all = authors

/*
exports.add = (author) => {
  authors.push(author);
}
*/
exports.create = async (firstName, lastName) => {
  return db.getPool().query("INSERT INTO authors(first_name, last_name) VALUES($1, $2) RETURNING *", [firstName, lastName]);
} 

exports.get = async (id) => {
  const { rows } = await db.getPool().query("select * from authors where id = $1", [id])
  return db.camelize(rows)[0]
} 

/*
exports.get = (idx) => {
  return authors[idx];
}
*/

exports.update = async (id, firstName, lastName) => {
  return db.getPool().query("UPDATE authors SET first_name = $1, last_name = $2 where id = $3 RETURNING *", [firstName, lastName, id]);
 } 

exports.upsert = (author) => {
  if (author.id) {
    exports.update(author);
  } else {
    exports.create(author.firstName, author.lastName);
  }
}