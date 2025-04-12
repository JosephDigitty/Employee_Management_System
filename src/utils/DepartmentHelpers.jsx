import { useNavigate } from "react-router-dom"

export const columns = [
    {
        name:"S No",
        selector: (row) => row.sno
    },
    {
        name:"Department Name",
        selector: (row) => row.department_Name
    },
    {
        name:"Action",
        selector: (row) => row.Action
    },
]

export const DepartmentButtons = ({_id}) => {
    const Navigate = useNavigate()
    return (
        <div className="flex gap-3 text-white">
            <button className="bg-teal-600 px-3 py-1 rounded-sm" onClick={() => Navigate(`/admin-dashboard/departments/${_id}`)}>
                Edit
            </button>
            <button className="bg-red-600 px-3 py-1 rounded-sm">
                Delete
            </button>
        </div>
    )
}