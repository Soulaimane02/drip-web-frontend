import React, { useEffect, useState } from "react";
import "./Careers.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { User } from "../../Models/User";
import { fetchUser } from "../../services/UserService";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const Careers: React.FC = () => {
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
      <div className="careers-container">
        <h1 className="careers-title">Recrutement</h1>
        <div className="careers-section">
          <h3>Rejoins la team Drip</h3>
          <p>On cherche des profils passionnés, créatifs et engagés. Le style, c’est notre moteur.</p>
        </div>
        <div className="careers-section">
          <h3>Offres en cours</h3>
          <p>Développeur, UX/UI, marketing… On grandit, et peut-être avec toi. Check nos offres !</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Careers;
