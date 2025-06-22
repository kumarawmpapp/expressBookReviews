let books = [
      {"isbn" : 1, "author": "Chinua Achebe","title": "Things Fall Apart", "reviews": {} },
      {"isbn" : 2, "author": "Hans Christian Andersen","title": "Fairy tales", "reviews": {} },
      {"isbn" : 3, "author": "Dante Alighieri","title": "The Divine Comedy", "reviews": {} },
      {"isbn" : 4, "author": "Unknown","title": "The Epic Of Gilgamesh", "reviews": {} },
      {"isbn" : 5, "author": "Unknown","title": "The Book Of Job", "reviews": {} },
      {"isbn" : 6, "author": "Unknown","title": "One Thousand and One Nights", "reviews": {} },
      {"isbn" : 7, "author": "Unknown","title": "Nj\u00e1l's Saga", "reviews": {} },
      {"isbn" : 8, "author": "Jane Austen","title": "Pride and Prejudice", "reviews": {} },
      {"isbn" : 9, "author": "Honor\u00e9 de Balzac","title": "Le P\u00e8re Goriot", "reviews": {} },
      {"isbn" : 10, "author": "Samuel Beckett","title": "Molloy, Malone Dies, The Unnamable, the trilogy", "reviews": {} }
];

const dbOperations = {
  getAllBooks: () => new Promise(resolve =>
    setTimeout(() => resolve([...books]), 100)
  ),

  getBookByISBN: isbn => new Promise((resolve, reject) =>
    setTimeout(() => {
      const b = books.find(book => book.isbn === isbn);
      b ? resolve({ ...b }) : reject(new Error("Not found"));
    }, 100)
  ),

  getBooksByAuthor: author => new Promise(resolve =>
    setTimeout(() => {
      const list = books.filter(b =>
        b.author.toLowerCase().includes(author.toLowerCase()));
      resolve([...list]);
    }, 100)
  ),

  getBooksByTitle: title => new Promise(resolve =>
    setTimeout(() => {
      const list = books.filter(b =>
        b.title.toLowerCase().includes(title.toLowerCase()));
      resolve([...list]);
    }, 100)
  ),

  addOrUpdateReview: (isbn, username, review) => new Promise((resolve, reject) =>
    setTimeout(() => {
      const b = books.find(book => book.isbn === isbn);
      if (!b) return reject(new Error("Book not found"));
      b.reviews[username] = review;
      resolve({ ...b });
    }, 100)
  ),

  deleteReview: (isbn, username) => new Promise((resolve, reject) =>
    setTimeout(() => {
      const book = books.find(b => b.isbn === isbn);
      if (!book) return reject(new Error("Book not found"));
      if (!(username in book.reviews)) return reject(new Error("Review not found"));
      delete book.reviews[username];
      resolve({ ...book });
    }, 100)
  ),
};

module.exports = dbOperations;
