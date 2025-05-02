import { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
    const navigate = useNavigate()
    const [deparments, setdepartments] = useState([])
    const [formData, setFormData] = useState({
    })
    useEffect(() => {
        const getDepartments = async () => {
            const departments = await fetchDepartments()
        setdepartments(departments)
        }
        getDepartments()
        console.log(deparments)
    }, [])
        const handleChange = (e) => {
            const {name ,value, files} = e.target
            if(name === "image") {
                setFormData((prevData) => ({...prevData, [name]: files[0]}))
            } else {
                setFormData((prevData) => ({...prevData, [name]: value}))
            }
        }
        const handleSubmit = async(e) => {
            e.preventDefault()
            // Add department to the database
            const fromDataobj = new FormData()
            Object.keys(formData).forEach((key) => {
                fromDataobj.append(key, formData[key])
            })
            try {
                const response = await axios.post("http://localhost:3001/api/employee/add", fromDataobj,{
                    headers: {
                        "Authorization" : `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "multipart/form-data"
                    }
                })
                if(response.data.success) {
                    navigate("/admin-dashboard/Employees")  
                }
            } catch (error) {
                if(error.response && !error.response.data.sucess){
                    alert(error.response.data.error)
                    console.log(error.response.data.error)
                }  
            }       
        }
    return ( 
        <div className="max-w-4xl max-auto mt-10 bg-white p-8 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-6">
                Add New Employee
            </h2>
            <form onSubmit={handleSubmit} >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* name */}
                    <div>
                    <label className="block text-sm font-medium text-gray-700"> 
        	            Name
                    </label>
                    <input 
                    type="text"
                    name="name"
                    placeholder="insert name"
                    className="mt-1 p-2 block w-full border rounded-md border-gray-300" 
                    required
                    onChange={handleChange}/>
                </div>
                {/* email */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input type="email" 
                    name="email"
                    placeholder="Insert Email"
                    className="mt-1 p-2 block w-full border rounded-md border-gray-300" 
                    required
                    onChange={handleChange}
                    />
                </div>
                {/* employee ID */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Employee ID
                    </label>
                    <input type="text" 
                    name="employeeId"
                    placeholder="Insert Employee ID"
                    className="mt-1 p-2 block w-full border rounded-md border-gray-300" 
                    required
                    onChange={handleChange}
                    />
                </div>
                {/* Date of Birth */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Date of Birth
                    </label>
                    <input type="date" 
                    name="dob"
                    placeholder="Insert Date of Birth"
                    className="mt-1 p-2 block w-full border rounded-md border-gray-300" 
                    required
                    onChange={handleChange}/>
                </div>
                    {/* gender */}
                <div>
                    <label  className="block text-sm font-medium text-gray-700"> Gender </label>
                    <select onChange={handleChange} name="gender" className="mt-1 p-2 block w-full border rounded-md border-gray-300" required>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                {/* marital status */}
                <div>
                    <label  className="block text-sm font-medium text-gray-700"> Marital Status </label>
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
                    onChange={handleChange}
                    placeholder="Insert Designation"
                    className="mt-1 p-2 block w-full border rounded-md border-gray-300" 
                    required/>
                </div>
                {/* department */}
                <div>
                    <label name="department" className="block text-sm font-medium text-gray-700"> Department </label>
                    <select name="department" onChange={handleChange} className="mt-1 p-2 block w-full border rounded-md border-gray-300" required>
                        <option value="">Select Department</option>
                        {deparments.map((dep) => (
                            <option key={dep._id} value={dep._id}>{dep.department_Name}</option>
                        ))}
                    </select>
                </div>
                {/* salary */}
                <div>
                    <label className="block text-sm font-medium text-gray-700"> Salary </label>
                    <input type="number" 
                    name="salary"
                    onChange={handleChange}
                    placeholder="Insert Salary"
                    className="mt-1 p-2 block w-full border rounded-md border-gray-300" 
                    required/>
                </div>
                {/* password */}
                <div>
                    <label className="block text-sm font-medium text-gray-700"> Password </label>
                    <input type="password" 
                    name="password"
                    onChange={handleChange}
                    placeholder="*********"
                    className="mt-1 p-2 block w-full border rounded-md border-gray-300" 
                    required/>
                </div>
                {/* Role */}
                <div>
                    <label name="role" className="block text-sm font-medium text-gray-700"> Role </label>
                    <select name="role" onChange={handleChange} className="mt-1 p-2 block w-full border rounded-md border-gray-300" required>
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="employee">Employee</option>
                    </select>
                </div>
                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-700"> Image </label>
                    <input type="file" 
                    name="image"
                    onChange={handleChange}
                    placeholder="upload Image"
                    accept="image/*"
                    className="mt-1 p-2 block w-full border rounded-md border-gray-300" 
                    />
                </div>
                </div> 
                <button className="px-4 py-1 w-full text-white my-3 bg-teal-600 mr-6 ml-3 rounded-md cursor-pointer hover:bg-teal-800">
                    Add Employee
                </button>
            </form>
        </div>
     );
}
 
export default AddEmployee;