import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Main.css";

const Main = () => {
  return (
    <div className="app-wrapper">
      <Navbar />

      <div className="main-content">
      </div>

      <Footer />
    </div>
  );
};

export default Main;
