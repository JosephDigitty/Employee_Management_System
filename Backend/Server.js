import express from 'express'
import cors from 'cors'
import { configDotenv } from 'dotenv'
import connectToDatabase from './db/db.js'
import { userRegister } from './userSeed.js'
import router from './routes/auth.js'
import departmentRouter from './routes/department.js'
import EmployeeRouter from './routes/employeeRoutes.js'
import SalaryRouter from './routes/salary.js'
import verifyUser from './middleware/authMiddleware.js'
import path from 'path';

configDotenv()

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/auth', router)
app.use('/api/department',departmentRouter)
app.use('/api/employee',EmployeeRouter)
app.use('/api/salary', SalaryRouter)

app.use('/uploads', express.static(path.join(path.resolve(), 'public/uploads')));


app.listen(process.env.PORT, () => {
    connectToDatabase()
    userRegister()
    console.log(`Server is running on port ${process.env.PORT}`)
})

