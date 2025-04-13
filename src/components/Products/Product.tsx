import React from "react";
import "./Product.css";
import { FaHeart } from 'react-icons/fa';
import { Articles } from "../../Models/Articles";

interface ProductProps {
    article: Articles;
}
/*
  <div className="product-favorite">
        <--!  <span>{article.likes} <FaHeart size={24} color="#e74c3c" /></span> -->
   </div>
*/
const Product: React.FC<ProductProps> = ({ article }) => {
    return (
    
        <div className={`product-card ${article}`}>
            <img src={article.pictures[0]} alt={article.name} className="product-image" />
            <div className="product-info">
                <h3 className="product-title">{article.name}</h3>
                <p className="product-size">{article.size}</p>
                <p className="product-price">{article.price}</p>
                <p className="product-view">{article.views}</p>
            </div>
        </div>
    );
};

export default Product;
