import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTemporaryModifiers } from "../../utils/PayrollHelpers";


const UpdateTempoarySalaryModifiers = ({payDate}) => {

    const {id : employeeId} = useParams()
    const [formData, setFormData] = useState({
        allowances: [{label: "", amount: ""}],
        deductions: [{label: "", amount: ""}],
    })

    useEffect(() => {
        const fetchSalaryModifiers = async () => {
            const result = await getTemporaryModifiers(employeeId, payDate)
            if(result) {
                setFormData(result)
            }
        } 
        if (employeeId && payDate) {
            fetchSalaryModifiers()
        }
    },[employeeId, payDate])

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
    
    const removeField = (type, index) => {
        let updated = []
        for(let i = 0; i < formData.length; i++) {
            if(i !== index) {
                updated.push(formData[type][i])
            }
        }
        setFormData({ formData, [type]: updated })
    }

     const handleDateChange = async (e) => {
        e.preventDefault()
        const data = await getTemporaryModifiers()({
            id: employeeId, 
            payDate, 
            allowances:formData.allowances,
            deductions:formData.deductions
        })

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
                    </div>
                ))}
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
                    </div>
                ))}
            </div>
        </form>
     );
}
 
export default UpdateTempoarySalaryModifiers;