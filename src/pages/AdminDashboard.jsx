import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/authContext";
import { useEffect } from "react";
import AdminSidebar from "../Dashboard";
import Navbar from "../Navbar";
import AdminSummarry from "../Component/AdminSummary";


const AdminDashboard = () => {
    const navigate = useNavigate()
    const {user, loading} = useAuth()

    if(loading) {
        return <div>Loadding...........</div>
    }
    if(!loading && !user)  {
        navigate("/login")
    }

    return ( 
        <div className="flex">
            <AdminSidebar/>
            <div className="flex-1 ml-74 bg-gray-100 h-screen ">
                <Navbar/>
                <Outlet/>
            </div>
        </div>
     );
}
 
export default AdminDashboard;