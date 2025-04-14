import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import Button from "../Button/Button";
import { Categories } from "../../Models/Categories";
import { Search, Menu, ChevronDown, Plus } from "lucide-react";

const categories: Categories = {
  vêtements: ["T-shirts", "Jeans", "Vestes", "Robes", "Sweats"],
  chaussures: ["Baskets", "Chaussures de ville", "Tongues", "Sandales"],
};

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-main">
          <div className="logo">
            <a href="/" className="logo-link">
              <img src={process.env.PUBLIC_URL + "/assets/drip.png"} alt="DRIP" className="logo-img" />
            </a>
          </div>

          <div className="nav-center">
            <div className="search-container">
              <input 
                type="text" 
                placeholder="Rechercher sur Drip..." 
                className="search-input" 
              />
              <Search className="search-icon" size={18} />
            </div>
          </div>

          <div className="nav-buttons">
              <Button text="S'inscrire" variant="secondary" onClick={() => navigate("/register")} />
              <Button text="Se connecter" onClick={() => navigate("/login")} />
          </div>

          <div className="mobile-menu-button" onClick={toggleMobileMenu}>
            <Menu size={24} />
          </div>
        </div>

        <div className={`mobile-menu ${isMobileMenuOpen ? "active" : ""}`}>
          <div className="mobile-menu-items">
            <div className="search-container">
              <input type="text" placeholder="Rechercher sur Drip..." className="search-input" />
              <Search className="search-icon" size={18} />
            </div>

            <div className="mobile-buttons">
                <Button text="S'inscrire" variant="secondary" onClick={() => navigate("/register")} />
                <Button text="Se connecter" onClick={() => navigate("/login")} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
