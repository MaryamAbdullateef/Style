import React, { useState, useEffect } from "react";
import {
  Plus,
  Minus,
  ShoppingBag,
  ChevronRight,
  Lock,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [cart, setCart] = useState(INITIAL_CART);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Auth State
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("activeUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [authMode, setAuthMode] = useState("signup");
  const [authForm, setAuthForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  
  const [deliveryForm, setDeliveryForm] = useState({
    fullName: "",
    phone: "",
    address: "",
  });

  // Sync state and handle navigation
  useEffect(() => {
    if (user) {
      setDeliveryForm((prev) => ({ ...prev, fullName: user.name || "" }));
      // Ensure the URL is correctly at /order if user is logged in
      navigate("/order");
    }
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [user, navigate]);

  const handleAuthAction = (e) => {
    if (e) e.preventDefault();

    if (!authForm.email || !authForm.password) return;

    const authenticatedUser = {
      name: authMode === "signup" ? authForm.name : authForm.email.split("@")[0],
      email: authForm.email,
    };

    // Save to localStorage (Fake Backend)
    localStorage.setItem("activeUser", JSON.stringify(authenticatedUser));
    
    // Update state - this triggers the useEffect above to navigate to /order
    setUser(authenticatedUser);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleInputChange = (e) => {
    setAuthForm({ ...authForm, [e.target.name]: e.target.value });
  };

  const handleDeliveryChange = (e) => {
    setDeliveryForm({ ...deliveryForm, [e.target.name]: e.target.value });
  };

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  };

  const finalizeOrder = () => {
    if (!deliveryForm.fullName || !deliveryForm.phone || !deliveryForm.address) return;
    setOrderSuccess(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const deliveryFee = 2500;
  const total = subtotal + deliveryFee;

  if (loading)
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Header Hero */}
        <div className="bg-linear-to-br from-[#001B3D] to-black rounded-3xl p-8 md:p-12 mb-10 border border-white/5 shadow-2xl">
          <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">
            Checkout{" "}
            <span className="text-blue-500 underline decoration-1">Hub.</span>
          </h1>
          {user && !orderSuccess && (
            <p className="mt-4 text-blue-400 font-bold uppercase text-[10px] tracking-widest animate-pulse">
              Logged in as: {user.name || user.email}
            </p>
          )}
        </div>

        {orderSuccess ? (
          <div className="max-w-2xl mx-auto text-center py-20 bg-white/5 rounded-4xl border border-white/10">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="text-white" size={40} />
            </div>
            <h2 className="text-3xl font-black uppercase mb-4">Order Received!</h2>
            <p className="text-white/60 mb-8 px-10">
              Thank you for shopping with Styler Hub. Your order is being processed.
            </p>
            <Link
              to="/"
              className="inline-block bg-blue-600 px-10 py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-blue-700 transition-all"
            >
              Return Home
            </Link>
          </div>
        ) : !user ? (
          /* AUTH SECTION */
          <div className="max-w-md mx-auto bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-2xl">
            <h2 className="text-xl font-black uppercase mb-6 tracking-tight">
              {authMode === "signup" ? "Create Account" : "Welcome Back"}
            </h2>
            <form onSubmit={handleAuthAction} className="space-y-4">
              {authMode === "signup" && (
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Full Name"
                  value={authForm.name}
                  onChange={handleInputChange}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-blue-500 transition-all"
                />
              )}
              <input
                type="email"
                name="email"
                required
                placeholder="Email Address"
                value={authForm.email}
                onChange={handleInputChange}
                className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-blue-500 transition-all"
              />
              <input
                type="password"
                name="password"
                required
                placeholder="Password"
                value={authForm.password}
                onChange={handleInputChange}
                className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-blue-500 transition-all"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all active:scale-95"
              >
                {authMode === "signup" ? "Register & Checkout" : "Login & Checkout"}
              </button>
              <button
                type="button"
                onClick={() => setAuthMode(authMode === "signup" ? "login" : "signup")}
                className="w-full text-[9px] font-bold text-white/30 uppercase tracking-[0.2em] hover:text-white transition-colors"
              >
                {authMode === "signup" ? "Already have an account? Login" : "Need an account? Register"}
              </button>
            </form>
          </div>
        ) : (
          /* ORDER FORM SECTION */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              <section className="bg-white/5 rounded-3xl p-6 md:p-10 border border-white/10">
                <h2 className="text-xl font-black uppercase mb-8 tracking-tight">Delivery Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-white/30 tracking-widest">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={deliveryForm.fullName}
                      onChange={handleDeliveryChange}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-white/30 tracking-widest">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={deliveryForm.phone}
                      onChange={handleDeliveryChange}
                      placeholder="+234"
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-black uppercase text-white/30 tracking-widest">Shipping Address</label>
                    <textarea
                      name="address"
                      value={deliveryForm.address}
                      onChange={handleDeliveryChange}
                      placeholder="Street, House Number, City, State"
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-blue-500"
                      rows="3"
                    />
                  </div>
                </div>

                <h2 className="text-xl font-black uppercase mt-12 mb-6 tracking-tight">Payment Method</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {["card", "transfer", "delivery"].map((m) => (
                    <button
                      key={m}
                      onClick={() => setPaymentMethod(m)}
                      className={`py-4 rounded-xl border font-black uppercase text-[10px] tracking-widest transition-all ${
                        paymentMethod === m
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "border-white/5 bg-black/20 text-white/30"
                      }`}
                    >
                      {m === "delivery" ? "Pay on Delivery" : m}
                    </button>
                  ))}
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-black uppercase tracking-tight">Review Items ({cart.length})</h2>
                {cart.map((item) => (
                  <div key={item.id} className="bg-white/5 rounded-2xl p-4 flex gap-4 md:gap-6 border border-white/10">
                    <img src={item.image} className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-xl" alt={item.name} />
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <h3 className="font-bold uppercase text-[12px] md:text-sm">{item.name}</h3>
                        <p className="text-[10px] font-bold text-white/30 uppercase">{item.color} • {item.size}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 bg-black/40 px-2 py-1 rounded-lg border border-white/5">
                          <button onClick={() => updateQty(item.id, -1)}><Minus size={14} /></button>
                          <span className="text-xs font-black w-4 text-center">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)}><Plus size={14} /></button>
                        </div>
                        <p className="font-black italic text-md md:text-lg text-blue-500">
                          ₦{(item.price * item.qty).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </section>
            </div>

            <div className="lg:col-span-4 mt-8 lg:mt-0">
              <div className="sticky top-24 bg-white text-black rounded-3xl p-6 md:p-8 shadow-2xl">
                <h3 className="font-black uppercase mb-6 border-b border-black/10 pb-4 tracking-widest text-xs">Summary</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-[10px] font-bold uppercase opacity-50">
                    <span>Subtotal</span>
                    <span>₦{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-bold uppercase opacity-50">
                    <span>Shipping</span>
                    <span>₦{deliveryFee.toLocaleString()}</span>
                  </div>
                  <div className="pt-6 border-t border-black/5 flex justify-between items-end">
                    <span className="text-[10px] font-black text-blue-600 uppercase">Total Pay</span>
                    <span className="text-2xl md:text-4xl font-black italic">₦{total.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={finalizeOrder}
                  disabled={!deliveryForm.address || !deliveryForm.phone}
                  className={`w-full py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all flex items-center justify-center gap-2 ${
                    deliveryForm.address && deliveryForm.phone
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Confirm Order <ChevronRight size={16} />
                </button>

                <div className="mt-6 flex items-center justify-center gap-2 opacity-20">
                  <Lock size={12} />
                  <span className="text-[8px] font-black uppercase tracking-widest">Secure Checkout</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}