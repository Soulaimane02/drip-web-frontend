import React from "react";
import { Link } from "wouter";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div className="not-found-container">
      <h1 className="not-found-code">404</h1>
      <h2 className="not-found-title">Page introuvable</h2>
      <p className="not-found-message">
        Désolé, nous ne pouvons pas trouver la page que vous recherchez.
      </p>
      <Link href="/">
        <a className="not-found-button">
          Retour à l'accueil
        </a>
      </Link>
    </div>
  );
}