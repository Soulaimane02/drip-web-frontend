import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import CategoryMenu from "../../components/CategoryMenu/CategoryMenu";
import HeroSection from "../../components/HeroSection/HeroSection";
import BrandSection from "../../components/BrandSection/BrandSection";
import ProductCard from "../../components/ProductCard/ProductCard";
import Footer from "../../components/Footer/Footer";
import { ShoppingBag, Truck, Sun } from "lucide-react";
import { Articles } from "../../Models/Articles";
import "./Main.css";
import { fetchArticles } from "../../services/ArticleService";
import { Link } from "react-router-dom";

const Main: React.FC = () => {

    const [articles, setArticles] = useState<Articles[]>([]);

    useEffect(()=>{

        const loadArticles = async () =>{
            const data = await fetchArticles();
            if (typeof data !== "string") {
                setArticles(data);
            }
        }

        loadArticles();
    }, [])
      

  return (
    <div className="home-container">
      <Navbar />
      
      <main className="main-content">
        <CategoryMenu className="category-menu-spacing" />
        
        <HeroSection />
        
        <BrandSection />
        
        <section className="products-section">
          <div className="section-header">
            <h2 className="section-title">Le Drip du Jour</h2>
            <a href="/register" className="view-more-link">
                Explore plus de Drip           
            <span className="view-more-arrow">→</span>
            </a>
          </div>
          
          <div className="products-grid">
            {articles.map(article => (
                <Link key={article.id} to={`/article/${article.id}`}>
                <ProductCard product={article} />
                </Link>
            ))}
           </div>

        </section>
        
        <section className="features-section">
            <div className="features-grid">
                <div className="feature-card">
                <div className="feature-icon-container">
                    <div className="feature-icon-background">
                    <ShoppingBag className="feature-icon" />
                    </div>
                    <h3 className="feature-title">Drip 100% validé</h3>
                </div>
                <p className="feature-description">
                    Chaque article est vérifié avec soin. Authentique, stylé, prêt à porter.
                </p>
                </div>

                <div className="feature-card">
                <div className="feature-icon-container">
                    <div className="feature-icon-background">
                    <Truck className="feature-icon" />
                    </div>
                    <h3 className="feature-title">Livraison sécurisée</h3>
                </div>
                <p className="feature-description">
                    Livraison suivie & protégée. Ton drip arrive direct, sans souci.
                </p>
                </div>

                <div className="feature-card">
                <div className="feature-icon-container">
                    <div className="feature-icon-background">
                    <Sun className="feature-icon" />
                    </div>
                    <h3 className="feature-title">Style responsable</h3>
                </div>
                <p className="feature-description">
                    Moins de déchets, plus de flow. Le drip éco, c’est le futur.
                </p>
                </div>
            </div>
            </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Main;