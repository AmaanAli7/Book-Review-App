const express = require('express');
const router = express.Router();

// Mock user for now
const users = [
  { id: '1', name: 'Amaan Ali', bio: 'I love books!' },
  { id: '2', name: 'Guest User', bio: 'Exploring books.' }
];

// GET /users/:id
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  user ? res.json(user) : res.status(404).send('User not found');
});

// PUT /users/:id
router.put('/:id', (req, res) => {
  const index = users.findIndex(u => u.id == req.params.id);
  if (index !== -1) {
    users[index] = { ...users[index], ...req.body };
    res.json(users[index]);
  } else res.status(404).send('User not found');
});

module.exports = router;
