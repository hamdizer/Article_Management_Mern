import React, { useState } from "react";
import { addArticle } from "../../services/article.service";
import { useNavigate } from "react-router-dom";
import {getDataFromToken} from "../../utils/JWTUtils";

const AddArticle= () => {
    const currencies= ["TND", "EUR", "USD", "TRY", "GBP"];
    const navigate=useNavigate()
    const [article, setArticle] = useState({
        title: "",
        content: "",
        author:"",
        createdAt:"",
       // pricetn:"",
       // priceeur:"",
       // priceusd:"",
       // pricetry:"",
       // pricegbp:""

    });
    const [image,setImage]=useState();

    const handleChange = (
        e
    ) => {
        const { name, value } = e.target;
        setArticle((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };


    const handleSubmit =  async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image)
        formData.append("title",article?.title)
            formData.append("content",article?.title)
            formData.append("createdAt",new Date().toISOString())

            addArticle(formData)
                .then((response) => {
                    navigate("/articles")
                })
                .catch((err) => {
                    console.log(err);
                });




    };
    /* const handleChangePrice=(event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        var i=0;
        product?.countryPricing&& product?.countryPricing.push({[`price ${i++}`]:event.target.value})
        setProduct(product)

     }*/
    return (
        <div className="flex justify-center items-center min-h-screen ">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-4">Create a New Article</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-700 text-center"
                        >
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={article?.title}
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
                            value={article?.content}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 "
                            required
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="image"
                            className="block text-sm font-medium text-gray-700 text-center"
                        >
                            Image
                        </label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            value={article?.url}
                            onChange={handleImageChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 "
                            required
                        />
                    </div>

                    {/* <div className="mb-4">
                        <label htmlFor="author" className="block font-medium mb-2 text-center">
                            Author
                        </label>
                        <textarea
                            id="author"
                            name="author"
                            value={article?.author}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 text-center"
                            required
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="createdAt" className="block font-medium mb-2 text-center">
                            Author
                        </label>
                        <textarea
                            id="createdAt"
                            name="createdAt"
                            value={article?.createdAt}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 text-center"
                            required
                        ></textarea>
                    </div>*/}
                    {/*<div className="mb-4">
                        <label
                            htmlFor="price"
                            className="block text-sm font-medium text-gray-700 text-center"
                        >
                            Prices
                        </label>
                        /*currencies?.map((currency,index) => (
              <div>
                <label className="block text-sm font-medium text-gray-700 text-center">
                  {currency}
                </label>
                <input
                  type="text"
                  id={`price ${index }`}
                  value={product.countryPricing[`price${index}`]}
                  onChange={handleChangePrice}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
            ))
                        <div>
                            <label className="block text-sm font-medium text-gray-700 text-center">
                                TND
                            </label>
                            <input
                                type="text"
                                id={"pricetn"}
                                name="pricetn"
                                value={article?.pricetn}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 text-center">
                                EUR
                            </label>
                            <input
                                type="text"
                                id={"priceeur"}
                                name="priceeur"
                                value={article?.priceeur}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 text-center">
                                USD
                            </label>
                            <input
                                type="text"
                                id={"priceusd"}
                                name="priceusd"
                                value={article?.priceusb}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 text-center">
                                TRY
                            </label>
                            <input
                                type="text"
                                id={"pricetry"}
                                name="pricetry"
                                value={article?.pricetry}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 text-center">
                                GBP
                            </label>
                            <input
                                type="text"
                                id={"pricegbp"}
                                name="pricegbp"
                                value={article?.pricegbp}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                    </div>*/}
                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Create Article
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddArticle;
