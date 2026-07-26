import Notification from "../models/notification.js";

export const getmynotification = async (req, res) => {
  try {
    console.log("Logged in user:", req.user._id);
    const allNotifications = await Notification.find();

    console.log("All notifications:", allNotifications);

    const notification = await Notification.find({
        user: req.user._id,
      }).sort({ createdAt: -1 });   
    console.log("Notifications:", notification);

    return res.status(200).json({
      success: true,
      message: "Get the notification",
      total: notification.length,
      notification,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const markasreadnotification =async(req,res)=>{
    try {
        const {id} =req.params
        console.log(id)
        const notification =await Notification.findOne({user:req.user._id})
        if(!notification){
            return res.status(201).json({
                success:false,
                message:"not find any notification"
            })
        }
        notification.isread=true
        await notification.save()
        return res.status(201).json({
            success:true,
            message:"mark as the read",
            notification
        })

        
    } catch (error) {
        console.log(error)
        
    }
}
export const deletenotification =async(req,res)=>{
    try {
        const {id} =req.params
        console.log(id)
        const notification =await Notification.findOneAndDelete({user:req.user._id})
        if(!notification){
            return res.status(201).json({
                success:false,
                message:"not found any notification"
            })
        }
        return res.status(201).json({
            success:true,
            message:"notification is removed",
            notification
        })
        
    } catch (error) {
        console.log(error)
        
    }
}