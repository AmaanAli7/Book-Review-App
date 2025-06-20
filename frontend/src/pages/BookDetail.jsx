import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBook, fetchReviews, postReview } from '../api/api';
import ReviewForm from '../components/ReviewForm';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);

  const getData = async () => {
    try {
      const bookRes = await fetchBook(id);
      setBook(bookRes.data);

      const reviewRes = await fetchReviews(id);
      setReviews(reviewRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  const handleReviewSubmit = async (reviewData) => {
    try {
      await postReview({ ...reviewData, bookId: id });
      getData(); // Refresh reviews
    } catch (err) {
      console.error(err);
    }
  };

  if (!book) return <p className="text-center py-8">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-3xl font-bold text-blue-800 mb-2">{book.title}</h2>
        <p className="text-gray-700 mb-1"><span className="font-semibold">Author:</span> {book.author}</p>
        <p className="text-gray-600 italic">{book.genre}</p>
        <p className="mt-4 text-gray-800">{book.description}</p>
      </div>

      <div className="bg-gray-100 rounded-lg p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">📋 Reviews</h3>

        {reviews.length === 0 ? (
          <p className="text-gray-500 mb-4">No reviews yet. Be the first to write one!</p>
        ) : (
          reviews.map((r, i) => (
            <div key={i} className="bg-white p-4 rounded mb-4 shadow-sm">
              <p className="text-gray-800 font-medium">{r.user} <span className="text-yellow-500">⭐ {r.rating}</span></p>
              <p className="text-gray-700">{r.comment}</p>
            </div>
          ))
        )}

        <h4 className="text-xl font-bold mt-8 mb-2 text-blue-700">➕ Add Your Review</h4>
        <ReviewForm onSubmit={handleReviewSubmit} />
      </div>
    </div>
  );
};

export default BookDetail;
