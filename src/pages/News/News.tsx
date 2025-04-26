import React, { useEffect, useState } from "react";
import "./News.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { User } from "../../Models/User";
import { fetchUser } from "../../services/UserService";

const News: React.FC = () => {
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
      <div className="news-container">
        <h1 className="news-title">Actus</h1>
        <div className="news-section">
          <h3>Dernières nouveautés</h3>
          <p>Nouvelles marques, drops exclusifs, collabs… Reste à l’affût du drip en temps réel.</p>
        </div>
        <div className="news-section">
          <h3>Événements à venir</h3>
          <p>Pop-ups, défilés, partenariats… Drip est actif dans la vraie vie aussi.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default News;
