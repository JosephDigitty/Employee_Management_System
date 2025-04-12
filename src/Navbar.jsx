import { useAuth } from "./Context/authContext";

const Navbar = () => {
   const  {user} = useAuth()
    return ( 
        <div className="flex items-center text-white justify-between h-12 bg-teal-600" >
            <p>
            welcome {user.name}
            </p>
            <button className="px-4 py-1 bg-teal-700 mr-6 cursor-pointer hover:bg-teal-800">
                Logout
            </button>
        </div>
     );
}
 
export default Navbar;