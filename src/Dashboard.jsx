import { NavLink } from "react-router-dom";
import {FaBuilding, FaCalendar, FaClipboard, FaMoneyBill, FaTachometerAlt, FaUser} from "react-icons/fa"

const AdminSidebar= () => {
    return ( 
        <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-74">
            <div className="bg-teal-600 h-12 flex items-center justify-center">
            <h2 className="text-xl text-center font-pacific">Digittify Employment</h2>
            </div>
            <div>
                <NavLink to="/admin-dashboard">
                <div className={`flex space-x-4 px-4 py-3 mx-1.5 hover:ml-4 items-center rounded hover:bg-teal-500 transform transition-all ease-in-out duration-700`}>
                  <FaTachometerAlt/>
                  <span>Dashboard</span>
                </div>
                </NavLink>
                <NavLink to="/admin-dashboard/employees">
                <div className="flex space-x-4 px-4 py-3 mx-1.5 hover:ml-4 items-center rounded hover:bg-teal-500 transform transition-all ease-in-out duration-700">
                  <FaUser/>
                  <span>Employee</span>
                </div>
                </NavLink>
                <NavLink to="/admin-dashboard/departments">
                <div className="flex space-x-4 px-4 py-3 mx-1.5 hover:ml-4 items-center rounded hover:bg-teal-500 transform transition-all ease-in-out duration-700">
                  <FaBuilding/>
                  <span>Department</span>
                </div>
                </NavLink>
                <NavLink to="/admin-dashboard/leaves">
                <div className="flex space-x-4 px-4 py-3 mx-1.5 hover:ml-4 items-center rounded hover:bg-teal-500 transform transition-all ease-in-out duration-700">
                  <FaCalendar/>
                  <span>Leave</span>
                </div>
                </NavLink>
                <NavLink to="/admin-dashboard/payroll">
                <div className="flex space-x-4 mx-1.5 hover:ml-4  px-4 py-3 items-center rounded hover:bg-teal-500 transform transition-all ease-in-out duration-700">
                  <FaMoneyBill/>
                  <span>Payroll</span>
                </div>
                </NavLink>
                <NavLink to="/admin-dashboard/settings">
                <div className="flex space-x-4 mx-1.5 hover:ml-4 px-4 py-3 items-center rounded hover:bg-teal-500 transform transition-all ease-in-out duration-700">
                  <FaClipboard/>
                  <span>Settings</span>
                </div>
                </NavLink>
            </div>
        </div>
     );
}
 
export default AdminSidebar;