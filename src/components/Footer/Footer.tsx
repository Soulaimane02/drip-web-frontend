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
          <h3 className="footer-title">Notre Idéologie</h3>
          <ul className="footer-list">
            <li><span className="footer-link">Style sans compromis</span></li>
            <li><span className="footer-link">Authenticité avant tout</span></li>
            <li><span className="footer-link">Mode pour tous</span></li>
            <li><span className="footer-link">Respect & durabilité</span></li>
            <li><span className="footer-link">Exprime ton Drip</span></li>
          </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">Support</h3>
            <ul className="footer-list">
              <li><a href="/faq" className="footer-link">FAQ</a></li>
              <li><a href="/delivery" className="footer-link">Livraison</a></li>
              <li><a href="/returns" className="footer-link">Retours</a></li>
              <li><a href="/contact" className="footer-link">Contact</a></li>
              <li><a href="/privacy" className="footer-link">Confidentialité</a></li>
            </ul>
            </div>

            <div className="footer-column">
              <h3 className="footer-title">À propos</h3>
              <ul className="footer-list">
                <li><a href="/mission" className="footer-link">Notre mission</a></li>
                <li><a href="/sustainability" className="footer-link">Éco-responsabilité</a></li>
                <li><a href="/press" className="footer-link">Presse</a></li>
                <li><a href="/careers" className="footer-link">Recrutement</a></li>
                <li><a href="/news" className="footer-link">Actus</a></li>

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