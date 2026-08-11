import cloudinary from "../config/cloudinary.js";
import Company from "../models/company.js";
import User from "../models/Users.js";
import { cloudinaryupload } from "../utlis/cloudinaryupload.js";

export const createcompany = async (req, res) => {
  try {
    const {
      name,
      type,
      description,
      email,
      phone,
      location,
      website,
      industry,
      foundedyear,
      benefits,
      status,
      owner,
    } = req.body;
    const result = await cloudinaryupload(req.file.buffer, "company");
    console.log(result);
    const company = await Company.create({
      name,
      type,
      description,
      email,
      phone,
      location,
      website,
      industry,
      foundedyear,
      benefits,
      status,
      owner,
      image:result.secure_url,
      public_id:result.public_id,
    });
    console.log(company)
    return res.status(201).json({
        success:true,
        message:"company data is created",
        company
    })
  } catch (error) {
    console.log(error)

  }
};

//public
export const getcompany=async(req,res)=>{
  try {
    const{keyword,type ,location} =req.query

    const filter ={}
    if(keyword){
      filter.name={
        $regex:keyword,
        $options:'i'
      }
    }
    if(location){
      filter.location={
        $regex:location,
        $options:"i"
      }
    }
    if(type){
      filter.type={
      $regex: `^${type}`,
      $options:"i"
    };
        }

    console.log(filter)
    const company =await Company.find(filter)
    return res.status(201).json({
      success:true,
      message:"get all public data",
      company
    })
    
  } catch (error) {
    console.log(error)
    
  }
}
export const updatecompany = async (req, res) => {
  try {
    const {
      name,
      description,
      email,
      phone,
      location,
      website,
      industry,
      foundedyear,
      benefits,
      status,
      owner,
    } = req.body;
    console.log(req.body)
    
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    company.name = req.body.name || company.name;
    company.type = req.body.type || company.type;
    company.description = req.body.description || company.description;
    company.email = req.body.email || company.email;
    company.phone = req.body.phone || company.phone;
    company.location = req.body.location || company.location;
    company.website = req.body.website || company.website;
    company.industry = req.body.industry || company.industry;
    company.foundedyear = req.body.foundedyear || company.foundedyear;
    company.benefits = req.body.benefits || company.benefits;
    company.status = req.body.status || company.status;
    company.owner = req.body.owner || company.owner;

    if(req.file){
      const result =await cloudinaryupload(req.file.buffer, "company")
      company.image =result.secure_url
      company.public_id=result.public_id
      console.log(result.public_id)

  }
  const uploadcompany =await company.save()
  console.log(updatecompany)
  return res.status(200).json({
      success:true,
      message:"company data is updated",
      company:uploadcompany
  })
  
  
} catch (error) {
  console.log(error)
  
}
}
export const deletecompany=async(req,res)=>{
  try {
    const company =await Company.findById(req.params.id)
    if(!company){
      return res.status(201).json({
        success:false,
        message:"company not found"

      })
    }
    await cloudinary.uploader.destroy(company.public_id);
    await Company.findByIdAndDelete(id);

    return res.status(200).json({
        success: true,
        message: "Deleted successfully"
    });

} catch (error) {
    console.log(error);
    return res.status(500).json({
        success: false,
        message: "Server error"
    });
}
};