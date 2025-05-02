import axios from "axios"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const columns = [
    {
        name:"S No",
        selector: (row) => row.sno
    },
    {
        name:"Department Name",
        selector: (row) => row.department_Name,
        sortable: true
    },
    {
        name:"Action",
        selector: (row) => row.Action
    },
]

export const DepartmentButtons = ({ _id, handleDeleted }) => {
    const Navigate = useNavigate();
  
    const handleDelete = async () => {
      try {
        const response = await axios.delete(`http://localhost:3001/api/department/${_id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },d
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
          onClick={() => Navigate(`/admin-dashboard/departments/${_id}`)}
        >
          Edit
        </button>
        <button className="bg-red-600 px-3 py-1 rounded-sm" onClick={handleDelete}>
          Delete
        </button>
      </div>
    );
  };