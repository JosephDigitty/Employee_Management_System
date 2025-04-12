import { Link } from "react-router-dom";
import DataTable from 'react-data-table-component'
import { columns, DepartmentButtons } from "../../utils/DepartmentHelpers";
import { useEffect, useState } from "react";
import axios from "axios";


const DepartmentList = () => {
    const [department , setdepartment] = useState([])
    const [depLoanding , setDepLoading] = useState(false)
    useEffect(() => {
        const fetchDepartments = async () => {
            setDepLoading(true)
            try {
                const response = await axios.get("http://localhost:3000/api/department", {
                    headers: {
                        "Authorization" : `Bearer ${localStorage.getItem("token")}`
                    }
                })
                if(response.data.success) {
                    let sno = 1
                    const data = await response.data.departments.map((department) => (
                        {
                            _id: department._id,
                            sno:sno++,
                            department_Name: department.department_Name,
                            Action: (<DepartmentButtons _id={department._id}/>)
                        }
                    ))
                    setdepartment(data)
                }
                const data = await response.json()
                console.log(data)
            } catch (error) {
                if(error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
                console.log(error)
            } finally {
                setDepLoading(false)
            }
        }
        fetchDepartments()
    }, [])

    return (
         
        <>
        {depLoanding ? <div>Loading...</div> : 
        <div className="px-6">
        <div className="text-center">
            <h3 className="text-2xl font-bold">
             Manage Departments
            </h3>
        </div>
        <div className="flex justify-between items-center">
            <input type="text" placeholder="Search by Dept name" className="px-4 py-0.5 border"/>
            <Link to="/admin-dashboard/add-new-department" className="px-4 py-1 bg-teal-600 text-white rounded">
                Add New Department
            </Link>
        </div>
        <div className="mt-5">
            <DataTable columns={columns} data={department} />
        </div>

        </div>
        } 
        </>
        
     );
}
 
export default DepartmentList ;