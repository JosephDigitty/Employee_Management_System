import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddDepartment = () => {
    
    const [department, setdepartment] = useState({
        department_Name: "",
        description: ""
    })
    const navigate = useNavigate()
    const handleChange = (e) => {
        const {name ,value} = e.target
        setdepartment({...department, [name]: value})
    }
    const handleSubmit = async(e) => {
        e.preventDefault()
        // Add department to the database
        try {
            const response = await axios.post("http://localhost:3001/api/department/add", department,{
                headers: {
                    "Authorization" : `Bearer ${localStorage.getItem("token")}`,
                }
            })
            if(response.data.success) {
                navigate("/admin-dashboard/departments")
                alert("Department added successfully")
                setdepartment({
                    department_Name: "",
                    description: ""
                })
            }
        } catch (error) {
            if(error.response && !error.response.data.sucess){
                alert(error.response.data.error)
                console.log(error.response.data.error)
            }
            
        }
            console.log(department)    
    }
    return ( 
        <div>
            <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
                <h3 className="text-3xl font-bold mb-6">
                    Add Department
                </h3>
                {/* Form to add new department */}
                <form action="" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="Department Name"
                        className="text-sm font-medium text-gray-700"
                        >
                            Department Name
                        </label>
                        <input type="text"  name="department_Name" placeholder="New dept Name" required
                        onChange={handleChange}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <label htmlFor="Description"
                    className="text-sm font-medium text-gray-700"
                    >
                        Description
                    </label>
                    <textarea type="text"  name="description" placeholder="Description"
                    className="mt-1 w-full p-2 border border-gray-300 block rounded-md"
                    onChange={handleChange}
                    required/>
                    <button type="submit"
                    className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded"
                    >
                        Add Department
                    </button>
                </form>
            </div>
        </div>
     );
}
 
export default AddDepartment;