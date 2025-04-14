import { Articles } from '../Models/Articles';


export const fetchArticles = async (): Promise<Articles[] | string> =>  {
    try {
        const data = await fetch("http://localhost:3000/articles/", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            }
        });

        const  allArticles : Articles[] = await data.json();
        return allArticles;
        
    } catch (error) {
        return "Internal servor error !";
    }
}

export const fetchArticle = async (id_article : string): Promise<Articles | string> => {
    try{
        const data = await fetch(`http://localhost:3000/articles/${id_article}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            }
        });
        const article : Articles = await data.json();
        return article;
    }
    catch(err)
    {
        return "Internal servor error !";
    }
}



