import { useParams } from "react-router";
import React, { useEffect, useState } from "react";
import { fetchUser } from "../../services/UserService";
import { User } from "../../Models/User";
import { Articles } from "../../Models/Articles";
import "./SellerDetail.css";
import { Link } from "react-router-dom";

interface SellerProps{
    seller: User | null
    articles: Articles[]
}

const SellerDetail: React.FC<SellerProps> = ({seller, articles}) => {

  return (
    
    <div className="sd_container">
      {seller && (
        <div className="sd_profile_card">
          <img
            src={seller.profilePicture}
            alt={seller.firstName}
            className="sd_profile_img"
          />
          <h2 className="sd_name">{seller.firstName} {seller.lastName}</h2>
          <p className="sd_role">Drip Seller</p>
        </div>
      )}

      <div className="sd_articles_wrapper">
        {articles.length > 0 ? (
          articles.map(article => (
            <Link key={article.id} to={`/article/${article.id}`} className="sd_article_card">
            <img
              src={Array.isArray(article.pictures) ? article.pictures[0] : article.pictures}
              alt={article.name}
              className="sd_article_img"
            />
            <div className="sd_article_info">
              <h3>{article.name}</h3>
              <p className="sd_price">{article.price}€</p>
              <p className="sd_desc">{article.description}</p>
            </div>
          </Link>
          ))
        ) : (
          <p className="sd_empty">Ce vendeur n'a pas encore publié d'articles.</p>
        )}
      </div>
    </div>
  );
};

export default SellerDetail;
