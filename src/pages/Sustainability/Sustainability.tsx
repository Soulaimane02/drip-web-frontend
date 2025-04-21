import React, { useEffect, useState } from "react";
import "./Sustainability.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { User } from "../../Models/User";
import { fetchUser } from "../../services/UserService";

const Sustainability: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadFetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return setUser(null);
        const fetchUserByToken = await fetchUser(token);
        if (fetchUserByToken === "No token") return setUser(null);
        setUser(fetchUserByToken as User);
      } catch {
        setUser(null);
      }
    };
    loadFetchUser();
  }, []);

  return (
    <div>
      <Navbar user={user} showSearch={false} />
      <div className="sustainability-container">
        <h1 className="sustainability-title">Éco-responsabilité</h1>
        <div className="sustainability-section">
          <h3>Réduire l’impact</h3>
          <p>Drip s’engage à limiter son empreinte carbone via des emballages recyclés et une logistique optimisée.</p>
        </div>
        <div className="sustainability-section">
          <h3>Consommer mieux</h3>
          <p>Chaque achat encourage la seconde main et une consommation plus responsable de la mode.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Sustainability;
