import { Categories } from "../Models/Categorie";
import { api } from "../utils/base_url_api";



export const fetchAllCategories = async () : Promise<Categories[] | string> =>{
    try{
        const fetchAllCategories = await fetch(`${api}/categories`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            }
        });
        const fetchAllCategorieJson : Categories[] = await fetchAllCategories.json();
        if(fetchAllCategorieJson)
            return fetchAllCategorieJson;
        return "problem fetch api";
    }
    catch(err){
        return "Internal serveur error"
    }
}

export const fetchByCategorie = async (token: string, id_parent : string ) : Promise<Categories[] | string> => {
    try{
        const fetchChildrenCategorie = await fetch(`${api}/categories/children/${id_parent}`,{
            method: "GET",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        });
        const fetchChildrenCategorieJson : Categories[] = await fetchChildrenCategorie.json();
        if(fetchChildrenCategorieJson){
            return fetchChildrenCategorieJson;
        }
        return "problem fetch api";
    }
    catch(err){
        return "Internal serveur error"
    }
}