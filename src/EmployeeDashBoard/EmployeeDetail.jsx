
import { FaUser } from "react-icons/fa";
import { useAuth } from "../Context/authContext";

const EmployeeDetails = () => {
    const {user} = useAuth()	
    return ( 
         <div className="rounded flex bg-white">
            <div className={`text-3xl flex justify-center bg-teal-500 items-center text-white px-4`}>
                <FaUser/>
            </div>
            <div className="pl-4 py-1">
                <p className="text-lg font-semibold">
                    Welcome back
                </p>
                <p className="text-xl font-bold">
                    {user.name}
                </p>
            </div>
        </div>
     );
}
 
export default EmployeeDetails;