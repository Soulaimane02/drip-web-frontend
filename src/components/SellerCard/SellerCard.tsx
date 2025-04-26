import React, { useState, useEffect } from "react";
import "./SellerCard.css";
import { User } from "../../Models/User";
import { Articles } from "../../Models/Articles";
import { MoreVertical, Star } from "lucide-react";

interface SellerProps {
  seller: User;
  articles?: Articles[];
}

const SellerCard: React.FC<SellerProps> = ({ seller, articles }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageCarouselVisible, setIsImageCarouselVisible] = useState(false);
  const [isCardActive, setIsCardActive] = useState(false);


  useEffect(() => {
    if (isImageCarouselVisible && articles && articles.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === articles.length - 1 ? 0 : prevIndex + 1
        );
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [isImageCarouselVisible, articles]);

  const getStats = () => {
    return {
        ventes: seller.rating?.toFixed(1),
        articles: articles?.length,
    };
  };

  // Fonction pour afficher les étoiles avec un remplissage exact
const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating); // Nombre d'étoiles pleines
    const partialStar = rating - fullStars; // Fraction de l'étoile partiellement remplie
    const emptyStars = 5 - fullStars - (partialStar > 0 ? 1 : 0); // Nombre d'étoiles vides

    // Ajouter les étoiles pleines
    for (let i = 0; i < fullStars; i++) {
        stars.push(<Star key={`full-${i}`} size={16} color="#fbbf24" />);
    }

    // Ajouter l'étoile partiellement remplie
    if (partialStar > 0) {
        stars.push(
            <Star
                key={`partial`}
                size={16}
                color="#fbbf24"
                style={{ clipPath: `inset(0 ${100 - partialStar * 100}% 0 0)` }} // Simule un remplissage partiel
            />
        );
    }

    // Ajouter les étoiles vides
    for (let i = 0; i < emptyStars; i++) {
        stars.push(<Star key={`empty-${i}`} size={16} color="#e0e0e0" />);
    }

    return stars;
};


  const stats = getStats();

  return (
    <div
    className={`sc_seller_card ${isImageCarouselVisible || isCardActive ? 'sc_visible_card' : ''}`}
    onMouseEnter={() => setIsImageCarouselVisible(true)}
    onMouseLeave={() => setIsImageCarouselVisible(false)}
    >
      <div className="sc_card_header">
      <button className="sc_more_options_button" onClick={() => setIsCardActive(!isCardActive)}>
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
            <div className="sc_rating">
                {renderStars(Number(stats.ventes))}
                <span className="sc_stat_value">{stats.ventes}</span>
            </div>
            )}
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
