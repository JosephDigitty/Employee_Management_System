import express from 'express'
import authMiddleware from "../middleware/authMiddleware.js"

import { upsertPayroll } from '../Controllers/payrollContollers.js'
const router = express.Router()

router.put('/:id/payroll', upsertPayroll)



export default router