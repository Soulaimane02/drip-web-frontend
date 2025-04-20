import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import "./CategoryMenu.css";
import { Categories } from "../../Models/Categorie";
import { useNavigate } from "react-router";

interface CategoryMenuProps {
  categorie: Categories;
  subCategories: string[]; 
  idSubCategorie? : string[];
  className?: string;
}

const CategoryMenu: React.FC<CategoryMenuProps> = ({categorie, subCategories, idSubCategorie, className = "",}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null); 
  const navigate = useNavigate();



  const categories = [{ name: categorie.name , subCategories: subCategories  }];

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
            <div className="category-item">
              {category.name}
              <ChevronRight className="category-icon" />
            </div>

            {(activeIndex === index || window.innerWidth >= 768) && (
              <div className="subcategory-list">
                {subCategories.map((sub, idx) => (
                  <a
                    key={idx}
                    onClick={() =>
                      navigate(`/category/${categorie.name}/${sub}`, {
                        state: { subCategoryId: idSubCategorie?.[idx] }
                      })
                    }
                    className="subcategory-item"
                  >
                    {sub}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryMenu;
