import jwt from "jsonwebtoken"
import user from "../model/user.js"
import bcrypt from 'bcrypt'

export const login = async (req, res) => {
    try{
        const {email, password} = req.body
        const existingUser = await user.findOne({email})
        if(!existingUser){
            return res.status(404).json({sucess:false, error: "User Not Found"})
        }
        const isMatch = await bcrypt.compare(password, existingUser.password)
        if(!isMatch){
            return res.status(400).json({sucess: false, error: "Invalid Password"})
            
        }

        const token = jwt.sign({_id: existingUser._id, role: existingUser.role},
            process.env.JWT_KEY,
            {expiresIn: '10d'}
        )
        res.status(200).json({sucess: true, token, user:{_id: existingUser._id, role: existingUser.role, name:existingUser.name}})

    } catch(err){
        res.status(500).json({error: err.message})
        console.log(err)
    }
}
export const verify = (req, res) => {
    return res.status(200).json({success: true, user: req.user})
}

