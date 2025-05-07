import React, { useState } from 'react';
import './AddArticle.css';
import Color from '../../../utils/enums/color';
import Condition from '../../../utils/enums/condition';
import Size from '../../../utils/enums/size';
import { addArticle } from '../../../services/ArticleService';
import { Articles } from '../../../Models/Articles';

const AddArticlePage = () => {
    const [article, setArticle] = useState<Articles>({
        id: "",
        name: "",
        description: "",
        price: 0,
        pictures: [],
        likes: 0,
        views: 0,
        condition: "New",
        categories: [],
        userId: localStorage.getItem('userId') || "",
        size: undefined,
        color: undefined,
    });

    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setSelectedFiles(Array.from(e.target.files));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        if (!token) {
            console.error("Token non trouvé");
            return;
        }

        const picturesArray: string[] = selectedFiles.map(file => URL.createObjectURL(file));
        const articleToSubmit = { ...article, pictures: picturesArray };

        const result = await addArticle(token, articleToSubmit);
        console.log(result);
    };

    return (
        <div className="add-article-container">
            <h1>Ajouter un article</h1>
            <form className="add-article-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nom de l'article"
                    value={article.name}
                    onChange={(e) => setArticle({ ...article, name: e.target.value })}
                />
                <textarea
                    placeholder="Description"
                    value={article.description}
                    onChange={(e) => setArticle({ ...article, description: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Prix"
                    value={article.price}
                    onChange={(e) => setArticle({ ...article, price: parseFloat(e.target.value) })}
                />
                <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                />
                <input
                    type="text"
                    placeholder="Catégories (séparées par des virgules)"
                    onChange={(e) => setArticle({ ...article, categories: e.target.value.split(',').map(c => c.trim()) })}
                />
                <select
                    value={article.condition}
                    onChange={(e) => setArticle({ ...article, condition: e.target.value as Condition })}
                >
                    <option value="">-- Sélectionnez une condition --</option>
                    {Object.values(Condition).map((cond) => (
                        <option key={cond} value={cond}>{cond}</option>
                    ))}
                </select>
                <select
                    value={article.size || ""}
                    onChange={(e) => setArticle({ ...article, size: e.target.value as Size })}
                >
                    <option value="">-- Sélectionnez une taille --</option>
                    {Object.values(Size).map((size) => (
                        <option key={size} value={size}>{size}</option>
                    ))}
                </select>
                <select
                    value={article.color || ""}
                    onChange={(e) => setArticle({ ...article, color: e.target.value as Color })}
                >
                    <option value="">-- Sélectionnez une couleur --</option>
                    {Object.values(Color).map((color) => (
                        <option key={color} value={color}>{color}</option>
                    ))}
                </select>
                <button type="submit">Ajouter l'article</button>
            </form>
        </div>
    );
};

export default AddArticlePage;