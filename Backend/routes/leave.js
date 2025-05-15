import express from 'express'
import authMiddleware from "../middleware/authMiddleware.js"

import { addLeave } from '../Controllers/leaveContoller.js'
const router = express.Router()

router.post('/add', addLeave)



export default router