import { Outlet } from "react-router-dom";
import EmployeeSidebar from "../EmployeeDashBoard/EmployeeSidebar";
import Navbar from "../Navbar";

const EmployeeDashboard = () => {
    return ( 
         <div className="flex">
            <EmployeeSidebar/>
            <div className="flex-1 ml-74 bg-gray-100 h-screen ">
                <Navbar/>
                <Outlet/>
            </div>
        </div>
     );
}
 
export default EmployeeDashboard;