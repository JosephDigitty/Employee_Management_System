import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EmployeeSingular = () => {
    const [employee, setEmployeee] = useState(null)
    const [loading, setLoading] = useState(false)
    const {id} = useParams();
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
                        setEmployeee(response.data.employee)
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

    return (
        <>
        {employee ? (
              <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
              <h2 className="text-2xl font-bold mb-8 text-center">Employee Details</h2>
             <div className="flex gap-6 items-center">
             <div>
                  <img src={`http://localhost:3001/uploads/${employee.userId.profileImage}`} alt="" 
                  className="rounded-full border w-50 h-50"
                  />
              </div>
             </div>
             <div className="flex flex-col space-y-5">
              <div className="flex space-x-3 mb-5">
                  <p className="text-lg font-bold">Name</p>
                  <p className="font-medium">{employee.userId.name}</p>
              </div>
              <div className="flex space-x-3 mb-5">
                  <p className="text-lg font-bold">Employee ID:</p>
                  <p className="font-medium">{employee.employeeId}</p>
              </div>
              <div className="flex space-x-3 mb-5">
                  <p className="text-lg font-bold">Date of Birth:</p>
                  <p className="font-medium">{new Date(employee.dob).toLocaleDateString()}</p>
              </div>
              <div className="flex space-x-3 mb-5">
                  <p className="text-lg font-bold">Gender:</p>
                  <p className="font-medium">{employee.gender}</p>
              </div>
              <div className="flex space-x-3 mb-5">
                  <p className="text-lg font-bold">Department:</p>
                  <p className="font-medium">{employee.department.department_Name}</p>
              </div>
              <div className="flex space-x-3 mb-5">
                  <p className="text-lg font-bold">Marital Status</p>
                  <p className="font-medium">{employee.maritalStatus}</p>
              </div>
                
              </div>
            </div>
        ): 
        <div>
            loading
        </div>
        }
        </>
    )
}
 
export default EmployeeSingular;