import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-16">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Left Section */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-semibold text-white tracking-wide">
            Recipe<span className="text-amber-500">Hub</span>
          </h2>
          <p className="text-sm mt-2 text-gray-400">
            Discover, cook, and enjoy delicious meals every day 🍳
          </p>
        </div>

        {/* Middle Links */}
        <div className="flex gap-6 text-sm">
          <Link
            to="/"
            className="hover:text-amber-400 transition-colors duration-200"
          >
            Home
          </Link>
          
          <Link
            to="/"
            className="hover:text-amber-400 transition-colors duration-200"
          >
            About
          </Link>
          <Link
            to="/"
            className="hover:text-amber-400 transition-colors duration-200"
          >
            Contact
          </Link>
        </div>

        {/* Right Section - Socials */}
        <div className="flex gap-4">
          <a
            href="#"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-amber-500 transition-colors duration-200"
          >
            <FaFacebookF size={18} />
          </a>
          <a
            href="#"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-amber-500 transition-colors duration-200"
          >
            <FaInstagram size={18} />
          </a>
          <a
            href="#"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-amber-500 transition-colors duration-200"
          >
            <FaTwitter size={18} />
          </a>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} RecipeHub — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
