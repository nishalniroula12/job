import express from 'express'
import { getallusers, getprofile, updateprofile, userregister } from '../controller/usercontroller.js';
import { signin } from '../controller/usercontroller.js';
import { logoutuser } from '../controller/usercontroller.js';
import { auth } from '../middleware/auth.js';
import upload from '../middleware/multer.js';

const router =express.Router()

router.post("/register",userregister)
router.get("/users",getallusers)
router.post('/login' ,signin)
router.post('/logout', logoutuser)
router.get('/profile',auth,getprofile)
router.put('/updateprofile/:id',upload.single('resume'),auth ,updateprofile)
export default router