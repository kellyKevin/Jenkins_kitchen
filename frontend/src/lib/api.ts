import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' ? '/_/backend/api/' : 'http://localhost:8000/api/'),
});

export default api;
