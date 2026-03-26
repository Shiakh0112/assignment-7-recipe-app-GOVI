import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "./SearchBar";
import Filter from "./Filter";
import RecipeCard from "./RecipeCard";

const Recipes = () => {
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [selectedMealType, setSelectedMealType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const recipesPerPage = 8;

  // 🔹 Fetch categories & ingredients
  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((res) => setCategories(res.data.categories || []));
    axios
      .get("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
      .then((res) => setIngredients(res.data.meals.slice(0, 25) || []));
  }, []);

  // 🔹 Fetch meals based on search OR filters
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        let allMeals = [];

        if (searchTerm.trim()) {
          // Search API se directly fetch karo
          const res = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm.trim()}`
          );
          allMeals = res.data.meals || [];
        } else if (selectedCategory && selectedIngredient) {
          const [catRes, ingRes] = await Promise.all([
            axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`),
            axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${selectedIngredient}`),
          ]);
          const ingIds = new Set((ingRes.data.meals || []).map((m) => m.idMeal));
          allMeals = (catRes.data.meals || []).filter((m) => ingIds.has(m.idMeal));
        } else if (selectedCategory) {
          const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`);
          allMeals = res.data.meals || [];
        } else if (selectedIngredient) {
          const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${selectedIngredient}`);
          allMeals = res.data.meals || [];
        } else {
          const res = await axios.get("https://www.themealdb.com/api/json/v1/1/search.php?s=");
          allMeals = res.data.meals || [];
        }

        if (selectedMealType && !searchTerm.trim()) {
          const type = selectedMealType.toLowerCase();
          const keywords = {
            breakfast: ["bread", "egg", "toast", "pancake", "cereal"],
            lunch: ["salad", "sandwich", "rice", "wrap", "soup"],
            dinner: ["chicken", "beef", "steak", "pasta", "curry"],
            dessert: ["apam", "pie", "pudding", "chocolate", "ice"],
          };
          allMeals = allMeals.filter((meal) =>
            keywords[type]?.some((word) => meal.strMeal.toLowerCase().includes(word))
          );
        }

        setFilteredMeals(allMeals);
        setCurrentPage(1);
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };

    const debounce = setTimeout(fetchMeals, 400);
    return () => clearTimeout(debounce);
  }, [searchTerm, selectedCategory, selectedIngredient, selectedMealType]);

  // 🔹 Pagination
  const totalPages = Math.ceil(filteredMeals.length / recipesPerPage);
  const currentMeals = filteredMeals.slice(
    (currentPage - 1) * recipesPerPage,
    currentPage * recipesPerPage
  );

  return (
    <div className="mt-16">
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

      {/* 🔹 Recipes Grid */}
      <div className="w-[90%] mx-auto mt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          >
            {currentMeals.length > 0 ? (
              currentMeals.map((meal, index) => (
                <RecipeCard key={meal.idMeal} meal={meal} index={index} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-600 text-lg">
                No recipes found 🍳
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 🔹 Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-3">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className={`px-4 py-2 rounded-md border text-sm font-medium ${
              currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-amber-100 border-amber-400 text-amber-600"
            }`}
          >
            ← Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-md border text-sm font-medium ${
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
            className={`px-4 py-2 rounded-md border text-sm font-medium ${
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
