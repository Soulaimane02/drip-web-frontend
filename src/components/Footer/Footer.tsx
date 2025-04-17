import React from "react";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-column">
            <h3 className="footer-title">Drip</h3>
            <p className="footer-description">
              La plateforme ultime pour choper du style à prix cassé. Du vrai drip, validé et éco.
            </p>
            <div className="footer-social">
              <a href="#" className="social-link">
                <Facebook size={18} />
              </a>
              <a href="#" className="social-link">
                <Instagram size={18} />
              </a>
              <a href="#" className="social-link">
                <Twitter size={18} />
              </a>
              <a href="#" className="social-link">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">Catégories</h3>
            <ul className="footer-list">
              <li><a href="#" className="footer-link">Homme</a></li>
              <li><a href="#" className="footer-link">Femme</a></li>
              <li><a href="#" className="footer-link">Enfant</a></li>
              <li><a href="#" className="footer-link">Accessoires</a></li>
              <li><a href="#" className="footer-link">Maison</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">Support</h3>
            <ul className="footer-list">
              <li><a href="#" className="footer-link">FAQ</a></li>
              <li><a href="#" className="footer-link">Livraison</a></li>
              <li><a href="#" className="footer-link">Retours</a></li>
              <li><a href="#" className="footer-link">Contact</a></li>
              <li><a href="#" className="footer-link">Confidentialité</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">À propos</h3>
            <ul className="footer-list">
              <li><a href="#" className="footer-link">Notre mission</a></li>
              <li><a href="#" className="footer-link">Éco-responsabilité</a></li>
              <li><a href="#" className="footer-link">Presse</a></li>
              <li><a href="#" className="footer-link">Recrutement</a></li>
              <li><a href="#" className="footer-link">Actus</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-copyright">
          <p className="copyright-text">
            &copy; {new Date().getFullYear()} Drip. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;