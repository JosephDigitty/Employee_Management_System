import axios from "axios"
import { useNavigate } from "react-router-dom"

export const columns = [
    {
        name:"S No",
        selector: (row) => row.sno,
        width: "90px"
    },
    {
      name:"Image",
      selector: (row) => row.profileImage,
      width: "120px"
    },
    {
        name:"Name",
        selector: (row) => row.name,
        width: "200px",
        sortable:true
    },
    {
        name:"Department",
        selector: (row) => row.department_Name,
        width: "200px",
    },
    {
        name:"DOB",
        selector: (row) => row.dob,
        sortable:true,
        width: "200px"
        
    },
    {
        name:"Action",
        selector: (row) => row.Action,
      
    },
]

export const fetchDepartments = async () => {
    let departments
    try {
        const response = await axios.get("http://localhost:3001/api/department", {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem("token")}`
            }
        })
        if(response.data.success) {
           return response.data.departments
        }
        
    } catch (error) {
        if(error.response && !error.response.data.success) {
            alert(error.response.data.error)
        }
        console.log(error)
    } 
    return departments
}
export const getEmployees = async (id) => {
    let employees
    try {
        const response = await axios.get(`http://localhost:3001/api/employee/department/${id}`, {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem("token")}`
            }
        })
        console.log(response)
        if(response.data.success) {
            employees = await response.data.employees
        }
        const data = await response.data
        console.log(data)
    } catch (error) {
        if(error.response && !error.response.data.success) {
            alert(error.response.data.error)
        }
        console.log(error)
    } 
    return employees
}

export const EmployeeButtons = ({ id }) => {
    const Navigate = useNavigate();
  
    const handleDelete = async () => {
      try {
        const response = await axios.delete(`http://localhost:3000/api/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
  
        if (response.data.success) {
          // Notify parent component (DepartmentList) to remove the deleted department
          handleDeleted(_id);
        } else {
          alert("Error deleting department");
        }
      } catch (error) {
        console.log("Error deleting department:", error);
        alert("Error deleting department");
      }
    };
  
    return (
      <div className="flex gap-3 text-white">
        <button
          className="bg-teal-600 px-3 py-1 rounded-sm"
          onClick={() => Navigate(`/admin-dashboard/employees/${id}`)}
        >
          View
        </button>
        <button className="bg-blue-600 px-3 py-1 rounded-sm" 
        onClick={() => Navigate(`/admin-dashboard/edit-employees/${id}`)}
        >
          Edit
        </button>
        <button className="bg-yellow-600 px-3 py-1 rounded-sm"
        onClick={() => Navigate(`/admin-dashboard/employee/salary-modify/${id}`)}
        >
          Salary
        </button>
        <button className="bg-red-600 px-3 py-1 rounded-sm" >
          Leave
        </button>
      </div>
    );
  };

  export const PayrollButtons = ({ id }) => {
    const Navigate = useNavigate();
    const handleDelete = async () => {
      try {
        const response = await axios.delete(`http://localhost:3000/api/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
  
        if (response.data.success) {
          // Notify parent component (DepartmentList) to remove the deleted department
          handleDeleted(_id);
        } else {
          alert("Error deleting department");
        }
      } catch (error) {
        console.log("Error deleting department:", error);
        alert("Error deleting department");
      }
    };
  
    return (
      <div className="flex gap-3 text-white">
        <button
          className="bg-teal-600 px-3 py-1 rounded-sm"
          onClick={() => Navigate(`/admin-dashboard/payrolls/temporary/modiefiers/${id}`)}
        >
          Temporary Salary
        </button>
        <button className="bg-blue-600 px-3 py-1 rounded-sm" 
        onClick={() => Navigate(`/admin-dashboard/edit-employees/${id}`)}
        >
          Edit
        </button>
        <button className="bg-yellow-600 px-3 py-1 rounded-sm"
        onClick={() => Navigate(`/admin-dashboard/employee/salary-modify/${id}`)}
        >
          Salary
        </button>
        <button className="bg-red-600 px-3 py-1 rounded-sm" >
          Leave
        </button>
      </div>
    );
  };

