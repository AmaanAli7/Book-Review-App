import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

export default function AllReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [page, setPage] = useState(1);
  const [params] = useSearchParams();
  const bookId = params.get("bookId");

  const reviewsPerPage = 5;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const url = bookId
          ? `http://localhost:5000/reviews?bookId=${bookId}`
          : `http://localhost:5000/reviews`;
        const res = await axios.get(url);
        setReviews(res.data);
      } catch (err) {
        console.error("Fetch error:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [bookId]);

  const filtered = ratingFilter
    ? reviews.filter((r) => r.rating >= ratingFilter)
    : reviews;

  const paginated = filtered.slice(
    (page - 1) * reviewsPerPage,
    page * reviewsPerPage
  );

  const totalPages = Math.ceil(filtered.length / reviewsPerPage);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">All Reviews</h2>

      {/* Filter dropdown */}
      <div className="mb-4 flex items-center gap-4">
        <label className="font-medium">Filter by rating:</label>
        <select
          className="border p-2 rounded"
          value={ratingFilter}
          onChange={(e) => {
            setRatingFilter(Number(e.target.value));
            setPage(1);
          }}
        >
          <option value={0}>All</option>
          <option value={5}>5★</option>
          <option value={4}>4★+</option>
          <option value={3}>3★+</option>
        </select>
      </div>

      {/* Loading / No results */}
      {loading ? (
        <p className="text-gray-600">Loading reviews...</p>
      ) : paginated.length === 0 ? (
        <p className="text-gray-600">No reviews found.</p>
      ) : (
        paginated.map((r) => (
          <motion.div
            key={r._id}
            className="border p-4 rounded mb-3 shadow-sm bg-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="font-semibold text-lg text-blue-700">
              {r.user || "Anonymous"}
            </p>
            <p className="text-gray-700">{r.comment}</p>
            <p className="text-yellow-500 font-medium">⭐ {r.rating}</p>
          </motion.div>
        ))
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-3">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-3 font-semibold">Page {page}</span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
