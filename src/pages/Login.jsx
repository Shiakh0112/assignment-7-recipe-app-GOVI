import { useState } from "react";
import { useRecipeContext } from "../context/RecipeContext";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useRecipeContext();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const res = login(email, password);
    if (res.success) navigate("/");
    else setError(res.message);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left - Image Panel */}
      <div
        className="hidden md:flex w-1/2 bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=800&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-amber-900/60" />
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <h2 className="text-4xl font-bold mb-3">Welcome Back! 👋</h2>
          <p className="text-lg text-amber-100">
            Log in to access your saved recipes and favorites.
          </p>
        </div>
      </div>

      {/* Right - Form Panel */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Recipe<span className="text-amber-500">Hub</span>
            </h1>
            <p className="text-gray-500 mt-2">Sign in to your account</p>
          </div>

          <form
            onSubmit={handleLogin}
            className="bg-white shadow-lg rounded-2xl p-8 space-y-5"
          >
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="text-right">
              <Link to="/forgot-password" className="text-sm text-amber-500 hover:underline">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-md"
            >
              Login →
            </button>

            <p className="text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link to="/signup" className="text-amber-600 font-medium hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
