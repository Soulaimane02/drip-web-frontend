import React, { useEffect, useState } from "react";
import "./Careers.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { User } from "../../Models/User";
import { fetchUser } from "../../services/UserService";

const Careers: React.FC = () => {
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
