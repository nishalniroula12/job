import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import asynchandling from './utlis/asynchandling.js';
import User from './models/Users.js';
import connectdatabase from './config/db.js';
dotenv.config();

const seedAdmin =asynchandling(async()=>{
await connectdatabase()
    const adminexist =await User.findOne({
        email :"admin@gmail.com"
    })
    if(adminexist){
        console.log("admin already existing")
        process.exit(0)
    }
    const hashpassword =await bcrypt.hash("admin@123",10)

    const admin =new User({
        fullname:'admin',
        email:"admin@gmail.com",
        password:hashpassword
    })
    await admin.save()
    console.log("admin created")

})
seedAdmin()
