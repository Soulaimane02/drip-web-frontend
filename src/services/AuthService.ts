import { User } from "../Models/User";
import { api } from "../utils/base_url_api";

export const register = async (email: string, firstName: string, lastName: string, profilePicture: File, password: string): Promise<string> => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("profilePicture", profilePicture);
    formData.append("password", password);
  
    try {
      const response = await fetch(`${api}/auth/register`, {
        method: "POST",
        body: formData,
      });
  
      if (response.status === 409) 
        return "email deja existant !";
      if (response.status === 500) 
        return "Internal servor error !";
      if (response.status === 401) 
        return "Token non existant !";
  
      const data = await response.json();
      return data.token;
    } catch (err) {
      return "Internal servor error !";
    }
};

export const login = async (email : string, password : string) :Promise<string> =>{
    try {
        const logData = await fetch(`${api}/auth/login`,{
            method: "POST",
            headers: {"Content-Type": "application/json",},
            body : JSON.stringify({email, password})
        });
        if (logData.status === 409) 
            return "email deja existant !";
        if (logData.status === 500) 
            return "Internal servor error !";
        if (logData.status === 401) 
            return "Token non existant !";
        const logDataJson = await logData.json();
        return logDataJson.token;       
    } catch (error) {
        return "Internal server error !"
    }
}
  