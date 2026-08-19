import express from "express";

// ======================================================
// ADMIN CONTROLLER
// ======================================================

import {
  blockuser,
  deletecompany,
  getallcompany,
  getalluser,
  unblockuser,
} from "../controller/admincontroller.js";


// ======================================================
// APPLICATION CONTROLLER
// ======================================================

import {
  applicationcreate,
  deleteapplication,
  getapplication,
  getemployerapplicant,
  getMyApplications,
  singleapplication,
  updateapplication,
} from "../controller/applicationcontroller.js";


// ======================================================
// COMPANY CONTROLLER
// ======================================================

import {
  createcompany,
  deletecompany as deleteCompanyFromCompanyController,
  getcompany,
  updatecompany,
} from "../controller/companycontroller.js";


// ======================================================
// JOB CONTROLLER
// ======================================================

import {
  createjob,
  deletejob,
  getpublicjob,
  singlejob,
  updatejob,
} from "../controller/jobcontroller.js";


// ======================================================
// NOTIFICATION CONTROLLER
// ======================================================

import {
  deletenotification,
  getmynotification,
  markasreadnotification,
} from "../controller/notificationcontroller.js";


// ======================================================
// SAVE JOB CONTROLLER
// ======================================================

import {
  getsavejob,
  removesavejob,
  savejob,
} from "../controller/savecontroller.js";


// ======================================================
// USER CONTROLLER
// ======================================================

import {
  getprofile,
  logoutuser,
  signin,
  updateprofile,
  userregister,
} from "../controller/usercontroller.js";


// ======================================================
// MIDDLEWARE
// ======================================================

import { auth, adminonly } from "../middleware/auth.js";

import upload from "../middleware/multer.js";


// ======================================================
// ROUTER
// ======================================================

const router = express.Router();


// ======================================================
// AUTH / USER ROUTES
// ======================================================

// Register
router.post("/register", userregister);

// Login
router.post("/login", signin);

// Logout
router.post("/logout", logoutuser);

// Get profile
router.get("/profile", auth, getprofile);

// Update profile
router.put(
  "/updateprofile/:id",
  upload.single("resume"),
  auth,
  updateprofile
);


// ======================================================
// JOB ROUTES
// ======================================================

// Create job
router.post("/createjob", createjob);

// Get all public jobs
router.get("/allget", getpublicjob);

// Get single job
router.get("/singlejob/:id", singlejob);

// Update job
router.put("/updatejob/:id", updatejob);

// Delete job
router.delete("/job/:id", deletejob);


// ======================================================
// COMPANY ROUTES
// ======================================================

// Create company
router.post(
  "/createcompany",
  upload.single("image"),
  createcompany
);

// Get all companies
router.get("/get", getcompany);

// Update company
router.put(
  "/editcompany/:id",
  upload.single("image"),
  updatecompany
);

// Delete company
router.delete(
  "/companydelete",
  deleteCompanyFromCompanyController
);


// ======================================================
// APPLICATION ROUTES
// ======================================================

// Apply for job
router.post(
  "/app",
  auth,
  upload.single("resume"),
  applicationcreate
);

// Get applications
router.get(
  "/getapp",
  auth,
  getapplication
);

// Get my applications
router.get(
  "/getemploye",
  auth,
  getMyApplications
);

// Get single application
router.get(
  "/single/:id",
  auth,
  singleapplication
);

// Update application
router.put(
  "/updateapp/:id",
  upload.single("resume"),
  auth,
  updateapplication
);

// Delete application
router.delete(
  "/deleteapp/:id",
  auth,
  deleteapplication
);

// Employer applicants
router.get(
  "/employer",
  auth,
  getemployerapplicant
);


// ======================================================
// SAVE JOB ROUTES
// ======================================================

// Save job
router.post(
  "/save",
  auth,
  savejob
);

// Get saved jobs
router.get(
  "/getsave",
  auth,
  getsavejob
);

// Remove saved job
router.delete(
  "/removesave/:id",
  auth,
  removesavejob
);


// ======================================================
// NOTIFICATION ROUTES
// ======================================================

// Get notifications
router.get(
  "/getread",
  auth,
  getmynotification
);

// Mark notification as read
router.patch(
  "/marked/:id",
  auth,
  markasreadnotification
);

// Delete notification
router.delete(
  "/remove/:id",
  auth,
  deletenotification
);


// ======================================================
// ADMIN USER ROUTES
// ======================================================

// Get all users
router.get(
  "/getuser",
  auth,
  adminonly,
  getalluser
);

// Block user
router.put(
  "/block/:id",
  auth,
  adminonly,
  blockuser
);

// Unblock user
router.put(
  "/unblock/:id",
  auth,
  adminonly,
  unblockuser
);


// ======================================================
// ADMIN COMPANY ROUTES
// ======================================================

// Get all companies for admin
router.get(
  "/getcompany",
  auth,
  adminonly,
  getallcompany
);

// Delete company for admin
router.delete(
  "/deletecompany/:id",
  auth,
  adminonly,
  deletecompany
);


// ======================================================
// EXPORT
// ======================================================

export default router;