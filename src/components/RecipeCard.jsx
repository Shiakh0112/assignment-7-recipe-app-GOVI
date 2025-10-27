import { useRecipeContext } from "../context/RecipeContext";
import { useNavigate } from "react-router-dom";

const RecipeCard = ({ meal }) => {
  const { addToFavorites } = useRecipeContext();
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition h-[22rem] sm:w-full flex flex-col">
      {/* Recipe Image */}
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full h-48 object-cover cursor-pointer"
        onClick={() => navigate(`/recipes/${meal.idMeal}`)} // ✅ navigate to details page
      />

      {/* Recipe Info */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h2 className="font-semibold text-gray-800 text-lg mb-1">
            {meal.strMeal}
          </h2>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Category:</span>{" "}
            {meal.strCategory || "N/A"}
          </p>
          {meal.strArea && (
            <p className="text-sm text-gray-600">
              <span className="font-medium">Origin:</span> {meal.strArea}
            </p>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={() => addToFavorites(meal)}
          className="mt-3 bg-amber-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-amber-600 transition"
        >
          ❤️ Add to Favorites
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
