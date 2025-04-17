import { useNavigate } from "react-router";
import { login } from "../../services/AuthService";
import "./Login.css"
import React, { useState } from "react"
import Button from "../../components/Button/Button";
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
                  break;
                case "Internal servor error !":
                  break;
                case "Token non existant !":
                  break;
                default:
                  navigate("/winLogin");
              }
            
        } catch (error) {
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



