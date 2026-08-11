import Company from "../models/company.js";
import Job from "../models/job.js";

export const createjob = async (req, res) => {
  try {
    const {
      title,
      skill,
      company,
      responsibility,
      location,
      salary,
      salarytype,
      experience,
      education,
      vacancy,
      deadline,
      status,
      view,
      requirements,
      description,
    } = req.body;

        const companydata =await Company.findById(company)
        console.log(companydata)
        if(!companydata){
            return res.status(400).json({
                success:false,
                message:"company data not exist"
                
            })
        }

        const job = await Job.create({
      title,
      skill,
      company,
      employer:req.body.employer,
      responsibility,
      location,
      salary,
      salarytype,
      experience,
      education,
      vacancy,
      deadline,
      status,
      view,
      requirements,
      description,
    });
    console.log(req.user)
    return res.status(201).json({
        success:true,
        message:"job data is create successfully",
        job
    })

  } catch (error) {
    console.log(error)
  }
};
export const getpublicjob = async (req, res) => {
    try {
      const {
        keyword,
        salarytype,
        title,
        experience,
        jobtype,
        location,
        type,
      } = req.query;
  
      const filter = {};
  
      if (keyword) {
        filter.title = {
          $regex: keyword,
          $options: "i",
        };
      }
  
      if (experience) {
        filter.experience = experience;
      }
  
      if (location) {
        filter.location = location;
      }
  
      if (salarytype) {
        filter.salarytype = salarytype;
      }
  
      if (type) {
        type.type = type;
      }
  
      if (jobtype) {
        filter.jobtype = jobtype; // or filter.jobtype if you rename the schema field
      }
      if(title){
        filter.title= {
        $regex:title,
        $options:"i"
        }
      }
  
      console.log(filter)
      const jobs = await Job.find(filter)
        .populate("company")
        .populate("employer");
  
      return res.status(200).json({
        success: true,
        message: "Jobs fetched successfully",
        jobs,
      });
  
    } catch (error) {
      console.log(error);
  
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };//singlejob

export const singlejob =async(req,res)=>{
    try {
        const job =await Job.findById(req.params.id).populate("company").populate("employer")
        if(!job){
            return res.status(201).json({
                success:false,
                message:"job not found",
            })
        }
        job.view +=1;
        await job.save()
        return res.status(201).json({
            success:true,
            job
        })
        
    } catch (error) {
        console.log(error)
        
    }
}

export const updatejob=async(req,res)=>{
    try {
        const job =await Job.findById(req.params.id)
        if(!job){
            return res.status(201).json({
                success:false,
                message:"job not found"
            })
        }

   

        
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job: updatedJob,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const deletejob=async(req,res)=>{
    try {
        const job= await Job.findByIdAndDelete(req.params.id)
        if(!job){
            return res.status(201).json({
                success:false,
                message:"job not founded"

            })
        }
        return res.status(201).json({
            success:true,
            message:"job deleted successfuly",
            job
        })
        
    } catch (error) {
        console.log(error)
        
    }
}