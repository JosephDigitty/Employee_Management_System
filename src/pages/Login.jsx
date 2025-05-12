import axios from "axios";
import { useContext, useState } from "react";
import { useAuth } from "../Context/authContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const {login} = useAuth()
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:3001/api/auth/login",
                {
                    email,
                    password
                }
            )
            if(response.data.sucess) {
                login(response.data.user)
                localStorage.setItem("token", response.data.token)
                if(response.data.user.role === "admin") {
                    navigate("/admin-dashboard")
                    console.log(response)
                } else {
                    navigate("/employee-dashboard")
                }
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                setError(error.response.data.error)
            } else {
                setError("Failed to login. Please try again.")
            }
        
            
        }
        console.log("Login with email:", email, "password:", password)
    }
    return ( 
        <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from from-teal-600 from 
        from-50% to-gray-100 to-50% space-y-6
        ">
            <h2 className="font-sevillana text-3xl text-white">
            Employee Management System,
            </h2>
            <div className="border-gray-200 shadown-2xl shadow-gray-200 p-8 w-90 bg-white">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                {error && 
                    <p className="text-red-500">
                       {error}
                    </p>
                }
                <form onSubmit={handleSubmit} className=""> 
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
               <div className="mb-4 flex items-center justify-between">
                <label className="inline-flex items-center">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600" />
                    <span className="ml-2 text-sm text-gray-700">Remember me</span>

                </label>
                <a href="" className="text-teal-600">
                Forgot Password
                </a>
               </div>
               <div className="mb-4">
                <button
                type="submit"
                className="w-full bg-teal-600 text-white py-2 rounded cursor-pointer transform transition-all ease-in-out duration-300 hover:bg-black"
                >
                    Login
                </button>

               </div>
            </form>
            </div>
            
            
            
            
        </div>
     );
}
 
export default Login ;
