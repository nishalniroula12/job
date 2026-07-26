    import mongoose from "mongoose";

    const usermodel = new mongoose.Schema({
        fullname:{
            type:String,
            required:true,

        },
        email:{
            type:String,
            required:true,

        },
        password:{
            type:String,
            required:true,
        },
        role:{
            type:String,
            enum:["admin","employer", "employe"],
            default:"employe"
        },
        status:{
            type:String,
            enum:["active","blocked"],
            default:"active"

        },
           
    },{timestamps:true})

    const User =mongoose.model("User",usermodel)
    export default User