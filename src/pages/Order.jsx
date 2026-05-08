import React, { useState, useEffect } from "react";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  CreditCard,
  Truck,
  ShieldCheck,
  ArrowLeft,
  ChevronRight,
  Smartphone,
  Banknote,
  Lock,
} from "lucide-react";
import { Link } from "react-router-dom";

const INITIAL_CART = [
  {
    id: 1,
    name: "Elite Urban Bomber Jacket",
    price: 35000,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800",
    size: "XL",
    color: "Midnight Blue",
    qty: 1,
  },
  {
    id: 2,
    name: "Refined Silk Evening Dress",
    price: 42000,
    image: "https://images.unsplash.com/photo-1539109132314-d4a8c77ee8c8?q=80&w=800",
    size: "M",
    color: "Emerald",
    qty: 1,
  },
];

export default function Order() {
  const [cart, setCart] = useState(INITIAL_CART);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("card");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const deliveryFee = 2500;
  const total = subtotal + deliveryFee;

  if (loading)
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-20 pb-10">
      {/* Unique UI Background: Mesh Gradient */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        
        {/* --- HERO SECTION --- */}
        <div className="bg-gradient-to-br from-[#001B3D] via-[#000c1d] to-black rounded-[1.5rem] md:rounded-[2.5rem] p-8 md:p-16 mb-10 border border-white/5 shadow-2xl">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-6xl font-black italic tracking-tighter uppercase mb-4 leading-none">
              Checkout <span className="text-blue-500 underline decoration-1">Hub.</span>
            </h1>
            <p className="text-white/40 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em]">
              Premium Fashion • Fast Delivery • Secure Checkout
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          
          {/* --- LEFT: PRODUCT LIST & INFO --- */}
          <div className="lg:col-span-8 space-y-8">
            
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg md:text-xl font-black uppercase tracking-tight text-white/90">
                  Your Bag ({cart.length})
                </h2>
                <Link
                  to="/"
                  className="text-[9px] md:text-[10px] font-black text-blue-400 uppercase tracking-widest hover:text-white transition-all flex items-center gap-2"
                >
                  <ArrowLeft size={12} /> Continue Shopping
                </Link>
              </div>

              <div className="space-y-4">
                {cart.length > 0 ? (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white/5 backdrop-blur-md rounded-2xl md:rounded-[2rem] p-4 md:p-6 flex flex-row gap-4 md:gap-6 border border-white/10 transition-all hover:border-blue-500/50"
                    >
                      <div className="w-24 md:w-32 h-32 md:h-40 shrink-0">
                        <img
                          src={item.image}
                          className="w-full h-full object-cover rounded-xl"
                          alt={item.name}
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-sm md:text-lg uppercase tracking-tight leading-tight">
                              {item.name}
                            </h3>
                            <p className="text-[9px] md:text-[10px] font-bold text-white/40 uppercase mt-1 tracking-widest">
                              {item.color} • {item.size}
                            </p>
                          </div>
                          <button
                            onClick={() => setCart((c) => c.filter((i) => i.id !== item.id))}
                            className="text-white/20 hover:text-red-500 transition-colors p-1"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>

                        <div className="flex flex-wrap justify-between items-center gap-3 mt-4">
                          <div className="flex items-center bg-black/40 rounded-full p-1 border border-white/5">
                            <button
                              onClick={() => updateQty(item.id, -1)}
                              className="p-1.5 hover:text-blue-400"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="px-3 font-black text-xs">
                              {item.qty}
                            </span>
                            <button
                              onClick={() => updateQty(item.id, 1)}
                              className="p-1.5 hover:text-blue-400"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <p className="text-md md:text-xl font-black text-white italic">
                            ₦{(item.price * item.qty).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 bg-white/5 rounded-2xl border border-dashed border-white/10">
                    <p className="text-white/30 uppercase text-xs font-bold tracking-widest">Bag is empty</p>
                  </div>
                )}
              </div>
            </section>

            {/* Delivery Form */}
            <section className="bg-white/5 backdrop-blur-md rounded-[2rem] p-6 md:p-10 border border-white/10">
              <h2 className="text-lg md:text-xl font-black uppercase tracking-tight mb-8">
                Delivery Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-white/30 tracking-widest">Full Name</label>
                  <input
                    type="text"
                    className="w-full bg-black/40 border border-white/5 rounded-xl p-4 text-sm font-medium outline-none focus:border-blue-500 transition-all text-white"
                    placeholder="Enter name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-white/30 tracking-widest">Phone Number</label>
                  <input
                    type="tel"
                    className="w-full bg-black/40 border border-white/5 rounded-xl p-4 text-sm font-medium outline-none focus:border-blue-500 transition-all text-white"
                    placeholder="+234"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black uppercase text-white/30 tracking-widest">Shipping Address</label>
                  <textarea
                    rows="3"
                    className="w-full bg-black/40 border border-white/5 rounded-xl p-4 text-sm font-medium outline-none focus:border-blue-500 transition-all text-white"
                    placeholder="Full residential address"
                  />
                </div>
              </div>

              <h2 className="text-lg md:text-xl font-black uppercase tracking-tight mt-12 mb-6">
                Payment Method
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: "card", label: "Card", icon: CreditCard },
                  { id: "transfer", label: "Transfer", icon: Smartphone },
                  { id: "delivery", label: "POD", icon: Banknote },
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`flex items-center justify-center sm:justify-start gap-4 p-5 rounded-2xl border transition-all ${
                      paymentMethod === method.id 
                      ? "border-blue-600 bg-blue-600/10" 
                      : "border-white/5 bg-black/20 hover:border-white/20"
                    }`}
                  >
                    <method.icon className={paymentMethod === method.id ? "text-blue-400" : "text-white/20"} size={20} />
                    <span className={`text-[10px] font-black uppercase tracking-widest ${paymentMethod === method.id ? "text-white" : "text-white/30"}`}>
                      {method.label}
                    </span>
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* --- RIGHT: SUMMARY --- */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 bg-white text-black rounded-[2rem] p-8 md:p-10 shadow-2xl">
              <h3 className="text-md font-black uppercase tracking-[0.2em] mb-8 border-b border-black/10 pb-4 flex items-center gap-2">
                <ShoppingBag size={18} /> Summary
              </h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-black/50 text-[10px] font-black uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span className="text-black font-black">₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-black/50 text-[10px] font-black uppercase tracking-widest">
                  <span>Shipping</span>
                  <span className="text-black font-black">₦{deliveryFee.toLocaleString()}</span>
                </div>
                <div className="pt-6 border-t border-black/5 flex justify-between items-end">
                  <span className="text-[10px] font-black uppercase text-blue-600 tracking-widest">Total</span>
                  <span className="text-3xl font-black italic tracking-tighter">
                    ₦{total.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="PROMO CODE"
                    className="w-full bg-black/5 border border-black/5 rounded-xl py-4 px-5 text-[10px] font-black tracking-widest outline-none focus:border-blue-600"
                  />
                  <button className="absolute right-2 top-2 bottom-2 bg-black text-white px-4 rounded-lg text-[8px] font-black uppercase tracking-widest">
                    Apply
                  </button>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 transition-all active:scale-95">
                  Finalize Purchase <ChevronRight size={16} />
                </button>
              </div>

              <div className="mt-8 flex flex-col items-center gap-3 opacity-30">
                <div className="flex items-center gap-2">
                   <Lock size={12} />
                   <span className="text-[8px] font-black uppercase tracking-[0.2em]">Secure Checkout</span>
                </div>
              </div>
            </div>

            {/* Extra Mobile Padding */}
            <div className="h-10 lg:hidden"></div>
          </div>

        </div>
      </div>
    </div>
  );
}