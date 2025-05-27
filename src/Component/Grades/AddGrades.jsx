import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddGrades = () => {
    
    const [grade, setGrade] = useState({
         gradeName: "",
        basicSalary: 0,
        housingAllowance:0,
        wardrobeAllowance:0,
        transportAllowance:0,
        medicalAllowance:0
    })
    const navigate = useNavigate()
    const handleChange = (e) => {
        const {name ,value} = e.target
        setGrade({...grade, [name]: value})
    }
    const handleSubmit = async(e) => {
        e.preventDefault()
        // Add grade to the database
        try {
            const response = await axios.post("http://localhost:3001/api/grade/add", grade,{
                headers: {
                    "Authorization" : `Bearer ${localStorage.getItem("token")}`,
                }
            })
            if(response.data.success) {
                navigate("/admin-dashboard/departments")
                alert("New Grade Successfully Added")
                setGrade({
                    gradeName: "",
                    basicSalary: ""
                })
            }
        } catch (error) {
            if(error.response && !error.response.data.sucess){
                alert(error.response.data.error)
                console.log(error.response.data.error)
            }
            
        }
            console.log(grade)    
    }
    return ( 
        <div>
            <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
                <h3 className="text-3xl font-bold mb-6">
                    Creade New Grading System
                </h3>
                {/* Form to add new department */}
                <form action="" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="Department Name"
                        className="text-sm font-medium text-gray-700"
                        >
                            Grade Name
                        </label>
                        <input type="text"  name="gradeName" placeholder="Grade Name" required
                        onChange={handleChange}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <label 
                    className="text-sm font-medium text-gray-700"
                    >
                        Basic Salary
                    </label>
                    <input type="number"  name="basicSalary" placeholder="Basic Salary"
                    className="mt-1 w-full p-2 border border-gray-300 block rounded-md"
                    onChange={handleChange}
                    required/>
                    
                    <label 
                    className="text-sm font-medium text-gray-700"
                    >
                        Housing Allowance 
                    </label>
                    <input type="number"  name="housingAllowance" placeholder="Housing Allowance "
                    className="mt-1 w-full p-2 border border-gray-300 block rounded-md"
                    onChange={handleChange}
                 />
                    <label 
                    className="text-sm font-medium text-gray-700"
                    >
                        Wardrobe Allowance
                    </label>
                    <input type="number"  name="wardrobeAllowance" placeholder="Wardrobe Allowance"
                    className="mt-1 w-full p-2 border border-gray-300 block rounded-md"
                    onChange={handleChange}
                    />
                    <label 
                    className="text-sm font-medium text-gray-700"
                    >
                        Transport Allowance
                    </label>
                    <input type="number"  name="transportAllowance" placeholder="Transport Allowance"
                    className="mt-1 w-full p-2 border border-gray-300 block rounded-md"
                    onChange={handleChange}
                    />
                    <label 
                    className="text-sm font-medium text-gray-700"
                    >
                        Medical Allowance
                    </label>
                    <input type="number"  name="medicalAllowance" placeholder="Medical Allowance"
                    className="mt-1 w-full p-2 border border-gray-300 block rounded-md"
                    onChange={handleChange}
                    />
                    
                    <button type="submit"
                    className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded"
                    >
                        Create New Grade
                    </button>
                </form>
            </div>
        </div>
     );
}
 
export default AddGrades;