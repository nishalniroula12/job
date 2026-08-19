import bcrypt from "bcrypt";
import User from "../models/Users.js";
import { generatetoken } from "../utlis/generatetoken.js";
import asynchandling from "../utlis/asynchandling.js";
import { cloudinaryupload } from "../utlis/cloudinaryupload.js";
import cloudinary from "../config/cloudinary.js";

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
export const signin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check fields
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }
  
      // Find user
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      // Compare password
      const matchpassword = await bcrypt.compare(
        password,
        user.password
      );
  
      console.log("Password match:", matchpassword);
  
      if (!matchpassword) {
        return res.status(401).json({
          success: false,
          message: "Password does not match",
        });
      }
  
      // Create JWT
      const token = generatetoken(
        { id: user._id },
        process.env.JWT_SECRET,
        "7d"
      );
  
      // Cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: false, // development
        sameSite: "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
  
      console.log("TOKEN:", token);
  
      // Don't send password to frontend
      const userData = {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
        status: user.status,
        skill: user.skill,
        education: user.education,
        experience: user.experience,
        resume: user.resume,
        location: user.location,
        isverfied: user.isverfied,
      };
  
      return res.status(200).json({
        success: true,
        message: "User login successfully",
        user: userData,
      });
  
    } catch (error) {
      console.log("LOGIN ERROR:", error);
  
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  };
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
export const getprofile =async(req,res)=>{
    try {
        const user =await User.findById(req.user._id).select('-password')
        if(!user){
            return res.status(201).json({
                success:false,
                message:"user not found"
            })
        }
        
        return res.status(200).json({
            success:true,
            message:"profile fetch successfully",
            user
        })
    } catch (error) {
        console.log(error)
        
    }
}
export const updateprofile = asynchandling(async (req, res) => {
    const {
        skill,
        experience,
        location,
        education,
        fullname
    } = req.body;

    // Find logged-in user
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    // Check role
    if (user.role !== "employe") {
        return res.status(403).json({
            success: false,
            message: "Only employees can update their profile"
        });
    }

    // Update text fields only if they are provided
    if (fullname !== undefined) {
        user.fullname = fullname;
    }

    if (skill !== undefined) {
        user.skill = skill;
    }

    if (experience !== undefined) {
        user.experience = experience;
    }

    if (location !== undefined) {
        user.location = location;
    }

    if (education !== undefined) {
        user.education = education;
    }

    // Resume upload
    if (req.file) {

        // Delete old resume from Cloudinary
        if (user.public_id) {
            await cloudinary.uploader.destroy(user.public_id, {
                resource_type: "raw"
            });

            console.log("Old resume deleted from Cloudinary");
        }

        // Upload new resume
        const result = await cloudinaryupload(
            req.file.buffer,
            "user"
        );

        console.log("New resume uploaded:", result);

        // Save new resume information
        user.resume = result.secure_url;
        user.public_id = result.public_id;
    }

    // Save changes
    await user.save();

    // Get updated user
    const updateprofile = await User.findById(req.user._id)
        .select("-password");

    return res.status(200).json({
        success: true,
        message: "User profile updated successfully",
        user: updateprofile
    });
});