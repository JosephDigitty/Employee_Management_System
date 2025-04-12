import express from 'express'
import cors from 'cors'
import { configDotenv } from 'dotenv'
import connectToDatabase from './db/db.js'
import { userRegister } from './userSeed.js'
import router from './routes/auth.js'
import departmentRouter from './routes/department.js'
import verifyUser from './middleware/authMiddleware.js'


configDotenv()
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/auth', router)
app.use('/api/department',departmentRouter)

app.listen(process.env.PORT, () => {
    connectToDatabase()
    userRegister()
    console.log(`Server is running on port ${process.env.PORT}`)
})

