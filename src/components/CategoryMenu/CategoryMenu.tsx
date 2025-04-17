import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import "./CategoryMenu.css";
import { Categories } from "../../Models/Categorie";

interface CategoryMenuProps {
  categorie: Categories;
  subCategories: string[]; 
  className?: string;
}

const CategoryMenu: React.FC<CategoryMenuProps> = ({categorie, subCategories, className = "",}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null); 

  const categories = [{ name: categorie.name, subCategories: subCategories }];

  const handleClick = (index: number) => {
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
            <a href={`/category/${category.name}`} className="category-item">
              {category.name}
              <ChevronRight className="category-icon" />
            </a>
            <div className="subcategory-list">
              {category.subCategories.map((sub, idx) => (
                <a
                  key={idx}
                  href={`/category/${category.name}/${sub}`}
                  className="subcategory-item"
                >
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
