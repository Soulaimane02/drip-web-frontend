import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import "./CategoryMenu.css";

interface CategoryMenuProps {
  className?: string;
}

const CategoryMenu: React.FC<CategoryMenuProps> = ({ className = "" }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const categories = [
    { name: "Femmes", subcategories: ["Vêtements", "Chaussures", "Accessoires"] },
    { name: "Hommes", subcategories: ["Vêtements", "Chaussures", "Montres"] },
    { name: "Enfants", subcategories: ["Jouets", "Vêtements", "Scolaire"] },
    { name: "Maison", subcategories: ["Décoration", "Cuisine", "Meubles"] },
    { name: "Divertissement", subcategories: ["Livres", "Jeux", "Films"] },
    { name: "Animaux", subcategories: ["Chiens", "Chats", "Accessoires"] },
    { name: "Accessoires", subcategories: ["Sacs", "Bijoux", "Lunettes"] },
    { name: "Beauté", subcategories: ["Maquillage", "Soins", "Parfums"] }
  ];

  const handleClick = (index: number) => {
    // Toggle on mobile
    if (window.innerWidth < 768) {
      setActiveIndex(activeIndex === index ? null : index);
    }
  };

  return (
    <div className={`category-menu ${className}`}>
      <div className="category-list">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`category-group ${activeIndex === index ? "active" : ""}`}
            onClick={() => handleClick(index)}
          >
            <a href="#" className="category-item">
              {category.name}
              <ChevronRight className="category-icon" />
            </a>
            <div className="subcategory-list">
              {category.subcategories.map((sub, idx) => (
                <a key={idx} href="#" className="subcategory-item">
                  {sub}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryMenu;
