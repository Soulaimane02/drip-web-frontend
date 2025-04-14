import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import CategoryMenu from "../../components/CategoryMenu/CategoryMenu";
import HeroSection from "../../components/HeroSection/HeroSection";
import BrandSection from "../../components/BrandSection/BrandSection";
import ProductCard from "../../components/ProductCard/ProductCard";
import Footer from "../../components/Footer/Footer";
import { ShoppingBag, Truck, Sun } from "lucide-react";
import { Articles } from "../../Models/Articles";
import "./Main.css";

const Main: React.FC = () => {
    const popularProducts: Articles[] = [
        {
          id: "1",
          name: "Black Jacket",
          description: "A stylish black jacket perfect for mid-season wear.",
          price: 45.0,
          size: "M",
          color: "Black",
          pictures: [
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          ],
          likes: 120,
          views: 900,
          condition: "Used - Like New",
          categories: ["Jackets", "Men", "Outerwear"]
        },
        {
          id: "2",
          name: "Vintage 501 Jeans",
          description: "Classic Levi’s 501 vintage jeans. Straight cut and super comfy.",
          price: 38.0,
          size: "32/34",
          color: "Blue",
          pictures: [
            "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          ],
          likes: 87,
          views: 760,
          condition: "Used - Good",
          categories: ["Jeans", "Vintage", "Unisex"]
        },
        {
          id: "3",
          name: "Denim Shorts",
          description: "Light blue denim shorts, perfect for summer.",
          price: 22.5,
          size: "S",
          color: "Light Blue",
          pictures: [
            "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          ],
          likes: 45,
          views: 340,
          condition: "Used - Very Good",
          categories: ["Shorts", "Women", "Summer"]
        }
      ];
      

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
            {popularProducts.map(product => (
              <ProductCard key={product.id} product={product} />
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