import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/home";
import About from "./pages/about";
import RestaurantDetail from "./pages/restaurant_detail";
import CategoryDetail from "./pages/category_detail";
import Login from "./pages/login";
import Cart from "./pages/cart";
import Payment from "./pages/payment";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About/>} />
        <Route path="/restaurant" element={<RestaurantDetail/>} />
        <Route path="/category" element={<CategoryDetail/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/payment" element={<Payment/>} />
      </Route>
    </Routes>
  );
}

export default App;
