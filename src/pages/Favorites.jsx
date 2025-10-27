import { useRecipeContext } from "../context/RecipeContext";

const Favorites = () => {
  const { favorites, removeFromFavorites } = useRecipeContext();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">My Favorites ❤️</h2>

      {favorites.length === 0 ? (
        <p className="text-gray-500 text-lg font-medium text-center mt-10">
          🍽️ No favorite recipes yet! <br />
          <span className="text-sm text-gray-400">
            Start adding some tasty dishes 😋
          </span>
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {favorites.map((meal) => (
            <div
              key={meal.idMeal}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-48 object-cover"
              />
              <div className="p-3 flex justify-between items-center">
                <h2 className="font-semibold">{meal.strMeal}</h2>
                <button
                  onClick={() => removeFromFavorites(meal.idMeal)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm"
                >
                  ❌
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
