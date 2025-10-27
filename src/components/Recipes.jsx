import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "./SearchBar";
import Filter from "./Filter";
import RecipeCard from "./RecipeCard";

const Recipes = () => {
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [meals, setMeals] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [selectedMealType, setSelectedMealType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const recipesPerPage = 8; // 👈 show 8 recipes per page

  // 🔹 Fetch categories
  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((res) => setCategories(res.data.categories))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  // 🔹 Fetch ingredients list (limited for simplicity)
  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
      .then((res) => setIngredients(res.data.meals.slice(0, 20))) // just 20 for short list
      .catch((err) => console.error("Error fetching ingredients:", err));
  }, []);

  // 🔹 Fetch meals dynamically based on filters
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

        if (selectedCategory) {
          url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;
        } else if (selectedIngredient) {
          url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${selectedIngredient}`;
        } else if (selectedMealType) {
          url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedMealType}`;
        }

        const res = await axios.get(url);
        setMeals(res.data.meals || []);
        setCurrentPage(1); // reset to page 1 on filter change
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };
    fetchMeals();
  }, [selectedCategory, selectedIngredient, selectedMealType]);

  // 🔹 Filter by search term
  const filteredMeals = meals?.filter((meal) =>
    meal.strMeal.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🧮 Pagination logic
  const totalPages = Math.ceil(filteredMeals?.length / recipesPerPage);
  const startIndex = (currentPage - 1) * recipesPerPage;
  const currentMeals = filteredMeals?.slice(
    startIndex,
    startIndex + recipesPerPage
  );

  // ✨ Animation for smooth transitions
  const pageVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -40, transition: { duration: 0.3 } },
  };

  return (
    <div className="mt-16">
      {/* 🔹 Search & Filter */}
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Filter
        categories={categories}
        ingredients={ingredients}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedIngredient={selectedIngredient}
        setSelectedIngredient={setSelectedIngredient}
        selectedMealType={selectedMealType}
        setSelectedMealType={setSelectedMealType}
      />

      {/* 🔹 Recipe Grid with Animation */}
      <div className="w-[90%] mx-auto mt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          >
            {currentMeals?.map((meal, index) => (
              <RecipeCard key={meal.idMeal} meal={meal} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 🔹 Pagination Buttons */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-3">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className={`px-4 py-2 rounded-md border text-sm font-medium transition ${
              currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-amber-100 border-amber-400 text-amber-600"
            }`}
          >
            ← Prev
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => {
                setCurrentPage(i + 1);
                window.scrollTo({ top: 0, behavior: "smooth" }); // scroll up
              }}
              className={`px-4 py-2 rounded-md border text-sm font-medium transition ${
                currentPage === i + 1
                  ? "bg-amber-500 text-white border-amber-600"
                  : "bg-white hover:bg-amber-100 border-gray-300 text-gray-700"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className={`px-4 py-2 rounded-md border text-sm font-medium transition ${
              currentPage === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-amber-100 border-amber-400 text-amber-600"
            }`}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default Recipes;
