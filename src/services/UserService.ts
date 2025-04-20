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

export const uptadeUser = async (id: string, data: any, isMultipart = false) => {
    try {
        const token = localStorage.getItem("token");

        const response = await fetch(`http://localhost:3000/users/${id}`, {
            method: "PUT",
            headers: {
                ...(isMultipart ? {} : {
                    "Content-Type": "application/json"
                }),
                Authorization: `Bearer ${token}`
            },
            body: isMultipart ? data : JSON.stringify(data)
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Erreur update user", error);
        return "Internal server error";
    }
};




export const deleteUser = async (idUser: string) :Promise<void | string> =>{
    try {
        const data = await fetch(`${api}/users/${idUser}` ,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
              },
        });

        if(data.status === 404){
            return "No token"
        }

        await data.json();
        return;
    } catch (error) {
        return "Internal server error"   
    }
}