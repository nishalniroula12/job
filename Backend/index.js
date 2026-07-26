
import express from "express"
import connectdatabase from "./config/db.js"
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'
import cors from "cors";
dotenv.config()
import userroutes from './routes/userroutes.js'
import companyroutes from './routes/companyroutes.js'
import jobroutes from './routes/jobroutes.js'
import applicationroutes from './routes/applicationroutes.js'
import saveroutes from './routes/saveroutes.js'
import notificationroutes from './routes/notificationroutes.js'
import adminroutes from './routes/adminroutes.js'

const app=express()

app.use(
    cors({
        origin: "http://localhost:5173",
    credentials:true
    })
)
app.use(express.json())
app.use(cookieParser()); // <-- Add this
connectdatabase()

app.use("/api" ,userroutes)
app.use("/api",companyroutes)
app.use("/api",jobroutes)
app.use('/api',applicationroutes)
app.use('/api',saveroutes)
app.use('/api',notificationroutes)
app.use('/api',adminroutes)




app.get('/',(req,res)=>{
    res.json({
        success:true,
        message:"database connected"
    })

})
const PORT =process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log("runnng server", PORT)
})