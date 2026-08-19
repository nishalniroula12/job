import User from "../models/Users.js"
import jwt from "jsonwebtoken";


export const auth =async(req,res,next)=>{
    try {
        const token =req.cookies?.token 
        if(!token){
            return res.status(201).json({
                success:false,
                message:"please login"
            })
        }
        const decode =jwt.verify(token,process.env.JWT_SECRET)
        const user =await User.findById(decode.id).select("-password")
        if(!user){
            return res.status(201).json({
                success:false,
                message:"user not found",
                user
            })
        }
        req.user =user;
        next()
        
    } catch (error) {
        console.log(error)
        
    }
}

export const adminonly =async(req,res,next)=>{
    if(req.user.role ==="admin"){
        next()
    }else{
        return res.status(201).json({
            success:false,
            message:"access denied for admin"
        })
    }
}