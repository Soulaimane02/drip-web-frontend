import React, { useEffect, useState } from "react";
import "./ArticleDetails.css";
import { Articles } from "../../Models/Articles";
import { useParams } from 'react-router-dom';
import { fetchArticle } from "../../services/ArticleService";

const ArticleDetails: React.FC = () =>{
    const [article, setArticle] = useState<Articles>();
    const { id_article } = useParams();

    useEffect(()=> {
        const fetchArticleClient = async () =>{
            try {
                const article = await fetchArticle(id_article as string);
                if (article === "Internal servor error !") {
                    console.log("Error Serveur!");
                    return;
                }
                setArticle(article as Articles);
            }
            catch (err) {
                console.log(err);
            }
        }

        fetchArticleClient();  
    },[]);

    return(
        <div>
            <h1>Artcile</h1>
            <div className="product-grid">
            <p>{article?.name}</p>
        </div>


        </div>
    )
}

export default ArticleDetails;