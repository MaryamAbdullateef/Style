import React from "react";
import { Navigate, useLocation } from "react-router-dom";

/**
 * ProtectedRoute Component
 * This acts as a "Gatekeeper" for Styler Hub checkout procedures.
 * It checks if a validated user exists inside localStorage.
 * If no user is discovered, it saves their intended destination and redirects them to /account.
 */
const ProtectedRoute = ({ children }) => {
  // Synchronized state check utilizing the unified Styler Hub user key
  const user = localStorage.getItem("styler_user");
  const location = useLocation();

  if (!user) {
    // Redirect to the account page
    // state={{ from: location }} allows us to send the user back to
    // the page they were trying to visit after they authenticate.
    return <Navigate to="/account" state={{ from: location }} replace />;
  }

  // If the user exists, render the protected element safely
  return children;
};

export default ProtectedRoute;