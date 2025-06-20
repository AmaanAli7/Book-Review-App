const express = require('express');
const Book = require('../models/Book');
const router = express.Router();

// GET /books
router.get('/', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// GET /books/:id
router.get('/:id', async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.json(book);
});

// POST /books (Admin only - skip auth for now)
// server/routes/books.js or wherever you handle books
router.post('/', async (req, res) => {
  try {
    const { title, author, genre, description, rating } = req.body;
    const newBook = new Book({ title, author, genre, description, rating });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create book' });
  }
});
 
router.get('/seed', async (req, res) => {
  const books = await Book.find();
  if (books.length === 0) {
    await Book.create([
      {
        title: "The Alchemist",
        author: "Paulo Coelho",
        genre: "Fiction",
        description: "A philosophical novel about a shepherd on a journey.",
        rating: 4.7
      }
    ]);
    res.send("Books seeded.");
  } else {
    res.send("Books already exist.");
  }
});


module.exports = router;
