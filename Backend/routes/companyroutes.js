import express from "express";
import upload from "../middleware/multer.js";
import { createcompany, deletecompanies, getcompany, updatecompany } from "../controller/companycontroller.js";

const router = express.Router();


router.post("/createcompany", upload.single("image"), createcompany);
router.get('/get',getcompany)
router.put('/editcompany/:id', upload.single("image"),updatecompany)
router.delete('/companydelete/:id', deletecompanies)

export default router;
