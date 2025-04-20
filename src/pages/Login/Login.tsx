import { useNavigate } from "react-router";
import { login } from "../../services/AuthService";
import "./Login.css"
import React, { useState } from "react"
import Button from "../../components/Button/Button";
import { toast } from "sonner";
import { Console } from "console";


const Login: React.FC = () => {
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) =>{
        e.preventDefault();

        if(!password){
            return
        }

        if(!email){
            return
        }

        try {
            const token = await login(email, password);
            switch (token) {
                case "email deja existant !":
                    toast.error("Cet email existe déjà !");
                    break;
                case "Internal servor error !":
                    toast.error("Erreur serveur interne, réessayez plus tard.");
                    break;
                case "Token non existant !":
                    toast.error("Identifiants incorrects", {
                        description: "Vérifie bien ton adresse email et ton mot de passe.",
                        });                  
                        break;
                default:
                localStorage.setItem("token", token);
                  navigate("/");
              }
            
        } catch (error) {
            toast.error("Erreur lors de la connexion !");
            return "Internal server error"
            
        }



    }
    return (
        <div className="inscription-background">
        <div className="container-central">
          <form className="form-action" onSubmit={handleSubmit}>
            <h1>Connexion - DRIP</h1>
  
          <label htmlFor="email">Mail :</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
  
            <Button text="Se connecter" variant="secondary" type="submit" />
          </form>
        </div>
      </div>
    )

}
export default Login;



