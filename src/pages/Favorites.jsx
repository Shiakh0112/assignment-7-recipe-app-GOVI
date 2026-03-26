import { motion } from "framer-motion";
import { useRecipeContext } from "../context/RecipeContext";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";

const Favorites = () => {
  const { favorites, removeFromFavorites } = useRecipeContext();
  const navigate = useNavigate();

  return (
    <div className="w-[90%] mx-auto mt-24 mb-16">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-center text-amber-600 mb-2"
      >
        My Favorite Recipes ❤️
      </motion.h2>
      <p className="text-center text-gray-500 mb-10">
        {favorites.length} recipe{favorites.length !== 1 ? "s" : ""} saved
      </p>

      {favorites.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-16"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/857/857681.png"
            alt="Empty Plate"
            className="w-36 mx-auto mb-4 opacity-80"
          />
          <h3 className="text-2xl font-semibold text-gray-700">No favorites yet!</h3>
          <p className="text-gray-500 mt-2">Start adding some tasty dishes 😋</p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg transition"
          >
            Browse Recipes
          </button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {favorites.map((meal, i) => (
            <motion.div
              key={meal.idMeal}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative">
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full h-48 object-cover cursor-pointer"
                  onClick={() => navigate(`/recipes/${meal.idMeal}`)}
                />
                <button
                  onClick={() => removeFromFavorites(meal.idMeal)}
                  className="absolute top-2 right-2 bg-white text-red-500 rounded-full p-2 shadow-md hover:bg-red-500 hover:text-white transition"
                  title="Remove from Favorites"
                >
                  <FaTrashAlt size={13} />
                </button>
              </div>

              <div className="p-4 flex flex-col flex-1 justify-between">
                <h3 className="font-semibold text-gray-800 truncate mb-1">
                  {meal.strMeal}
                </h3>
                {meal.strCategory && (
                  <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full w-fit mb-3">
                    {meal.strCategory}
                  </span>
                )}
                <button
                  onClick={() => navigate(`/recipes/${meal.idMeal}`)}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white text-sm py-2 rounded-lg transition font-medium"
                >
                  View Recipe →
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Favorites;
