import mongoose from "mongoose";
import { Schema } from "mongoose";
import User from "./user.js";


const employeeSchema = new mongoose.Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    employeeId: {type: String, required: true, unique: true},
    dob:{type: Date, required: true},
    gender:{type: String, required: true},
    maritalStatus:{type: String, required: true},
    designation:{type: String, required: true},
    department: {type: Schema.Types.ObjectId, ref: 'Department', required: true},
    grade: { type: Schema.Types.ObjectId, ref: 'Grade', required: true },
    salaryModifiers: {
    allowances: [{label: { type: String },amount: { type: Number },},],
    deductions: [{label: { type: String },amount: { type: Number },},],
    },
    createdAt: {type: Date, default:Date.now},
    updatedAt: {type: Date, default:Date.now},
})

const Employee = mongoose.model('Employee', employeeSchema)

export default Employee