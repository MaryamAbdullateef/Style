import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiLoader } from "react-icons/fi";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const location = useLocation();
  const authContext = useAuth?.() || {};

  // Check token from context or fallback to localStorage directly
  const token = authContext.token || localStorage.getItem("token");
  const user = authContext.user || JSON.parse(localStorage.getItem("userInfo") || "null");

  // Show loading spinner if auth state is initializing
  if (authContext.loading) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center text-white">
        <FiLoader className="animate-spin text-3xl text-blue-500" />
      </div>
    );
  }

  // Redirect to login if user is not authenticated
  if (!token || !user) {
    return <Navigate to="/account" state={{ from: location }} replace />;
  }

  // Optional: Check role authorization
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;