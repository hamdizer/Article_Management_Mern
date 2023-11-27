import axios from "axios";
export const Register = async (user) => {
    return await axios.post("http://localhost:8000/users", user);
};
export const Login = async (credentials) => {
    return await axios.post("http://localhost:8000/auth/login",credentials);
};
export const Logout = async () => {
    return await axios.post("http://localhost:8000/auth/logout");
};