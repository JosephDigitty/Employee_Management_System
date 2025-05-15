import { useEffect, useState } from "react";
import { useAuth } from "../Context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AddLeave = () => {
    const {user} = useAuth()
    useEffect(() => {
        console.log(user._id)
    },[user])
    const [leave, setLeave] = useState({
       userId: user._id,    
    })
    const handleChange = (e) => {
        const {name ,value} = e.target
        setLeave((prevData) => ({...prevData, [name]: value}))
    }
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log(leave)
         try {
                    const response = await axios.post(`http://localhost:3001/api/leave/add/`, leave,{
                        headers: {
                            "Authorization" : `Bearer ${localStorage.getItem("token")}`
                        }
                    })
                    if(response.data.success) {
                        navigate("/employee-dashboard/leaves")
                        
                    }
    
                } catch (error) {
                    if(error.response && !error.response.data.success) {
                        alert(error.response.data.error)
                    }
                    console.log(error)
                } 
    }
    return ( 
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-6">Request for Leave</h2>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium text-sm mb-2">
                            Leave Type
                        </label>
                        <select className="w-full px-4 py-2 border rounded-md" name="leaveType" onChange={handleChange} required>
                        <option value=""> Select Leave Type</option>
                        <option value="Sick Leave"> Sick Leave</option>
                        <option value="Causal Leave"> Casual Leave</option>
                        <option value="Annual Leave"> Annual Leave</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* form date */}
                        <div>
                            <label className="block text-gray-700 font-medium text-sm mb-2">
                                From Date
                            </label>
                            <input type="date" className="mt-1 p-2 block w-full border border-gray-300 rounded-md" name="startDate" onChange={handleChange} required/>
                        </div>
                        {/* to date */}
                        <div>
                            <label className="block text-gray-700 font-medium text-sm mb-2">
                                To Date
                            </label>
                            <input type="date" className="mt-1 p-2 block w-full border border-gray-300 rounded-md" name="endDate" onChange={handleChange} required/>
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium text-sm mb-2">
                            Description
                        </label>
                        <textarea className="w-full px-4 py-2 border rounded-md" name="reason" onChange={handleChange} required></textarea>
                    </div>
                </div>
                <button type="submit" className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded">Submit</button>
            </form>
        </div>
     );
}
 
export default AddLeave;