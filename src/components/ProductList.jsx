// src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import API from '../utils/axios'; // Ensure path points to your custom Axios instance

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get('/products');
        // Handles both direct array response or { status: 'success', data: [...] } structure
        setProducts(data?.data || data || []); 
      } catch (err) {
        console.warn("Server error caught, using placeholder items:", err);
        setProducts([
          { _id: '1', name: 'Premium Black Hoodie', price: 89, image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500', tags: ['black', 'hoodie', 'premium', 'streetwear'] },
          { _id: '2', name: 'Classic Streetwear Cargo', price: 120, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500', tags: ['cargo', 'pants', 'streetwear', 'classic'] },
          { _id: '3', name: 'White Basic Top', price: 45, image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500', tags: ['white', 'basic', 'top', 'shirt', 'women'] }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products dynamically based on search keywords passed down via routing state
  useEffect(() => {
    const rawKeyword = location.state?.filterKeyword;
    if (rawKeyword && typeof rawKeyword === 'string') {
      const keyword = rawKeyword.toLowerCase().trim();
      const filtered = products.filter(product => {
        const nameMatch = product.name?.toLowerCase().includes(keyword);
        const tagMatch = product.tags?.some(tag => tag.toLowerCase().includes(keyword));
        return nameMatch || tagMatch;
      });
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [products, location.state]);

  if (loading) return <div className="text-white text-center py-10 font-medium">Loading outfits...</div>;

  return (
    <div className="p-10 bg-black text-white min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-white">
        {location.state?.filterKeyword ? `Results for "${location.state.filterKeyword}"` : "Explore Our Collection"}
      </h2>
      
      {filteredProducts.length === 0 ? (
        <div className="text-gray-500 py-12 text-center text-sm uppercase tracking-wider">
          No matching items discovered. Explore our broader catalog!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div 
              key={product._id} 
              className="border border-zinc-800 p-4 rounded-lg bg-zinc-900 text-center flex flex-col justify-between"
            >
              <div>
                <img 
                  src={product.image || product.imageUrl || 'https://via.placeholder.com/500'} 
                  alt={product.name} 
                  className="w-full h-[280px] object-cover rounded" 
                />
                <h3 className="mt-3 text-lg font-medium text-white">{product.name}</h3>
                <p className="text-gray-400 font-semibold mt-1">${product.price}</p>
              </div>
              <button 
                onClick={() => navigate(`/product/${product._id}`)}
                className="mt-4 w-full bg-white text-black py-2 rounded font-medium hover:bg-blue-600 hover:text-white transition cursor-pointer"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;