import mongoose from "mongoose";

const companymodel =new mongoose.Schema({
name:{
    type:String,
    required:true,
},
image:{
    type:String,
    required:true

},
location:{
    type:String,
    required:true,
},
website:{
    type:String,
    required:true,
},
email:{
    type:String,
    required:true,
},
phone:{
    type:String,
    required:true,
},
industry:{
    type:String,
    required:true,
},

foundedyear:{
    type:Number


},
description:{
    type:String,
    required:true,
},
benefits:{
    type:String
},
owner:{
    type:String
},
status:{
    type:String,
    enum:["active" ,"inactive"],
    default:"active"
},
public_id:{
    type:String,
    required:true
}



},{timestamps:true})

const Company =mongoose.model("Company",companymodel)
export default Company