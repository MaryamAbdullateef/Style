// src/pages/ProductDetails.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ShoppingBag, ArrowLeft, MessageCircle, CheckCircle } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const brandBlue = "#0070f3";

  // Safely extract passing product data from Router state
  const product = location.state?.product;

  // Fallback protection if user navigates directly to URL without state context
  if (!product) {
    return (
      <div className="min-h-screen bg-[#020202] text-white flex flex-col items-center justify-center gap-4">
        <p className="text-sm opacity-60 uppercase tracking-widest">No Product Selected</p>
        <button onClick={() => navigate(-1)} className="px-6 py-2 border border-white/10 text-xs font-black uppercase tracking-wider">
          Go Back
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handlePlaceOrder = () => {
    // Navigates directly to your checkout or order page route configuration
    navigate("/order");
  };

  const handleMessageSeller = () => {
    const message = `Hello, I am interested in purchasing "${product.name}" (${product.category}) priced at ₦${product.price.toLocaleString()} from STYLERHUB. Is it available?`;
    const encodedMessage = encodeURIComponent(message);
    // WhatsApp redirect link setup (replace 2340000000000 with your real phone number if needed)
    window.open(`https://wa.me/2340000000000?text=${encodedMessage}`, "_blank");
  };

  return (
    <main className="min-h-screen bg-[#020202] text-white pt-28 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Back Button Action Layout */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back To Shop
        </button>

        {/* Jumia-Inspired Strategic Double-Column layout block */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 bg-[#0d0d0d] border border-white/5 rounded-3xl p-6 lg:p-10">
          
          {/* Left Column Aspect Frame: Product Media Preview */}
          <div className="md:col-span-5 lg:col-span-5">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white/5 border border-white/5">
              <img 
                src={product.img} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Column Aspect Frame: Checkout Action Management Interface */}
          <div className="md:col-span-7 lg:col-span-7 flex flex-col justify-between py-2">
            <div>
              <span style={{ color: brandBlue }} className="text-xs font-black tracking-widest uppercase">
                {product.category}
              </span>
              <h1 className="text-2xl lg:text-3xl font-black uppercase tracking-tight mt-2 mb-4 leading-tight">
                {product.name}
              </h1>
              
              <div className="border-y border-white/5 py-4 my-4">
                <p className="text-2xl font-black tracking-wide">
                  ₦{product.price.toLocaleString()}
                </p>
                <p className="text-[11px] text-emerald-400 font-bold flex items-center gap-1.5 mt-1">
                  <CheckCircle size={12} /> In Stock / Ready to Ship
                </p>
              </div>

              {/* Informative Value Highlights Box */}
              <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 my-6 space-y-2">
                <p className="text-xs font-semibold text-white/70">✔ 100% Authentic Apparel Guaranteed</p>
                <p className="text-xs font-semibold text-white/70">✔ Free returns across nationwide pickup centers</p>
              </div>
            </div>

            {/* Bottom Form Action Buttons Strip */}
            <div className="space-y-3 mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-4 text-xs font-black uppercase tracking-widest bg-transparent border border-white/20 text-white hover:bg-white hover:text-black transition-all rounded-xl flex items-center justify-center gap-2 active:scale-95"
                >
                  <ShoppingBag size={14} /> Add To Cart
                </button>

                <button
                  onClick={handlePlaceOrder}
                  className="w-full py-4 text-xs font-black uppercase tracking-widest text-white transition-all rounded-xl flex items-center justify-center gap-2 active:scale-95"
                  style={{ backgroundColor: brandBlue }}
                >
                  Buy Now / Place Order
                </button>
              </div>

              <button
                onClick={handleMessageSeller}
                className="w-full py-4 text-xs font-black uppercase tracking-widest bg-emerald-600/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-600 hover:text-white transition-all rounded-xl flex items-center justify-center gap-2"
              >
                <MessageCircle size={14} /> Message Seller on WhatsApp
              </button>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}