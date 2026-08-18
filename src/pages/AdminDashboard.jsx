// src/pages/AdminDashboard.jsx
import React, { useState } from 'react';
import API from '../utils/axios';

export default function AdminDashboard() {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    category: 'Men',
    countInStock: '',
  });

  const [message, setMessage] = useState({ type: '', text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });

    // Basic Validation Check
    if (!product.name || !product.price || !product.image) {
      setMessage({ type: 'error', text: 'CRITICAL ATTENTION: Please fill out all required fields.' });
      setIsSubmitting(false);
      return;
    }

    try {
      // Sends data straight to your Express backend API
      await API.post('/products', {
        ...product,
        price: Number(product.price),
        countInStock: Number(product.countInStock || 0),
      });

      setMessage({ type: 'success', text: '🟢 Success! Product added to database instantly.' });
      // Reset form fields upon successful creation
      setProduct({ name: '', price: '', description: '', image: '', category: 'Men', countInStock: '' });
    } catch (error) {
      if (!error.response) {
        setMessage({ 
          type: 'error', 
          text: 'CONNECTION ERROR: Could not reach the backend server. Verify port 5000 is active.' 
        });
      } else {
        setMessage({ 
          type: 'error', 
          text: error.response.data?.message || `SYSTEM ERROR: Responded with status ${error.response.status}` 
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 font-sans">
      {/* Top Navigation Header bar */}
      <div className="flex justify-between items-center border-b border-zinc-800 pb-4 mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">
          STYLERSHUB <span className="text-[#0070f3]">ADMIN PORTAL</span>
        </h1>
        {/* Live System Status indicator Badge */}
        <div className="flex items-center space-x-2 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
          </span>
          <span className="text-xs font-semibold text-zinc-400">DATABASE ACTIVE</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Creation Input Section Form */}
        <div className="lg:col-span-2 bg-zinc-950 border border-zinc-900 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-6 border-l-4 border-[#0070f3] pl-3">Upload New Collection Item</h2>
          
          {message.text && (
            <div className={`p-4 rounded-lg mb-6 font-medium text-sm border ${
              message.type === 'error' 
                ? 'bg-red-950/30 border-red-800 text-red-400' 
                : 'bg-zinc-900 border-zinc-800 text-[#0070f3]'
            }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-zinc-400 mb-2">Product Title *</label>
                <input type="text" name="name" value={product.name} onChange={handleChange} placeholder="e.g. Vintage Leather Jacket" className="w-full bg-zinc-900 border border-zinc-800 rounded px-4 py-2.5 text-white focus:outline-none focus:border-[#0070f3] transition" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-zinc-400 mb-2">Price ($ USD) *</label>
                <input type="number" name="price" value={product.price} onChange={handleChange} placeholder="120" className="w-full bg-zinc-900 border border-zinc-800 rounded px-4 py-2.5 text-white focus:outline-none focus:border-[#0070f3] transition" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-zinc-400 mb-2">Cloudinary/Direct Image URL *</label>
              <input type="text" name="image" value={product.image} onChange={handleChange} placeholder="https://images.unsplash.com/..." className="w-full bg-zinc-900 border border-zinc-800 rounded px-4 py-2.5 text-white focus:outline-none focus:border-[#0070f3] transition" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-zinc-400 mb-2">Category Segment</label>
                <select name="category" value={product.category} onChange={handleChange} className="w-full bg-zinc-900 border border-zinc-800 rounded px-4 py-2.5 text-white focus:outline-none focus:border-[#0070f3] transition">
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kids">Kids</option>
                  <option value="New">New Arrival</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-zinc-400 mb-2">Initial Stock Capacity</label>
                <input type="number" name="countInStock" value={product.countInStock} onChange={handleChange} placeholder="15" className="w-full bg-zinc-900 border border-zinc-800 rounded px-4 py-2.5 text-white focus:outline-none focus:border-[#0070f3] transition" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-zinc-400 mb-2">Item Description</label>
              <textarea name="description" value={product.description} onChange={handleChange} rows="4" placeholder="Describe the materials, tailoring details, fit profiles..." className="w-full bg-zinc-900 border border-zinc-800 rounded px-4 py-2.5 text-white focus:outline-none focus:border-[#0070f3] transition resize-none"></textarea>
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full bg-[#0070f3] text-white font-bold py-3 px-6 rounded hover:bg-blue-600 transition tracking-wide uppercase text-sm disabled:opacity-50">
              {isSubmitting ? 'Pushing Data To Cluster...' : 'Publish Product to Storefront'}
            </button>
          </form>
        </div>

        {/* Live UI Mock Preview Dashboard Display */}
        <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-6 border-l-4 border-zinc-700 pl-3 text-zinc-400">Card Preview</h2>
            <div className="border border-zinc-800 rounded-lg p-4 bg-zinc-900/50 text-center">
              <div className="w-full h-64 bg-zinc-900 rounded flex items-center justify-center overflow-hidden mb-4 border border-zinc-800">
                {product.image ? (
                  <img src={product.image} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-zinc-600 text-sm italic">No Image Linked Yet</span>
                )}
              </div>
              <h3 className="text-lg font-semibold text-white truncate">{product.name || 'Untitled Premium Piece'}</h3>
              <p className="text-[#0070f3] font-bold mt-1">${product.price || '0.00'}</p>
              <span className="inline-block bg-zinc-800 text-xs px-2.5 py-0.5 rounded-full mt-2 text-zinc-400 uppercase font-mono tracking-widest">{product.category}</span>
            </div>
          </div>
          <div className="mt-6 border-t border-zinc-900 pt-4 text-xs text-zinc-500 text-center">
            StylerHub Management Engine V1.0.0
          </div>
        </div>
      </div>
    </div>
  );
}