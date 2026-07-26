import express from "express"
import { blockuser, deletecompany, getallcompany, getalluser, unblockuser } from "../controller/admincontroller.js"
import { auth, adminonly } from "../middleware/auth.js"

const router =express.Router()
//user
router.get('/getuser',auth,adminonly,getalluser)
router.put('/block/:id',auth,adminonly,blockuser)
router.put('/unblock/:id',auth,adminonly,unblockuser)


//company
router.get("/getcompany",auth,adminonly,getallcompany)
router.delete('/deletecompany/:id',auth,adminonly,deletecompany)



export default router