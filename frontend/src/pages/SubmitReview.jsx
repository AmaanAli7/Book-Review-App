import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function SubmitReview() {
  const { id } = useParams(); // bookId
  const [review, setReview] = useState({
    user: "", // ✅ fixed from reviewer -> user
    comment: "",
    rating: 1
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/reviews`, {
        ...review,
        bookId: id
      });
      setMessage("✅ Review submitted!");
      setIsError(false);
      setReview({ user: "", comment: "", rating: 1 });
    } catch (err) {
      console.error("Submit error:", err);
      setMessage("⚠️ Failed to submit review.");
      setIsError(true);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded shadow mt-8 space-y-4"
    >
      <h2 className="text-2xl font-bold text-gray-700">Submit Review</h2>

      {message && (
        <p className={`text-sm ${isError ? "text-red-500" : "text-green-600"}`}>
          {message}
        </p>
      )}

      <input
        type="text"
        placeholder="Your Name"
        className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        value={review.user}
        onChange={(e) => setReview({ ...review, user: e.target.value })}
        required
      />

      <textarea
        placeholder="Your Review"
        rows="4"
        className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        value={review.comment}
        onChange={(e) => setReview({ ...review, comment: e.target.value })}
        required
      />

      <div>
        <label className="text-gray-700">Rating (1 to 5):</label>
        <input
          type="number"
          min="1"
          max="5"
          className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-yellow-400 mt-1"
          value={review.rating}
          onChange={(e) =>
            setReview({ ...review, rating: Number(e.target.value) })
          }
          required
        />
      </div>

      <button
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
