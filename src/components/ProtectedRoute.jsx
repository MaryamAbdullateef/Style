import React from "react";
import { Navigate, useLocation } from "react-router-dom";

/**
 * ProtectedRoute Component
 * This acts as a "Gatekeeper" for Styler Hub.
 * It checks if a user exists in localStorage.
 * If no user is found, it redirects them to the /account page.
 */
const ProtectedRoute = ({ children }) => {
  // Check if user is logged in by looking for the key in localStorage
  const user = localStorage.getItem("styler_user");
  const location = useLocation();

  if (!user) {
    // Redirect to the account page
    // state={{ from: location }} allows us to send the user back to
    // the page they were trying to visit after they log in.
    return <Navigate to="/account" state={{ from: location }} replace />;
  }

  // If the user exists, render the children (the Order or Cart page)
  return children;
};

export default ProtectedRoute;
