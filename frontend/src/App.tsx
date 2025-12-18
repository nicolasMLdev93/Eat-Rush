import { Routes, Route } from "react-router-dom";
import About from "./pages/about";
import Home from "./pages/home";
import Restaurants from "./pages/restaurants";
import Restaurant_detail from "./pages/restaurant_detail";
import Categories from "./pages/categories";
import Category_detail from "./pages/category_detail";
import NotFound from "./pages/not_found";
import Terms_privacy from "./pages/terms_privacy";
import "./App.css";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurants" element={<Restaurants />} />
      <Route path="/restaurants/:slug-:id?" element={<Restaurant_detail />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/categories/:slug-:id?" element={<Category_detail />} />
      <Route path="/about" element={<About />} />
      <Route path="/terms" element={<Terms_privacy />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
