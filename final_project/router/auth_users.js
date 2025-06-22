const express = require('express');
const jwt = require('jsonwebtoken');
const db = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
    return users.some((user) => user.username === username);
};

const authenticatedUser = (username, password) => {
    return users.some((user) => user.username === username && user.password === password);
};

regd_users.post("/register", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
    }
    if (isValid(username)) {
        return res.status(409).json({ message: "User already exists" });
    }
    users.push({ username, password });
    return res.status(200).json({ message: "User successfully registered" });
});

//only registered users can login
regd_users.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
    }

    if (!authenticatedUser(username, password)) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    let accessToken = jwt.sign({ data: username }, 'access', { expiresIn: 3600 });
    req.session.authorization = { accessToken, username };
    return res.status(200).send("User successfully logged in");
});

// Add a book review
regd_users.put("/auth/review/:isbn", async (req, res) => {
  try {
    const book = await db.addOrUpdateReview(Number(req.params.isbn), req.session.authorization.username, req.query.review);
    res.json({ message: "Review updated", book });
  } catch {
    res.status(404).send("Book not found");
  }
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", async (req, res) => {
  try {
    const book = await db.deleteReview(Number(req.params.isbn), req.session.authorization.username);
    res.json({ message: "Review deleted", book });
  } catch (err) {
    res.status(404).send(err.message);
  }
});


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
