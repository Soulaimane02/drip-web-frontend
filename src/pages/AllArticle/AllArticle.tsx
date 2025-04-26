import React, { useEffect, useState } from "react"
import "./AllArticle.css"
import { Articles } from "../../Models/Articles";
import { User } from "../../Models/User";
import { useNavigate } from "react-router";
import { fetchArticles } from "../../services/ArticleService";
import { fetchUser } from "../../services/UserService";
import { toast } from "sonner";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";

const AllArticle: React.FC = () =>{
    const [articles, setArticles] = useState<Articles[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [filteredArticles, setFilteredArticles] = useState<Articles[]>([]); 
    const [research, setResearch] = useState("");  
    const [isLoadingUser, setIsLoadingUser] = useState(true);

    useEffect(() => {
        const loadArticles = async () => {
            const data = await fetchArticles();
            if (typeof data !== "string") {
                setArticles(data);
                setFilteredArticles(data); 
            }
        };

        
        const loadFetchUser = async () => {
            try {
              const token = localStorage.getItem("token");
              if (!token) {
                setUser(null);
                setIsLoadingUser(false);
                return;
              }
          
              const fetchUserByToken = await fetchUser(token);
              if (fetchUserByToken === "No token") {
                setUser(null);
                setIsLoadingUser(false);
                return;
              }
          
              setUser(fetchUserByToken as User);
            } catch (error) {
              setUser(null);
            } finally {
              setIsLoadingUser(false);
            }
          };
          

        loadFetchUser();
        loadArticles();
    }, []);

    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoadingUser && user === null) {
            toast.info("Session expirée ou token invalide");
          navigate("/login");
        }
      }, [user, navigate]);
  

    // Aide GPT
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const searchQuery = e.target.value.toLowerCase();
      setResearch(searchQuery);
    
      if (!searchQuery) {
        // Si la recherche est vide, afficher tous les articles
        setFilteredArticles(articles);
      } else {
        const filtered = articles.filter((article) =>
          article.name.toLowerCase().includes(searchQuery) ||
          article.price.toString().includes(searchQuery)
        );
    
        if (filtered.length === 0) {
          setFilteredArticles([]); // Vide les articles affichés
          toast.info("Aucun article trouvé.");
        } else {
          setFilteredArticles(filtered);
        }
      }
    };
    
    return (
      
        <div className="home-container">
          <Navbar user={user} research={research} onSearchChange={handleSearchChange} />

            <main className="main-content">
                <section className="products-section">
                    <div className="section-header">
                        <h2 className="section-title">Pas d’idée ? Explore et trouve ton Drip !</h2>
                        <a href="/all-seller" className="view-more-link">
                            Recherche des Vendeurs
                            <span className="view-more-arrow">→</span>
                        </a>

                       
                    </div>

                    <div className="products-grid">
                        {(filteredArticles.length > 0 ? filteredArticles : articles).map((article) => (
                            <Link key={article.id} to={`/article/${article.id}`}>
                              <ProductCard product={article} />
                            </Link>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );

};

export default AllArticle;