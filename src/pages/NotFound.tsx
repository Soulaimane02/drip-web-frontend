import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <h1 className="not-found-code">404</h1>
      <h2 className="not-found-title">Page introuvable</h2>
      <p className="not-found-message">
        Désolé, nous ne pouvons pas trouver la page que vous recherchez.
      </p>
      <button
        className="not-found-button"
        onClick={() => navigate("/")}
      >
        Retour à l'accueil
      </button>
    </div>
  );
}
