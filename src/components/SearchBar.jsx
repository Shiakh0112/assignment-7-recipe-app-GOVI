import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative">
      {/* 🌄 Banner Section */}
      <div className="relative h-[60vh] w-full bg-[url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1500&q=80')] bg-cover bg-center bg-no-repeat flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 pointer-events-none"></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center p-6"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-3 drop-shadow-lg">
            Welcome to <span className="text-green-400">RecipeHub 🍴</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-200">
            Discover, cook, and save your favorite meals effortlessly.
          </p>
        </motion.div>
      </div>

      {/* 🔍 Floating Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute left-1/2 bottom-[-2.5rem] transform -translate-x-1/2 w-full flex justify-center z-20"
      >
        <div className="bg-white shadow-2xl rounded-2xl p-3 w-[90%] sm:w-[70%] md:w-[50%] flex items-center border border-gray-200">
          <FaSearch className="text-gray-400 text-xl ml-2 mr-3" />
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-2 py-2 text-gray-700 border-none outline-none focus:ring-0"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default SearchBar;
