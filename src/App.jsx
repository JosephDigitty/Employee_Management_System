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


const App = () => {
  return ( 
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/login"/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin-dashboard" element={<AdminDashboard/>}> 
      <Route index element={<AdminSummarry/>}></Route>
      <Route path="/admin-dashboard/emplooyees" element={<Employees/>}></Route>
      <Route path="/admin-dashboard/departments" element={<Department/>}></Route>
      <Route path="/admin-dashboard/leaves" element={<Leaves/>}></Route>
      <Route path="/admin-dashboard/salaries" element={<Salaries/>}></Route>
      <Route path="/admin-dashboard/settings" element={<Settings/>}></Route>
      <Route path="/admin-dashboard/add-new-department" element={<AddDepartment/>}></Route>
      <Route path="/admin-dashboard/departments/:id" element={<EditDepartment/>}></Route>
      </Route>
      <Route path="/employee-Dashboard" element={<EmployeeDashboard/>} />
    </Routes>
    </BrowserRouter>
   );
}
 
export default App;