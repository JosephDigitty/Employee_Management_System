import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getTempoarySalaryModifiers } from "../../../Backend/Controllers/payrollContollers";

const SalaryModifiers = () => {

    const {id} = useParams()

    const [allowances, setAllowances] = useState([])
    const [deductions, setDeductions] = useState([])
    const [payDate, setPayDate] = useState('')
    const [loading, setLoading] = useState(false)

    const addNewRow = (type) => {
        const newRole = {lable:"", amount:""}
        if(type === "allowance") {
            setAllowances([...allowances, newRole])
    } else {
        setDeductions([...deductions, newRole])
    }
    }

    const removeRow = (type, idx) => {
        if(type === "allowance") {
            const updatedAllowances = [...allowances]
            updatedAllowances.splice(idx, 1)
            setAllowances(updatedAllowances)
        } else {
            const updatedDeductions = [...deductions]
            updatedDeductions.splice(idx, 1)            
            setDeductions(updatedDeductions)
        }
    }

    const handleChange = (event, type, field, idx) => {
    const value = event.target.value
    let list
    if (type === "allowance") {
        list = [...allowances]
    } else {
        list = [...deductions]
    } 

    if(field === "label") {
        list[idx][field] = value
    } else {
        list[idx][field] = Number(value)
    }
    if(type === "allowance") {
        setAllowances(list)
    } else {
        setDeductions(list)
    }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await axios.put(`http://localhost:3001/api/employee/${id}/payroll`, { id, allowances, deductions, payDate}, {
                headers: {
                    "Authorization" : `Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log(id, allowances, deductions, payDate)
            if(response.data.success) {
                setLoading(false)
                console.log(response.data)
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
    return ( 
        <form onSubmit={handleSubmit}>
            {/* allowance section */}
            <div>
                <h2 className="text-lg font-semibold text-gray-700 ">
                    Allowances
                </h2>
                {allowances.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 mt-2">
                        <input
                        type="text"
                        placeholder="label (e.g. Sales Bonus)"
                        className="flex-1 border border-gray-300 rounded px-3 py-2"
                        value={item.label}
                        onChange={(e) => handleChange(e, "allowance", "label", idx)}
                        required
                        />
                        <input
                        type="number"
                        placeholder="Amount"
                        className="w-32 border border-gray-300 rounded px-3 py-2"
                        value={item.amount}
                        onChange={(e) => handleChange(e, "allowance", "amount", idx)}
                        required
                        />
                        <button
                        type="button"
                        className="px-4 py-2 bg-red-500 text-white rounded"
                        onClick={() => removeRow("allowance", idx)}
                        >
                        Remove
                        </button>
                    </div>
                ))}
                    <button
                        type="button"
                        className="px-4 py-2 bg-green-500 text-white rounded"
                        onClick={() => addNewRow("allowance")}
                        >
                            + Add Allowance
                    </button>
            </div>
             {/* deduction section */}
            <div>
                <h2 className="text-lg font-semibold text-gray-700 ">
                    deductions
                </h2>
                {deductions.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 mt-2">
                        <input
                        type="text"
                        placeholder="label ( e.g ...Tax)"
                        className="flex-1 border border-gray-300 rounded px-3 py-2"
                        value={item.label}
                        onChange={(e) => handleChange(e, "deduction", "label", idx)}
                        required
                        />
                        <input
                        type="number"
                        placeholder="Amount"
                        className="w-32 border border-gray-300 rounded px-3 py-2"
                        value={item.amount}
                        onChange={(e) => handleChange(e, "deduction", "amount", idx)}
                        required
                        />
                        <button
                        type="button"
                        className="px-4 py-2 bg-red-500 text-white rounded"
                        onClick={() => removeRow("deduction", idx)}
                        >
                        Remove
                        </button>
                    </div>
                ))}
                <button
                        type="button"
                        className="px-4 py-2 bg-green-500 text-white rounded"
                        onClick={() => addNewRow("deduction")}
                        >
                            + Deductions
                        </button>
            </div>
                 {/* payDate input */}
                <div className="my-4">
                <label htmlFor="payDate" className="block font-semibold mb-1">Payroll Date</label>
                <input
                type="date"
                name="payDate"
                value={payDate}
                onChange={(e) => setPayDate(e.target.value)}
                required
                className="border border-gray-300 rounded px-3 py-2"
                />
                </div>
                {/* submit button */}
                <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                disabled=""
                >
                Save
                </button>
                
        </form>
     );
}

 
export default SalaryModifiers;