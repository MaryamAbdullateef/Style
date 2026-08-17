import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FiMail,
  FiLock,
  FiUser,
  FiEye,
  FiEyeOff,
  FiArrowLeft,
  FiLoader,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import { FaGoogle, FaApple } from "react-icons/fa";
import API from "../utils/axios";
import { useAuth } from "../context/AuthContext";

const Account = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const authContext = useAuth?.() || {};

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [welcomeName, setWelcomeName] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    newPassword: "",
    rememberMe: false,
  });

  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({ email: "", password: "" });

  const redirectTimeoutRef = useRef(null);

  // Helper to determine target path safely from location state
  const getRedirectPath = () => {
    const from = location.state?.from;
    if (!from) return "/order";
    if (typeof from === "string") return from;
    return from.pathname || "/order";
  };

  // Redirect instantly if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("userInfo") || localStorage.getItem("styler_user");
    if (token && user && !showWelcomePopup) {
      navigate(getRedirectPath(), { replace: true });
    }
  }, [navigate, location, showWelcomePopup]);

  useEffect(() => {
    return () => {
      if (redirectTimeoutRef.current) clearTimeout(redirectTimeoutRef.current);
    };
  }, []);

  const clearErrors = () => {
    setError("");
    setFieldErrors({ email: "", password: "" });
  };

  const handleToggleMode = () => {
    setIsLogin((prev) => !prev);
    clearErrors();
  };

  const handleToggleForgotPassword = (value) => {
    setIsForgotPassword(value);
    clearErrors();
    setShowPassword(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    clearErrors();
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    clearErrors();
    let isValid = true;
    const errors = { email: "", password: "" };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      errors.email = "Email address is required.";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email format. Please recheck your email.";
      isValid = false;
    }

    if (!isForgotPassword) {
      if (!formData.password) {
        errors.password = "Password is required.";
        isValid = false;
      } else if (formData.password.length < 6) {
        errors.password = "Password must be at least 6 characters.";
        isValid = false;
      }
    } else {
      if (!formData.newPassword) {
        errors.password = "New password is required.";
        isValid = false;
      } else if (formData.newPassword.length < 6) {
        errors.password = "New password must be at least 6 characters.";
        isValid = false;
      }
    }

    if (!isLogin && !isForgotPassword && !formData.name.trim()) {
      setError("Please enter your full name.");
      isValid = false;
    }

    setFieldErrors(errors);
    return isValid;
  };

  const handleAuth = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";

      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : {
            name: formData.name.trim(),
            email: formData.email,
            password: formData.password,
          };

      const response = await API.post(endpoint, payload);

      const userData = response.data?.data;
      const token = userData?.token;

      // 1. Store auth credentials locally
      if (token) {
        localStorage.setItem("token", token);
      }
      localStorage.setItem("styler_user", JSON.stringify(userData));
      localStorage.setItem("userInfo", JSON.stringify(userData));

      // 2. Sync React Auth Context if method exists
      if (typeof authContext.login === "function") {
        authContext.login(userData, token);
      } else if (typeof authContext.setUser === "function") {
        authContext.setUser(userData);
      }

      window.dispatchEvent(new Event("storage"));

      setWelcomeName(userData?.name || formData.email.split("@")[0]);
      setShowWelcomePopup(true);

      // 3. Redirect to destination or checkout order page
      redirectTimeoutRef.current = setTimeout(() => {
        const targetPath = getRedirectPath();
        navigate(targetPath, { replace: true });
      }, 1500);
    } catch (err) {
      const backendMessage =
        err.response?.data?.message || "Authentication failed.";

      const lowerMsg = backendMessage.toLowerCase();
      if (lowerMsg.includes("email") || lowerMsg.includes("user not found")) {
        setFieldErrors((prev) => ({
          ...prev,
          email: backendMessage || "Invalid email. Please recheck.",
        }));
      } else if (
        lowerMsg.includes("password") ||
        lowerMsg.includes("credential")
      ) {
        setFieldErrors((prev) => ({
          ...prev,
          password: backendMessage || "Incorrect password.",
        }));
      } else {
        setError(backendMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsLoading(true);
      await API.post("/auth/reset-password", {
        email: formData.email,
        newPassword: formData.newPassword,
      });
      alert("Password changed successfully!");
      setIsForgotPassword(false);
      setFormData((prev) => ({
        ...prev,
        password: "",
        newPassword: "",
      }));
    } catch (err) {
      const backendMessage =
        err.response?.data?.message || "Failed to reset password.";
      if (backendMessage.toLowerCase().includes("email")) {
        setFieldErrors((prev) => ({ ...prev, email: backendMessage }));
      } else {
        setError(backendMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#030712] text-white font-sans overflow-hidden relative">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
        .animate-scale-up { animation: scaleUp 0.3s ease-out forwards; }
      `}</style>

      {/* Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Welcome Modal */}
      {showWelcomePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-[#0b1329] border border-blue-500/30 p-10 rounded-3xl max-w-sm w-full mx-4 text-center shadow-2xl animate-scale-up">
            <FiCheckCircle className="text-blue-500 text-6xl mx-auto mb-4 animate-bounce" />
            <h3 className="text-2xl font-black tracking-tight mb-2">
              {isLogin ? "Welcome Back!" : "Account Created!"}
            </h3>
            <p className="text-gray-400 text-sm mb-1">
              Hello, <span className="text-white font-bold">{welcomeName}</span>
            </p>
            <p className="text-xs text-blue-400 uppercase tracking-widest mt-4 flex items-center justify-center gap-2">
              <FiLoader className="animate-spin" /> Entering Storefront
            </p>
          </div>
        </div>
      )}

      {/* Left Banner */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden border-r border-white/5">
        <img
          src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1887&auto=format&fit=crop"
          alt="Fashion Model"
          className="absolute inset-0 w-full h-full object-cover grayscale-[30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/30 to-transparent"></div>

        <div className="absolute bottom-16 left-12 z-10">
          <h1 className="text-7xl font-black tracking-tighter text-white">
            STYLER<span className="text-blue-500"> HUB</span>
          </h1>
          <p className="mt-2 text-gray-400 uppercase tracking-[0.5em] text-xs">
            Fashion Meets Luxury
          </p>
        </div>
      </div>

      {/* Right Form */}
      <div className="w-full lg:w-1/2 flex justify-center items-center relative px-6 py-12 bg-[#060b18]">
        <button
          onClick={() => navigate("/")}
          className="absolute top-8 left-8 flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-all group z-20 tracking-widest"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          GO BACK
        </button>

        <div className="relative z-10 w-full max-w-md bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-2xl p-8 md:p-10 shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-2xl"></div>

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
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-xs mb-5 text-center flex items-center justify-center gap-2">
              <FiAlertCircle />
              {error}
            </div>
          )}

          {!isForgotPassword && (
            <>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  type="button"
                  onClick={() => alert("Google Auth integration placeholder.")}
                  className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-medium hover:bg-white/10 transition-colors"
                >
                  <FaGoogle className="text-blue-400" /> Google
                </button>
                <button
                  type="button"
                  onClick={() => alert("Apple Auth integration placeholder.")}
                  className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-medium hover:bg-white/10 transition-colors"
                >
                  <FaApple className="text-white" /> Apple
                </button>
              </div>

              <div className="relative flex items-center justify-center my-4 border-b border-white/5">
                <span className="absolute bg-[#060b18] px-3 text-[10px] text-gray-500 uppercase tracking-widest">
                  Or Continue With
                </span>
              </div>
            </>
          )}

          <form
            onSubmit={isForgotPassword ? handleResetPassword : handleAuth}
            className="space-y-5 mt-6"
            noValidate
          >
            {!isLogin && !isForgotPassword && (
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  name="name"
                  required
                  autoComplete="name"
                  aria-label="Full Name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white/[0.03] border border-white/10 py-4 pl-12 pr-4 rounded-xl outline-none focus:border-blue-500/50 transition-colors text-sm text-white"
                />
              </div>
            )}

            <div>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  aria-label="Email Address"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-white/[0.03] border py-4 pl-12 pr-4 rounded-xl outline-none transition-colors text-sm text-white ${
                    fieldErrors.email
                      ? "border-red-500/80 focus:border-red-500"
                      : "border-white/10 focus:border-blue-500/50"
                  }`}
                />
              </div>
              {fieldErrors.email && (
                <p className="text-red-400 text-xs mt-1.5 ml-1 flex items-center gap-1">
                  <FiAlertCircle size={12} /> {fieldErrors.email}
                </p>
              )}
            </div>

            <div>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  name={isForgotPassword ? "newPassword" : "password"}
                  required
                  autoComplete={
                    isForgotPassword
                      ? "new-password"
                      : isLogin
                      ? "current-password"
                      : "new-password"
                  }
                  aria-label={isForgotPassword ? "New Password" : "Password"}
                  placeholder={isForgotPassword ? "New Password" : "Password"}
                  value={
                    isForgotPassword
                      ? formData.newPassword
                      : formData.password
                  }
                  onChange={handleChange}
                  className={`w-full bg-white/[0.03] border py-4 pl-12 pr-14 rounded-xl outline-none transition-colors text-sm text-white ${
                    fieldErrors.password
                      ? "border-red-500/80 focus:border-red-500"
                      : "border-white/10 focus:border-blue-500/50"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="text-red-400 text-xs mt-1.5 ml-1 flex items-center gap-1">
                  <FiAlertCircle size={12} /> {fieldErrors.password}
                </p>
              )}
            </div>

            {!isForgotPassword && (
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-gray-500 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="accent-blue-600 h-4 w-4"
                  />
                  Remember Me
                </label>
                <button
                  type="button"
                  onClick={() => handleToggleForgotPassword(true)}
                  className="text-gray-400 hover:text-blue-400 transition-all"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-xl font-bold uppercase tracking-widest bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 shadow-lg shadow-blue-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
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
                onClick={() => handleToggleForgotPassword(false)}
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
                  onClick={handleToggleMode}
                  className="ml-2 text-white font-bold hover:text-blue-400 transition underline underline-offset-4"
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