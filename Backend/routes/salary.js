import express from 'express'
import authMiddleware from "../middleware/authMiddleware.js"
import { addSalary, getSalary } from '../Controllers/salaryContollers.js'
const router = express.Router()

router.post('/add', addSalary)
router.get('/:id', getSalary)


export default router