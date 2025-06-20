import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function AddBook() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    description: "",
    rating: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/books", formData);
      alert("✅ Book added successfully!");
      navigate("/books");
    } catch (error) {
      console.error("Error adding book:", error);
      alert("❌ Failed to add book");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-tr from-yellow-50 via-white to-indigo-100 flex items-center justify-center px-4 py-10 font-[Poppins]"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="bg-white border border-purple-200 shadow-2xl rounded-3xl w-full max-w-xl p-8 relative"
      >
        {/* Decorative Sticker */}
        <div className="absolute -top-5 -right-5 text-6xl animate-pulse">📘</div>

        <h2 className="text-4xl font-bold text-center text-indigo-700 mb-6 tracking-tight">
          ✍️ Add a New Book
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5 text-gray-700">
          <motion.input
            whileFocus={{ scale: 1.02 }}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            type="text"
            name="title"
            placeholder="📖 Book Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <motion.input
            whileFocus={{ scale: 1.02 }}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            type="text"
            name="author"
            placeholder="✍️ Author Name"
            value={formData.author}
            onChange={handleChange}
            required
          />
          <motion.input
            whileFocus={{ scale: 1.02 }}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            type="text"
            name="genre"
            placeholder="🎭 Genre (optional)"
            value={formData.genre}
            onChange={handleChange}
          />
          <motion.textarea
            whileFocus={{ scale: 1.02 }}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            name="description"
            placeholder="📝 Short Description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
          />
          <motion.input
            whileFocus={{ scale: 1.02 }}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            type="number"
            name="rating"
            placeholder="⭐ Rating (0 to 5)"
            value={formData.rating}
            onChange={handleChange}
            min="0"
            max="5"
            required
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-300"
          >
            🚀 Add Book
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}
