import multer from "multer"
import Employee from "../model/Employee.js"
import User from "../model/user.js"
import bcrypt from "bcrypt"
import path from "path"
import Department from "../model/Department.js"



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})

const addEmployee = async (req, res) => {
   try{
    const {name, email, employeeId, dob, gender, maritalStatus, designation, department, grade, salaryModifiers, password, role} = req.body
    // register a user with the detail from req.body
    const user = await User.findOne({email})
    const staffId = await Employee.findOne({employeeId})
    if(staffId) {
        return res.status(400).json({success: false, error: "Employee ID already exists"})
    }
    if(user) {
        return res.status(400).json({success: false, error: "User already exists"})
    }
    //then add the password
    const hashPassword = await bcrypt .hash(password, 10)
    const newUser = new User({
        name, 
        email,
        password: hashPassword,
        role,
        profileImage: req.file ? req.file.filename : ""
    })

    const savedUser = await newUser.save()

    const newEmployee = new Employee({
        userId: savedUser._id,
        employeeId,
        dob,
        gender,
        maritalStatus,
        designation,
        department,
        grade,
        salaryModifiers: salaryModifiers || { allowances: [], deductions: [] } // optional
    })


     const savedEmployee = await newEmployee.save();
        console.log("Employee saved:", savedEmployee);
    return res.status(201).json({success: true, messages: "Employee added successfully", employee: savedEmployee})
   } catch (error) {
        console.log(error.message)
       return res.status(500).json({success: false, error: "add employee server error"})
   }
   

}

const getAllEmployee =  async (req, res) => {
    try{
       const employees = await Employee.find().populate("userId", {password: 0}).populate("department")
       res.status(200).json({success: true, employees})
    }catch(error) {
        console.log(`Error fetching employee: ${error.message}`)
        return res.status(500).json({success: false, error: "fetch employee server error"})
    }
}

const getEmployee = async (req, res) => {
    try {
        const id = req.params.id
        let employee;
        employee = await Employee.findById(id).populate("userId", {password: 0}).populate("department")
        if (!employee) {
           employee = await Employee.findOne({ userId: id}).populate("userId", {password: 0}).populate("department")
        }
        res.status(200).json({success: true, employee})
    } catch (error) {
        console.error("Error fetching department:", error);
        res.status(500).json({success:false, error: "fetch employee server error"})
    }
}

const editEmployee = async (req, res) => {
    try {
        const {id} = req.params
        const {name, dob, maritalStatus, designation, department, salary, role} = req.body
        const employee = await Employee.findById(id)
        if (!employee) {
            return res.status(404).json({ success: false, error: "Employee not found" });
        }
        const user = await User.findById({_id:employee.userId})
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }
        const updateUser = await User.findByIdAndUpdate({_id:employee.userId}, {name}, { new: true })
        const updateEmployee = await Employee.findByIdAndUpdate(id, {
            dob,
            maritalStatus,
            designation,
            salary,
            department
        })
        if(!updateUser || !updateEmployee) {
            return res.status(404).json({ success: false, error: "Error Updating employee data" });
        }
        res.status(200).json({success: true, message: "Employee updated successfully", updateEmployee})
    } catch (error) {
        console.error("Error Editting Employee:", error);
        res.status(500).json({success:false, error: "Edit Employee server error"})
    }
}

 const getEmployeesByDepartment = async (req, res) => {
    try {
        const id = req.params.id
    
        const employees = await Employee.find({department: id}).populate("userId", "name")
          
        res.status(200).json({success: true, employees})
    } catch (error) {
        console.error("Error fetching employee by Id:", error);
        res.status(500).json({success:false, error: "fetch employee server error"})
    }
 }

export {addEmployee, upload, getAllEmployee, getEmployee, editEmployee, getEmployeesByDepartment} 
