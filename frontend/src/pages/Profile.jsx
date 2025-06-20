import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchUser } from '../api/api';
import { motion } from 'framer-motion';

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(id)
      .then(res => {
        setUser(res.data);
      })
      .catch(err => console.error(err));
  }, [id]);

  if (!user) return <p>Loading user profile...</p>;

  return (
    <motion.div
      className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        className="text-3xl font-bold mb-4 text-blue-700"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        Profile: {user.name}
      </motion.h2>

      <motion.p
        className="text-gray-700 mb-4 whitespace-pre-line" // ✅ Preserves line breaks
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <strong>Bio:</strong> {user.bio || "No bio available."}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <h3 className="text-lg font-semibold mb-2">Edit Profile?</h3>
        <p className="mb-4">Update your profile information below:</p>
        <Link
          to={`/users/${id}/edit`}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Edit Profile
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Profile;
