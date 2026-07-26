import mongoose from "mongoose"
const connectdatabase =async()=>{
    try {
        await mongoose.connect(process.env["MONGO_URL"]) 
        console.log("database connected succesfully")
        
    } catch (error) {
        console.log(error)
        
    }
}
export default connectdatabase