import mongoose from "mongoose";
import Employee from "./Employee.js";


const payrollSchema = new mongoose.Schema({
    employeeId: {type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true},
    period: { type: String, required: true },
    payDate: {type: Date, required: true},
    basicSalary: {type: Number, required: true},
    housingAllowance: {type: Number},
    wardrobeAllowance: {type: Number},
    transportAllowance:{type: Number},
    medicalAllowance:{type: Number},
    status: {type: String, required: true, enum: ['Draft', 'Finalized', 'Paid'], default:'Draft'},

    oneTimeAllowances: [
        {
            label: { type: String },
            amount: { type: Number },
        },
    ],
    oneTimeDeductions: [
        {
            label: { type: String },
            amount: { type: Number },
        },
    ],
    permAllowances: [
        {
            label: { type: String },
            amount: { type: Number },
        },
    ],
    permDeductions: [
        {
            label: { type: String },
            amount: { type: Number },
        },
    ],
    totalEarnings: {type: Number},
    totalDeductions: {type: Number},
    netSalary: {type: Number},
    createdAt: {type: Date, default:Date.now},
    updatedAt: {type: Date, default:Date.now},
})

payrollSchema.index({ employeeId: 1, period: 1 }, { unique: true });
const Payroll = mongoose.model("payroll", payrollSchema);

export default Payroll