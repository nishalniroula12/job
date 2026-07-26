import express from "express";
import { createjob, deletejob, getpublicjob, singlejob, updatejob } from "../controller/jobcontroller.js";
const router = express.Router();
router.post("/createjob", createjob);
router.get("/allget",getpublicjob)
router.get("/singlejob/:id",singlejob)
router.put('/updatejob/:id' ,updatejob)
router.delete("/job/:id",deletejob)
export default router;
