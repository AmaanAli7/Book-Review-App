const mongoose = require('mongoose');
const Book = require('./models/Book'); // Adjust the path as needed
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

const books = [
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Classic',
    rating: 4.2,
    description: 'A novel about the decline of the American Dream in the 1920s.'
  },
  {
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopian',
    rating: 4.6,
    description: 'A chilling vision of a totalitarian regime and the power of surveillance.'
  }
];

async function seedDB() {
  await Book.deleteMany({});
  await Book.insertMany(books);
  console.log('Database seeded!');
  mongoose.connection.close();
}

seedDB();
