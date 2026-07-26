import mongoose from "mongoose";

const savemodel =new mongoose.Schema({
    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Job",
        required:true,
    },
    employe:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

},{timestamps:true})

const Save =mongoose.model("Save",savemodel)
export default Save