import { motion } from "framer-motion";
import { FaUtensils, FaHeart, FaLeaf } from "react-icons/fa";

const About = () => {
  return (
    <div className="w-[90%] mx-auto mt-20 mb-16">
      {/* 💛 Header Section */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-amber-600 text-center mb-6"
      >
        About <span className="text-gray-800">FlavorVerse</span> 🍴
      </motion.h1>

      {/* 💬 Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-lg text-gray-700 leading-relaxed text-center max-w-3xl mx-auto"
      >
        Welcome to{" "}
        <span className="font-semibold text-amber-600">FlavorVerse</span> — your
        digital cookbook and recipe explorer! Discover new flavors, learn
        cooking techniques, and save your favorite recipes with a single tap.
        Whether you’re a beginner or a master chef, FlavorVerse helps you cook
        smarter, faster, and tastier. 🍲
      </motion.p>

      {/* 🌿 Features Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
      >
        {/* Feature 1 */}
        <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl transition-all">
          <FaUtensils size={40} className="text-amber-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-gray-800">
            Explore Global Cuisines
          </h3>
          <p className="text-gray-600">
            Discover dishes from around the world and learn their secrets
            step-by-step.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl transition-all">
          <FaHeart size={40} className="text-red-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-gray-800">
            Save Your Favorites
          </h3>
          <p className="text-gray-600">
            Keep track of your favorite recipes and access them anytime,
            anywhere.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl transition-all">
          <FaLeaf size={40} className="text-green-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-gray-800">
            Healthy & Delicious
          </h3>
          <p className="text-gray-600">
            Eat healthy without compromising taste — we’ve got you covered!
          </p>
        </div>
      </motion.div>

      {/* 👨‍🍳 Closing Message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="text-center mt-14"
      >
        <p className="text-lg text-gray-700 font-medium">
          Built with ❤️ by{" "}
          <span className="text-amber-600 font-semibold">Shaikh Ashfaq</span>
        </p>
      </motion.div>
    </div>
  );
};

export default About;
