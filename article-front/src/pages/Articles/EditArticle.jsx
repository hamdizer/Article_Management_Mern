import React, { useEffect, useState } from "react";
import {
    addArticle,
    getArticle,
    updateArticle,
} from "../../services/article.service";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {getDataFromToken} from "../../utils/JWTUtils";

const EditArticle = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [article, setArticle] = useState({
        title: "",
        content: "",
        author:"",
        createdAt:"",

    });

    useEffect(() => {
        getArticle(`${location.state}`)
            .then((response) => {
                delete response.data.article._id;
                delete response.data.article.__v;
                setArticle(response.data.article)



            })
            .catch((err) => {
                console.log(err);
            });
    }, []);



    const handleChange = (
        e
    ) => {
        const { name, value } = e.target;
        setArticle((prevArticle) => ({
            ...prevArticle,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const articleData={
           // product:{
                title:article?.title,
                content:article?.content,
                author:getDataFromToken(localStorage.getItem("jwt")).id,
                createdAt:article?.createdAt,

        }
      await  updateArticle(location.state, articleData)
            .then((response) => {
                navigate(-1);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const currentDate = new Date(article.createdAt);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const formattedDate = currentDate.toLocaleDateString('en-US', options);


    return (
        <div className="flex justify-center items-center min-h-screen ">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-4">Edit Article</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="sku"
                            className="block text-sm font-medium text-gray-700 text-center"
                        >
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            defaultValue={article?.title}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 "
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="content"
                            className="block text-sm font-medium text-gray-700 text-center"
                        >
                            Content
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            defaultValue={article?.content}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 "
                            required
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="description"
                            className="block font-medium mb-2 text-center"
                        >
                            Created At
                        </label>
                        <input
                            id="content"
                            name="content"
                            disabled
                            value={formattedDate}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 text-center"
                            required
                            readOnly={true}
                        ></input>
                    </div>
                    <img src={article?.imageURL} />

                    <div className="text-center">
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Edit Article
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditArticle;
