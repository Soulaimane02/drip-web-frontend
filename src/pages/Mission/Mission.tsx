import React, { useEffect, useState } from "react";
import "./Mission.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { User } from "../../Models/User";
import { fetchUser } from "../../services/UserService";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const Mission: React.FC = () => {
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
      <div className="mission-container">
        <h1 className="mission-title">Notre mission</h1>
        <div className="mission-section">
          <h3>Style accessible</h3>
          <p>Chez Drip, on veut que tout le monde puisse s’exprimer à travers son style, sans se ruiner.</p>
        </div>
        <div className="mission-section">
          <h3>Vêtements vérifiés</h3>
          <p>On garantit l’authenticité et la qualité de chaque pièce. Tu reçois du vrai, rien d’autre.</p>
        </div>
        <div className="mission-section">
          <h3>Communauté forte</h3>
          <p>Drip c’est pas juste une boutique, c’est une vibe, une communauté qui vit pour le flow et l’authenticité.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Mission;
