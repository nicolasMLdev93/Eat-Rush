import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./app_bar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Layout;
