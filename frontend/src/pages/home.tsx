import React from "react";
import Hero from "../components/hero";
import "../styles/home.css";

const Home: React.FC = () => {
  return (
    <div className="home_container">
      <Hero />
    </div>
  );
};

export default Home;
