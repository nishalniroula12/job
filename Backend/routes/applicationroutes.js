import express from "express";
import { applicationcreate, deleteapplication, getapplication, getemployerapplicant, getMyApplications, singleapplication, updateapplication } from "../controller/applicationcontroller.js";
import upload from "../middleware/multer.js";
import {auth} from '../middleware/auth.js'

const router =express.Router()
router.post('/app',auth,upload.single("resume"),applicationcreate)
router.get("/getapp" ,auth,getapplication)
router.get('/getemploye',auth,getMyApplications)
router.get('/single/:id',auth,singleapplication)
router.put('/updateapp/:id',upload.single("resume"),auth,updateapplication)
router.delete("/deleteapp/:id",auth ,deleteapplication)
router.get('/employer',auth,getemployerapplicant)
export default router