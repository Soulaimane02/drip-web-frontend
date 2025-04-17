import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import Button from "../Button/Button";
import { Search, Menu, X } from "lucide-react";
import { User } from "../../Models/User";
import { Role } from "../../utils/enums/role";


interface NavbarProps {
  user?: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const goToProfile = () => {
    navigate("/profile");
  };

  const renderUserActions = () => {
    if (!user) {
      return (
        <>
          <Button text="S'inscrire" variant="secondary" onClick={() => navigate("/register")} />
          <Button text="Se connecter" onClick={() => navigate("/login")} />
        </>
      );
    }

    return (
      <div className="user-actions">
        {user.role === Role.User && (
          <>
            <Button text="Favoris" variant="secondary" onClick={() => navigate("/favorites")} />
            <Button text="Devenir vendeur" variant="secondary" onClick={() => navigate("/new-seller")} />
          </>
        )}

        {user.role === Role.Seller && (
          <>
            <Button text="Mes Favoris" variant="secondary" onClick={() => navigate("/favorites")} />
            <Button text="Panel Vendeur" variant="secondary" onClick={() => navigate("/seller/panel")} />
          </>
        )}

        {user.role === Role.Admin && (
          <Button text="Panel Admin" variant="secondary" onClick={() => navigate("/admin")} />
        )}

        <Button text="Se déconnecter" variant="secondary" onClick={handleLogout} />

        <div className="profile-wrapper">
          <img
            src={user?.profilePicture || "https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_1280.png"}
            alt="Profil"
            onClick={goToProfile}
            className="profile-pic"
          />
        </div>
      </div>
    );
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-main">
          <div className="logo">
            <a href="/" className="logo-link">
              <img src={process.env.PUBLIC_URL + "/assets/drip.png"} alt="DRIP" className="logo-img" />
            </a>
          </div>

          <div className="nav-center">
            <div className="search-container">
              <input
                type="text"
                placeholder="Rechercher sur Drip..."
                className="search-input"
              />
              <Search className="search-icon" size={18} />
            </div>
          </div>

          <div className="nav-buttons">{renderUserActions()}</div>

          <div className="mobile-menu-button" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          <Menu size={24} />
          </div>
        </div>
                {isMobileMenuOpen && (
          <div className="mobile-menu-dropdown">
            <div className="search-container mobile">
              <input
                type="text"
                placeholder="Rechercher sur Drip..."
                className="search-input"
              />
              <Search className="search-icon" size={18} />
            </div>

            <div className="mobile-buttons">
              {renderUserActions()}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
