import {
  createApplicationService,
  getApplicationsService,
  getSingleApplicationService,
  updateApplicationService,
  deleteApplicationService,
  getEmployerApplicantsService,
  getMyApplicationsService
} from "../Services/Applicationservice.js";

// CREATE APPLICATION
export const applicationcreate = async (req, res) => {
  try {
    const application = await createApplicationService({
      job: req.body.job,
      coverletter: req.body.coverletter,
      status: req.body.status,
      employe: req.user._id,
      fullname: req.user.fullname,
      file: req.file
    });

    return res.status(201).json({
      success: true,
      message: "Application form is created",
      application
    });

  } catch (error) {
    console.error(error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message
    });
  }
};


// GET ALL APPLICATIONS
export const getapplication = async (req, res) => {
  try {
    const application = await getApplicationsService();

    return res.status(200).json({
      success: true,
      message: "Application get successfully",
      application
    });

  } catch (error) {
    console.error(error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message
    });
  }
};


// GET SINGLE APPLICATION
export const singleapplication = async (req, res) => {
  try {
    const application = await getSingleApplicationService(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "Get single data successfully",
      application
    });

  } catch (error) {
    console.error(error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message
    });
  }
};


// UPDATE APPLICATION
export const updateapplication = async (req, res) => {
  try {
    const application = await updateApplicationService(
      req.params.id,
      {
        status: req.body.status,
        coverletter: req.body.coverletter,
        file: req.file
      }
    );

    return res.status(200).json({
      success: true,
      message: "Application updated successfully",
      application
    });

  } catch (error) {
    console.error(error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message
    });
  }
};


// DELETE APPLICATION
export const deleteapplication = async (req, res) => {
  try {
    await deleteApplicationService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Deleted successfully"
    });

  } catch (error) {
    console.error(error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message
    });
  }
};


// GET EMPLOYER APPLICANTS
export const getemployerapplicant = async (req, res) => {
  try {
    const result = await getEmployerApplicantsService(
      req.user._id
    );

    return res.status(200).json({
      success: true,
      message: "Employer applicants fetched successfully",
      totalApplicants: result.length,
      application: result
    });

  } catch (error) {
    console.error(error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message
    });
  }
};


// GET MY APPLICATIONS
export const getMyApplications = async (req, res) => {
  try {
    const application = await getMyApplicationsService(
      req.user._id
    );

    return res.status(200).json({
      success: true,
      message: "My applications fetched successfully",
      totalApplications: application.length,
      application
    });

  } catch (error) {
    console.error(error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message
    });
  }
};