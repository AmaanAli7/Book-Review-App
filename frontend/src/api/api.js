// src/api/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000'
});

export const fetchBooks = () => API.get('/books');
export const fetchBook = (id) => API.get(`/books/${id}`);
export const fetchReviews = (bookId) => API.get(`/reviews?bookId=${bookId}`);
export const postReview = (review) => API.post('/reviews', review);
export const fetchUser = (id) => API.get(`/users/${id}`);
export const updateUser = (id, data) => API.put(`/users/${id}`, data);
