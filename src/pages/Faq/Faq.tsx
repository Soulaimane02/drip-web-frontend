import React, { use, useEffect, useState } from "react";
import "./Faq.css";
import Navbar from "../../components/Navbar/Navbar";
import { User } from "../../Models/User";
import { fetchUser } from "../../services/UserService";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const Faq: React.FC = () => {
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
    <Navbar user={user} showSearch={false}></Navbar>

    <div className="faq-container">
      <h1 className="faq-title">FAQ</h1>
      <div className="faq-item">
        <h3>Comment fonctionne Drip ?</h3>
        <p>Drip te permet d'acheter et vendre du style validé. Chaque article est vérifié avant expédition.</p>
      </div>
      <div className="faq-item">
        <h3>Les articles sont-ils neufs ?</h3>
        <p>Certains oui, d'autres sont d’occasion mais toujours en excellent état. C’est précisé sur chaque fiche produit.</p>
      </div>
      <div className="faq-item">
        <h3>Puis-je retourner un article ?</h3>
        <p>Oui, tu as 14 jours après réception pour faire un retour si l'article ne correspond pas.</p>
      </div>
      <div className="faq-item">
        <h3>Comment contacter le support ?</h3>
        <p>Tu peux nous écrire via la page <a href="/contact">Contact</a> ou sur nos réseaux.</p>
      </div>
    </div>
    <Footer></Footer>
    </div>
  );
};

export default Faq;
