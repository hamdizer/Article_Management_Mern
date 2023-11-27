import  { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus,faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { deleteArticle,getAllArticles  } from "../../services/article.service";
import { useNavigate } from "react-router-dom";
import { getDataFromToken } from "../../utils/JWTUtils";

const ProductListAdmin = () => {
    const [articles, setArticles] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getAllArticles(`${getDataFromToken(localStorage.getItem("jwt")).id}`)
            .then((response) => {
                setArticles(response.data.articles);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);


    const handleDelete = (id) => {
        deleteArticle(id)
            .then((response) => {
                getAllArticles(`${getDataFromToken(localStorage.getItem("jwt")).id}`)
                    .then((response) => {
                        setArticles(response.data.articles);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="container mx-auto mt-8">
            <button
                onClick={() => navigate("/articles/add")}
                className="bg-green-500 text-white px-4 py-2 mb-4"
            >
                <FontAwesomeIcon icon={faPlus} /> Add
            </button>
            <button
                onClick={() => {localStorage.setItem("jwt","");navigate("/login")}}
                className="bg-red-500 text-white px-4 py-2 mb-4 float-right"
            >
                <FontAwesomeIcon icon={faPowerOff} /> Logout

            </button>
            <table className="min-w-full table-auto">
                <thead>
                <tr>
                    <th className="px-4 py-2">Title</th>
                    <th className="px-4 py-2">Content</th>
                    <th className="px-4 py-2">Image</th>

                    <th className="px-4 py-2">CreatedAt</th>
                    <th className="px-4 py-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {articles.map((row) => (
                    <tr key={row.id}>
                        <td className="border px-4 py-2 text-center">{row.title}</td>
                        <td className="border px-4 py-2 text-center">{row.content}</td>
                        <td className="border px-4 py-2 text-center"><img className="text-center" onClick={()=>window.location=`${row.imageURL}`} width="100px" alt={`image of article ${row.title}`} src={row.imageURL} /></td>
                        <td className="border px-4 py-2 text-center">{new Date(row.createdAt).toLocaleDateString('en-US',  { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
                        }</td>


                        <td className="border px-4 py-2 text-center">
                            <button
                                onClick={() => navigate("/articles/edit", {state:row._id})}
                                className="text-blue-500"
                            >
                                <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button
                                className="text-red-500 ml-2"
                                onClick={() => {
                                    handleDelete(row._id);
                                }}
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductListAdmin;
