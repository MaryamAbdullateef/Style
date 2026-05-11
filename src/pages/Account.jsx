import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

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
        navigate("/");
      } else {
        setError(
          "Invalid credentials. Password must be at least 6 characters.",
        );
      }
      setIsLoading(false);
    }, 1500);
  };

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
    <div className="min-h-screen w-full flex bg-[#050505] text-white font-sans overflow-hidden relative">
      {/* REDUCED BACKGROUND GLOWS - Now subtle accents */}
      <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-blue-900/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-125 h-125 bg-red-900/10 blur-[120px] rounded-full"></div>

      {/* LEFT SIDE - Hero Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden border-r border-white/5">
        <img
          src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1887&auto=format&fit=crop"
          alt="Fashion Model"
          className="absolute inset-0 w-full h-full object-cover grayscale-[20%]"
        />
        {/* Cleaner Overlay - Simple fade to black */}
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent"></div>

        <div className="absolute bottom-16 left-12 z-10">
          <h1 className="text-7xl font-black tracking-tighter text-white">
            STYLER
            <span className="text-red-600"> HUB</span>
          </h1>
          <p className="mt-2 text-gray-400 uppercase tracking-[0.5em] text-xs">
            Fashion Meets Luxury
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - Form */}
      <div className="w-full lg:w-1/2 flex justify-center items-center relative px-6 py-12 bg-[#080808]">
        <button
          onClick={() => navigate("/")}
          className="absolute top-8 left-8 flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-all group z-20 tracking-widest"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          GO BACK
        </button>

        {/* CARD */}
        <div className="relative z-10 w-full max-w-md bg-white/2 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 md:p-10 shadow-2xl">
          {/* REFINED TOP ACCENT */}
          <div className="absolute top-0 left-0 w-full h-0.5 bg-red-600 rounded-t-2xl"></div>

          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              {isForgotPassword
                ? "Reset Password"
                : isLogin
                  ? "Sign In"
                  : "Register"}
            </h2>
            <p className="text-gray-500 mt-2 text-sm">
              {isForgotPassword
                ? "Securely update your credentials."
                : "Premium access to Styler Hub."}
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg text-xs mb-5 text-center">
              {error}
            </div>
          )}

          <form
            onSubmit={isForgotPassword ? handleResetPassword : handleAuth}
            className="space-y-5"
          >
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="email"
                name="email"
                required
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-white/3 border border-white/10 py-4 pl-12 pr-4 rounded-xl outline-none focus:border-red-600/50 transition-colors text-sm"
              />
            </div>

            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type={showPassword ? "text" : "password"}
                name={isForgotPassword ? "newPassword" : "password"}
                required
                placeholder={isForgotPassword ? "New Password" : "Password"}
                value={
                  isForgotPassword ? formData.newPassword : formData.password
                }
                onChange={handleChange}
                className="w-full bg-white/3 border border-white/10 py-4 pl-12 pr-14 rounded-xl outline-none focus:border-red-600/50 transition-colors text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400"
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>

            {!isForgotPassword && (
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-gray-500 cursor-pointer">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="accent-red-600 h-4 w-4"
                  />
                  Remember Me
                </label>
                <button
                  type="button"
                  onClick={() => setIsForgotPassword(true)}
                  className="text-gray-400 hover:text-red-500 transition-all"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-xl font-bold uppercase tracking-widest bg-red-600 hover:bg-red-700 text-white transition-all duration-300 shadow-lg shadow-red-900/20"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <FiLoader className="animate-spin" />
                  PROCESSING
                </span>
              ) : isForgotPassword ? (
                "Reset Password"
              ) : isLogin ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </button>

            {isForgotPassword && (
              <button
                type="button"
                onClick={() => setIsForgotPassword(false)}
                className="w-full text-center text-xs text-gray-500 hover:text-white uppercase tracking-widest transition"
              >
                Back To Login
              </button>
            )}
          </form>

          {!isForgotPassword && (
            <div className="mt-8 text-center border-t border-white/5 pt-6">
              <p className="text-gray-500 text-xs tracking-wide">
                {isLogin ? "NEW TO STYLER HUB?" : "ALREADY HAVE AN ACCOUNT?"}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-2 text-white font-bold hover:text-red-500 transition underline underline-offset-4"
                >
                  {isLogin ? "REGISTER" : "LOGIN"}
                </button>
              </p>
            </div>
          )}
        </div>

        <div className="absolute bottom-6 text-[10px] tracking-[0.5em] text-gray-700 uppercase">
          © 2026 Styler Hub Luxury
        </div>
      </div>
    </div>
  );
};

export default Account;
