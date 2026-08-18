// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../utils/axios';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('userInfo');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Failed to parse stored user data:', error);
      localStorage.removeItem('userInfo');
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    // Ensure email and password are provided as valid strings before sending
    const cleanEmail = typeof email === 'string' ? email.trim() : '';
    const cleanPassword = typeof password === 'string' ? password : '';

    if (!cleanEmail || !cleanPassword) {
      throw new Error('Please provide both email and password.');
    }

    const response = await API.post('/auth/login', { 
      email: cleanEmail, 
      password: cleanPassword 
    });
    
    const userData = response.data?.data || response.data;

    setUser(userData);
    localStorage.setItem('userInfo', JSON.stringify(userData));
    if (userData?.token) {
      localStorage.setItem('token', userData.token);
    }
    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userInfo');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};