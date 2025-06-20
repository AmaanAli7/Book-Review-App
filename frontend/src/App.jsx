// src/App.jsx
import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Books from './pages/Books';
import BookDetail from './pages/BookDetail';
import Profile from './pages/Profile';
import AddBook from './pages/AddBook';
import AllReviews from './pages/AllReviews';
import SubmitReview from './pages/SubmitReview';
import EditProfile from './pages/EditProfile';

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen font-sans bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 text-gray-800 transition-all duration-500 ease-in-out">

      {/* Navbar */}
      <header className="bg-white shadow-lg sticky top-0 z-50 transition-all duration-500">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between animate-fade-in-down">
          <h1 className="text-xl md:text-2xl font-bold text-purple-700 transition hover:scale-105 duration-300">
            📚 BookHaven
          </h1>
          <nav className="space-x-3 text-sm md:text-base">
            <Link to="/" className={`hover:text-purple-600 transition font-medium ${location.pathname === "/" ? "text-purple-600 underline underline-offset-4" : ""}`}>
              Home
            </Link>
            <Link to="/books" className={`hover:text-purple-600 transition font-medium ${location.pathname.includes("/books") && !location.pathname.includes("submit-review") ? "text-purple-600 underline underline-offset-4" : ""}`}>
              Books
            </Link>
            <Link to="/add-book" className={`hover:text-purple-600 transition font-medium ${location.pathname === "/add-book" ? "text-purple-600 underline underline-offset-4" : ""}`}>
              Add Book
            </Link>
            <Link to="/reviews" className={`hover:text-purple-600 transition font-medium ${location.pathname === "/reviews" ? "text-purple-600 underline underline-offset-4" : ""}`}>
              All Reviews
            </Link>
            <Link to="/users/1" className={`hover:text-purple-600 transition font-medium ${location.pathname.includes("/users/1") ? "text-purple-600 underline underline-offset-4" : ""}`}>
              Profile
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 md:px-8 py-8 animate-fade-in-up">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/users/:id" element={<Profile />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/submit-review/:id" element={<SubmitReview />} />
          <Route path="/reviews" element={<AllReviews />} />
          <Route path="/users/:id/edit" element={<EditProfile />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-white text-center text-sm text-gray-500 py-4 border-t mt-auto">
        &copy; {new Date().getFullYear()} Book Review Platform. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
