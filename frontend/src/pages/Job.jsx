import React, { useEffect, useState } from "react";

import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaRegBookmark,
  FaBookmark,
  FaEyeSlash,
  FaBuilding,
  FaGraduationCap,
  FaRupeeSign,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import api from "../api/axios";
import Navbar from "../components/Navbar";

const Job = () => {
  const navigate = useNavigate();

  // =========================================
  // JOB STATE
  // =========================================

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================================
  // ACTIVE TAB
  // =========================================

  const [activeTab, setActiveTab] = useState("applies");

  // =========================================
  // SELECTED JOBS
  // =========================================

  const [selectedJobs, setSelectedJobs] = useState([]);

  // =========================================
  // FETCH JOBS
  // =========================================

  const fetchJobs = async () => {
    try {
      const response = await api.get("/allget");

      console.log("Jobs:", response.data);

      setJobs(response.data.jobs || []);
    } catch (error) {
      console.error(
        "Error fetching jobs:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // USE EFFECT
  // =========================================

  useEffect(() => {
    fetchJobs();
  }, []);

  // =========================================
  // TAB CHANGE
  // =========================================

  const handleTabChange = (tab) => {
    setActiveTab(tab);

    if (tab === "applies") {
      navigate("/applies");
    }

    if (tab === "profile") {
      navigate("/profile");
    }

    if (tab === "liked") {
      navigate("/liked");
    }

    if (tab === "preferences") {
      navigate("/preferences");
    }
  };

  // =========================================
  // SELECT / UNSELECT JOB
  // =========================================

  const handleSelectJob = (job) => {
    setSelectedJobs((prev) => {
      const alreadySelected = prev.some(
        (item) => item._id === job._id
      );

      // -----------------------------------------
      // REMOVE JOB
      // -----------------------------------------

      if (alreadySelected) {
        return prev.filter(
          (item) => item._id !== job._id
        );
      }

      // -----------------------------------------
      // MAXIMUM 5 JOBS
      // -----------------------------------------

      if (prev.length >= 5) {
        alert("You can select maximum 5 jobs.");
        return prev;
      }

      // -----------------------------------------
      // ADD JOB
      // -----------------------------------------

      return [...prev, job];
    });
  };

  // =========================================
  // APPLY BUTTON
  // =========================================

  const handleApply = () => {
    if (selectedJobs.length === 0) {
      alert("Please select at least one job.");
      return;
    }
  
    navigate(`/apply/${selectedJobs[0]._id}`, {
      state: {
        jobs: selectedJobs,
      },
    });
  }; // =========================================
  // RETURN
  // =========================================

  return (
    <div className="min-h-screen bg-[#f7f8fa]">

      {/* =========================================
          NAVBAR
      ========================================= */}


      {/* =========================================
          MAIN CONTAINER
      ========================================= */}

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">

        {/* =========================================
            PAGE HEADER
        ========================================= */}

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Recommended Jobs for You
            </h1>

            <p className="text-gray-500 mt-1">
              Select up to 5 jobs to apply
            </p>
          </div>

          <div className="flex items-center gap-5 mt-4 md:mt-0">

            <p className="text-gray-700 font-medium">
              {selectedJobs.length}/5 jobs selected
            </p>

            {/* =========================================
                APPLY BUTTON
            ========================================= */}

            <button
              onClick={handleApply}
              disabled={selectedJobs.length === 0}
              className={`px-8 py-3 rounded-full font-semibold transition ${
                selectedJobs.length > 0
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-blue-200 text-white cursor-not-allowed"
              }`}
            >
              Apply ({selectedJobs.length})
            </button>

          </div>
        </div>

        {/* =========================================
            TABS
        ========================================= */}

        <div className="flex gap-8 border-b border-gray-200 mb-7 overflow-x-auto">

          {/* =========================================
              APPLIES
          ========================================= */}

          <button
            onClick={() => handleTabChange("applies")}
            className={`pb-3 whitespace-nowrap ${
              activeTab === "applies"
                ? "border-b-2 border-gray-900 font-semibold text-gray-900"
                : "text-gray-500 hover:text-blue-600"
            }`}
          >
            Applies ({jobs.length})
          </button>

          {/* =========================================
              PROFILE
          ========================================= */}

          <button
            onClick={() => handleTabChange("profile")}
            className={`pb-3 whitespace-nowrap ${
              activeTab === "profile"
                ? "border-b-2 border-gray-900 font-semibold text-gray-900"
                : "text-gray-500 hover:text-blue-600"
            }`}
          >
            Profile
          </button>

          {/* =========================================
              YOU MIGHT LIKE
          ========================================= */}

          <button
            onClick={() => handleTabChange("liked")}
            className={`pb-3 whitespace-nowrap ${
              activeTab === "liked"
                ? "border-b-2 border-gray-900 font-semibold text-gray-900"
                : "text-gray-500 hover:text-blue-600"
            }`}
          >
            You might like
          </button>

          {/* =========================================
              PREFERENCES
          ========================================= */}

          <button
            onClick={() => handleTabChange("preferences")}
            className={`pb-3 whitespace-nowrap ${
              activeTab === "preferences"
                ? "border-b-2 border-gray-900 font-semibold text-gray-900"
                : "text-gray-500 hover:text-blue-600"
            }`}
          >
            Preferences
          </button>

        </div>

        {/* =========================================
            CONTENT
        ========================================= */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* =========================================
              LEFT SIDE - JOB LIST
          ========================================= */}

          <div className="lg:col-span-2 space-y-5">

            {/* =========================================
                PREFERENCES TAB
            ========================================= */}

            {activeTab === "preferences" ? (

              <div className="bg-white rounded-2xl p-10 text-center shadow-sm">

                <h2 className="text-xl font-bold text-gray-900 mb-3">
                  Job Preferences
                </h2>

                <p className="text-gray-500">
                  Add your preferred job role, location and salary
                  to get better job recommendations.
                </p>

              </div>

            ) : loading ? (

              /* =========================================
                 LOADING
              ========================================= */

              <div className="bg-white rounded-2xl p-10 text-center shadow-sm">

                <p className="text-gray-500">
                  Loading jobs...
                </p>

              </div>

            ) : jobs.length === 0 ? (

              /* =========================================
                 NO JOBS
              ========================================= */

              <div className="bg-white rounded-2xl p-10 text-center shadow-sm">

                <p className="text-gray-500 text-lg">
                  No jobs found.
                </p>

              </div>

            ) : (

              /* =========================================
                 JOBS
              ========================================= */

              jobs.map((job) => (

                <JobCard
                  key={job._id}
                  job={job}
                  selectedJobs={selectedJobs}
                  onSelect={handleSelectJob}
                />

              ))

            )}

          </div>

          {/* =========================================
              RIGHT SIDE - PREFERENCES
          ========================================= */}

          <div className="lg:col-span-1">

            <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-24">

              <h2 className="text-lg font-bold text-gray-900 mb-6">
                Add preferences to get matching jobs
              </h2>

              {/* =========================================
                  PREFERRED JOB ROLE
              ========================================= */}

              <div className="mb-7">

                <p className="text-sm text-gray-600 mb-2">
                  Preferred job role
                </p>

                <button
                  onClick={() => navigate("/preferences")}
                  className="border border-blue-600 text-blue-600 px-5 py-2 rounded-full text-sm font-medium hover:bg-blue-50"
                >
                  + Add
                </button>

              </div>

              {/* =========================================
                  PREFERRED LOCATION
              ========================================= */}

              <div className="mb-7">

                <div className="flex items-center justify-between mb-2">

                  <p className="text-sm text-gray-600">
                    Preferred work location
                  </p>

                  <button
                    onClick={() => navigate("/preferences")}
                    className="text-blue-600 text-sm hover:text-blue-800"
                  >
                    ✎
                  </button>

                </div>

                <span className="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm">
                  Nepal
                </span>

              </div>

              {/* =========================================
                  PREFERRED SALARY
              ========================================= */}

              <div>

                <div className="flex items-center justify-between mb-2">

                  <p className="text-sm text-gray-600">
                    Preferred salary
                  </p>

                  <button
                    onClick={() => navigate("/preferences")}
                    className="text-blue-600 text-sm hover:text-blue-800"
                  >
                    ✎
                  </button>

                </div>

                <span className="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm">
                  $1,500
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};


// =====================================================
// JOB CARD
// =====================================================

const JobCard = ({
  job,
  selectedJobs,
  onSelect,
}) => {

  // =========================================
  // SAVED STATE
  // =========================================

  const [saved, setSaved] = useState(false);

  // =========================================
  // CHECK SELECTED
  // =========================================

  const isSelected = selectedJobs.some(
    (item) => item._id === job._id
  );

  // =========================================
  // RETURN
  // =========================================

  return (

    <div
      className={`bg-white rounded-2xl border shadow-sm p-6 transition ${
        isSelected
          ? "border-blue-500 ring-2 ring-blue-100"
          : "border-gray-100 hover:shadow-md"
      }`}
    >

      {/* =========================================
          SELECTED LABEL
      ========================================= */}

      {isSelected && (
        <div className="mb-4">

          <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-medium">
            ✓ Selected for application
          </span>

        </div>
      )}

      {/* =========================================
          JOB HEADER
      ========================================= */}

      <div className="flex justify-between gap-4">

        <div className="flex-1">

          <h2 className="text-lg font-bold text-gray-900 mb-2">
            {job.title}
          </h2>

          <div className="flex items-center gap-2 text-sm text-gray-600 mb-5">

            <FaBuilding className="text-gray-400" />

            <span>
              {job.company?.name || "Company Name"}
            </span>

            <span className="text-yellow-500">
              ★
            </span>

            <span>
              4.5
            </span>

            <span className="text-gray-400">
              •
            </span>

            <span>
              Company
            </span>

          </div>

        </div>

        {/* =========================================
            COMPANY LOGO
        ========================================= */}

        <div className="w-14 h-14 rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden">

          {job.company?.image ? (

            <img
              src={job.company.image}
              alt="Company"
              className="w-full h-full object-contain"
            />

          ) : (

            <FaBuilding className="text-gray-400 text-2xl" />

          )}

        </div>

      </div>

      {/* =========================================
          JOB INFORMATION
      ========================================= */}

      <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-gray-600 mb-5">

        {/* EXPERIENCE */}

        <div className="flex items-center gap-2">

          <FaBriefcase className="text-gray-400" />

          <span>
            {job.experience || "Fresher"}
          </span>

        </div>

        <div className="h-5 border-l border-gray-300"></div>

        {/* SALARY */}

        <div className="flex items-center gap-2">

          <FaRupeeSign className="text-gray-400" />

          <span>

            {job.salary?.amount
              ? `${job.salary.amount} / ${job.salarytype || ""}`
              : "Not disclosed"}

          </span>

        </div>

        <div className="h-5 border-l border-gray-300"></div>

        {/* LOCATION */}

        <div className="flex items-center gap-2">

          <FaMapMarkerAlt className="text-gray-400" />

          <span>
            {job.location || "Location not specified"}
          </span>

        </div>

      </div>

      {/* =========================================
          DESCRIPTION
      ========================================= */}

      <div className="flex items-start gap-3 text-sm text-gray-600 mb-4">

        <FaBuilding className="mt-1 text-gray-400" />

        <p className="line-clamp-2">

          {job.description ||
            "No job description available for this position."}

        </p>

      </div>

      {/* =========================================
          SKILLS
      ========================================= */}

      {job.skill && (

        <div className="flex items-center gap-2 text-sm text-gray-600 mb-5">

          <FaGraduationCap className="text-gray-400" />

          <span>
            {job.skill}
          </span>

        </div>

      )}

      {/* =========================================
          BOTTOM ACTIONS
      ========================================= */}

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-5">

        {/* DATE */}

        <span className="text-sm text-gray-400">

          {job.createdAt
            ? new Date(job.createdAt).toLocaleDateString()
            : "Recently posted"}

        </span>

        <div className="flex flex-wrap items-center gap-4">

          {/* =========================================
              SELECT BUTTON
          ========================================= */}

          <button
            onClick={() => onSelect(job)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
              isSelected
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "border border-blue-600 text-blue-600 hover:bg-blue-50"
            }`}
          >
            {isSelected ? "Selected ✓" : "Select"}
          </button>

          {/* =========================================
              HIDE
          ========================================= */}

          <button
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-500"
          >
            <FaEyeSlash />

            Hide
          </button>

          {/* =========================================
              SAVE
          ========================================= */}

          <button
            onClick={() => setSaved(!saved)}
            className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600"
          >

            {saved ? (

              <FaBookmark className="text-blue-600" />

            ) : (

              <FaRegBookmark />

            )}

            {saved ? "Saved" : "Save"}

          </button>

        </div>

      </div>

    </div>
  );
};

export default Job;