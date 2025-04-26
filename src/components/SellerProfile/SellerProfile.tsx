import React, { useEffect, useState } from "react";
import { User } from "../../Models/User";
import { Articles } from "../../Models/Articles";
import { fetchUserOrSellerById } from "../../services/UserService"; 
import { Star } from "lucide-react";

interface SellerProfileProps {
  userId: string;
  articles?: Articles[];
}

const SellerProfile: React.FC<SellerProfileProps> = ({ userId, articles }) => {
  const [seller, setSeller] = useState<User | null>(null);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageCarouselVisible, setIsImageCarouselVisible] = useState(false);

  useEffect(() => {
    const loadSeller = async () => {
      const data = await fetchUserOrSellerById(userId);
      if (typeof data !== "string") {
        setSeller(data);
      }
    };

    loadSeller();
  }, [userId]);

  useEffect(() => {
    if (isImageCarouselVisible && articles && articles.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) =>
          prev === articles.length - 1 ? 0 : prev + 1
        );
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [isImageCarouselVisible, articles]);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const partialStar = rating - fullStars;
    const emptyStars = 5 - fullStars - (partialStar > 0 ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} size={16} color="#fbbf24" />);
    }
    if (partialStar > 0) {
      stars.push(
        <Star
          key={`partial`}
          size={16}
          color="#fbbf24"
          style={{ clipPath: `inset(0 ${100 - partialStar * 100}% 0 0)` }}
        />
      );
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={16} color="#e0e0e0" />);
    }
    return stars;
  };

  if (!seller) {
    return <div>Chargement du vendeur...</div>;
  }

  return (
    <div
      className="sc_seller_card"
      onMouseEnter={() => setIsImageCarouselVisible(true)}
      onMouseLeave={() => setIsImageCarouselVisible(false)}
    >
      <div className="sc_card_header">
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
          {seller.rating ? (
            <div className="sc_rating">
              {renderStars(seller.rating)}
              <span className="sc_stat_value">{seller.rating.toFixed(1)}</span>
            </div>
          ) : (
            <span className="sc_stat_value">Pas encore de note</span>
          )}
        </div>
        <div className="sc_stat_item">
          <span className="sc_stat_value">{articles?.length || 0}</span>
          <span className="sc_stat_label">ARTICLES</span>
        </div>
      </div>

      <div className={`sc_image_carousel ${isImageCarouselVisible ? "sc_visible" : ""}`}>
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
                  className={`sc_carousel_dot ${index === currentImageIndex ? "sc_active" : ""}`}
                ></span>
              ))}
            </div>
          </div>
        ) : (
          <div className="sc_no_images">Aucun article disponible</div>
        )}
      </div>

      <div className="sc_action_section">
        <button className="sc_view_profile_button">
          Voir le profil
        </button>
      </div>
    </div>
  );
};

export default SellerProfile;
