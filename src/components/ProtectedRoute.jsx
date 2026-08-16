// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * ProtectedRoute Component
 * Acts as a gatekeeper for protected Styler Hub pages (Checkout, Orders, Admin, etc.).
 * Leverages AuthContext state for real-time authentication & authorization checks.
 */
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // 1. Loading Guard: Prevents flickering redirect while checking local storage on refresh
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center font-medium">
        Verifying authentication...
      </div>
    );
  }

  // 2. Authentication Check: Redirect unauthenticated users to /account
  if (!user) {
    return <Navigate to="/account" state={{ from: location }} replace />;
  }

  // 3. Authorization Check: Restrict admin routes if user is not an admin
  if (requireAdmin && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // 4. Render protected child components when authenticated
  return children;
};

export default ProtectedRoute;