import React, { useEffect, useState } from "react"
import "./AllSeller.css"
import { Articles } from "../../Models/Articles";
import { User } from "../../Models/User";
import { useNavigate } from "react-router";
import { fetchArticles } from "../../services/ArticleService";
import { fetchAllSeller, fetchUser } from "../../services/UserService";
import { toast } from "sonner";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import SellerCard from "../../components/SellerCard/SellerCard";

const AllSeller: React.FC = () =>{
    const [user, setUser] = useState<User | null>(null);
    const [articles, setArticles] = useState<Articles[]>([]);

    const [seller, setSeller] = useState<User[]>([]);
    const [filteredSeller, setFilteredSeller] = useState<User[]>([]); 
    const [research, setResearch] = useState("");  
    useEffect(() => {
        const loadArticles = async () => {
            const data = await fetchArticles();
            if (typeof data !== "string") {
                setArticles(data);
            }
        };

        const loadSeller = async () => {
            const data = await fetchAllSeller();
            if (typeof data !== "string") {
                setSeller(data);
                setFilteredSeller(data); 
            }
        };

        
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
        loadSeller();
        loadArticles();
    }, []);

    // Aide GPT
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const searchQuery = e.target.value.toLowerCase();
      setResearch(searchQuery);
    
      if (!searchQuery) {
        // Si la recherche est vide, afficher tous les seller
        setFilteredSeller(seller);
      } else {
        const filtered = seller?.filter((sell) =>
            sell.firstName.toLowerCase().includes(searchQuery));
    
        if (filtered?.length === 0) {
            setFilteredSeller([]); // Vide les articles affichés
          toast.info("Aucun vendeur ne porte se nom.");
        } else {
            setFilteredSeller(filtered);
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
                        <a href="/new-seller" className="view-more-link">
                        Pas de DripSeller à ton goût ? Deviens-le.                            
                        <span className="view-more-arrow">→</span>
                        </a>
                    </div>
                    <div className="products-gride">
  {(filteredSeller.length > 0 ? filteredSeller : seller)
    .filter((sell) => sell.role === "Seller")
    .map((sell) => {
      // Filtrer les articles pour ce vendeur
      const sellerArticles = articles.filter(
        (article) => article.userId === sell.id
      );
      
      return (
        <Link
          key={`${sell.firstName.toLowerCase()}-${sell.id}`}
          to={`/seller/${sell.firstName.toLowerCase()}-${sell.id}`}
        >
          {/* Passer les articles filtrés pour chaque vendeur */}
          <SellerCard seller={sell} articles={sellerArticles} />
        </Link>
      );
    })}
</div>

                </section>
            </main>
        </div>
    );

};

export default AllSeller;