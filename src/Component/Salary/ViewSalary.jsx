import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useParams } from "react-router-dom";
import { columns } from "../../utils/SalaryHelper";

const ViewSalary = () => {
   const [salary, setSalary] = useState([])
   const [filteredSalary, setFilteredSalary] = useState(null)
   const { id } = useParams();

   useEffect (() => {
       const fecthSalaries = async () => {
           try {
               const response = await axios.get(`http://localhost:3001/api/salary/${id}`, {
                   headers: {
                       "Authorization" : `Bearer ${localStorage.getItem("token")}`
                   },
                   
               })
               console.log(response.data.salary)
               if (response.data.success) {
                   let sno = 1
                   const data = await response.data.salary.map((sal)=> (
                     {
                       sno: sno++,
                       staffId:sal.employeeId.employeeId,
                       salary:sal.basicSalary,
                       allowances:sal.allowances,
                       deductions:sal.deductions,
                       total:sal.netSalary,
                       payDate:sal.payDate,
                     }  
                   ))
                   
                   setSalary(data)
                   // setFilteredSalary(response.data.salary)
               }
           } catch (error) {
               if (error.response && !error.response.data.success) {
                   alert(error.response.data.error)
               }
           
           }
       } 
       fecthSalaries()
   }, [])
    
    return ( 
       <div>
        <div className="px-6">
        <div className="text-center">
            <h3 className="text-2xl font-bold mt-5">
             Staff Salary Records
            </h3>
        </div>
        <div className="mt-5">  
        </div>
            <DataTable columns={columns} data={salary} pagination/>
        </div>
       </div>
     );
}
 
export default ViewSalary;