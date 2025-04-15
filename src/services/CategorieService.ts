import { Categories } from "../Models/Categorie";


const api = process.env.REACT_APP_SECRET_IP as string;

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

export const fetchByCategorie = async (id_parent : string ) : Promise<Categories[] | string> => {
    try{
        const fetchChildrenCategorie = await fetch(`${api}/categories/children/${id_parent}`,{
            method: "GET",
            headers:{
                "Content-Type": "application/json",
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