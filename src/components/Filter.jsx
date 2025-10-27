import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Filter = ({
  categories,
  ingredients,
  selectedCategory,
  setSelectedCategory,
  selectedIngredient,
  setSelectedIngredient,
  selectedMealType,
  setSelectedMealType,
}) => {
  const mealTypes = ["Breakfast", "Lunch", "Dinner", "Dessert"];
  const scrollRef = useRef(null);

  // 👇 Scroll handlers
  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -250, behavior: "smooth" });
  };
  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 250, behavior: "smooth" });
  };

  return (
    <div className="w-[90%] mx-auto  mb-10 flex flex-col gap-10">
      {/* 🔹 Category Filter */}
      <div className="relative">
        <h2 className="text-xl font-semibold mt-20 h-20 text-gray-700 text-center">
          Filter by Category 🍱
        </h2>

        {/* 🧭 Scrollable Category Slider */}
        <div className="relative">
          {/* 👈 Left Arrow */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-amber-500/90 hover:bg-amber-600 text-white w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full shadow-lg hover:scale-110 transition-all duration-300"
          >
            <FaChevronLeft className="text-lg md:text-xl" />
          </button>

          {/* Category Slider */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 px-12 py-3 scroll-smooth no-scrollbar h-40 snap-x snap-mandatory"
          >
            {/* All Option */}
            <div
              onClick={() => setSelectedCategory("")}
              className={`cursor-pointer min-w-[100px] flex flex-col items-center justify-center rounded-xl shadow-md transition-transform duration-300 snap-center ${
                selectedCategory === ""
                  ? "bg-amber-100 border-2 border-amber-500 scale-110"
                  : "bg-white border border-gray-200 hover:border-amber-400"
              }`}
            >
              <span className="text-2xl">🍽️</span>
              <p
                className={`mt-2 text-sm font-medium ${
                  selectedCategory === "" ? "text-amber-600" : "text-gray-600"
                }`}
              >
                All
              </p>
            </div>

            {/* Dynamic Categories */}
            {categories.map((cat) => (
              <div
                key={cat.idCategory}
                onClick={() => setSelectedCategory(cat.strCategory)}
                className={`cursor-pointer min-w-[100px] flex flex-col items-center justify-center rounded-xl shadow-md transition-transform duration-300 snap-center ${
                  selectedCategory === cat.strCategory
                    ? "bg-amber-100 border-2 border-amber-500 scale-110"
                    : "bg-white border border-gray-200 hover:border-amber-400"
                }`}
              >
                <img
                  src={cat.strCategoryThumb}
                  alt={cat.strCategory}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <p className="mt-2 text-xs text-center font-medium text-gray-700">
                  {cat.strCategory}
                </p>
              </div>
            ))}
          </div>

          {/* 👉 Right Arrow */}
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-amber-500/90 hover:bg-amber-600 text-white w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full shadow-lg hover:scale-110 transition-all duration-300"
          >
            <FaChevronRight className="text-lg md:text-xl" />
          </button>
        </div>
      </div>

      {/* 🔹 Ingredient Filter */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-700 text-center">
          Filter by Ingredient 🧂
        </h2>
        <div className="flex justify-center">
          <select
            value={selectedIngredient}
            onChange={(e) => setSelectedIngredient(e.target.value)}
            className="appearance-none bg-white border border-gray-300 text-gray-700 text-lg rounded-lg px-4 py-3 w-full md:w-1/2 shadow-sm focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all cursor-pointer hover:shadow-md"
          >
            <option value="">All Ingredients</option>
            {ingredients.map((ing) => (
              <option key={ing.idIngredient} value={ing.strIngredient}>
                {ing.strIngredient}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 🔹 Meal Type Filter */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-700 text-center">
          Filter by Meal Type 🍳
        </h2>
        <div className="flex flex-wrap gap-4 justify-center">
          {mealTypes.map((type) => (
            <button
              key={type}
              onClick={() =>
                setSelectedMealType(selectedMealType === type ? "" : type)
              }
              className={`px-5 py-2 rounded-lg text-sm font-medium border transition-all duration-300 ${
                selectedMealType === type
                  ? "bg-green-500 text-white border-green-600 shadow-md"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-green-100"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
