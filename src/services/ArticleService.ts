import { Articles } from '../Models/Articles';
import { api } from '../utils/base_url_api';

export const fetchArticles = async (token: string): Promise<Articles[] | string> => {
    try {
        const data = await fetch(`${api}/articles/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": token,
            },
        });

        const allArticles: Articles[] = await data.json();
        return allArticles;

    } catch (error) {
        return "Internal server error !";
    }
}

export const fetchArticlesByCategorie = async (token: string, id_under_categorie: string): Promise<Articles[] | string> => {
    try {
        const data = await fetch(`${api}/articles/category/${id_under_categorie}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": token,
            },
        });

        const allArticles: Articles[] = await data.json();
        return allArticles;

    } catch (error) {
        return "Internal server error !";
    }
}

export const fetchArticle = async (token: string, id_article: string): Promise<Articles | string> => {
    try {
        const data = await fetch(`${api}/articles/${id_article}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": token,
            },
        });
        const article: Articles = await data.json();
        return article;
    } catch (err) {
        return "Internal server error !";
    }
}
