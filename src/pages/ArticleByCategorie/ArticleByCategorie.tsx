import React, { useEffect } from "react"
import "./ArticleByCategorie.css"
import { Articles } from "../../Models/Articles"
import { useLocation } from "react-router-dom";

const ArticleByCategorie: React.FC = () =>{
    const location = useLocation();
    const subCategoryId = location.state?.subCategoryId;


    useEffect(() => {
        console.log("Sous-catégorie reçue en caché :", subCategoryId);
    }, [subCategoryId]);

    return (
        <div>
            

        </div>
    )
}

export default ArticleByCategorie;