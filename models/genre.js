const db = require('../database')

const genres = [
    {genre: "Science Fiction"},
    {genre: "Fantasy"},
    {genre: "Fiction"},
    {genre: "Non-Fiction"},
  ]
  
  exports.all = async () => {
   const { rows } = await db.getPool().query("select * from genres order by id");
   return db.camelize(rows);
  }
  
  /*
  exports.add = (genre) => {
    genres.push(genre);
  }
  */
  
  /*
  exports.get = (idx) => {
    return genres[idx];
  }
  */
  
  /*
  exports.update = (genre) => {
    genres[genre.id] = genre;
  }
  */
  
  /*
  exports.upsert = (genre) => {
    if (genre.id) {
      exports.update(genre);
    } else {
      exports.add(genre);
    }
  }
  */
 
  exports.get = async (id) => {
    const { rows } = await db.getPool().query("select * from genres where id = $1", [id])
    return db.camelize(rows)[0]
   }
   
   exports.create = async (name) => {
    return db.getPool().query("INSERT INTO genres(name) VALUES($1) RETURNING *", [name]);
   }
   
   exports.update = async (id, name) => {
    return db.getPool().query("UPDATE genres SET name = $1 where id = $2 RETURNING *", [name, id]);
   }
   
   exports.upsert = async (genre) => {
    if (genre.id) {
      return exports.update(genre.id, genre.name)
    }
    return exports.create(genre.name)
   }
   