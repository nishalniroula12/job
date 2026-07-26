import Job from "../models/job.js"
import Save from "../models/savemodel.js"

export const savejob=async(req,res)=>{
    try {
        const {job} =req.body
        const jobdata =await Job.findById(job)
        if(!jobdata){
            return res.status(201).json({
                success:false,
                messgae:"job does not found"
            })
        }
        console.log(jobdata)
        const alreadySaved = await Save.findOne({
            employe: req.user._id,
            job,
          });
      
          if (alreadySaved) {
            return res.status(400).json({
              success: false,
              message: "Job already saved",
            });
          }
      
          console.log(alreadySaved)

        const createsave =await Save.create({
            employe:req.user._id,
            job,
        })
        return res.status(200).json({
            success:true,
            message:"job is save",
            createsave
        })

        
    } catch (error) {
        console.log(error)
        
    }
}
 export const getsavejob =async(req,res)=>{
    try {
        const save =await Save.find({employe:req.user._id}).populate("job")
        return res.status(201).json({
            success:true,
            message:"get all save job",
            totalSavedJobs: save.length,
            save
        
        })
        
    } catch (error) {
        console.log(error)
        
    }
 }
 export const removesavejob=async(req,res)=>{
    try {
        const savedata=await Save.findById(req.params.id)
        if(!savedata){
            return res.status(201).json({
                success:false,
                message:"save job not found",
            })
        }
        if (savedata.employe.toString() !== req.user._id.toString()) {
            return res.status(403).json({
              success: false,
              message: "Unauthorized",
            });
          }
      await savedata.save()
      return res.status(201).json({
        success:true,
        message:"remove save job",
        savedata
        
      })
        
    } catch (error) {
        console.log(error)
        
    }
 }