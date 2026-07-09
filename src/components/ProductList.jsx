// src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import API from '../api';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get('/products');
        // Ensure data exists and fallback to an empty array if needed
        setProducts(data?.data || []); 
      } catch (err) {
        // Fallback to sample data for testing if server is empty or errors out
        console.warn("Server error caught, using placeholder items.");
        setProducts([
          { _id: '1', name: 'Premium Black Hoodie', price: 89, image: 'https://via.placeholder.com/280x350' },
          { _id: '2', name: 'Classic Streetwear Cargo', price: 120, image: 'https://via.placeholder.com/280x350' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="text-white text-center py-10">Loading outfits...</div>;

  return (
    <div className="p-10 bg-black text-white">
      <h2 className="text-2xl font-bold mb-6 text-white">Explore Our Collection</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="border border-zinc-8xl p-4 rounded-lg bg-zinc-900 text-center">
            <img src={product.image} alt={product.name} className="w-full h-[280px] object-cover rounded" />
            <h3 className="mt-3 text-lg font-medium text-white">{product.name}</h3>
            <p className="text-gray-400 font-semibold">${product.price}</p>
            <button className="mt-3 w-full bg-white text-black py-2 rounded font-medium hover:bg-gray-200 transition">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;