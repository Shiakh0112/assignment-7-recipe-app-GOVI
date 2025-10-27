import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useRecipeContext } from "../context/RecipeContext";

const RequireAuth = ({ children }) => {
  const { user } = useRecipeContext();
  const location = useLocation();

  if (!user) {
    // redirect to login, preserve original location so we can come back
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
