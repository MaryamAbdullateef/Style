import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowLeft,
  FiLoader,
} from "react-icons/fi";

const Account = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // State Management
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Forgot Password State
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    newPassword: "",
    rememberMe: false,
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const redirectCat = params.get("category");

    if (redirectCat) {
      console.log(`User redirected from: ${redirectCat}`);
    }
  }, [location]);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Login / Register
  const handleAuth = async (e) => {
    e.preventDefault();

    setError("");
    setIsLoading(true);

    setTimeout(() => {
      if (formData.email && formData.password.length >= 6) {
        const userData = {
          email: formData.email,
          token: "styler_hub_secure_token_abc123",
          name: formData.email.split("@")[0],
        };

        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("isAuthenticated", "true");

        alert("Welcome back to Styler Hub!");

        // ALWAYS GO TO HERO SECTION
        navigate("/");
      } else {
        setError(
          "Invalid credentials. Password must be at least 6 characters.",
        );
      }

      setIsLoading(false);
    }, 1500);
  };

  // Forgot Password
  const handleResetPassword = (e) => {
    e.preventDefault();

    if (
      formData.email &&
      formData.newPassword &&
      formData.newPassword.length >= 6
    ) {
      alert("Password changed successfully!");

      setIsForgotPassword(false);

      setFormData({
        email: "",
        password: "",
        newPassword: "",
        rememberMe: false,
      });
    } else {
      setError("New password must be at least 6 characters.");
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#03152b] text-white font-sans overflow-hidden relative">
      {/* BLUE BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-700/30 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-red-600/20 blur-3xl rounded-full"></div>

      {/* LEFT SIDE */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1887&auto=format&fit=crop"
          alt="Fashion Model"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#02101f]/90 via-[#03152b]/70 to-[#220202]/60"></div>

        {/* Text */}
        <div className="absolute bottom-16 left-12 z-10">
          <h1 className="text-7xl font-black tracking-tight text-white">
            STYLER
            <span className="text-red-500"> HUB</span>
          </h1>

          <p className="mt-4 text-gray-300 uppercase tracking-[0.4em] text-sm">
            Fashion Meets Luxury
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex justify-center items-center relative px-6 py-12">
        {/* GO BACK BUTTON */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-8 left-8 flex items-center gap-2 text-sm text-gray-300 hover:text-red-500 transition-all group z-20"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          GO BACK
        </button>

        {/* CARD */}
        <div className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl shadow-black/40">
          {/* TOP BORDER */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-white to-red-500 rounded-t-3xl"></div>

          {/* HEADING */}
          <div className="mb-8">
            <h2 className="text-4xl font-bold tracking-tight">
              {isForgotPassword ? (
                <>
                  Reset <span className="text-red-500">Password</span>
                </>
              ) : isLogin ? (
                <>
                  Welcome <span className="text-red-500">Back</span>
                </>
              ) : (
                <>
                  Create <span className="text-blue-400">Account</span>
                </>
              )}
            </h2>

            <p className="text-gray-400 mt-2 text-sm">
              {isForgotPassword
                ? "Create a new password for your account."
                : "Access your premium Styler Hub wardrobe."}
            </p>
          </div>

          {/* ERROR */}
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-400 p-3 rounded-xl text-sm mb-5">
              {error}
            </div>
          )}

          {/* FORGOT PASSWORD FORM */}
          {isForgotPassword ? (
            <form onSubmit={handleResetPassword} className="space-y-6">
              {/* EMAIL */}
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" />

                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-black/30 border border-gray-700 py-4 pl-12 pr-4 rounded-2xl outline-none focus:border-blue-500"
                />
              </div>

              {/* NEW PASSWORD */}
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  required
                  placeholder="New Password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="w-full bg-black/30 border border-gray-700 py-4 pl-12 pr-14 rounded-2xl outline-none focus:border-red-500"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>

              {/* RESET BUTTON */}
              <button
                type="submit"
                className="w-full py-4 rounded-2xl font-bold uppercase tracking-[0.2em] bg-gradient-to-r from-blue-600 via-white to-red-600 text-black hover:scale-[1.02] transition-all"
              >
                Reset Password
              </button>

              {/* BACK TO LOGIN */}
              <button
                type="button"
                onClick={() => setIsForgotPassword(false)}
                className="w-full text-center text-gray-400 hover:text-white transition"
              >
                Back To Login
              </button>
            </form>
          ) : (
            /* LOGIN FORM */
            <form onSubmit={handleAuth} className="space-y-6">
              {/* EMAIL */}
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" />

                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-black/30 border border-gray-700 py-4 pl-12 pr-4 rounded-2xl outline-none focus:border-blue-500"
                />
              </div>

              {/* PASSWORD */}
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-black/30 border border-gray-700 py-4 pl-12 pr-14 rounded-2xl outline-none focus:border-red-500"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>

              {/* REMEMBER */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="accent-red-500 h-4 w-4"
                  />
                  Remember Me
                </label>

                {/* FORGOT PASSWORD */}
                <button
                  type="button"
                  onClick={() => setIsForgotPassword(true)}
                  className="text-blue-400 hover:text-red-400 transition-all"
                >
                  Forgot Password?
                </button>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-2xl font-bold uppercase tracking-[0.2em] bg-gradient-to-r from-blue-600 via-white to-red-600 text-black hover:scale-[1.02] transition-all duration-300"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <FiLoader className="animate-spin" />
                    PROCESSING
                  </span>
                ) : isLogin ? (
                  "Sign In"
                ) : (
                  "Join Styler Hub"
                )}
              </button>
            </form>
          )}

          {/* TOGGLE */}
          {!isForgotPassword && (
            <div className="mt-8 text-center">
              <p className="text-gray-400 text-sm">
                {isLogin ? "DON'T HAVE AN ACCOUNT?" : "ALREADY A MEMBER?"}

                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-2 text-white font-semibold hover:text-red-500 transition"
                >
                  {isLogin ? "Register" : "Login"}
                </button>
              </p>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="absolute bottom-6 text-xs tracking-[0.3em] text-gray-500 uppercase">
          © 2026 Styler Hub
        </div>
      </div>
    </div>
  );
};

export default Account;
