

import express from 'express'
import authMiddleware from "../middleware/authMiddleware.js"
import {addEmployee, upload, getAllEmployee, getEmployee, editEmployee, getEmployeesByDepartment} from '../Controllers/employeeContollers.js'
const router = express.Router()

router.get('/', getAllEmployee)
router.get('/:id', getEmployee)
router.put('/:id', editEmployee)
router.get('/department/:id', getEmployeesByDepartment)
// router.delete('/:id', deleteDepartment)
router.post('/add', upload.single('image'), addEmployee)


export default router