import cloudinary from "../config/cloudinary.js";
import Application from "../models/application.js";
import Job from "../models/job.js";
import Notification from "../models/notification.js";
import { cloudinaryupload } from "../utlis/cloudinaryupload.js";


// ======================================================
// CREATE APPLICATION
// ======================================================

export const createApplicationService = async ({
  job,
  coverletter,
  status,
  employe,
  fullname,
  file
}) => {

  if (!file) {
    const error = new Error("Resume is required");
    error.statusCode = 400;
    throw error;
  }

  // Check job
  const jobdata = await Job.findById(job);

  if (!jobdata) {
    const error = new Error("Job not found");
    error.statusCode = 404;
    throw error;
  }

  // Check already applied
  const alreadyApplied = await Application.findOne({
    job,
    employe
  });

  if (alreadyApplied) {
    const error = new Error(
      "You have already applied for this job"
    );

    error.statusCode = 400;
    throw error;
  }

  // Upload resume
  const result = await cloudinaryupload(
    file.buffer,
    "application"
  );

  // Create application
  const application = await Application.create({
    job,
    coverletter,
    status,
    employe,
    resume: result.secure_url,
    public_id: result.public_id
  });

  // Create notification
  await Notification.create({
    user: jobdata.employer,
    message: `${fullname} applied for your job: ${jobdata.title}`,
    type: "application"
  });

  return application;
};


// ======================================================
// GET ALL APPLICATIONS
// ======================================================
export const getApplicationsService = async (userId) => {
  // Find jobs created by this employer
  const jobs = await Job.find({
    employer: userId
  });

  const jobIds = jobs.map((job) => job._id);

  // Find applications for those jobs
  const applications = await Application.find({
    job: { $in: jobIds }
  })
    .populate("employe")
    .populate("job")
    .sort({ createdAt: -1 });

  return applications;
};

// ======================================================
// GET SINGLE APPLICATION
// ======================================================

export const getSingleApplicationService = async (id) => {

  const application = await Application.findById(id)
    .populate("job")
    .populate("employe");

  if (!application) {
    const error = new Error("Application not found");
    error.statusCode = 404;
    throw error;
  }

  return application;
};


// ======================================================
// UPDATE APPLICATION
// ======================================================

export const updateApplicationService = async (id, data) => {

  const application = await Application.findById(id);

  if (!application) {
    const error = new Error("Application not found");
    error.statusCode = 404;
    throw error;
  }

  // Update status
  if (data.status) {
    application.status = data.status;
  }

  // Update cover letter
  if (data.coverletter) {
    application.coverletter = data.coverletter;
  }

  // If new resume uploaded
  if (data.file) {

    // Delete old resume from Cloudinary
    if (application.public_id) {
      await cloudinary.uploader.destroy(
        application.public_id
      );
    }

    // Upload new resume
    const result = await cloudinaryupload(
      data.file.buffer,
      "application"
    );

    application.resume = result.secure_url;
    application.public_id = result.public_id;
  }

  await application.save();

  return application;
};


// ======================================================
// DELETE APPLICATION
// ======================================================

export const deleteApplicationService = async (id) => {

  const application = await Application.findById(id);

  if (!application) {
    const error = new Error("Application not found");
    error.statusCode = 404;
    throw error;
  }

  // Delete resume from Cloudinary
  if (application.public_id) {
    await cloudinary.uploader.destroy(
      application.public_id
    );
  }

  // Delete application from MongoDB
  await Application.findByIdAndDelete(id);

  return true;
};


// ======================================================
// GET EMPLOYER APPLICANTS
// ======================================================

export const getEmployerApplicantsService = async (
  employerId
) => {

  // Find jobs created by employer
  const jobs = await Job.find({
    employer: employerId
  }).select("_id");

  const jobIds = jobs.map((job) => job._id);

  // Find applications for those jobs
  const application = await Application.find({
    job: {
      $in: jobIds
    }
  })
    .populate("job")
    .populate("employe", "-password")
    .sort({
      createdAt: -1
    });

  return application;
};


// ======================================================
// GET MY APPLICATIONS
// ======================================================

export const getMyApplicationsService = async (
  employeId
) => {

  const application = await Application.find({
    employe: employeId
  })
    .populate("job")
    .sort({
      createdAt: -1
    });

  return application;
};