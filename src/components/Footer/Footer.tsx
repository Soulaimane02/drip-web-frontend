import React from "react";
import "./Footer.css";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <ul>
            <li><a href="/about">À propos</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/contrat">Conditions d'utilisation</a></li>
            <li><a href="/confidentiality">Politique de confidentialité</a></li>
          </ul>
        </div>
        
        <div className="footer-social">
        <ul>
            <li>
            <a href="https://www.facebook.com/vinted/" target="_blank" rel="noopener noreferrer">
                <FaFacebook size={24} color="white" />
            </a>
            </li>
            <li>
            <a href="https://www.instagram.com/vinted/" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={24} color="white" />
            </a>
            </li>
            <li>
            <a href="https://x.com/vinted" target="_blank" rel="noopener noreferrer">
                <FaTwitter size={24} color="white" />
            </a>
            </li>
        </ul>
        </div>

        
        <div className="footer-copyright">
          <p>&copy; {new Date().getFullYear()} Drip. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
