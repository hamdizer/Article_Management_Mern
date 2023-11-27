import {getDataFromToken} from "../utils/JWTUtils";
import {getUserById} from "../services/user.service";
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPowerOff} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
const Dashboard=()=>{
    const [user,setUser]=useState( {})
    const navigate=useNavigate()
    const getUserData=async ()=>{
        const id=await getDataFromToken(`${localStorage.getItem("jwt")}`).id
        const userData=  await getUserById(`${id}`)
        setUser(userData.data.user)
    }
    useEffect(() => {
        getUserData()
    }, []);
    return(

        <div className="container mx-auto mt-8">
            <div className="max-w-3xl mx-auto bg-white p-8 shadow">
                <button
                    onClick={() => {localStorage.setItem("jwt","");navigate("/login")}}
                    className="bg-red-500 text-white px-4 py-2 mb-4 float-right "
                >
                    <FontAwesomeIcon icon={faPowerOff} /> Logout

                </button>
                <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>

                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">User Information</h2>
                    <p>Name: {`${user?.firstName}-${user?.lastName}`}</p>
                    <p>Email: {user?.email}</p>
                    <p>Phone number: {user?.tel_number}</p>
                </div>

                <div>
                    <p>You have {user?.articles?.length} articles</p>
                    <h2 className="text-xl font-semibold mb-2">My Articles</h2>
                    <ul>
                        {user?.articles?.map((article) => (
                            <li key={article.id} className="mb-2">
                                <a href={`#`} className="text-blue-500">
                                    {article.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <button className=" bg-green-500 text-white px-4 py-2 mb-4 flex items-center justify-center" ><a href="/articles" >Manage Articles</a></button>
                </div>
            </div>
        </div>
    )
}
export default Dashboard