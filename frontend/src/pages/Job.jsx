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

import api from "../api/axios";
import Navbar from "../components/Navbar";

const Job = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Active tab
  const [activeTab, setActiveTab] = useState("applies");

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

  useEffect(() => {
    fetchJobs();
  }, []);

  // ================================
  // TAB CHANGE
  // ================================
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-[#f7f8fa]">
      {/* Navbar */}
      <Navbar />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">

        {/* ================================
            PAGE HEADER
        ================================= */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">

          <h1 className="text-2xl font-bold text-gray-900">
            Recommended Jobs for You
          </h1>

          <div className="flex items-center gap-5 mt-4 md:mt-0">

            <p className="text-gray-700 font-medium">
              You can select up to 5 jobs to apply
            </p>

            <button
              disabled
              className="bg-blue-200 text-white px-8 py-3 rounded-full font-semibold"
            >
              Apply
            </button>

          </div>
        </div>


        {/* ================================
            TABS
        ================================= */}
        <div className="flex gap-8 border-b border-gray-200 mb-7 overflow-x-auto">

          {/* Applies */}
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


          {/* Profile */}
          <button
            onClick={() => handleTabChange("profile")}
            className={`pb-3 whitespace-nowrap ${
              activeTab === "profile"
                ? "border-b-2 border-gray-900 font-semibold text-gray-900"
                : "text-gray-500 hover:text-blue-600"
            }`}
          >
            Profile ({jobs.length})
          </button>


          {/* You Might Like */}
          <button
            onClick={() => handleTabChange("liked")}
            className={`pb-3 whitespace-nowrap ${
              activeTab === "liked"
                ? "border-b-2 border-gray-900 font-semibold text-gray-900"
                : "text-gray-500 hover:text-blue-600"
            }`}
          >
            You might like ({jobs.length})
          </button>


          {/* Preferences */}
          <button
            onClick={() => handleTabChange("preferences")}
            className={`pb-3 whitespace-nowrap ${
              activeTab === "preferences"
                ? "border-b-2 border-gray-900 font-semibold text-gray-900"
                : "text-gray-500 hover:text-blue-600"
            }`}
          >
            Preferences (0)
          </button>

        </div>


        {/* ================================
            CONTENT
        ================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">


          {/* ================================
              LEFT SIDE - JOB LIST
          ================================= */}
          <div className="lg:col-span-2 space-y-5">

            {activeTab === "preferences" ? (

              /* Preferences Tab */
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

              /* Loading */
              <div className="bg-white rounded-2xl p-10 text-center shadow-sm">

                <p className="text-gray-500">
                  Loading jobs...
                </p>

              </div>

            ) : jobs.length === 0 ? (

              /* No Jobs */
              <div className="bg-white rounded-2xl p-10 text-center shadow-sm">

                <p className="text-gray-500 text-lg">
                  No jobs found.
                </p>

              </div>

            ) : (

              /* Jobs */
              jobs.map((job) => (

                <JobCard
                  key={job._id}
                  job={job}
                />

              ))

            )}

          </div>


          {/* ================================
              RIGHT SIDE - PREFERENCES
          ================================= */}
          <div className="lg:col-span-1">

            <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-24">

              <h2 className="text-lg font-bold text-gray-900 mb-6">
                Add preferences to get matching jobs
              </h2>


              {/* Preferred Job Role */}
              <div className="mb-7">

                <p className="text-sm text-gray-600 mb-2">
                  Preferred job role
                </p>

                <button className="border border-blue-600 text-blue-600 px-5 py-2 rounded-full text-sm font-medium hover:bg-blue-50">
                  + Add
                </button>

              </div>


              {/* Preferred Location */}
              <div className="mb-7">

                <div className="flex items-center justify-between mb-2">

                  <p className="text-sm text-gray-600">
                    Preferred work location
                  </p>

                  <button className="text-blue-600 text-sm">
                    ✎
                  </button>

                </div>

                <span className="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm">
                  Nepal
                </span>

              </div>


              {/* Preferred Salary */}
              <div>

                <div className="flex items-center justify-between mb-2">

                  <p className="text-sm text-gray-600">
                    Preferred salary
                  </p>

                  <button className="text-blue-600 text-sm">
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


/* =====================================================
   JOB CARD
===================================================== */

const JobCard = ({ job }) => {

  const [saved, setSaved] = useState(false);

  return (

    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition">


      {/* ================================
          JOB HEADER
      ================================= */}
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


        {/* Company Logo */}
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


      {/* ================================
          JOB INFORMATION
      ================================= */}
      <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-gray-600 mb-5">


        {/* Experience */}
        <div className="flex items-center gap-2">

          <FaBriefcase className="text-gray-400" />

          <span>
            {job.experience || "Fresher"}
          </span>

        </div>


        <div className="h-5 border-l border-gray-300"></div>


        {/* Salary */}
        <div className="flex items-center gap-2">

          <FaRupeeSign className="text-gray-400" />

          <span>

            {job.salary?.amount
              ? `${job.salary.amount} / ${job.salarytype || ""}`
              : "Not disclosed"}

          </span>

        </div>


        <div className="h-5 border-l border-gray-300"></div>


        {/* Location */}
        <div className="flex items-center gap-2">

          <FaMapMarkerAlt className="text-gray-400" />

          <span>
            {job.location || "Location not specified"}
          </span>

        </div>

      </div>


      {/* ================================
          DESCRIPTION
      ================================= */}
      <div className="flex items-start gap-3 text-sm text-gray-600 mb-4">

        <FaBuilding className="mt-1 text-gray-400" />

        <p className="line-clamp-2">

          {job.description ||
            "No job description available for this position."}

        </p>

      </div>


      {/* ================================
          SKILLS
      ================================= */}
      {job.skill && (

        <div className="flex items-center gap-2 text-sm text-gray-600 mb-5">

          <FaGraduationCap className="text-gray-400" />

          <span>
            {job.skill}
          </span>

        </div>

      )}


      {/* ================================
          BOTTOM ACTIONS
      ================================= */}
      <div className="flex items-center justify-between mt-5">


        <span className="text-sm text-gray-400">

          {job.createdAt
            ? new Date(job.createdAt).toLocaleDateString()
            : "Recently posted"}

        </span>


        <div className="flex items-center gap-5">


          {/* Hide */}
          <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-500">

            <FaEyeSlash />

            Hide

          </button>


          {/* Save */}
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