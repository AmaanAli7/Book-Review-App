import React, { useEffect, useState } from 'react';
import { fetchBooks } from '../api/api';
import BookCard from '../components/BookCard';
import { motion } from 'framer-motion';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRating, setFilterRating] = useState(0);
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    fetchBooks()
      .then(res => {
        setBooks(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    let filtered = books;

    // Search
    if (searchQuery.trim() !== '') {
      const lower = searchQuery.toLowerCase();
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(lower) ||
        book.author.toLowerCase().includes(lower)
      );
    }

    // Filter by Rating
    if (filterRating > 0) {
      filtered = filtered.filter(book => Math.floor(book.rating) === filterRating);
    }

    setFilteredBooks(filtered);
  }, [searchQuery, filterRating, books]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-100 py-10 px-4"
    >
      {/* Page Title */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">📚 Book Collection</h2>
        <p className="text-gray-600 text-lg">Search and filter books by title, author, or rating</p>
      </div>

      {/* Search and Filter Panel */}
      <div className="max-w-4xl mx-auto mb-8 flex flex-col sm:flex-row justify-between items-center gap-4 px-4">
        <input
          type="text"
          placeholder="🔍 Search by title or author..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-2/3 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <select
          value={filterRating}
          onChange={(e) => setFilterRating(Number(e.target.value))}
          className="w-full sm:w-1/3 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="0">Filter by Rating</option>
          <option value="5">⭐️⭐️⭐️⭐️⭐️</option>
          <option value="4">⭐️⭐️⭐️⭐️</option>
          <option value="3">⭐️⭐️⭐️</option>
          <option value="2">⭐️⭐️</option>
          <option value="1">⭐️</option>
        </select>
      </div>

      {/* Book List */}
      <div className="flex flex-wrap justify-center gap-6 px-4">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book, index) => (
            <motion.div
              key={book._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <BookCard book={book} />
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-10">No books match your criteria.</p>
        )}
      </div>
    </motion.div>
  );
};

export default Books;
