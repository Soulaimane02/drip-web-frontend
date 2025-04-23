import { useParams } from "react-router"
import "./SellerDetails.css"
import React, { useEffect, useState } from "react"
import { User } from "../../Models/User";
import { fetchUser } from "../../services/UserService";
import SellerDetail from "../../components/SellerDetails/SellerDetails";
import { Articles } from "../../Models/Articles";
import { fetchArticles } from "../../services/ArticleService";

const SellerDetails: React.FC = () =>{
    const {id_user} = useParams();
    const [articles, setArticles] = useState<Articles[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [seller, setSeller] = useState<User | null>(null);


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
    
        loadArticles();
        loadFetchUser();
      }, []);
    

    return(
        <div>
            <p>{id_user}</p>

            <SellerDetail seller={user} articles={articles}/>
        </div>
    )
}

export default SellerDetails;