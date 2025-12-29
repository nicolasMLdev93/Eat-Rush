import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/home";
import About from "./pages/about";
import Login from "./pages/login";
import Cart from "./pages/cart";
import Payment from "./pages/payment";
import NotFound from "./pages/not_found";
import CategoryDetail_ID from "./pages/category_Id";
import CategoryDetail_Name from "./pages/category_Name";
import RestaurantDetail_ID from "./pages/restaurant_Id";
import RestaurantDetail_Name from "./pages/restaurant_Name";
import SearchTerms from "./pages/searchTerms";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/restaurant/:id_rest" element={<RestaurantDetail_ID />} />
        <Route path="/restaurant/name/:name_rest" element={<RestaurantDetail_Name />} />
        <Route path="/category/:id_cat" element={<CategoryDetail_ID />} />
        <Route path="/category/name/:name_cat" element={<CategoryDetail_Name />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Payment />} />
        <Route path="/search" element={<SearchTerms />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
