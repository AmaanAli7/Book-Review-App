import { useState } from 'react';

const ReviewForm = ({ onSubmit }) => {
  const [user, setUser] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user || !comment) return alert("All fields required");
    onSubmit({ user, comment, rating });
    setUser('');
    setComment('');
    setRating(5);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md mt-4 space-y-4">
      <h3 className="text-xl font-semibold text-gray-700 mb-2">📝 Submit Your Review</h3>

      <div>
        <input
          type="text"
          placeholder="Your name"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <div>
        <textarea
          placeholder="Your review"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <div className="flex items-center space-x-2">
        <label className="text-gray-700 font-medium">Rating:</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="px-3 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          {[5, 4, 3, 2, 1].map(num => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Submit
      </button>
    </form>
  );
};

export default ReviewForm;
