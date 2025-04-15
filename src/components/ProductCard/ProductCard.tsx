import React from "react";
import { Heart } from "lucide-react";
import "./ProductCard.css";
import { Articles } from "../../Models/Articles";

interface ProductCardProps {
  product: Articles;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image-container-product">
        <img 
          src={product.pictures[0]} 
          alt={product.name} 
          className="product-image-product"
        />
        <button className="favorite-button">
          <Heart size={16} />
          <span style={{ color: "#f26b6b", fontSize: "0.675rem" }} className="product-price">
            {product.likes}
            </span>
        </button>
      </div>
      <div className="product-info">
        <div className="product-price-size">
          <span className="product-price">{product.price} €</span>
          <span className="product-size">{product.size}</span>
        </div>
        <div className="product-name">{product.name}</div>
      </div>
    </div>
  );
};

export default ProductCard;



