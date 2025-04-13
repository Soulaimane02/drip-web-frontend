import { Articles } from '../Models/Articles';


export const fetchArticles = async (): Promise<Articles[] | string> =>  {
    try {
        const data = await fetch("http://localhost:3000/articles/");
        const  allArticles : Articles[] = await data.json();
        return allArticles;
        
    } catch (error) {
        return "Internal servor error !";
    }

}



