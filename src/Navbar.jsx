import { useNavigate } from "react-router-dom";
import { useAuth } from "./Context/authContext";

const Navbar = () => {
    const navigate = useNavigate()
    const handleLogout = () => {
        logout()
        navigate("/login")
    }
   const  {user, logout} = useAuth()
    return ( 
        <div className="flex items-center text-white justify-between h-12 bg-teal-600" >
            <p>
            { user? `welcome ${user.name}`: 'Welcome Guest' }
            </p>
            <button className="px-4 py-1 bg-teal-700 mr-6 cursor-pointer hover:bg-teal-800"
            onClick={handleLogout}
            >
                Logout
            </button>
        </div>
     );
}
 
export default Navbar;