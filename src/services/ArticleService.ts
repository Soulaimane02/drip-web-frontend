import { Articles } from '../Models/Articles';

const api = process.env.REACT_APP_SECRET_IP as string;


export const fetchArticles = async (): Promise<Articles[] | string> =>  {
    try {
        const data = await fetch(`${api}/articles/`, {
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
        const data = await fetch(`${api}/articles/${id_article}`, {
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



