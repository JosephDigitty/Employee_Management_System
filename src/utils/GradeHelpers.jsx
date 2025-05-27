import axios from "axios"

export const fetchGrade = async () => {
    let grade
    try {
        const response = await axios.get("http://localhost:3001/api/grade", {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem("token")}`
            }
        })
        if(response.data.success) {
            return response.data.grades
        }
        
        
    } catch (error) {
        if(error.response && !error.response.data.success) {
            alert(error.response.data.error)
        }
        console.log(error)
    } 
    return grade
}