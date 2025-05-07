import React, { useEffect, useState } from "react";
import "./Sustainability.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { User } from "../../Models/User";
import { fetchUser } from "../../services/UserService";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const Sustainability: React.FC = () => {
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
