import axios from "axios";
const token=localStorage.getItem("jwt")
export const getAllArticles = async (userId) => {
    return await axios.get(`http://localhost:8000/articles/${userId}` ,{headers:{
            Authorization:`Bearer ${token}`
        }});
};
export const addArticle = async (article) => {
    return await axios.post("http://localhost:8000/articles", article ,{headers:{
            Authorization:`Bearer ${token}`,
            'Content-Type': 'multipart/form-data',

        }});
};
export const updateArticle = async (idArticle,article ) => {
    return await axios.put(`http://localhost:8000/articles/${idArticle}`, article,{headers:{
            Authorization:`Bearer ${token}`
        }});
};
export const deleteArticle = async (idArticle) => {
    return await axios.delete(`http://localhost:8000/articles/${idArticle}`,{headers:{
            Authorization:`Bearer ${token}`
        }});
};
export const getArticle= async (id) => {
    return await axios.get(`http://localhost:8000/articles/article/${id}`,{headers:{
            Authorization:`Bearer ${token}`
        }});
};