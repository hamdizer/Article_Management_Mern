import { useEffect, useState } from "react";
import { Register } from "../../services/auth.service";
import { isUserExists } from "../../services/user.service";
import { Link,useNavigate } from "react-router-dom";

const RegisterUser = (props) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [telNumber, setTelNumber] = useState("");
    const [userError, setUserError] = useState("");

    const [passwordsError,setPasswordsError]=useState("")
    const navigate=useNavigate()


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };


    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };
    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };
    const handleTelNumberChange = (e) => {
        setTelNumber(e.target.value);
    };
    const handlePasswordConfirmChange = (
        e
    ) => {
        setPasswordConfirm(e.target.value);
    };

    const handleSubmit =async (e) => {
        e.preventDefault();
        const data={firstName:firstName,lastName:lastName,email:email,password:password,passwordConfirm:passwordConfirm,
            tel_number:parseInt(telNumber)}
        if(password!==passwordConfirm){
            setPasswordsError("Passwords must be equals")
        }
        const exists=await isUserExists(email)
        if(exists.data===false){
            setUserError("")
            await Register(data)
            navigate("/login")
        }
        else setUserError("User Already Exits")
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-4">Registration</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="firstName"
                            className="block text-sm font-medium text-gray-700"
                        >
                            FirstName
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            className="mt-1 p-2 w-full rounded border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="FirstName"
                            value={firstName}
                            onChange={handleFirstNameChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="lastName"
                            className="block text-sm font-medium text-gray-700"
                        >
                            LastName
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            className="mt-1 p-2 w-full rounded border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="LastName"
                            value={lastName}
                            onChange={handleLastNameChange}
                            required
                        />
                    </div>
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
                        {userError&& <p style={{color:"red",fontWeight:"bold",textAlign:"center"}}>{userError}</p>}

                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="tel"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Phone Number
                        </label>
                        <input
                            type="number"
                            id="tel"
                            className="mt-1 p-2 w-full rounded border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Phone Number"
                            value={telNumber}
                            onChange={handleTelNumberChange}
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
                    <div className="mb-4">
                        <label
                            htmlFor="passwordConfim"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password Confirmation
                        </label>
                        <input
                            type="password"
                            id="passwordConfirmation"
                            className="mt-1 p-2 w-full rounded border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Password Confirmation"
                            value={passwordConfirm}
                            onChange={handlePasswordConfirmChange}
                            required
                        />
                        {passwordsError&& <p style={{color:"red",fontWeight:"bold",textAlign:"center"}}>{passwordsError}</p>}
                    </div>
                    <div className="mt-4">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                        >
                            Register
                        </button>
                        <p  className=" float-left">Already Member</p>
                        <Link className="float-right " to="/login">Login</Link>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default RegisterUser;
