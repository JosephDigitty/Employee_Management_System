//get all payroll
// get paroll by department 
// get payroll by grades
// get payroll by employee

import axios from "axios"


export const payrollByDepartment = async () => {
    
    try{
        const response = await axios.get(`http://localhost:3001/api/employee/payroll/departments`, {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem("token")}`
            }  
        })
        if (response.data.success) {
            return  response.data.filteredPayrollByDepartment
        }
    }catch(error){
        if(error.response && !error.response.data.success) {
            alert(error.response.data.error)
        }
        console.log(error)
    }
}
 
export const payrollByGrade = async () => {
    
    try{
        const response = await axios.get(`http://localhost:3001/api/employee/payroll/grade`, {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem("token")}`
            }  
        })
        if (response.data.success) {
            return  response.data.filteredPayrollByGrade
        }
    }catch(error){
        if(error.response && !error.response.data.success) {
            alert(error.response.data.error)
        }
        console.log(error)
    }
}
export const permanentModifyers = async () => {
    
    try{
        const response = await axios.get(`http://localhost:3001/api/employee/payroll/permanent`, {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem("token")}`
            }  
        })
        if (response.data.success) {
            return  response.data.employee
        }
    }catch(error){
        if(error.response && !error.response.data.success) {
            alert(error.response.data.error)
        }
        console.log(error)
    }
}
export const getTemporaryModifiers = async(employeeId) => {
    
    try{
        const response = await axios.get(`http://localhost:3001/api/employee/payroll/temporary/${employeeId}`, {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem("token")}`
            }  
        })
        if (response.data.success) {
            return  response.data.data
            
        }
        console.log(response.data.data)
    }catch(error){
        if(error.response && !error.response.data.success) {
            alert(error.response.data.error)
        }
        console.log(error)
    }
}

export const getFullPayroll = async () => {
    
    try{
        const response = await axios.get(`http://localhost:3001/api/employee/payroll/fullpayroll`, {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem("token")}`
            }  
        })
        if (response.data.success) {
            return  response.data.filteredPayroll
        }
    }catch(error){
        if(error.response && !error.response.data.success) {
            alert(error.response.data.error)
        }
        console.log(error)
    }
}



