import { Link } from 'react-router-dom';

const BookCard = ({ book }) => (
  <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 m-4 hover:shadow-lg transition duration-300 w-full max-w-md">
    <h3 className="text-xl font-semibold text-purple-700 mb-1">{book.title}</h3>
    <p className="text-gray-600 mb-4 italic">by {book.author}</p>
    
    <div className="flex flex-wrap gap-3 text-sm text-white font-medium">
      <Link
        to={`/books/${book._id}`}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition"
      >
        View Details
      </Link>
      <Link
        to={`/submit-review/${book._id}`}
        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md transition"
      >
        Add New Review
      </Link>
      <Link
        to={`/reviews?bookId=${book._id}`}
        className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md transition"
      >
         Reviews
      </Link>
    </div>
  </div>
);

export default BookCard;
