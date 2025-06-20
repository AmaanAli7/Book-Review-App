const express = require('express');
const Review = require('../models/Review');
const router = express.Router();

// GET /reviews?bookId=xxx
// GET /reviews?bookId=xxx OR ?reviewer=xxx
router.get('/', async (req, res) => {
  const { bookId, user } = req.query;
  let query = {};
  if (bookId) query.bookId = bookId;
  if (user) query.user = user;

  const reviews = await Review.find(query);
  res.json(reviews);
});


// POST /reviews
router.post('/', async (req, res) => {
  const review = new Review(req.body);
  await review.save();
  res.status(201).json(review);
});

module.exports = router;
