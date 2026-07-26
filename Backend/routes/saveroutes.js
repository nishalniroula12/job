import express from 'express'
import { getsavejob, removesavejob, savejob } from "../controller/savecontroller.js"
import { auth } from '../middleware/auth.js'

const router =express.Router()
router.post('/save',auth,savejob)
router.get('/getsave' ,auth,getsavejob)
router.delete('/removesave/:id' ,auth,removesavejob)
export default router