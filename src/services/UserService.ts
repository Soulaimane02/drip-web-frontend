import { User } from "../Models/User";
import { api } from "../utils/base_url_api";

export const fetchUser = async (tokenUser: string) :Promise<User | string> =>{
    try {
        const data = await fetch(`${api}/auth/me/` ,{
            method: "GET",
            headers: {
                "Authorization": `Bearer ${tokenUser}`,
                "Content-Type": "application/json",
              },
        });

        if(data.status === 404){
            return "No token"
        }

        const dataJson: User = await data.json();
        return dataJson;
    } catch (error) {
        return "Internal server error"   
    }
}