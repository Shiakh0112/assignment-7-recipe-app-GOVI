import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaBars, FaTimes } from "react-icons/fa";
import { useRecipeContext } from "../context/RecipeContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout, favorites } = useRecipeContext();
  const navigate = useNavigate();

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-amber-500 text-white px-6 py-4 flex justify-between items-center shadow-md fixed top-0 left-0 w-full z-50">
      <Link to="/" className="text-2xl font-bold tracking-wide">
        Recipe<span className="text-gray-900">Hub</span>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-8 text-lg font-medium">
        <Link to="/" className="hover:text-gray-900 transition-colors">Home</Link>
        <Link to="/about" className="hover:text-gray-900 transition-colors">About</Link>
        <Link to="/contact" className="hover:text-gray-900 transition-colors">Contact</Link>
      </div>

      {/* Desktop Icons / Auth */}
      <div className="hidden md:flex items-center space-x-5 text-lg font-medium">
        <Link to="/favorites" className="relative hover:text-gray-900">
          <FaHeart size={22} />
          {favorites.length > 0 && (
            <span className="absolute -top-2 -right-3 bg-white text-amber-600 text-xs px-1 rounded-full">
              {favorites.length}
            </span>
          )}
        </Link>
        {!user ? (
          <>
            <Link to="/login" className="hover:text-gray-900">Login</Link>
            <Link to="/signup" className="bg-white text-amber-600 px-4 py-1 rounded-md hover:bg-gray-100 transition-colors">
              Signup
            </Link>
          </>
        ) : (
          <button
            onClick={() => { logout(); navigate("/"); }}
            className="bg-white text-amber-600 px-3 py-1 rounded-md hover:bg-gray-100 transition"
          >
            Logout
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-amber-500 text-white flex flex-col items-center space-y-6 py-6 shadow-lg md:hidden z-40">
          <Link to="/" onClick={closeMenu} className="hover:text-gray-900 text-lg">Home</Link>
          <Link to="/about" onClick={closeMenu} className="hover:text-gray-900 text-lg">About</Link>
          <Link to="/contact" onClick={closeMenu} className="hover:text-gray-900 text-lg">Contact</Link>
          <Link to="/favorites" onClick={closeMenu} className="relative hover:text-gray-900">
            <FaHeart size={22} />
            {favorites.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-white text-amber-600 text-xs px-1 rounded-full">
                {favorites.length}
              </span>
            )}
          </Link>
          {!user ? (
            <>
              <Link to="/login" onClick={closeMenu} className="hover:text-gray-900 text-lg">Login</Link>
              <Link to="/signup" onClick={closeMenu} className="bg-white text-amber-600 px-4 py-1 rounded-md hover:bg-gray-100 text-lg">
                Signup
              </Link>
            </>
          ) : (
            <button
              onClick={() => { logout(); navigate("/"); closeMenu(); }}
              className="bg-white text-amber-600 px-3 py-1 rounded-md"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
