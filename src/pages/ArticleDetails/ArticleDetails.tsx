import React, { useEffect, useState } from "react";
import "./ArticleDetails.css";
import { Articles } from "../../Models/Articles";
import { useNavigate, useParams } from 'react-router-dom';
import { fetchArticle, fetchArticles } from "../../services/ArticleService";
import { Heart, ShoppingCart, Plus, ChevronLeft, ChevronRight, Euro, PackageCheck, Ruler, Palette, Eye, Key, Handshake} from "lucide-react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
import { fetchAllCategories } from "../../services/CategorieService";
import CategoryMenu from "../../components/CategoryMenu/CategoryMenu";
import { Categories } from "../../Models/Categorie";
import Button from "../../components/Button/Button";
import { User } from "../../Models/User";
import { fetchUser } from "../../services/UserService";


const ArticleDetails: React.FC = () => {
    const [article, setArticle] = useState<Articles>();
    const [selectedImage, setSelectedImage] = useState<number>(0);
    const { id_article } = useParams();
    const [categorieParent, setCategorieParent] = useState<Categories[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArticleClient = async () => {
            try {
              const data = await fetchArticle(id_article as string);
              if (data === "Internal server error !") {
                console.error("Erreur serveur !");
                return;
              }
              setArticle(data as Articles);
            } catch (err) {
              console.error(err);
            }
          };

        const loadCategorieParent = async () =>{
            const data = await fetchAllCategories();
            if(typeof data !== "string"){
                setCategorieParent(data)
            }
        }

        const loadToekn = async () =>{
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const fetchUserByToken = await fetchUser(token);
                setUser(fetchUserByToken as User);  
            } catch (error) {
                console.error("Erreur lors du décodage du token", error);
            }
        }
        }
        loadToekn();
        loadCategorieParent();
        fetchArticleClient();
    }, [id_article]);

    const images: string[] = Array.isArray(article?.pictures)
        ? article.pictures
        : article?.pictures
            ? [article.pictures]
            : [];

    const handlePrevImage = () => {
        setSelectedImage(prev => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNextImage = () => {
        setSelectedImage(prev => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const parentCategories = categorieParent.filter((cat) => !cat.parent);
    const subCategoriesMap: { [key: string]: string[] } = {};

    categorieParent.forEach((cat) => {
        if (cat.parent) {
          if (!subCategoriesMap[cat.parent]) {
            subCategoriesMap[cat.parent] = [];
          }
          subCategoriesMap[cat.parent].push(cat.name);
        }
      });

      console.log(user);
    return (
        <div>
        <div className="container-article-detail">
            <Navbar user={user}  showSearch={false} />


            <div className="categorie-navigation">
                {parentCategories.map((categorie) => (
                    <CategoryMenu
                      key={categorie.id}
                      categorie={categorie}
                      subCategories={subCategoriesMap[categorie.id] || []}
                      className="menu-categorie"
                    />
                ))}
            </div>

            <div className="product-detail-wrapper">
                <div className="product-header">
                    {article?.name || "Nom du produit"}
                </div>

                <div className="product-info-wrapper">
                    <div className="product-image-section">
                        <div className="main-image-wrapper">
                        <img
                            src={images[selectedImage]}
                            alt={article?.name || "Image produit"}
                            style={{
                                width: "100%",
                                aspectRatio: "1 / 1", 
                                objectFit: "cover",
                                objectPosition: "center",
                                borderRadius: "1rem",
                            }}
                                />

                        </div>

                        {images.length > 1 && (
                            <div className="thumbnail-section">
                                <button className="navigation-button prev" onClick={handlePrevImage}>
                                    <ChevronLeft size={20} />
                                </button>

                                {images.map((img, index) => (
                                    <div
                                        key={index}
                                        className={`thumbnail ${selectedImage === index ? "selected" : ""}`}
                                        onClick={() => setSelectedImage(index)}
                                    >
                                        <img
                                            src={img}
                                            alt={`Aperçu ${index + 1}`}
                                            className="thumbnail-img"
                                        />
                                    </div>
                                ))}

                                <button className="navigation-button next" onClick={handleNextImage}>
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="product-details-section">
                        <div className="product-tabs">
                            <div className="tab-item active">Détails</div>
                        </div>

                        <div className="product-description-section">
                            <div className="product-summary">
                                <h3>{article?.name}</h3>
                                <p><em>{article?.description}</em></p>

                                <h3>Spécifications</h3>
                                <div className="specifications-list">
                                <div className="spec-item">
                                    <div className="spec-icon-container">
                                    <div className="spec-icon-background"><Euro className="spec-icon" /></div>
                                    Prix : {article?.price}€
                                    </div>
                                </div>

                                <div className="spec-item">
                                    <div className="spec-icon-container">
                                    <div className="spec-icon-background"><PackageCheck className="spec-icon" /></div>
                                    État : {article?.condition}
                                    </div>
                                </div>

                                <div className="spec-item">
                                    <div className="spec-icon-container">
                                    <div className="spec-icon-background"><Ruler className="spec-icon" /></div>
                                    Taille : {article?.size}
                                    </div>
                                </div>

                                <div className="spec-item">
                                    <div className="spec-icon-container">
                                    <div className="spec-icon-background"><Palette className="spec-icon" /></div>
                                    Couleur : {article?.color}
                                    </div>
                                </div>

                                <div className="spec-item">
                                    <div className="spec-icon-container">
                                    <div className="spec-icon-background"><Eye className="spec-icon" /></div>
                                    Vues : {article?.views}
                                    </div>
                                </div>

                                <div className="spec-item">
                                    <div className="spec-icon-container">
                                    <div className="spec-icon-background"><Heart className="spec-icon" /></div>
                                    Likes : {article?.likes}
                                    </div>
                                </div>
                                </div>

                            </div>

                            <div className="order-summary">
                                <div className="order-info">
                                    <div className="availability-status">
                                        <div className="availability-detail">
                                            <span className="status-icon">✓</span>
                                            <span className="status-text">Dispo</span>
                                        </div>
                                        <div className="availability-detail">
                                            <span className="status-icon">✓</span>
                                            <span className="status-text">Envoi pris en charge</span>
                                        </div>
                                    </div>

                                    <div className="action-buttons">
                                        <Button className="add-to-cart-btn" onClick={() => {/* action d’achat */}}>
                                            <Plus size={18} className="mr-2" />
                                            Acheter ce Drip
                                        </Button>

                                        <Button variant="ghost" className="add-to-cart-btn" onClick={() => {/* action wishlist */}}>
                                            <Heart size={18} className="mr-2" />
                                            Ajouter au favoris
                                        </Button>

                                        <Button variant="secondary" className="add-to-cart-btn" onClick={() => navigate(`/rental/${article?.id}`)}>
                                            <Key size={18} className="mr-2" />
                                            Louer ce Drip
                                        </Button>

                                        <Button variant="secondary" className="add-to-cart-btn" onClick={() => navigate(`/barter/${article?.id}`)}>
                                            <Handshake size={18} className="mr-2" />
                                            Faire un DripTroc
                                        </Button>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="suggested-products">
                    <div className="suggestion-header">
                        <h3 className="suggestion-title">Vous aimerez aussi</h3>
                        <div className="suggested-products-grid"></div>
                    </div>
                </div>
            </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default ArticleDetails;
