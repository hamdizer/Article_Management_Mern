import { useState } from "react";
import { Login } from "../../services/auth.service";
import { getUser } from "../../services/user.service";
import { Link, useNavigate } from "react-router-dom";
const LoginUser = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [credentialsError, setCredentialsError] = useState("");

    const navigate=useNavigate()
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) setEmailError("Email is Required");
        if (!password) setPasswordError("Password is Required");
        if (email && password)
            await Login({email: email, password: password}).then((response) => {
                localStorage.setItem('jwt', response.data.accessToken)


                navigate("/dashboard")


            })
                .catch(err => {
                    setCredentialsError("Invalid Credentials")
                    console.log(err)
                });
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="mt-1 p-2 w-full rounded border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Email"
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="mt-1 p-2 w-full rounded border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />

                    </div>
                    <div className="mt-4">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                        >
                            Login
                        </button>
                        {credentialsError&& <p style={{color:"red",fontWeight:"bold",textAlign:"center"}}>{credentialsError}</p>}

                    </div>
                    <p  className=" float-left">Not a Member?</p>
                    <Link className="float-right" to="/register">Register</Link>
                </form>
            </div>
        </div>
    );
};

export default LoginUser;
