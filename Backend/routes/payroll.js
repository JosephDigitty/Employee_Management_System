import express from 'express'
import authMiddleware from "../middleware/authMiddleware.js"

import { getAllPayroll, getallPayrollByDepartment, getallPayrollByGrade, getPermanentSalaryModifiers, getTempoarySalaryModifiers, upsertPayroll } from '../Controllers/payrollContollers.js'
const router = express.Router()

router.put('/:id/payroll', upsertPayroll)
router.get('/payroll/departments', getallPayrollByDepartment)
router.get('/payroll/permanent', getPermanentSalaryModifiers)
router.get('/payroll/temporary', getTempoarySalaryModifiers)
router.get('/payroll/grade', getallPayrollByGrade)
router.get('/payroll/fullpayroll', getAllPayroll)



export default router