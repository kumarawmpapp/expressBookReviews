const express = require('express');
const db = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get("/", async (req, res) => {
  try {
    const all = await db.getAllBooks();
    res.json(all);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", async (req, res) => {
  try {
    const book = await db.getBookByISBN(Number(req.params.isbn));
    res.json(book);
  } catch {
    res.status(404).send("Book not found");
  }
});
  
// Get book details based on author
public_users.get("/author/:author", async (req, res) => {
  try {
    const books = await db.getBooksByAuthor(req.params.author);
    if (books.length === 0) {
      return res.status(404).send("No books found for that author");
    }
    res.json(books);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Get all books based on title
public_users.get("/title/:title", async (req, res) => {
  try {
    const books = await db.getBooksByTitle(req.params.title);
    if (books.length === 0) {
      return res.status(404).send("No books found with that title");
    }
    res.json(books);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

//  Get book review
public_users.get("/review/:isbn", async (req, res) => {
  try {
    const book = await db.getBookByISBN(Number(req.params.isbn));
    res.status(200).json(book.reviews || {});
  } catch {
    res.status(404).send("Book not found");
  }
});

module.exports.general = public_users;
