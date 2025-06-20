import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 font-sans text-gray-800">

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center justify-center text-center px-4 py-20 md:py-32"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-purple-800 mb-4">
          Welcome to the HUB📚
        </h2>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mb-8">
          Dive into your favorite reads, rate them, and discover what others are saying.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              to="/add-book"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full shadow-lg transition duration-300"
            >
              ➕ Add Your New Book 
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              to="/books"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg transition duration-300"
            >
              📚 Browse Books
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Explore External Resources */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="max-w-4xl mx-auto px-4 py-12"
      >
        <h3 className="text-2xl font-bold text-center text-purple-700 mb-6">📖 Explore More Books Online</h3>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {[
            {
              name: "Google Books",
              url: "https://books.google.com",
              description: "Explore millions of books with previews, reviews, and more.",
            },
            {
              name: "Goodreads",
              url: "https://www.goodreads.com",
              description: "Read reviews, track your reading, and join book clubs.",
            },
            {
              name: "Book Riot",
              url: "https://bookriot.com",
              description: "Stay updated with new releases and book recommendations.",
            },
          ].map((site) => (
            <motion.a
              key={site.name}
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="block bg-white border border-gray-200 rounded-xl p-5 shadow-md hover:shadow-lg transition"
            >
              <h4 className="text-lg font-semibold text-purple-700 mb-2">{site.name}</h4>
              <p className="text-sm text-gray-600">{site.description}</p>
            </motion.a>
          ))}
        </div>
      </motion.div>

     
    </div>
  );
};

export default Home;
