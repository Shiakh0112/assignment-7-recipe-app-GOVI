import { useState } from "react";
import { useRecipeContext } from "../context/RecipeContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useRecipeContext();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    const res = signup(email, password);
    if (res.success) navigate("/");
    else setError(res.message);
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <form
        onSubmit={handleSignup}
        className="bg-white shadow-md rounded-lg p-6 w-80"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="bg-amber-500 text-white w-full py-2 rounded">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
