import mongoose  from "mongoose";

const jobmodel =new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Company",
        required:true,

    },
    employer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,

    },
    description:{
        type:String,
        required:true,

    },
    requirements:{
        type:String,
        required:true
    },
    skill:{
        type:String,

    },
    responsibility:{
        type:String,

    },
    salary:{
        min:{
            type:Number,
        },
        max:{
            type:Number,
        }
    },
    salarytype:{
        type:String,
        enum:["monthly","hourly","yearly"],
        default:"monthly"
    },
    experience:{
        type:String,
        enum:[
            "fresher",
            "1",
            "2",
            "3",
        ],
        default:"fresher"
    },
    education:{
        type:String,
        default:""
    },
    jobtype:{
        type:String,
        enum:["remote","fulltime" ,"parttime"],
        default:"fulltime",
    },
    location:{
        type:String,
    },
    vacancy:{
        type:Number,
        default:1
    },
    deadline:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        enum:["open","closed"],
        default:"open"
    },
    view:{
        type:Number,
        default:0
    }




},{timestamps:true})

const Job =mongoose.model("Job",jobmodel)
export default Job