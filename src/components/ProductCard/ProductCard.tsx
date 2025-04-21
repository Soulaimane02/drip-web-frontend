import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import "./ProductCard.css";
import { Articles } from "../../Models/Articles";

interface ProductCardProps {
  product: Articles;
  btn?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, btn }) => {
  const [carouselIndex, setCarouselIndex] = useState(1);

  useEffect(() => {
    if (!product.pictures || product.pictures.length <= 2) return;

    const interval = setInterval(() => {
      setCarouselIndex((prev) =>
        prev >= product.pictures.length - 1 ? 1 : prev + 1
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [product.pictures]);

  return (
    <div className="product-card">
      <div className="product-image-container-product">
        <img
          src={product.pictures[0]}
          alt={product.name}
          className="product-image-product"
        />

        {/* Mini carousel intégré dans l'image */}
        {product.pictures.length > 1 && (
          <div className="overlay-carousel">
            <img
              src={product.pictures[carouselIndex]}
              alt={`mini-${carouselIndex}`}
              className="overlay-carousel-img"
            />
          </div>
        )}

        <button className="favorite-button" onClick={btn}>
          <Heart size={16} />
          <span
            style={{ color: "#f26b6b", fontSize: "0.675rem" }}
            className="product-price"
          >
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
