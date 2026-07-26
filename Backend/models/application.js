import mongoose, { mongo } from "mongoose";

const applicationmodel =new mongoose.Schema({
     job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Job",
        required:true,
     },
     employe:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,

     },
     resume:{
        type:String,
     },
     coverletter:{
        type:String,

     },
     public_id:{
        type:String,

     },
     
        status: {
            type: String,
            enum: [
              "Applied",
              "Reviewed",
              "Shortlisted",
              "Interview",
              "Rejected",
              "Hired",
            ],
            default: "Applied",
          },
        },
    {timestamps:true}
)
const Application =mongoose.model("Application",applicationmodel)
export default Application