import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTemporaryModifiers } from "../../utils/PayrollHelpers";


const UpdateTempoarySalaryModifiers = ({payDate}) => {

    const {id : employeeId} = useParams()
    const [formData, setFormData] = useState({
    allowances: [],
    deductions: [],
    });
    useEffect(() => {
        const fetchSalaryModifiers = async () => {
            const result = await getTemporaryModifiers(employeeId)
            if(result) {
                console.log(result)
                setFormData({
                    allowances: result.allowances,
                    deductions: result.deductions,
                });
            }else {
                console.log("result not found")
            }
        } 
        if (employeeId) {
            fetchSalaryModifiers()
        }
    },[employeeId])

    const handleChange = ({type, index, field, value}) => {
        const updated = [...formData[type]]
        if (updated === "label") {
            updated[index][field] = value 
        } else {
            updated[index][field] = Number(value)
        }
        
        setFormData({...formData,[type]: updated})
    }

    const addNewField = (type) => {
        setFormData({
            ...formData,
            [type]: [...formData[type], {label: "", amount:""}]
        })
    }
    
    // 
    const removeField = (type, index) => {
    const updated = formData[type].filter((_, i) => i !== index);
    setFormData({ ...formData, [type]: updated });
    };

     const handleDateChange = async (e) => {
        e.preventDefault()
        const data = await getTemporaryModifiers(employeeId);

        if(data) {
            alert("Salary Modiefiers has been updated sucessfully")
        }
    }
    const handleReset = () => {
        setFormData({
            allowances: {label: "", amount: ""},
            deductions: {label: "", amount: ""},
        })
    }

    return ( 
        <form>
            <div>
                <h2 className="text-lg font-semibold">
                    Temporary Allownace 
                </h2>
                {formData.allowances.map((item, index) => (
                    <div key={index} className="flex space-x-2 mb-2">
                        <input
                         type="text"
                         value={item.label} 
                          onChange={(e) =>
                            handleChange("allowances", index, "label", e.target.value)}
                         />
                        <input
                        type="number"
                        value={item.amount}
                        onChange={(e) =>
                            handleChange("deductions", index, "label", e.target.value)}
                        />
                        <button
                        type="button"
                        className="px-4 py-2 bg-red-500 text-white rounded"
                        onClick={() => removeField("allowances", index)}
                        >
                        Remove
                        </button>
                    </div>
                ))}
                <button
                        type="button"
                        className="px-4 py-2 bg-green-500 text-white rounded"
                        onClick={() => addNewField("allowances")}
                        >
                            + Add Allowance
                    </button>
            </div>
            <div>
                <h2 className="text-lg font-semibold">
                    Temporary Deductions 
                </h2>
                {formData.deductions.map((item, index) => (
                    <div key={index} className="flex space-x-2 mb-2">
                        <input
                         type="text"
                         value={item.label} 
                         onChange={(e) =>
                            handleChange("allowances", index, "label", e.target.value)}
                         />
                        <input
                        type="number"
                        value={item.amount}
                        onChange={(e) =>
                            handleChange("deductions", index, "label", e.target.value)}
                        />
                        <button
                        type="button"
                        className="px-4 py-2 bg-red-500 text-white rounded"
                        onClick={() => removeField("deductions", index)}
                        >
                        Remove
                        </button>
                    </div>
                ))}
                    <button
                        type="button"
                        className="px-4 py-2 bg-green-500 text-white rounded"
                        onClick={() => addNewField("deductions")}
                        >
                            + Deductions
                    </button>
            </div>
        </form>
     );
}
 
export default UpdateTempoarySalaryModifiers;