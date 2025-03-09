const genres = [
    {genre: "Science Fiction"},
    {genre: "Fantasy"},
    {genre: "Fiction"},
    {genre: "Non-Fiction"},
  ]
  
  exports.all = genres
  
  exports.add = (genre) => {
    genres.push(genre);
  }
  
  exports.get = (idx) => {
    return genres[idx];
  }
  
  exports.update = (genre) => {
    genres[genre.id] = genre;
  }
  
  exports.upsert = (genre) => {
    if (genre.id) {
      exports.update(genre);
    } else {
      exports.add(genre);
    }
  }