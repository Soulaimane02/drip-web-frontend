import React, { useEffect, useState } from "react"
import "./ReviewSection.css"
import { User } from "../../Models/User"
import { fetchUser } from "../../services/UserService"
import { Heart } from "lucide-react"
import { Review } from "../../Models/Review"
import { fetchReviewById } from "../../services/ReviewService"
import { Articles } from "../../Models/Articles"

interface ReviewProps {
    user?: User | null
    paramsArticleId: string | undefined
    article: Articles | undefined
}


const ReviewSection: React.FC<ReviewProps> = ({ user, paramsArticleId, article }) => {
    const [userConnected, setUserConnected] = useState<User | undefined>();
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        const loadToken = async () => {
            const token = localStorage.getItem("token");
            if (token) {
              try {
                const fetchUserByToken = await fetchUser(token);
                setUserConnected(fetchUserByToken as User);
              } catch (error) {
                console.error("Erreur lors du décodage du token", error);
              }
            }
        };

        const loadReviews = async () => {
            const data = await fetchReviewById(paramsArticleId);
            if (typeof data !== "string") {
                setReviews(data);
            }
        };


        loadReviews();
        loadToken();
    }, []); 

    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span 
                    key={i} 
                    className={`rs_star ${i <= rating ? 'rs_star_filled' : 'rs_star_empty'}`}
                >
                    ★
                </span>
            );
        }
        return stars;
    };

    return (
        <div className="rs_review_section">
            {reviews.map((review) => (
                <div key={review.id} className="rs_review_item">
                    <div className="rs_review_header">
                        <div className="rs_user_info">
                            <img 
                                src={user?.profilePicture} 
                                alt={user?.firstName} 
                                className="rs_user_avatar"
                            />
                            <div className="rs_user_details">
                                <h3 className="rs_user_name">{user?.firstName}</h3>
                                <div className="rs_user_stats">
                                    <p className="rs_stat_item">Avis verifié par nos equipes<span className="rs_stat_value"></span></p>
                                </div>
                            </div>
                        </div>
                        <div className="rs_review_rating">
                            <div className="rs_stars">
                                {renderStars(review.rating)}
                            </div>
                            <span className="rs_review_date">
                                {new Date(review.createdAt).toLocaleDateString("fr-FR", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric"
                                })}
                                </span>                        
                                </div>
                                                    
                            </div>
                    
                    <div className="rs_review_content">
                        <img 
                                src={article?.pictures[0]} 
                                alt={article?.name} 
                                className="rs_article_avatar"
                            />
                        <p className="rs_review_text">{review.comment}</p>
                    </div>
                    
                    <div className="rs_review_actions">
                    </div>
                    
                    <div className="rs_review_divider"></div>
                </div>
            ))}
        </div>
    );
};

export default ReviewSection;