import { useRecipeContext } from "../context/RecipeContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const RecipeCard = ({ meal, index }) => {
  const { addToFavorites } = useRecipeContext();
  const navigate = useNavigate();

  // ✨ Card animation variants
  const cardVariant = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <motion.div
      custom={index}
      variants={cardVariant}
      initial="hidden"
      animate="visible"
      whileHover={{
        scale: 1.03,
        boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
      }}
      transition={{ duration: 0.3 }}
      className="bg-white shadow-md rounded-lg overflow-hidden h-[22rem] sm:w-full flex flex-col cursor-pointer"
    >
      {/* 🖼️ Recipe Image */}
      <motion.img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full h-48 object-cover"
        onClick={() => navigate(`/recipes/${meal.idMeal}`)}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      />

      {/* 📜 Recipe Info */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h2 className="font-semibold text-gray-800 text-lg mb-1 line-clamp-1">
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

        {/* ❤️ Favorite Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{
            backgroundColor: "#f59e0b",
            boxShadow: "0px 6px 15px rgba(245, 158, 11, 0.4)",
          }}
          transition={{ duration: 0.3 }}
          onClick={() => addToFavorites(meal)}
          className="mt-3 bg-amber-500 text-white px-3 py-1 rounded-lg text-sm transition"
        >
          ❤️ Add to Favorites
        </motion.button>
      </div>
    </motion.div>
  );
};

export default RecipeCard;
