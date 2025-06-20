import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUser, updateUser } from '../api/api';
import { motion } from 'framer-motion';

export default function EditProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', bio: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUser(id)
      .then(res => {
        setFormData({ name: res.data.name, bio: res.data.bio });
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load user');
        setLoading(false);
      });
  }, [id]);

  const handleChange = e =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(id, formData);
      navigate(`/users/${id}`, { replace: true });
    } catch (err) {
      console.error(err);
      setError('Failed to update profile');
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <motion.div
      className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4 text-green-700">Edit Profile</h2>

      {error && <p className="text-red-600 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="font-medium">Name:</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring focus:border-green-500"
            required
          />
        </div>

        <div>
          <label className="font-medium">Bio:</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={5}
            placeholder="Write something about yourself..."
            className="border border-gray-300 p-2 w-full rounded resize-y whitespace-pre-line focus:outline-none focus:ring focus:border-green-500"
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
        >
          Save Changes
        </button>
      </form>
    </motion.div>
  );
}
