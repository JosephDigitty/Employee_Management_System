import { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AddSalary = () => {
    const navigate = useNavigate()
    const [departments, setdepartments] = useState([])
    const [employees, setEmployees] = useState([])
    const [employee, setEmployee] = useState({
        name: "",
        dob: "",
        maritalStatus: "",
        designation: "",
        salary: "",
        department: "",
        employeeId: ""
    })
    const [loading, setLoading] = useState(false)
    const {id} = useParams()

    useEffect(() => {
            const getDepartments = async () => {
                const departments = await fetchDepartments()
            setdepartments(departments)
            }
            getDepartments()
            console.log(departments)
        }, [])
        useEffect(() => {
            console.log(departments);
          }, [departments]);
 
    useEffect(() => {
        const fetchEmployee = async () => {
            setLoading(true)
            try {
                const response = await axios.get(`http://localhost:3001/api/employee/${id}`, {
                    headers: {
                        "Authorization" : `Bearer ${localStorage.getItem("token")}`
                    }
                })
                if(response.data.success) {
                    const employee = response.data.employee
                    setEmployee((prev) => ({...prev, name:employee.userId.name, 
                        dob:employee.dob, maritalStatus:employee.maritalStatus, 
                        designation:employee.designation, salary:employee.salary, 
                        department:employee.department,
                        employeeId:employee.employeeId
                    }))
                    setLoading(false)
                }

            } catch (error) {
                if(error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchEmployee()    
    }, [])
        const handleChange = (e) => {
            const {name ,value} = e.target

            setEmployee((prevData) => ({...prevData, [name]: value}))
            
        }
        const handleDepartment = async (e) => {
            
        }
        const handleSubmit = async(e) => {
            e.preventDefault()
            try {
                const response = await axios.put(`http://localhost:3001/api/employee/${id}`, employee,{
                    headers: {
                        "Authorization" : `Bearer ${localStorage.getItem("token")}`,
                         "Content-Type": "application/json"
                    }
                })
                if(response.data.success) {
                    navigate("/admin-dashboard/Employees")  
                    console.log("button was clicked")
                }
            } catch (error) {
                if(error.response && !error.response.data.sucess){
                    alert(error.response.data.error)
                    console.log(error.response.data.error)
                    console.log("button was clicked")
                }  
            }       
        }
    return ( 
        <>
        { employee ? (
            <div className="max-w-4xl max-auto mt-10 bg-white p-8 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-6">
                Add Salary
            </h2>
            <form onSubmit={handleSubmit} >
                 {/* department */}
                 <div>
                    <label name="department" className="block text-sm font-medium text-gray-700"> Department </label>
                    <select name="department" onChange={handleDepartment} className="mt-1 p-2 block w-full border rounded-md border-gray-300" required>
                        <option value="">Select Department</option>
                        {departments.map((dep) => (
                            <option key={dep._id} value={dep._id}>{dep.department_Name}</option>
                        ))}
                    </select>
                </div>
                {/* employee */}
                 <div>
                    <label name="department" className="block text-sm font-medium text-gray-700"> Employee </label>
                    <select name="department" onChange={handleChange} className="mt-1 p-2 block w-full border rounded-md border-gray-300" required>
                        <option value="">Select Employee</option>
                        {employees.map((emp) => (
                            <option key={emp._id} value={emp._id}>{emp.employeeId}</option>
                        ))}
                    </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* name */}
                    <div>
                    <label className="block text-sm font-medium text-gray-700"> 
                        Name
                    </label>
                    <input 
                    type="text"
                    name="name"
                    value={employee.name}
                    placeholder="insert name"
                    className="mt-1 p-2 block w-full border rounded-md border-gray-300" 
                    required
                    onChange={handleChange}/>
                </div>
               
                {/* Date of Birth */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Date of Birth
                    </label>
                    <input type="date" 
                    name="dob"
                    value={employee.dob.split("T")[0]}
                    placeholder="Insert Date of Birth"
                    className="mt-1 p-2 block w-full border rounded-md border-gray-300" 
                    required
                    onChange={handleChange}/>
                </div>
                
                {/* marital status */}
                <div>
                    <label  className="block text-sm font-medium text-gray-700"
                    value={employee.maritalStatus}
                    > Marital Status </label>
                    <select name="maritalStatus" onChange={handleChange} className="mt-1 p-2 block w-full border rounded-md border-gray-300" required>
                        <option value="">Select Marital Status</option>
                        <option value="married">Married</option>
                        <option value="single">Single</option>
                        <option value="divorced">Divorced</option>
                    </select>
                </div>
                {/* designation */}
                <div>
                    <label className="block text-sm font-medium text-gray-700"> Designation </label>
                    <input type="text" 
                    name="designation"
                    value={employee.designation}
                    onChange={handleChange}
                    placeholder="Insert Designation"
                    className="mt-1 p-2 block w-full border rounded-md border-gray-300" 
                    required/>
                </div>
                {/* salary */}
                <div>
                    <label className="block text-sm font-medium text-gray-700"> Salary </label>
                    <input type="number" 
                    name="salary"
                    value={employee.salary}
                    onChange={handleChange}
                    placeholder="Insert Salary"
                    className="mt-1 p-2 block w-full border rounded-md border-gray-300" 
                    required/>
                </div>
                </div> 
                <button className="px-4 py-1 w-full text-white my-3 bg-teal-600 mr-6 ml-3 rounded-md cursor-pointer hover:bg-teal-800">
                Update Employee
                </button>
            </form>
        </div>
        ): (
            <div className="max-w-4xl max-auto mt-10 bg-white p-8 rounded-md shadow-md">
                <h2 className="text-2xl font-bold mb-6">
                    Employee not found
                </h2>
            </div>
        )}
        </>
        
     );
}
 
export default AddSalary;