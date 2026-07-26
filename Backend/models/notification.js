import mongoose from "mongoose";

const notificationmodel =new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    message:{
        type:String,
        required:true   
    },
    type:{
        type:String,
        enum:["application","application_status","job","system"],
        default:"system"

    },
    isread:{
        type:Boolean,
        dafault:false
    }
},{timestamps:true})

const Notification =mongoose.model("Notification",notificationmodel)
export default Notification