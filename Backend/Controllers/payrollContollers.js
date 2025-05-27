import Employee from "../model/Employee.js"
import Grade from "../model/Grade.js"
import Payroll from "../model/Payroll.js"

const addPermSalarModifiers = async () => {
    try {
        const {id: employeeId, allowances, deductions} = req.body
        if(!employeeId) {
            return res.status(400).json({success:false, error:"Employee Id is required"})
        }
        let employee = await Employee.findById(employeeId) 
        if (!employee) {
            return res.status(404).json({success:false, error: "Employee is not found"})
        } 
            employee.salaryModifiers.allowances = allowances,
            employee.salaryModifiers.deductions = deductions
        await employee.save()
        res.status(200).json({success:true, message:"Pemanent salary modification has been added to this employee"})
    } catch (error) {
        res.status(500).json({success:false, error:"modifiying salary server error"})
        console.log(error)
    }

}

const upsertPayroll =  async (req, res) => {
    try {
        const {id: employeeId, allowances, deductions, payDate} = req.body
        const period = new Date(payDate).toISOString().slice(0, 7)
        if(!payDate && !employeeId) {
            return res.status(400).json({success:false, error: "Employee Id and Padate is required"})
        }
        const employee = await Employee.findById(employeeId).populate("grade")
        if(!employee){
             return res.status(404).json({success:false, error: "Employee not found"})
        }
        const basicSalary = employee.grade.basicSalary
        const housingAllowance= employee.grade.housingAllowance || 0
        const wardrobeAllowance = employee.grade.wardrobeAllowance || 0
        const transportAllowance = employee.grade.transportAllowance || 0
        const medicalAllowance = employee.grade.medicalAllowance || 0

        const totalRecurringAllowance = housingAllowance + wardrobeAllowance + transportAllowance + medicalAllowance

        const permAllowances = employee.salaryModifiers.allowances
        const permDeductions = employee.salaryModifiers.deductions

        let totalPermAllownaces = 0 
        for(let i = 0; i < permAllowances.length; i++) {
            totalPermAllownaces += permAllowances[i].amount || 0
        }

        let totalPermDeductions = 0 
        for(let i = 0; i < permDeductions.length; i++) {
            totalPermDeductions += permDeductions[i].amount || 0
        }

        
        let totalOneTimeAllowances = 0;
        for (let i = 0; i < allowances.length; i++) {
            totalOneTimeAllowances += allowances[i].amount || 0;
        }

        let totalOneTimeDeduction = 0;
        for (let i = 0; i < deductions.length; i++) {
            totalOneTimeDeduction += deductions[i].amount || 0;
        }
        const totalEarnings = basicSalary + totalRecurringAllowance + totalOneTimeAllowances + totalPermAllownaces
        const totalDeductions = totalOneTimeDeduction + totalPermDeductions
        const netSalary = totalEarnings - totalDeductions

        let payroll = await Payroll.findOne({ employeeId, period });

        if (!payroll) {
            const newPayroll = new Payroll({
                employeeId,
                period ,
                payDate,
                basicSalary,
                housingAllowance,
                wardrobeAllowance,
                transportAllowance,
                medicalAllowance,
                permAllowances,
                permDeductions,
                oneTimeallowances: allowances,
                oneTimedeductions: deductions,
                totalEarnings,
                totalDeductions,
                netSalary,
            });
            await newPayroll.save();
            payroll = newPayroll;
        } 
        if (payroll && payroll.status === "Draft" || "Finanlized"){
            payroll.period = period;
            payroll.payDate = payDate;
            payroll.basicSalary = basicSalary;
            payroll.housingAllowance = housingAllowance;
            payroll.wardrobeAllowance = wardrobeAllowance;
            payroll.transportAllowance = transportAllowance;
            payroll.medicalAllowance = medicalAllowance;
            payroll.permAllowances = permAllowances;
            payroll.permDeductions = permDeductions;
            payroll.oneTimeAllowances = allowances;
            payroll.oneTimeDeduction = deductions;
            payroll.totalEarnings = totalEarnings;
            payroll.totalDeductions = totalDeductions;
            payroll.netSalary = netSalary;
            await payroll.save();
        } else {
            return res.status(500).json({success:true, error: "Payroll for this employee cannot be modified"})
        }
        return res.status(200).json({ success: true, payroll });
        
    } catch (error) {
        console.error("Error adding Payroll:", error);
        return res.status(500).json({ success: false, error: "Error adding Payroll" });
        
    }
}

const generateDefaultPayroll = async (req, res ) => {
    try {
        const {payDate} = req.body
        const employees = Employee.find().populate("grade")
        const period = new Date(payDate).toISOString().slice(0, 7)
        const newPayroll = []
        
        if(! payDate) {
            return res.status(400).json({success:false, error: "Paydate is required"})
        }
        let employee
        for(i = 0; i > (await employees).length; i++){
            employee = employees[i]
                const existtingEmployee = await Payroll.findOne({
            employeeId: employee._id,
            period
        })
        if(existtingEmployee) {
            continue
        }

        const basicSalary = employee.grade.basicSalary
        const housingAllowance= employee.grade.housingAllowance || 0
        const wardrobeAllowance = employee.grade.wardrobeAllowance || 0
        const transportAllowance = employee.grade.transportAllowance || 0
        const medicalAllowance = employee.grade.medicalAllowance || 0
        

        const totalRecurringAllowance = housingAllowance + wardrobeAllowance + transportAllowance + medicalAllowance

        const totalEarnings = basicSalary + totalRecurringAllowance 
        const netSalary = totalEarnings
        
        const payroll = ({
            employeeId: employee._id,
            period,
            basicSalary,
            totalRecurringAllowance,
            netSalary
        })
        }
    

        newPayroll.push(payroll)

        if(newPayroll.length === 0 ) {
            return res.status(200).json({message:"no new payroll was addded"})
        }
        await Payroll.insertMany(newPayroll)
        res.status(201).json({success: true, message:"generated Payroll succesfully"})

    } catch (error) {
        console.log(error)
        res.status(500).json({success:false, error:"generate Payroll server Error"})
        
    }
}

export  {upsertPayroll, addPermSalarModifiers, generateDefaultPayroll}