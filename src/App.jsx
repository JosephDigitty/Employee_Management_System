import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import AdminSummarry from "./Component/AdminSummary";
import Employees from "./Component/Employees.Jsx";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import Department from "./Component/Departments";
import Leaves from "./Component/Leaves";
import Salaries from "./Component/Salaries";
import Settings from "./Component/Settings";
import AddDepartment from "./Component/Departments/AddDepartment";
import EditDepartment from "./Component/Departments/EditDepartment";
import AddEmployee from "./Component/Employee/AddEmployee";
import EmployeeSingular from "./Component/Employee/Employee";
import EditEmployee from "./Component/Employee/EditEmployee";
import ViewSalary from "./Component/Salary/ViewSalary";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBasedRoutes from "./utils/RoleBasedRoutes";
import EmployeeDetails from "./EmployeeDashBoard/EmployeeDetail";
import EmployeeProfile from "./EmployeeDashBoard/EmployeeProfile";
import EmployeeLeaves from "./Leaves/List";
import AddLeave from "./Leaves/AddLeaves";
import AddGrades from "./Component/Grades/AddGrades";
import SalaryModifiers from "./Component/Salary/SalaryModifiers";
import UpdateTempoarySalaryModifiers from "./Component/Payroll/UpdateTemporarymodi";
import PayrollDashboard from "./Component/Payroll/PayrollDashboard";
import EmployeeTemporary from "./Component/Payroll/EmployeeTemporary";


const App = () => {
  return ( 
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/login"/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin-dashboard" element={<AdminDashboard/>}> 
      <Route index element={<AdminSummarry/>}></Route>
      <Route path="/admin-dashboard/employees" element={<Employees/>}></Route>
      <Route path="/admin-dashboard/employees/:id" element={<EmployeeSingular/>}></Route>
      <Route path="/admin-dashboard/edit-employees/:id" element={<EditEmployee/>}></Route>
      <Route path="/admin-dashboard/employee/salary/:id" element={<ViewSalary/>}></Route>
      <Route path="/admin-dashboard/employee/salary-modify/:id" element={<SalaryModifiers/>}></Route>
      <Route path="/admin-dashboard/add-employee" element={<AddEmployee/>}></Route>
      <Route path="/admin-dashboard/departments" element={<Department/>}></Route>
      <Route path="/admin-dashboard/leaves" element={<Leaves/>}></Route>
      <Route path="/admin-dashboard/salaries" element={<Salaries/>}></Route>
      <Route path="/admin-dashboard/payrolls/modifiers/temporary" element={<EmployeeTemporary/>}></Route>
      <Route path="/admin-dashboard/payroll" element={<PayrollDashboard/>}></Route>
      <Route path="/admin-dashboard/payrolls/temporary/modiefiers/:id" element={<UpdateTempoarySalaryModifiers/>}></Route>
      <Route path="/admin-dashboard/settings" element={<Settings/>}></Route>
      <Route path="/admin-dashboard/add-new-department" element={<AddDepartment/>}></Route>
      <Route path="/admin-dashboard/departments/:id" element={<EditDepartment/>}></Route>
      <Route path="/admin-dashboard/grade/add" element={<AddGrades/>}></Route>
      </Route>
      <Route path="/employee-dashboard" element={<EmployeeDashboard/>}>
      <Route index element={<EmployeeDetails/>}></Route>
      <Route path="/employee-dashboard/profile/:id" element={<EmployeeSingular/>}></Route>
      <Route path="/employee-dashboard/leaves" element={<EmployeeLeaves/>}></Route>
      <Route path="/employee-dashboard/add-leave" element={<AddLeave/>}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
   );
}
 
export default App;