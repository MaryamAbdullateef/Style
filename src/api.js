// src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // Crucial for sending cookies/tokens securely
});

// Automatically inject JWT token into headers if it exists in local storage
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo')).token 
    : null;
    
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;