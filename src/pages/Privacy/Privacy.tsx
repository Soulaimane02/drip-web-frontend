import React, { useEffect, useState } from "react";
import "./Privacy.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { User } from "../../Models/User";
import { fetchUser } from "../../services/UserService";

const Privacy: React.FC = () => {
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
      <div className="privacy-container">
        <h1 className="privacy-title">Confidentialité</h1>
        <div className="privacy-section">
          <h3>Protection de tes données</h3>
          <p>On collecte uniquement ce qui est nécessaire pour assurer ton expérience sur Drip. Jamais plus.</p>
        </div>
        <div className="privacy-section">
          <h3>Utilisation</h3>
          <p>On utilise tes infos pour t’envoyer tes commandes, te notifier et améliorer la plateforme.</p>
        </div>
        <div className="privacy-section">
          <h3>Partage</h3>
          <p>On ne revend pas tes données. Jamais. Et on bosse qu’avec des services sécurisés.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Privacy;
