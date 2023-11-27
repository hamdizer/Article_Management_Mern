import axios from "axios";
const token=localStorage.getItem("jwt")

export const getAllUsers = async () => {
    return await axios.get("http://localhost:8000/api/users");
};
export const addUser = async (user) => {
    return await axios.post("http://localhost:8000/users", user, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
export const updateUser = async (idUser,user) => {
    return await axios.post(`http://localhost:8000/users/${idUser}`, user,{headers:{
            Authorization:`Bearer ${token}`
        }})
}

export const deleteUser = async (idUser) => {
    return await axios.delete(`http://localhost:8000/users/${idUser}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
export const getUser = async (email) => {
    return await axios.get(`http://localhost:8000/users/user/${email}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
export const getUserById = async (id) => {
    return await axios.get(`http://localhost:8000/users/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export const isUserExists = async (email) => {
    return await axios.get(`http://localhost:8000/users/exists/${email}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}