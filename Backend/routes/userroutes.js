import express from 'express'
import { userregister } from '../controller/usercontroller.js';
import { signin } from '../controller/usercontroller.js';
import { logoutuser } from '../controller/usercontroller.js';

const router =express.Router()

router.post("/register",userregister)
router.post('/login' ,signin)
router.post('/logout', logoutuser)
export default router