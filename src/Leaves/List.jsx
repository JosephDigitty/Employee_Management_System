import { Link } from "react-router-dom";

const EmployeeLeaves = () => {
    return ( 
        <div className="px-6">
        <div className="text-center">
            <h3 className="text-2xl font-bold">
             Manage Leaves
            </h3>
        </div>
        <div className="flex justify-between items-center">
            <input type="text" placeholder="Search for leaves" className="px-4 py-0.5 border"
            />
            <Link to="/employee-dashboard/add-leave" className="px-4 py-1 bg-teal-600 text-white rounded">
                Add New Leave
            </Link>
        </div>
        </div>
     );
}
 
export default EmployeeLeaves;