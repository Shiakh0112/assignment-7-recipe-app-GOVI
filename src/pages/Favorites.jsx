import { motion } from "framer-motion";
import { useRecipeContext } from "../context/RecipeContext";
import { FaTrashAlt, FaHeart } from "react-icons/fa";

const Favorites = () => {
  const { favorites, removeFromFavorites } = useRecipeContext();

  return (
    <div className="w-[90%] mx-auto mt-20 mb-16">
      {/* ❤️ Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-center text-amber-600 mb-6"
      >
        My Favorite Recipes ❤️
      </motion.h2>

      {/* 🍽️ Empty State */}
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
          <h3 className="text-2xl font-semibold text-gray-700">
            No favorites yet!
          </h3>
          <p className="text-gray-500 mt-2">
            Start adding some tasty dishes 😋
          </p>
        </motion.div>
      ) : (
        /* 🧁 Favorites Grid */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {favorites.map((meal) => (
            <motion.div
              key={meal.idMeal}
              whileHover={{ scale: 1.03 }}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full h-52 object-cover"
                />
                <button
                  onClick={() => removeFromFavorites(meal.idMeal)}
                  className="absolute top-2 right-2 bg-white text-red-500 rounded-full p-2 shadow-md hover:bg-red-500 hover:text-white transition"
                  title="Remove from Favorites"
                >
                  <FaTrashAlt size={14} />
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800 truncate">
                  {meal.strMeal}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  🍴 Delicious & Easy
                </p>

                <div className="mt-3 flex justify-between items-center">
                  <button
                    onClick={() => removeFromFavorites(meal.idMeal)}
                    className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium transition"
                  >
                    <FaHeart />
                    Remove
                  </button>

                  <a
                    href={`https://www.themealdb.com/meal/${meal.idMeal}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-600 font-medium text-sm hover:underline"
                  >
                    View Recipe →
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Favorites;
