import { useParams } from "react-router"
import "./SellerDetails.css"
import React, { useEffect, useState } from "react"
import { User } from "../../Models/User";
import { fetchUser, fetchUserOrSellerById } from "../../services/UserService";
import SellerDetail from "../../components/SellerDetails/SellerDetail";
import { Articles } from "../../Models/Articles";
import { fetchArticles } from "../../services/ArticleService";
import Navbar from "../../components/Navbar/Navbar";
import CategoryMenu from "../../components/CategoryMenu/CategoryMenu";
import { Categories } from "../../Models/Categorie";
import { fetchAllCategories } from "../../services/CategorieService";
import Footer from "../../components/Footer/Footer";

const SellerDetails: React.FC = () =>{
    const {id_user} = useParams();
    const [articles, setArticles] = useState<Articles[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [seller, setSeller] = useState<User | null>(null);
    const [categorieParent, setCategorieParent] = useState<Categories[]>([]);


    useEffect(() => {
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

        const loadArticles = async () => {
            const data = await fetchArticles();
            if (typeof data !== "string") {
                setArticles(data);
            }
        };

        const loadCategorieParent = async () => {
          const data = await fetchAllCategories();
          if (typeof data !== "string") {
              setCategorieParent(data);
          }
      };

      const loadSeller = async () => {
        if (!id_user) return;
        const sellerData = await fetchUserOrSellerById(id_user); 
        if (typeof sellerData !== "string") {
          setSeller(sellerData as User);
        }
      };
    
      loadCategorieParent();
      loadArticles();
      loadFetchUser();
      loadSeller();
      }, [id_user]);

      const sellerArticles = articles.filter(
        (article) => article.userId === seller?.id
      );
    


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

    return (
      <div className="principal-content">
        <Navbar user={user} showSearch={false} />
        <main className="main-contente">

    
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
              className="category-menu-spacing"
            />
          );
        })}
          </main>
    
        <SellerDetail seller={seller} articles={sellerArticles} />
        <Footer></Footer>

      </div>
    );
  }    

export default SellerDetails;