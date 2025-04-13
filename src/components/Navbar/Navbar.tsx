import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import Button from "../Button/Button";
import { Categories } from "../../Models/Categories";

// Liste des catégories
const categories: Categories = {
  vêtements: ["T-shirts", "Jeans", "Vestes", "Robes", "Sweats"],
  chaussures: ["Baskets", "Chaussures de ville", "Tongues", "Sandales"],
};

const Navbar: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(""); // Catégorie sélectionnée
  const [subCategories, setSubCategories] = useState<string[]>([]); // Sous-catégories affichées
  const navigate = useNavigate();

  // Quand une catégorie principale est sélectionnée, on met à jour les sous-catégories
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    setSelectedCategory(category);
    setSubCategories(categories[category as keyof Categories] || []); 
  };

 

  return (
    <nav className="navbar">
      <img src="./../assets/drip.png" alt="LogoDrip" height={70} style={{ marginRight: '20px' }}/>

      <div className={`nav-center`}>
        <select name="articles" onChange={handleCategoryChange}>
        <option value="all">Articles</option>
          <option value="vêtements">Vêtements</option>
          <option value="chaussures">Chaussures</option>
        </select>

        <input type="text" placeholder="Rechercher sur Drip..." />

        {/* Sous-catégories dynamiques */}
        {selectedCategory && subCategories.length > 0 && (
          <select name="subCategories">
            {subCategories.map((subCategory, index) => (
              <option key={index} value={subCategory}>
                {subCategory}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="nav-buttons">
        <Button text="S'inscrire" onClick={() => navigate("/register")} />
        <Button text="Se connecter" onClick={() => navigate("/login")} />
      </div>
    </nav>
  );
};

export default Navbar;
