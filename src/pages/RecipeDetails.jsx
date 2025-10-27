import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const RecipeDetails = () => {
  const { idMeal } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
        );
        setRecipe(res.data.meals[0]);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    };
    fetchRecipe();
  }, [idMeal]);

  if (!recipe)
    return (
      <div className="flex justify-center items-center h-[60vh] text-lg text-gray-600">
        Loading recipe details...
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-20">
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full h-64 object-cover rounded-md mb-4"
      />
      <h2 className="text-3xl font-bold mb-2 text-amber-600">
        {recipe.strMeal}
      </h2>
      <p className="text-gray-600 mb-2">
        <strong>Category:</strong> {recipe.strCategory}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Area:</strong> {recipe.strArea}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>
          <a href={recipe.strYoutube}> Video </a>
        </strong>
      </p>
      <p className="text-gray-800 leading-relaxed mt-4 whitespace-pre-line">
        {recipe.strInstructions}
      </p>

      <button
        onClick={() => navigate(-1)}
        className="mt-6 bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600 transition"
      >
        ← Back
      </button>
    </div>
  );
};

export default RecipeDetails;
