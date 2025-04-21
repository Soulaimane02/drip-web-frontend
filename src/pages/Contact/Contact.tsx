import React, { useEffect, useState } from "react";
import "./Contact.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { User } from "../../Models/User";
import { fetchUser } from "../../services/UserService";

const Contact: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadFetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setUser(null);
          return;
        }

        const fetchUserByToken = await fetchUser(token);
        if (fetchUserByToken === "No token") {
          setUser(null);
          return;
        }

        setUser(fetchUserByToken as User);
      } catch (error) {
        setUser(null);
      }
    };

    loadFetchUser();
  }, []);

  return (
    <div>
      <Navbar user={user} showSearch={false} />
      <div className="contact-container">
        <h1 className="contact-title">Contact</h1>
        <div className="contact-method">
          <h3>Par mail</h3>
          <p>Tu peux nous écrire à : <strong>support@dripstyle.fr</strong></p>
        </div>
        <div className="contact-method">
          <h3>Instagram</h3>
          <p>DM-nous sur <strong>@drip.style</strong> pour une réponse rapide.</p>
        </div>
        <div className="contact-method">
          <h3>Horaires</h3>
          <p>On est là du lundi au vendredi, de 10h à 18h.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
