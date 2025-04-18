import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import "./HeroSection.css";
import { User } from "../../Models/User";
import { fetchUser } from "../../services/UserService";

const HeroSection: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);


  useEffect(() =>{
    const loadFetchUser = async () => {
      try {
          const token = localStorage.getItem("token");
          if (!token) {
              setUser(null);
              return;
          }

          const fetchUserByToken = await fetchUser(token);
          if (fetchUserByToken === "No token") {
              setUser(null);
              return;
          }

          setUser(fetchUserByToken as User);
      } catch (error) {
          setUser(null);
      }
  };

  loadFetchUser();
  });
  return (
    <section className="hero-section">
      <div className="hero-container">
        <img 
          src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
          alt="Vinted Hero" 
          className="hero-image"
        />
        
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title">
              Donnez une seconde vie à vos vêtements
            </h1>
            <p className="hero-description">
              Achetez et vendez des articles de seconde main. 
              Faites des économies tout en faisant un geste pour la planète.
            </p>
            {!user&&(
              <a href="/register" className="hero-button">
              Commencer maintenant
              <ArrowRight className="hero-button-icon" />
            </a>
            )};
            {user?.role === "User" &&(
              <a href="/new-seller" className="hero-button">
              Commencer maintenant
              <ArrowRight className="hero-button-icon" />
            </a>
            )};
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;