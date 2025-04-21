import React, { useState, useEffect } from "react";
import "./SellerCard.css";
import { User } from "../../Models/User";
import { Articles } from "../../Models/Articles";
import { MoreVertical } from "lucide-react";

interface SellerProps {
  seller: User;
  articles?: Articles[];
}

const SellerCard: React.FC<SellerProps> = ({ seller, articles }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageCarouselVisible, setIsImageCarouselVisible] = useState(false);

  useEffect(() => {
    if (isImageCarouselVisible && articles && articles.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === articles.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isImageCarouselVisible, articles]);

  const getStats = () => {
    return {
        ventes: seller.rating?.toFixed(1),
        articles: articles?.length,
    };
  };

  const stats = getStats();

  return (
    <div
      className="sc_seller_card"
      onMouseEnter={() => setIsImageCarouselVisible(true)}
      onMouseLeave={() => setIsImageCarouselVisible(false)}
    >
      <div className="sc_card_header">
        <button className="sc_more_options_button">
          <MoreVertical size={18} />
        </button>
      </div>

      <div className="sc_seller_info">
        <div className="sc_avatar_container">
          <img
            src={seller.profilePicture}
            alt={`${seller.firstName} ${seller.lastName}`}
            className="sc_avatar_image"
          />
        </div>

        <h3 className="sc_seller_name">{seller.firstName} {seller.lastName}</h3>
        <p className="sc_seller_position">DripSeller</p>
      </div>

      <div className="sc_seller_stats">
        <div className="sc_stat_item">
          {stats.ventes === "0" ? (
            <span className="sc_stat_value">Pas encore de note</span>
            ) : (
            <span className="sc_stat_value">{stats.ventes}</span>
            )}
          <span className="sc_stat_label">NOTES SUR 5</span>
        </div>

        <div className="sc_stat_item">
          <span className="sc_stat_value">{stats.articles}</span>
          <span className="sc_stat_label">ARTICLES</span>
        </div>

      </div>

      <div className={`sc_image_carousel ${isImageCarouselVisible ? 'sc_visible' : ''}`}>
        {articles && articles.length > 0 ? (
          <div className="sc_carousel_images">
            <img
            src={
                (Array.isArray(articles[currentImageIndex].pictures)
                ? articles[currentImageIndex].pictures[0]
                : articles[currentImageIndex].pictures) as string
            }
            alt={articles[currentImageIndex].name}
            className="sc_carousel_image"
            />

            <div className="sc_carousel_dots">
              {articles.map((_, index) => (
                <span
                  key={index}
                  className={`sc_carousel_dot ${index === currentImageIndex ? 'sc_active' : ''}`}
                ></span>
              ))}
            </div>
          </div>
        ) : (
          <div className="sc_no_images">Aucun article disponible</div>
        )}
      </div>

      <div className="sc_action_section">
        <button className="sc_view_profile_button">Voir le profil</button>
      </div>
    </div>
  );
};

export default SellerCard;
