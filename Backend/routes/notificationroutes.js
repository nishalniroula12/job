import express from 'express'
import { deletenotification, getmynotification, markasreadnotification } from "../controller/notificationcontroller.js"
import {auth} from '../middleware/auth.js'

const router=express.Router()
router.get('/getread',auth,getmynotification)
router.patch('/marked/:id',auth ,markasreadnotification)
router.delete('/remove/:id',auth,deletenotification)
export default router