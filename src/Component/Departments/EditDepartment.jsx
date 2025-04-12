import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const EditDepartment = () => {
    const {id} = useParams()
    const [department, setDepartment] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
   
    useEffect(() => {
        const fetchDepartments = async () => {
            setLoading(true)
            try {
                const response = await axios.get(`http://localhost:3000/api/department/${id}`, {
                    headers: {
                        "Authorization" : `Bearer ${localStorage.getItem("token")}`
                    }
                })
                if(response.data.success) {
                    setDepartment(response.data.department)
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
        fetchDepartments()    
    }, [])
    const handleChange = (e) => {
        const {name ,value} = e.target
        setDepartment({...department, [name]: value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const response = await axios.put(`http://localhost:3000/api/department/${id}`, department, {
                headers: {
                    "Authorization" : `Bearer ${localStorage.getItem("token")}`
                }
            })
            if(response.data.success) {
                navigate("/admin-dashboard/departments")
                alert("Department updated successfully")
            }
        } catch (error) {
            if(error.response && !error.response.data.success) {
            console.log(error)
        }
    }
}
    
    return ( 
        <>
        {loading ? <h1>Loading...</h1> : 
        <div>
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
            <h3 className="text-3xl font-bold mb-6">
                Edit Department
            </h3>
            {/* Form to add new department */}
            <form action="" onSubmit={handleSubmit} >
                <div>
                    <label htmlFor="Department Name"
                    className="text-sm font-medium text-gray-700"
                    >
                        Department Name
                    </label>
                    <input type="text"  name="department_Name" placeholder="New dept Name" required
                    onChange={handleChange}
                    value={department.department_Name}
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
                value={department.description}
                required/>
                <button type="submit"
                className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded"
                >
                Edit Department
                </button>
            </form>
        </div>
        </div>
        }
        
        </>
     )
}
 
export default EditDepartment;