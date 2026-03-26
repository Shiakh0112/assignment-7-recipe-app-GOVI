import { useState } from "react";
import { useRecipeContext } from "../context/RecipeContext";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const ForgotPassword = () => {
  const { resetPassword } = useRecipeContext();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setError("");
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const exists = users.find((u) => u.email === email);
    if (!exists) {
      setError("No account found with this email.");
      return;
    }
    setStep(2);
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    const res = resetPassword(email, newPassword);
    if (res.success) setSuccess(true);
    else setError(res.message);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div
        className="hidden md:flex w-1/2 bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=800&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-amber-900/60" />
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <h2 className="text-4xl font-bold mb-3">Reset Password 🔑</h2>
          <p className="text-lg text-amber-100">
            Don't worry! We'll help you reset your password quickly.
          </p>
        </div>
      </div>

      {/* Right Panel */}
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
            <p className="text-gray-500 mt-2">
              {step === 1 ? "Enter your registered email" : "Set a new password"}
            </p>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 1 ? "bg-amber-500 text-white" : "bg-gray-200 text-gray-500"}`}>
              1
            </div>
            <div className={`h-1 w-16 rounded ${step === 2 ? "bg-amber-500" : "bg-gray-200"}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step === 2 ? "bg-amber-500 text-white" : "bg-gray-200 text-gray-500"}`}>
              2
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-8">
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-4"
              >
                <div className="text-6xl">✅</div>
                <h3 className="text-xl font-bold text-gray-800">Password Reset!</h3>
                <p className="text-gray-500 text-sm">
                  Your password has been updated successfully.
                </p>
                <button
                  onClick={() => navigate("/login")}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-lg transition"
                >
                  Go to Login →
                </button>
              </motion.div>
            ) : (
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.form
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    onSubmit={handleEmailSubmit}
                    className="space-y-5"
                  >
                    {error && (
                      <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg">
                        {error}
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Registered Email
                      </label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-lg transition"
                    >
                      Verify Email →
                    </button>
                    <p className="text-center text-sm text-gray-500">
                      Remember your password?{" "}
                      <Link to="/login" className="text-amber-600 font-medium hover:underline">
                        Login
                      </Link>
                    </p>
                  </motion.form>
                ) : (
                  <motion.form
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    onSubmit={handleResetSubmit}
                    className="space-y-5"
                  >
                    {error && (
                      <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg">
                        {error}
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-lg transition"
                    >
                      Reset Password ✓
                    </button>
                    <button
                      type="button"
                      onClick={() => { setStep(1); setError(""); }}
                      className="w-full text-sm text-gray-500 hover:text-amber-600 transition"
                    >
                      ← Back
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPassword;
