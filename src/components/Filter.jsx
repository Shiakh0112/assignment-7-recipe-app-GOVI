import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";

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

  // 🎬 Animation variants
  const sectionVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const cardVariant = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.05, duration: 0.3 },
    }),
  };

  return (
    <motion.div
      className="w-[90%] mx-auto mb-10 flex flex-col gap-10"
      initial="hidden"
      animate="visible"
    >
      {/* 🔹 Category Filter */}
      <motion.div variants={sectionVariant}>
        <h2 className="text-xl font-semibold mt-20 text-gray-700 text-center">
          Filter by Category 🍱
        </h2>

        <div className="relative">
          {/* 👈 Left Arrow */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-amber-500/90 hover:bg-amber-600 text-white w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full shadow-lg hover:scale-110 transition-all duration-300"
          >
            <FaChevronLeft className="text-lg md:text-xl" />
          </motion.button>

          {/* Category Slider */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 px-12 py-3 scroll-smooth no-scrollbar h-40 snap-x snap-mandatory"
          >
            {/* All Option */}
            <motion.div
              custom={0}
              variants={cardVariant}
              onClick={() => setSelectedCategory("")}
              className={`cursor-pointer min-w-[100px] flex flex-col items-center justify-center rounded-xl shadow-md transition-transform duration-300 snap-center ${
                selectedCategory === ""
                  ? "bg-amber-100 border-2 border-amber-500 scale-110"
                  : "bg-white border border-gray-200 hover:border-amber-400"
              }`}
              whileHover={{ scale: 1.1 }}
            >
              <span className="text-2xl">🍽️</span>
              <p
                className={`mt-2 text-sm font-medium ${
                  selectedCategory === "" ? "text-amber-600" : "text-gray-600"
                }`}
              >
                All
              </p>
            </motion.div>

            {/* Dynamic Categories */}
            {categories.map((cat, i) => (
              <motion.div
                key={cat.idCategory}
                custom={i + 1}
                variants={cardVariant}
                whileHover={{ scale: 1.1 }}
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
              </motion.div>
            ))}
          </div>

          {/* 👉 Right Arrow */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-amber-500/90 hover:bg-amber-600 text-white w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full shadow-lg hover:scale-110 transition-all duration-300"
          >
            <FaChevronRight className="text-lg md:text-xl" />
          </motion.button>
        </div>
      </motion.div>

      {/* 🔹 Ingredient Filter */}
      <motion.div variants={sectionVariant}>
        <h2 className="text-xl font-semibold mb-4 text-gray-700 text-center">
          Filter by Ingredient 🧂
        </h2>
        <motion.div
          className="flex justify-center"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
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
        </motion.div>
      </motion.div>

      {/* 🔹 Meal Type Filter */}
      <motion.div variants={sectionVariant}>
        <h2 className="text-xl font-semibold mb-4 text-gray-700 text-center">
          Filter by Meal Type 🍳
        </h2>
        <div className="flex flex-wrap gap-4 justify-center">
          {mealTypes.map((type, i) => (
            <motion.button
              key={type}
              custom={i}
              variants={cardVariant}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
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
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Filter;
