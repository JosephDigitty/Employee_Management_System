import Salary from "../model/Salary.js"

const addSalary = async (req, res) => {
    try{
        const {employeeId, basicSalary, allowances, deductions, payDate} = req.body
        const totalSalary = parseInt(basicSalary) + parseInt(allowances) - parseInt(deductions)
        const newSalary = new Salary({employeeId, basicSalary, allowances, deductions, netSalary:totalSalary, payDate})
        await newSalary.save()
        res.status(201).json({success: true, salary: newSalary})
    } catch(error) {
        console.error("Error adding salary:", error);
        res.status(500).json({success:false, error: "add salary server error"})
    }
}

const getSalary = async (req, res) => {
    try {
        const id = req.params.id
        const salary = await Salary.find({ employeeId: id })
            .populate({
                path: "employeeId",
                select: "employeeId", 
                populate: {
                    path: "userId",  
                    select: "name"   
                }
            });
        res.status(200).json({success: true, salary})
    } catch (error) {
        console.error("Error fetching salary:", error);
        res.status(500).json({success:false, error: "fetch salary server error"})
    }
}

export {addSalary, getSalary}