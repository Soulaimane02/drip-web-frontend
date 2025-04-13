import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Main.css";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router";
import Product from "../../components/Products/Product";
import { Articles } from '../../Models/Articles';
import { fetchArticles } from "../../services/ArticleService";
import { Link } from "react-router-dom";


 
const Main = () => {
    const [articles, setArticles] = useState<Articles[]>([]);
    const navigate = useNavigate();

    // Test de produit par GPT
    useEffect(() => {
        const fetchArticlesClient = async () => {
            try {
                const articles = await fetchArticles();
                if (articles === "Internal servor error !") {
                    console.log("Error Serveur!");
                    return;
                }

                setArticles(articles as Articles[]);
            }
            catch (err) {
                console.log(err);
            }
        }

        fetchArticlesClient();
    }, []);

  return (
    <div className="app-wrapper">
      <Navbar />

      <div className="main-content">
        <div className="hero-container">
            <img className="hero-banner" src="../../../assets/herobanner.png" alt="heroBannerDrip" />
            <h6 className="hero-title">Faites le plein de mode à prix abordables !</h6>
            <Button className="hero-button" text="C’est parti, j’y vais !" onClick={() => navigate("/login")} />
        </div>
        <h1 style={{ color: "black" }}>Fil d'actu</h1>
        <div className="product-grid">
            {articles.map((article) => (
                <Link to={`/article/${article.id}`}>
                    <Product key={article.id} article={article} />
                </Link>
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Main;
