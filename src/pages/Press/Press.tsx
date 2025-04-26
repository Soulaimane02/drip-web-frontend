import React, { useEffect, useState } from "react";
import "./Press.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { User } from "../../Models/User";
import { fetchUser } from "../../services/UserService";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const Press: React.FC = () => {
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
      <div className="press-container">
        <h1 className="press-title">Presse</h1>
        <div className="press-section">
          <h3>Ils parlent de nous</h3>
          <p>Drip a été repéré par plusieurs médias pour son approche fresh de la mode circulaire.</p>
        </div>
        <div className="press-section">
          <h3>Dossier de presse</h3>
          <p>Besoin de plus d’infos ? Contacte notre équipe presse pour recevoir notre kit média.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Press;
