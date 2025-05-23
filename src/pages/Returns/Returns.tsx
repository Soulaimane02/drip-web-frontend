import React, { useEffect, useState } from "react";
import "./Returns.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { User } from "../../Models/User";
import { fetchUser } from "../../services/UserService";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const Returns: React.FC = () => {
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
      <div className="returns-container">
        <h1 className="returns-title">Retours</h1>
        <div className="returns-section">
          <h3>Délais de retour</h3>
          <p>Tu as 14 jours après réception pour changer d’avis et nous renvoyer ton article.</p>
        </div>
        <div className="returns-section">
          <h3>Conditions</h3>
          <p>L’article doit être propre, non porté, avec ses étiquettes d’origine.</p>
        </div>
        <div className="returns-section">
          <h3>Comment procéder ?</h3>
          <p>Écris-nous via la page <a href="/contact">Contact</a> avec ton numéro de commande, et on s’occupe du reste.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Returns;
