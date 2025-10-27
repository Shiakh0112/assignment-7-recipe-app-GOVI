import { useState, useEffect } from "react";
import axios from "axios";
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
        setMeals(res.data.meals);
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
      <div className="grid w-[90%] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 m-auto justify-center items-center gap-5">
        {filteredMeals?.map((meal) => (
          <RecipeCard key={meal.idMeal} meal={meal} />
        ))}
      </div>
    </div>
  );
};

export default Recipes;
