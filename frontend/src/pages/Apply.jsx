import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  FaArrowLeft,
  FaBriefcase,
  FaBuilding,
  FaCheckCircle,
  FaFilePdf,
  FaMapMarkerAlt,
  FaRupeeSign,
} from "react-icons/fa";

import api from "../api/axios";
import { useSelector } from "react-redux";

const Apply = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticate } = useSelector((state) => state.data);


  // =====================================================
  // STATES
  // =====================================================

  const [job, setJob] = useState(null);

  // All jobs from database
  const [relatedJobs, setRelatedJobs] = useState([]);

  const [loading, setLoading] = useState(true);

  const [applied, setApplied] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const [applying, setApplying] = useState(false);

  const [coverletter, setCoverletter] = useState("");

  const [resume, setResume] = useState(null);

  const [saved, setSaved] = useState(false);

  const [message, setMessage] = useState("");

  // =====================================================
  // GET SINGLE JOB
  // =====================================================

  const fetchJob = async () => {
    try {
      console.log("JOB ID:", id);

      const res = await api.get(`/singlejob/${id}`);

      console.log("SINGLE JOB RESPONSE:", res.data);

      if (!res.data.success) {
        setMessage(res.data.message || "Job not found");
        return;
      }

      // Backend:
      // { success: true, job: {...} }

      setJob(res.data.job);
    } catch (error) {
      console.error(
        "FETCH JOB ERROR:",
        error.response?.data || error.message
      );

      setMessage(
        error.response?.data?.message || "Failed to load job"
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // GET ALL JOBS
  // =====================================================

  const fetchRelatedJobs = async () => {
    try {
      const res = await api.get("/allget");

      console.log("ALL JOBS RESPONSE:", res.data);

      /*
        Depending on your backend response, it may be:

        {
          success: true,
          job: [...]
        }

        OR

        {
          success: true,
          jobs: [...]
        }

        We handle both.
      */

      const allJobs =
        res.data.jobs ||
        res.data.job ||
        res.data.data ||
        [];

      setRelatedJobs(Array.isArray(allJobs) ? allJobs : []);
    } catch (error) {
      console.error(
        "FETCH RELATED JOBS ERROR:",
        error.response?.data || error.message
      );

      setRelatedJobs([]);
    }
  };

  // =====================================================
  // CHECK APPLICATION
  // =====================================================

  const checkApplication = async () => {
    try {
      const res = await api.get(`/check/${id}`);

      console.log("APPLICATION CHECK:", res.data);

      if (res.data.applied === true) {
        setApplied(true);
      } else {
        setApplied(false);
      }
    } catch (error) {
      console.log(
        "CHECK APPLICATION ERROR:",
        error.response?.data || error.message
      );
    }
  };

  // =====================================================
  // GET DATA
  // =====================================================

  useEffect(() => {
    if (!id) {
      setMessage("Job ID is missing");
      setLoading(false);
      return;
    }

    fetchJob();
    fetchRelatedJobs();
    checkApplication();
  }, [id,isAuthenticate,user]);

  // =====================================================
  // POSTED TIME
  // =====================================================

  const getPostedTime = (date) => {
    if (!date) {
      return "N/A";
    }

    const postedDate = new Date(date);
    const currentDate = new Date();

    const difference = Math.floor(
      (currentDate - postedDate) /
        (1000 * 60 * 60 * 24)
    );

    if (difference === 0) {
      return "Today";
    }

    if (difference === 1) {
      return "1 day ago";
    }

    return `${difference} days ago`;
  };

  // =====================================================
  // OPEN APPLY FORM
  // =====================================================

  const openApplyForm = () => {
    if (applied) {
      return;
    }

    setShowForm(true);

    setTimeout(() => {
      document
        .getElementById("apply-form")
        ?.scrollIntoView({
          behavior: "smooth",
        });
    }, 100);
  };

  // =====================================================
  // APPLY
  // =====================================================

  const handleApply = async (e) => {
    e.preventDefault();

    if (!resume) {
      setMessage("Please select your resume");
      return;
    }

    try {
      setApplying(true);
      setMessage("");

      const formData = new FormData();

      // Job ID
      formData.append("job", id);

      // Cover letter
      formData.append(
        "coverletter",
        coverletter
      );

      // Resume
      formData.append(
        "resume",
        resume
      );

      console.log("Applying for job:", id);

      const res = await api.post(
        "/app",
        formData
      );

      console.log(
        "APPLICATION RESPONSE:",
        res.data
      );

      if (res.data.success) {
        setApplied(true);

        setShowForm(false);

        setMessage(
          "You have successfully applied for this job"
        );

        setCoverletter("");

        setResume(null);

        const fileInput =
          document.getElementById("resume");

        if (fileInput) {
          fileInput.value = "";
        }
      }
    } catch (error) {
      console.log(
        "APPLY ERROR:",
        error.response?.data ||
          error.message
      );

      setMessage(
        error.response?.data?.message ||
          "Failed to apply"
      );
    } finally {
      setApplying(false);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f6f8] flex items-center justify-center">
        <div className="text-center">

          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="mt-4 text-gray-600">
            Loading job...
          </p>

        </div>
      </div>
    );
  }

  // =====================================================
  // JOB NOT FOUND
  // =====================================================

  if (!job) {
    return (
      <div className="min-h-screen bg-[#f5f6f8] flex items-center justify-center">

        <div className="bg-white rounded-2xl p-8 text-center shadow-sm">

          <h2 className="text-xl font-bold text-gray-800">
            {message || "Job not found"}
          </h2>

          <button
            onClick={() => navigate("/job")}
            className="mt-5 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700"
          >
            Back to Jobs
          </button>

        </div>

      </div>
    );
  }

  // =====================================================
  // FILTER RELATED JOBS
  // =====================================================

  const otherJobs = relatedJobs
    .filter(
      (item) => item._id !== job?._id
    )
    .slice(0, 5);

  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <div className="min-h-screen bg-[#f5f6f8]">


      {/* =================================================
          BACK
      ================================================= */}

      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-6">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
        >
          <FaArrowLeft />

          Back to Jobs
        </button>

      </div>

      {/* =================================================
          MAIN CONTAINER
      ================================================= */}

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-5">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* =================================================
              LEFT SIDE
          ================================================= */}

          <div className="lg:col-span-2">

            {/* =================================================
                JOB HEADER CARD
            ================================================= */}

            <div className="bg-white rounded-2xl shadow-sm p-5 md:p-7">

              {/* HEADER */}

              <div className="flex justify-between gap-5">

                {/* JOB INFORMATION */}

                <div className="flex-1 min-w-0">

                  <h1 className="text-2xl font-bold text-gray-900">
                    {job.title}
                  </h1>

                  <p className="text-gray-600 mt-2">
                    {job.description
                      ? job.description.substring(
                          0,
                          180
                        )
                      : "No description available"}
                  </p>

                  <p className="text-gray-500 mt-3 text-sm">

                    Posted by{" "}

                    <span className="text-gray-700 font-medium">
                      {job.company?.name ||
                        "Company"}
                    </span>

                  </p>

                </div>

                {/* COMPANY LOGO */}

                <div className="w-20 h-20 border border-gray-200 rounded-xl flex items-center justify-center shrink-0">

                  {job.company?.image ? (

                    <img
                      src={job.company.image}
                      alt="Company"
                      className="w-full h-full object-contain rounded-xl"
                    />

                  ) : (

                    <FaBuilding className="text-gray-400 text-2xl" />

                  )}

                </div>

              </div>

              {/* =================================================
                  JOB BASIC INFORMATION
              ================================================= */}

              <div className="flex flex-wrap items-center gap-7 mt-7 text-sm text-gray-600">

                {/* EXPERIENCE */}

                <div className="flex items-center gap-2">

                  <FaBriefcase className="text-gray-400" />

                  <span>
                    {job.experience ||
                      "0 years"}
                  </span>

                </div>

                {/* SALARY */}

                <div className="flex items-center gap-2">

                  <FaRupeeSign className="text-gray-400" />

                  <span>
                    {job.salary?.amount
                      ? job.salary.amount
                      : "Not Disclosed"}
                  </span>

                </div>

                {/* LOCATION */}

                <div className="flex items-center gap-2">

                  <FaMapMarkerAlt className="text-gray-400" />

                  <span>
                    {job.location ||
                      "Location not specified"}
                  </span>

                </div>

              </div>

              {/* =================================================
                  POSTED + OPENINGS + APPLICANTS
              ================================================= */}

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-7 pt-4 border-t border-gray-200">

                {/* LEFT */}

                <div className="flex flex-wrap items-center text-sm">

                  {/* POSTED */}

                  <div className="pr-3">

                    <span className="text-gray-500">
                      Posted:
                    </span>{" "}

                    <span className="text-gray-800 font-medium">
                      {getPostedTime(
                        job.createdAt
                      )}
                    </span>

                  </div>

                  <span className="text-gray-300">
                    |
                  </span>

                  {/* OPENINGS */}

                  <div className="px-3">

                    <span className="text-gray-500">
                      Openings:
                    </span>{" "}

                    <span className="text-gray-800 font-medium">
                      {job.vacancy || 0}
                    </span>

                  </div>

                  <span className="text-gray-300">
                    |
                  </span>

                  {/* APPLICANTS */}

                  <div className="pl-3">

                    <span className="text-gray-500">
                      Applicants:
                    </span>{" "}

                    <span className="text-blue-700 font-medium">
                      {job.applicants || 0}
                    </span>

                  </div>

                </div>

                {/* BUTTONS */}

                <div className="flex items-center gap-3 shrink-0">

                  {/* SAVE */}

                  <button
                    type="button"
                    onClick={() =>
                      setSaved(!saved)
                    }
                    className={`px-7 py-2.5 rounded-full border font-semibold transition ${
                      saved
                        ? "border-green-500 bg-green-50 text-green-600"
                        : "border-blue-600 text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    {saved
                      ? "✓ Saved"
                      : "Save"}
                  </button>

                  {/* APPLY */}

                  <button
                    type="button"
                    onClick={openApplyForm}
                    disabled={applied}
                    className={`px-7 py-2.5 rounded-full font-semibold transition ${
                      applied
                        ? "bg-green-500 text-white cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >

                    {applied ? (

                      <span className="flex items-center gap-2">

                        <FaCheckCircle />

                        You have applied

                      </span>

                    ) : (

                      "Apply"

                    )}

                  </button>

                </div>

              </div>

            </div>

            {/* =================================================
                MESSAGE
            ================================================= */}

            {message && (

              <div
                className={`mt-4 p-4 rounded-xl ${
                  applied
                    ? "bg-green-50 border border-green-200 text-green-700"
                    : "bg-red-50 border border-red-200 text-red-700"
                }`}
              >

                <div className="flex items-center gap-2">

                  {applied && (
                    <FaCheckCircle />
                  )}

                  {message}

                </div>

              </div>

            )}

            {/* =================================================
                APPLY FORM
            ================================================= */}

            {showForm && !applied && (

              <div
                id="apply-form"
                className="bg-white rounded-2xl p-6 mt-5 shadow-sm"
              >

                <div className="flex justify-between items-center mb-6">

                  <div>

                    <h2 className="text-xl font-bold text-gray-900">
                      Apply for this job
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      Submit your application
                    </p>

                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setShowForm(false)
                    }
                    className="text-gray-400 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>

                </div>

                <form onSubmit={handleApply}>

                  {/* COVER LETTER */}

                  <div className="mb-5">

                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Cover Letter
                    </label>

                    <textarea
                      value={coverletter}
                      onChange={(e) =>
                        setCoverletter(
                          e.target.value
                        )
                      }
                      rows={7}
                      placeholder="Write your cover letter..."
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                  </div>

                  {/* RESUME */}

                  <div className="mb-6">

                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Resume
                    </label>

                    <label
                      htmlFor="resume"
                      className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition"
                    >

                      <FaFilePdf className="text-red-500 text-3xl mb-2" />

                      {resume ? (

                        <p className="text-sm font-medium text-green-600">
                          {resume.name}
                        </p>

                      ) : (

                        <>
                          <p className="text-sm font-medium text-gray-700">
                            Click to upload resume
                          </p>

                          <p className="text-xs text-gray-400 mt-1">
                            PDF, DOC or DOCX
                          </p>
                        </>

                      )}

                    </label>

                    <input
                      id="resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) =>
                        setResume(
                          e.target.files?.[0] ||
                            null
                        )
                      }
                      className="hidden"
                    />

                  </div>

                  {/* SUBMIT */}

                  <button
                    type="submit"
                    disabled={applying}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3.5 rounded-xl font-semibold transition"
                  >

                    {applying
                      ? "Applying..."
                      : "Submit Application"}

                  </button>

                </form>

              </div>

            )}

            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <div className="bg-white rounded-2xl p-6 mt-5 shadow-sm">

              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Job highlights
              </h2>

              <p className="text-gray-600 whitespace-pre-line leading-7">
                {job.description ||
                  "No description available"}
              </p>

            </div>

            {/* =================================================
                REQUIREMENTS
            ================================================= */}

            {job.requirements && (

              <div className="bg-white rounded-2xl p-6 mt-5 shadow-sm">

                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Requirements
                </h2>

                <p className="text-gray-600 whitespace-pre-line leading-7">
                  {job.requirements}
                </p>

              </div>

            )}

          </div>

          {/* =================================================
              RIGHT SIDE
          ================================================= */}

          <div>

            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-5">

              <h2 className="text-lg font-bold text-gray-900 mb-5">
                Jobs you might be interested in
              </h2>

              <div className="space-y-5">

                {otherJobs.length > 0 ? (

                  otherJobs.map((item) => (

                    <div
                      key={item._id}
                      onClick={() =>
                        navigate(`/apply/${item._id}`)
                      }
                      className="pb-5 border-b last:border-b-0 cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition"
                    >

                      {/* JOB TITLE */}

                      <h3 className="font-semibold text-gray-900">
                        {item.title ||
                          "Untitled Job"}
                      </h3>

                      {/* COMPANY */}

                      <p className="text-sm text-gray-600 mt-1">

                        {item.company?.name ||
                          item.company?.companyname ||
                          "Company"}

                      </p>

                      {/* LOCATION */}

                      <p className="text-sm text-gray-500 mt-2">

                        <FaMapMarkerAlt className="inline mr-1" />

                        {item.location ||
                          "Location not specified"}

                      </p>

                    </div>

                  ))

                ) : (

                  <p className="text-sm text-gray-500">
                    No other jobs available.
                  </p>

                )}

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Apply;