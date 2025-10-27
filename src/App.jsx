import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
// import Recip es from "./pages/Recipes";
import About from "./pages/About";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import RecipeDetails from "./pages/RecipeDetails";
import RequireAuth from "./components/RequireAuth";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/favorites"
            element={
              <RequireAuth>
                <Favorites />
              </RequireAuth>
            }
          />
          <Route path="/recipes/:idMeal" element={<RecipeDetails />} />{" "}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};
export default App;
