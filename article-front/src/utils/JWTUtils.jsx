import { jwtDecode } from "jwt-decode";

export const getDataFromToken=(token)=>{
    const decodedToken = jwtDecode(token);
    return decodedToken;
}