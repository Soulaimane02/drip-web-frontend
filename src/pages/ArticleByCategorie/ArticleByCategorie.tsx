import React, { useEffect, useState } from "react"
import "./ArticleByCategorie.css"
import { Articles } from "../../Models/Articles"
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import CategoryMenu from "../../components/CategoryMenu/CategoryMenu";
import { User } from "../../Models/User";
import { Categories } from "../../Models/Categorie";
import { fetchUser } from "../../services/UserService";
import { fetchAllCategories } from "../../services/CategorieService";
import { fetchArticles, fetchArticlesByCategorie } from "../../services/ArticleService";
import { toast } from "sonner";
import Footer from "../../components/Footer/Footer";
import ProductCard from "../../components/ProductCard/ProductCard";
import { Link } from "react-router-dom";
import { useParams } from "react-router";

const ArticleByCategorie: React.FC = () =>{
    const location = useLocation();
    const subCategoryId = location.state?.subCategoryId;
    const [articles, setArticles] = useState<Articles[]>([]);
    const [categorieParent, setCategorieParent] = useState<Categories[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [filteredArticles, setFilteredArticles] = useState<Articles[]>([]); 
    const [research, setResearch] = useState("");  
    const { under_category_name } = useParams();
    const [isLoadingUser, setIsLoadingUser] = useState(true);


    

    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoadingUser && user === null) {
            toast.info("Session expirée ou token invalide");
          navigate("/login");
        }
      }, [user, navigate]);
  


    useEffect(() => {
        const loadArticles = async () => {
            const data = await fetchArticlesByCategorie(subCategoryId);
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
    }, [subCategoryId]);


    // Aide GPT
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchQuery = e.target.value.toLowerCase();  // Normaliser la recherche
        setResearch(searchQuery);
      
        if (!searchQuery) {
          // Si la recherche est vide, afficher tous les articles
          setFilteredArticles(articles);
        } else {
          // Filtrer les articles en fonction du nom, de la description ou du prix
          const filtered = articles.filter((article) =>
            article.name.toLowerCase().includes(searchQuery) ||  // Filtrage sur le titre
            article.price.toString().toLowerCase().includes(searchQuery)  // Filtrage sur le prix (converti en string)
          );
          setFilteredArticles(filtered);
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

          <div className="category-menu category-menu-spacing">
            <div className="category-list">
              {parentCategories.map((categorie) => {
                const subCats = subCategoriesMap[categorie.id] || [];
                const subIds = idHiddenSubCategorie[categorie.id] || [];

                const subCategoriesWithIds = subCats.map((name, i) => ({
                  name,
                  id: subIds[i],
                }));

                return (
                  <CategoryMenu
                    key={categorie.id}
                    categorie={categorie}
                    subCategories={subCategoriesWithIds.map((sc) => sc.name)}
                    idSubCategorie={subCategoriesWithIds.map((sc) => sc.id)}
                  />
                );
              })}
            </div>
          </div>


                <section className="products-section">
                    <div className="section-header">
                        <h2 className="section-title">Des {under_category_name} à petit prix ! </h2>  
                    </div>

                    <div className="products-grid">
                        {(filteredArticles.length > 0 ? filteredArticles : articles).map((article) => (
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

                <div className="suggested-products">
                    <div className="suggestion-header">
                        <h3 className="suggestion-title">Vous aimerez aussi</h3>
                        <div className="suggested-products-grid"></div>
                    </div>
                </div>
            </main>
            {user ? (
                <Footer />
            ) : (
                <div onClick={(e) => handleProtectedClick(e, "footer")} style={{ cursor: "pointer" }}>
                    <Footer />
                </div>
            )}
        </div>
    )
}

export default ArticleByCategorie;