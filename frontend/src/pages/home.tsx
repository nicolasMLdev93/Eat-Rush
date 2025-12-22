import React from "react";
import Hero from "../components/hero";
import Footer from "../components/footer";
import { useEffect } from "react";

const Home: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  return (
    <div>
      <Hero />
      <Footer />
    </div>
  );
};

export default Home;
