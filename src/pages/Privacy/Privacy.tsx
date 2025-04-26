import React, { useEffect, useState } from "react";
import "./Privacy.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { User } from "../../Models/User";
import { fetchUser } from "../../services/UserService";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const Privacy: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);


  useEffect(() => {
    const loadFetchUser = async () => {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            setUser(null);
            setIsLoadingUser(false);
            return;
          }
      
          const fetchUserByToken = await fetchUser(token);
          if (fetchUserByToken === "No token") {
            setUser(null);
            setIsLoadingUser(false);
            return;
          }
      
          setUser(fetchUserByToken as User);
        } catch (error) {
          setUser(null);
        } finally {
          setIsLoadingUser(false);
        }
      };
      

    loadFetchUser();
  }, []);

  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoadingUser && user === null) {
        toast.info("Session expirée ou token invalide");
        navigate("/login");
      }
    }, [user, navigate]);

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
