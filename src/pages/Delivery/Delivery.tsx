import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Delivery.css";
import { fetchUser } from "../../services/UserService";
import { User } from "../../Models/User";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const Delivery: React.FC = () => {
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
    
    <>
      <Navbar user={user} showSearch={false} />
      <div className="delivery-container">
        <h1 className="delivery-title">Livraison</h1>
        <p>Chez Drip, on s’assure que ton flow arrive vite et en toute sécurité.</p>

        <div className="delivery-section">
          <h3>Délais de livraison</h3>
          <p>Les délais varient entre 2 à 5 jours ouvrés selon ta localisation.</p>
        </div>

        <div className="delivery-section">
          <h3>Frais de port</h3>
          <p>Gratuit dès 60€ d’achat. Sinon, c’est 4.90€ fixe en point relais.</p>
        </div>

        <div className="delivery-section">
          <h3>Suivi de commande</h3>
          <p>Dès que ton article est expédié, tu reçois un lien de suivi par mail.</p>
        </div>

        <div className="delivery-section">
          <h3>Problème de livraison ?</h3>
          <p>Pas de panique. Contacte-nous directement via la page <a href="/contact">Contact</a>.</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Delivery;
