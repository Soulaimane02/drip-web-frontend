import { useParams } from "react-router"
import "./SellerDetails.css"
import React, { useEffect, useState } from "react"
import { User } from "../../Models/User";
import { fetchUser } from "../../services/UserService";

const SellerDetails: React.FC = () =>{
    const {id_user} = useParams();
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
    

    return(
        <div>
            <p>{id_user}</p>
            
        </div>
    )
}

export default SellerDetails;