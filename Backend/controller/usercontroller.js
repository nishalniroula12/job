import bcrypt from "bcrypt";
import User from "../models/Users.js";
import { generatetoken } from "../utlis/generatetoken.js";

export const userregister = async (req, res) => {
    try {
        const { fullname, email, password, role } = req.body;

        if (!fullname || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        const existing = await User.findOne({ email });

        if (existing) {
            return res.status(400).json({
                success: false,
                message: "User already found"
            });
        }

        const hashpassword = await bcrypt.hash(password, 10);

        const newuser = new User({
            fullname,
            email,
            password: hashpassword,
            role,
        });

        await newuser.save();

        const token = generatetoken(newuser._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        return res.status(201).json({
            success: true,
            message: "User register successfully",
            user: newuser,
            token,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export const signin =async(req,res)=>{
    try {
        const {email ,password }=req.body
        if(!email || !password){
            return res.status(401).json({
                success:false,
                message:"all field required"
            })
        }
        const user =await User.findOne({email})
        if(!user){
            return res.status(201).json({
                success:false,
                message:"user not found "
            })
        }
        const matchpassword =await bcrypt.compare(password,user.password)
        console.log(matchpassword)
        if(!matchpassword){
            return res.status(201).json({
                success:false,
                message:"password not match"
            })
        }
const token =generatetoken({id :user._id},process.env.JWT_SECRET ,"7d")
    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000,
     
})
console.log(token)
 return res.status(201).json({
    success:true,
    message:"user login successfuly"
})
        
    } catch (error) {
        console.log(error)
        
    }
}
export const logoutuser =async(req,res)=>{
    try {
        res.clearCookie('token',{
            httpOnly: true,
            secure: false,
            sameSite: "lax",
          
        })
        return res.status(201).json({
            success:true,
            message:"logout user successfully"
        })
        
    } catch (error) {
        console.log(error)
        
    }
}