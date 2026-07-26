import Company from "../models/company.js"
import Job from "../models/job.js"
import User from "../models/Users.js"

export const getalluser =async(req,res)=>{
    try {
        const user =await User.find().select("-password")
    return res.status(201).json({
        success:true,
        message:"get all user",
        user
    })
        
    } catch (error) {
        console.log(error)
        
    }
}
export const blockuser=async(req,res)=>{
    try {
        const user =await User.findById(req.params.id)
        if(!user){
            return res.status(201).json({
                success:false,
                message:"user not found"

            })
        }
        user.status="blocked"
        await user.save()

        return res.status(201).json({
            success:true,
            message:"user is blocked",
            user
        })
        
    } catch (error) {
        console.log(error)
        
    }
}

export const unblockuser =async(req,res)=>{
    try {
        const user =await User.findById(req.params.id)
        if(!user){
            return res.status(201).json({
                success:false,
                message:"user not found"
            })
        }
        user.status ="active"
        await user.save()
        return res.status(201).json({
            success:true,
            message:"user is unblocked",
            user
        })
        
    } catch (error) {
        console.log(error)
        
    }
}
export const deleteuser =async(req,res)=>{
    try {
        const user =await User.findById(req.params.id)
        if(!user){
            return res.status(200).json({
                success:false,
                message:"user not founded"
            })
        }
        await user.findByIdAndDelete(id)
        return res.status(201).json({
            success:true,
            message:"user is deleted",
            user
        })
    } catch (error) {
        console.log(error)
        
    }
}

//get all company
export const getallcompany =async(req,res)=>{
    try {
        const company =await Company.find().populate("owner")
        if(!company){
            return res.status(201).json({
                success:false,
                message:"company not found"
            })
        }
        return res.status(201).json({
            success:true,
             message:"get all company data",
             totalcompany:company.length,
             company
        })

        
    } catch (error) {
        console.log(error)
        
    }
}
export const deletecompany =async(req,res)=>{
    try {
        const company =await Company.findById(req.params.id)
        if(!company){
        return res.status(201).json({
            success:false,
            message:"not found any company"

        })
    }
    await Company.findByIdAndDelete(id)
    return res.status(201).json({
        success:true,
        message:"company deleted successfully",
        company
    })

        
    } catch (error) {
        console.log(error)
        
    }
}
export const getalljob =async(req,res)=>{
    try {
        const job =await Job.find().populate("company").populate("employer")
        if(!job){
            return res.status(201).json({
                success:false,
            message:"job not found"
            })
        }
        return res.status(201).json({
            success:true,
            message:"get all job successfully",
            totaljob:job.length,
            job

        })
        
    } catch (error) {
        console.log(error)
        
    }
}
export const deletejob =async(req,res)=>{
    try {
        const job =await Job.findById(req.params.id)
        if(!job){
            return res.status(201).json({
                success:false,
                message:"job not founded"

            })
        }
        await Job.findByIdAndDelete(id)
        return res.status(201).json({
            success:true,
            message:'job deleted succesfully',
            job
        })
        
    } catch (error) {
        console.log(error)
        
    }
}