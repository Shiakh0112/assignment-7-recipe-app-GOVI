import { createContext, useContext, useState, useEffect } from "react";
import Signup from "./../pages/Signup";

const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("favorites");
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error("Error parsing favorites from localStorage:", error);
      localStorage.removeItem("favorites"); // clear corrupted data
      return [];
    }
  });

  // 🔹 User Auth
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);
  const addToFavorites = (recipe) => {
    if (!user)
      return {
        success: false,
        message: "You must be logged in to add favorites",
      };

    if (!favorites.some((r) => r.idMeal === recipe.idMeal)) {
      setFavorites((prev) => [...prev, recipe]);
    }
    return { success: true };
  };

  const removeFromFavorites = (id) => {
    setFavorites((prev) => prev.filter((r) => r.idMeal !== id));
  };
  // 🔹 Auth Functions
  const signup = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const exists = users.find((u) => u.email === email);
    if (exists) return { success: false, message: "User already exists" };

    const newUser = { email, password };
    localStorage.setItem("users", JSON.stringify([...users, newUser]));
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
    return { success: true };
  };
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const found = users.find(
      (u) => u.email === email && u.password === password
    );
    if (found) {
      localStorage.setItem("user", JSON.stringify(found));
      setUser(found);
      return { success: true };
    }
    return { success: false, message: "Invalid credentials" };
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };
  return (
    <RecipeContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        user,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipeContext = () => useContext(RecipeContext);
