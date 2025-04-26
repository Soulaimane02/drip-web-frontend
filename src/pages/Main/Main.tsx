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
import { Link, useNavigate } from "react-router-dom";
import { Categories } from "../../Models/Categorie";
import { fetchAllCategories } from "../../services/CategorieService";
import { User } from "../../Models/User";
import { toast } from "sonner";
import { fetchUser } from "../../services/UserService";

const Main: React.FC = () => {
    const [articles, setArticles] = useState<Articles[]>([]);
    const [categorieParent, setCategorieParent] = useState<Categories[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [filteredArticles, setFilteredArticles] = useState<Articles[]>([]); 
    const [research, setResearch] = useState("");  
    const [isLoadingUser, setIsLoadingUser] = useState(true);



    const navigate = useNavigate();

    useEffect(() => {
        const loadArticles = async () => {
            const data = await fetchArticles();
            if (typeof data !== "string") {
                setArticles(data);
                setFilteredArticles(data); 
            }
        };

        const loadCategorieParent = async () => {
            const data = await fetchAllCategories();
            if (typeof data !== "string") {
                setCategorieParent(data);
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
        loadCategorieParent();
    }, []);

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
    


    // Regroupement des sous-catégories par catégorie parente (GPT)
    const parentCategories = categorieParent.filter((cat) => !cat.parent);
    const subCategoriesMap: { [key: string]: string[] } = {};
    const idHiddenSubCategorie: { [key: string]: string[] } = {};


    categorieParent.forEach((cat) => {
      if (cat.parent) {
        if (!subCategoriesMap[cat.parent]) {
          subCategoriesMap[cat.parent] = [];
        }
        if (!idHiddenSubCategorie[cat.parent]) {
          idHiddenSubCategorie[cat.parent] = [];
        }
    
        subCategoriesMap[cat.parent].push(cat.name);
        idHiddenSubCategorie[cat.parent].push(cat.id); 
      }
    });

    

 

    // Gestion des clics sur les éléments "interdits" si pas connecté (GPT)
    const handleProtectedClick = (e: React.MouseEvent, section: string) => {
        if (user) 
          return;

        e.preventDefault();
        toast.info("Veuillez vous connecter pour accéder à cette fonctionnalité.");
        navigate("/login");
    };


    
    return (
      
        <div className="home-container">
          <Navbar user={user} research={research} onSearchChange={handleSearchChange} />

            <main className="main-content">
              {parentCategories.map((categorie) => {
                  const subCats = subCategoriesMap[categorie.id] || [];
                  const subIds = idHiddenSubCategorie[categorie.id] || [];

                  const subCategoriesWithIds = subCats.map((name, i) => ({
                    name,
                    id: subIds[i],
                  }));

                  return (
                    <div
                      key={categorie.id}
                      onClick={(e) => handleProtectedClick(e, "categorie")}
                      style={{ cursor: !user ? "pointer" : "default" }}
                    >
                      <CategoryMenu
                        categorie={categorie}
                        subCategories={subCategoriesWithIds.map((sc) => sc.name)}
                        idSubCategorie={subCategoriesWithIds.map((sc) => sc.id)}
                        className="category-menu-spacing"
                      />
                    </div>
                  );
                })}

                <HeroSection />
                <BrandSection />

                <section className="products-section">
                    <div className="section-header">
                        <h2 className="section-title">Le Drip du Jour</h2>
                        {!user &&(
                           <a href="/register" className="view-more-link">
                            Explore plus de Drip
                            <span className="view-more-arrow">→</span>
                        </a>

                        )}

                        {user &&(
                           <a href="/all-drip" className="view-more-link">
                            Explore plus de Drip
                            <span className="view-more-arrow">→</span>
                        </a>

                        )}  
                       
                    </div>

                    <div className="products-grid">
                    {(filteredArticles.length > 0 ? filteredArticles : articles).slice(0, 20).map((article) => (
                          user ? (
                            <Link key={article.id} to={`/article/${article.id}`}>
                              <ProductCard product={article} />
                            </Link>
                          ) : (
                            <div
                              key={article.id}
                              onClick={(e) => handleProtectedClick(e, "article")}
                              style={{ cursor: "pointer" }}
                            >
                              <ProductCard product={article} />
                            </div>
                          )
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

            {user ? (
                <Footer />
            ) : (
                <div onClick={(e) => handleProtectedClick(e, "footer")} style={{ cursor: "pointer" }}>
                    <Footer />
                </div>
            )}
        </div>
    );

};

export default Main;
