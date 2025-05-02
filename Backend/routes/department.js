import express from 'express'
import authMiddleware from "../middleware/authMiddleware.js"
import {addDepartment , deleteDepartment, editDepartment, getAllDepartments, getDepartment} from '../Controllers/departmentController.js'
const router = express.Router()

router.get('/', getAllDepartments)
router.get('/:id', getDepartment)
router.put('/:id', editDepartment)
router.delete('/:id', deleteDepartment)
router.post('/add', addDepartment)


export default router