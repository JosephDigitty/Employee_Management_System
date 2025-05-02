import { Link } from "react-router-dom";
import DataTable from 'react-data-table-component'
import { useState, useEffect} from "react";
import { EmployeeButtons, columns } from "../../utils/EmployeeHelper";
import axios from "axios";
const EmployeeList = () => {
    const [employees, setEmployees] = useState([])
    const [emloading, setEmloading] = useState(false)
    const [filterEmployee, setFilterEmployee] = useState([])

    useEffect(() => {
            const fetchEmployees = async () => {
                setEmloading(true)
                try {
                    const response = await axios.get("http://localhost:3001/api/employee", {
                        headers: {
                            "Authorization" : `Bearer ${localStorage.getItem("token")}`
                        }
                    })
                    if(response.data.success) {
                        let sno = 1
                        const data = await response.data.employees.map((employee) => (
                            {
                                _id: employee._id,
                                sno:sno++,
                                department_Name: employee.department.department_Name,
                                name: employee.userId.name,
                                dob: new Date(employee.dob).toDateString(),
                                profileImage: <img src={`http://localhost:3001/uploads/${employee.userId.profileImage}`} alt="profile" className="w-10 h-10 rounded-full"/>,
                                Action: (<EmployeeButtons id={employee._id} />),
                            }
                            
                        ))
                        setEmployees(data)
                        setFilterEmployee(data)
                    }
                    const data = await response.data
                    console.log(data)
                } catch (error) {
                    if(error.response && !error.response.data.success) {
                        alert(error.response.data.error)
                    }
                    console.log(error)
                } finally {
                    setEmloading(false)
                }
            }
            fetchEmployees()
        }, [])

        const handleFilter = (e) => {
            const records = employees.filter((emp) => (
                emp.name.toLowerCase().includes(e.target.value.toLowerCase())
            ))
            setFilterEmployee(records)
        }
        

    return ( 
        <div className="px-6">
        <div className="text-center">
            <h3 className="text-2xl font-bold">
             Manage Employee
            </h3>
        </div>
        <div className="flex justify-between items-center">
            <input type="text" placeholder="Search by Employee name" className="px-4 py-0.5 border"
            onChange={handleFilter}
            />
            <Link to="/admin-dashboard/add-employee" className="px-4 py-1 bg-teal-600 text-white rounded">
                Add New Employee
            </Link>
        </div>
        <div className="mt-5">
            
        </div>
            <DataTable  columns={columns} data={filterEmployee} pagination/>
        </div>

     );
}
 
export default EmployeeList;