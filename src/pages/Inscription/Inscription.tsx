import React, { useState } from "react";
import "./Inscription.css";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router";
import { register } from "../../services/AuthService";
import { toast } from "sonner";


const Inscription: React.FC = () => {
  const navigate = useNavigate();
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [pp, setPp] = useState<File | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/;



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailRegex.test(email)) {
        toast.error("Email invalide !");
        return;
      }
      
      if (!passwordRegex.test(password)) {
        toast.error("Le mot de passe doit contenir une majuscule, une minuscule, un chiffre, un caractère spécial et faire au moins 8 caractères.");
        return;
      }
      
      if (password !== confirmPassword) {
        toast.error("Les mots de passe ne correspondent pas.");
        return;
      }
      
      if (!pp) {
        toast.error("Veuillez ajouter une photo de profil.");
        return;
      }
      

    try {
      const token = await register(email, prenom, nom, pp, password);
      switch (token) {
        case "email deja existant !":
          toast.error("Cet email est déjà utilisé !");
          break;
        case "Internal servor error !":
          toast.error("Erreur serveur interne, réessaie plus tard.");
          break;
        default:
          localStorage.setItem("token", token);
          navigate("/");
      }
      
    } catch (err) {
        toast.error("Erreur lors de l'inscription !");
        return "internal server error !";    }
  };

  return (
    <div className="inscription-background">
      <div className="container-central">
        <form className="form-action" onSubmit={handleSubmit}>
          <h1>Inscription - DRIP</h1>

        <label htmlFor="email">Mail :</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="nom">Nom :</label>
          <input
            type="text"
            name="nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />

          <label htmlFor="prenom">Prénom :</label>
          <input
            type="text"
            name="prenom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            required
          />

          <label htmlFor="pp">Photo de profil :</label>
          <input
            type="file"
            name="pp"
            accept="image/*"
            onChange={(e) => setPp(e.target.files?.[0] || null)}
            required
          />

          <label htmlFor="password">Mot de passe :</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label htmlFor="confirmPassword">Confirmer votre mot de passe :</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <Button text="S'inscrire" variant="secondary" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default Inscription;
