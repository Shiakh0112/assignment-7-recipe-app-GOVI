import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaArrowLeft, FaYoutube, FaGlobe } from "react-icons/fa";

const RecipeDetails = () => {
  const { idMeal } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
      .then((res) => setRecipe(res.data.meals[0]))
      .catch((err) => console.error(err));
  }, [idMeal]);

  if (!recipe)
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] gap-3">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 text-lg">Loading recipe...</p>
      </div>
    );

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ing && ing.trim()) ingredients.push(`${measure?.trim()} ${ing.trim()}`);
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16">
      <div className="max-w-5xl mx-auto px-4">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-amber-600 font-medium mb-6 hover:gap-3 transition-all"
        >
          <FaArrowLeft /> Back to Recipes
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          {/* Hero Image */}
          <div className="relative h-72 md:h-96">
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow">
                {recipe.strMeal}
              </h1>
              <div className="flex gap-3 mt-2 flex-wrap">
                <span className="bg-amber-500 text-white text-sm px-3 py-1 rounded-full">
                  {recipe.strCategory}
                </span>
                <span className="bg-white/20 text-white text-sm px-3 py-1 rounded-full backdrop-blur-sm">
                  🌍 {recipe.strArea}
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-10 grid md:grid-cols-3 gap-8">
            {/* Ingredients */}
            <div className="md:col-span-1">
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-amber-400 pb-2">
                🧂 Ingredients
              </h2>
              <ul className="space-y-2">
                {ingredients.map((ing, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-700 text-sm">
                    <span className="w-2 h-2 bg-amber-400 rounded-full flex-shrink-0"></span>
                    {ing}
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div className="md:col-span-2">
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-amber-400 pb-2">
                📋 Instructions
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm">
                {recipe.strInstructions}
              </p>

              <div className="flex gap-4 mt-6 flex-wrap">
                {recipe.strYoutube && (
                  <a
                    href={recipe.strYoutube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-medium transition"
                  >
                    <FaYoutube size={18} /> Watch on YouTube
                  </a>
                )}
                {recipe.strSource && (
                  <a
                    href={recipe.strSource}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-lg font-medium transition"
                  >
                    <FaGlobe size={16} /> View Source
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RecipeDetails;
