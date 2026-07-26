import cloudinary from "../config/cloudinary.js";
import Application from "../models/application.js";
import Job from "../models/job.js";
import Notification from "../models/notification.js";
import { cloudinaryupload } from "../utlis/cloudinaryupload.js";

export const applicationcreate=async(req,res)=>
{
    try {
        console.log("req.user:", req.user);
        const {job,coverletter,status}=req.body;
        const result =await cloudinaryupload(req.file.buffer,"application")
        console.log(result)
        const jobdata = await Job.findById(job);

        if (!jobdata) {
          return res.status(404).json({
            success: false,
            message: "Job not found",
          });
        } 
        const alreadyApplied = await Application.findOne({
          job: job,
          employe: req.user._id,
        });
        
        if (alreadyApplied) {
          return res.status(400).json({
            success: false,
            message: "You have already applied for this job",
          });
        }
    
        const application=await Application.create({
            job,
            coverletter,
            status,
            employe:req.user._id,
            resume:result.secure_url,
            public_id:result.public_id,
        })

        await Notification.create({
          user: jobdata.employer,
          message: `${req.user.fullname} applied for your job: ${jobdata.title}`,
          type: "application",
    
        })
        return res.status(201).json({
            success:true,
            message:"applictiob form is created",
            application
        })
        
    } catch (error) {
        console.log(error)
        
    }
}
//all application
export const getapplication =async(req,res)=>{
    try {
        const application =await Application.find().populate("job").populate("employe")
        if(!application){
            return res.status(201).json({
                success:false,
                message:"application is not found"
            })
        }
        return res.status(201).json({
            success:true,
            message:"application get successfully",application

        })
        
    } catch (error) {
        console.log(error)
        
    }
}
//singleapplication

export const singleapplication =async(req,res)=>{
    try {
        const application =await Application.findById(req.params.id).populate("job").populate("employe")
        if(!application){
            return res.status(201).json({
            success:false,
            message:"not found application"
            })
        }
        return res.status(201).json({
            success:true,
            message:"get single data successfully",
            application
        })
        
    } catch (error) {
        console.log(error)
        
    }
}
export const updateapplication = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await Application.findById(id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    // Update text fields
   application.status =req.body.status || application.status,
   application.coverletter =req.body.coverletter || application.coverletter
    // Update resume if a new file is uploaded
    if (req.file) {
      // Delete old resume from Cloudinary
      if (application.public_id) {
        await cloudinary.uploader.destroy(application.public_id);
      }

      // Upload new resume
      const result = await cloudinaryupload(
        req.file.buffer,
        "application",
      )
        application.resume =result.secure_url,
        application.public_id=result.public_id,
        console.log(result.public_id)
      

    }

    // Save changes
    await application.save();

    return res.status(200).json({
      success: true,
      message: "Application updated successfully",
      application,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const deleteapplication =async(req,res)=>{
  try {
    const application =await Application.findById(req.params.id)
    if(!application){
      return res.status(201).json({
        success:false,
        message:"cannot found application"
      })
    }
if(application.public_id){
  await cloudinary.uploader.destroy(application.public_id)

}
await application.save()

return res.status(201).json({
  success:true,
  message:"deleted successfully",
  application
})
    
  } catch (error) {
    console.log(error)
    
  }
}
export const getemployerapplicant =async(req,res)=>{
  try {
    const job =await Job.find({
      employer:req.user._id
    }).select("_id")
    if(!job){
      return res.status(201).json({
        success:false,
        message:"not found"
      })
    }
    const jobIds = job.map((job) => job._id);
    const application =await Application.find({
      job:{$in:jobIds} }).populate("job").populate("employe",'-password').sort({createdAt:-1})
   
    return res.status(200).json({
      success:true,
      message:"employer applicant fetch successfully",
      totalApplicants: application.length,
      application
    })

    
  } catch (error) {
    console.log(error)
    
  }
}
export const getMyApplications = async (req, res) => {
  try {
    console.log("Logged in user ID:", req.user._id);

    const application = await Application.find({
      employe: req.user._id,
    })
      .populate("job")
      .sort({ createdAt: -1 });

    console.log("Found applications:", application.length);
    console.log("Applications:", application);

    return res.status(200).json({
      success: true,
      message: "My applications fetched successfully",
      totalApplications: application.length,
      application,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};