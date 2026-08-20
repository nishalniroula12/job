import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaBriefcase,
  FaBuilding,
  FaBookOpen,
  FaMapMarkerAlt,
  FaStar,
  FaChevronRight,
  FaInfoCircle,
  FaBolt,
  FaShieldAlt,
} from "react-icons/fa";

import api from "../api/axios.js";
import { useSelector } from "react-redux";

const Profile = () => {
  const navigate = useNavigate();
  const { user, isAuthenticate } = useSelector((state) => state.data);
  const [profile, setProfile] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [jobLoading, setJobLoading] = useState(true);

  // =========================================
  // FETCH PROFILE
  // =========================================
  const fetchProfile = async () => {
    try {
      const res = await api.get("/profile");

      console.log("Profile:", res.data);

      if (res.data.success) {
        setProfile(res.data.user);
      }
    } catch (error) {
      console.log(
        "Profile error:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // FETCH RECOMMENDED JOBS
  // =========================================
  const fetchJobs = async () => {
    try {
      setJobLoading(true);

      const res = await api.get("/allget", {
        params: {
          limit: 2,
        },
      });

      console.log("Jobs:", res.data);

      /*
        Depending on your backend response,
        jobs may be inside:
        res.data.jobs
        res.data.job
        res.data.data
      */

      if (res.data.success) {
        setJobs(
          res.data.jobs ||
          res.data.job ||
          res.data.data ||
          []
        );
      } else {
        setJobs([]);
      }

    } catch (error) {
      console.log(
        "Jobs error:",
        error.response?.data || error.message
      );

      setJobs([]);
    } finally {
      setJobLoading(false);
    }
  };

  // =========================================
  // USE EFFECT
  // =========================================
  useEffect(() => {
    fetchProfile();
    fetchJobs();
  }, [user,isAuthenticate]);

  // =========================================
  // LOADING
  // =========================================
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f8fa] flex items-center justify-center">
        <div className="text-gray-500 text-lg">
          Loading profile...
        </div>
      </div>
    );
  }

  // =========================================
  // NO PROFILE
  // =========================================
  if (!profile) {
    return (
      <div className="min-h-screen bg-[#f7f8fa] flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-sm">
          <p className="text-gray-600">
            Please login to view your profile.
          </p>
        </div>
      </div>
    );
  }

  // =========================================
  // SKILLS
  // =========================================
  const skills = Array.isArray(profile.skill)
    ? profile.skill
    : profile.skill
    ? profile.skill
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    : [];

  // =========================================
  // GET COMPANY NAME
  // =========================================
  const getCompanyName = (job) => {
    if (!job.company) {
      return "Company";
    }

    if (typeof job.company === "string") {
      return job.company;
    }

    return (
      job.company.companyname ||
      job.company.name ||
      job.company.companyName ||
      "Company"
    );
  };

  // =========================================
  // GET COMPANY INITIAL
  // =========================================
  const getCompanyInitial = (job) => {
    const companyName = getCompanyName(job);

    return companyName.charAt(0).toUpperCase();
  };

  // =========================================
  // GET LOCATION
  // =========================================
  const getLocation = (job) => {
    return job.location || "Remote";
  };

  // =========================================
  // GET EXPERIENCE
  // =========================================
  const getExperience = (job) => {
    if (!job.experience) {
      return "0-1 Yrs";
    }

    if (job.experience === "fresher") {
      return "0-1 Yrs";
    }

    return `${job.experience} Yrs`;
  };

  // =========================================
  // GET RATING
  // =========================================
  const getRating = (job) => {
    return job.rating || job.company?.rating || "3.3";
  };

  // =========================================
  // GET POSTED DATE
  // =========================================
  const getPostedDate = (job) => {
    if (!job.createdAt) {
      return "Recently";
    }

    const created = new Date(job.createdAt);
    const now = new Date();

    const difference =
      Math.floor(
        (now.getTime() - created.getTime()) /
          (1000 * 60 * 60 * 24)
      );

    if (difference <= 0) {
      return "Today";
    }

    return `${difference}d ago`;
  };

  // =========================================
  // RETURN
  // =========================================
  return (
    <div className="min-h-screen bg-[#f7f8fa]">

      {/* =========================================
          NAVBAR
      ========================================== */}

      <div className="max-w-[1250px] mx-auto px-4 md:px-6 py-5">

        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_240px] gap-5">

          {/* =========================================
              LEFT SIDEBAR
          ========================================== */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 h-fit">

            {/* PROFILE */}
            <div className="text-center">

              {/* PROFILE CIRCLE */}
              <div className="flex justify-center">

                <div className="relative">

                  <div className="w-[105px] h-[105px] rounded-full border-[3px] border-orange-400 bg-gray-100 flex items-center justify-center">

                    <div className="w-[76px] h-[76px] rounded-full bg-gray-300 flex items-center justify-center">

                      <FaUser className="text-white text-4xl" />

                    </div>

                  </div>

                  {/* PROFILE PERCENTAGE */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white px-2">

                    <span className="text-orange-500 text-sm font-semibold">
                      65%
                    </span>

                  </div>

                </div>

              </div>

              {/* NAME */}
              <h2 className="text-lg font-bold text-gray-900 mt-5">
                {profile.fullname}
              </h2>

              {/* EDUCATION */}
              <p className="text-sm text-gray-600 mt-1">
                {profile.education || "Education not added"}
              </p>

              {/* LOCATION */}
              <p className="text-sm text-gray-600">
                {profile.location || "Location not added"}
              </p>

              {/* UPDATED */}
              <p className="text-xs text-blue-500 mt-2">
                Last updated recently
              </p>

              {/* COMPLETE PROFILE */}
              <button
                onClick={() => navigate("/updateprofile")}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full"
              >
                Complete profile
              </button>

            </div>

            {/* =========================================
                PROFILE PERFORMANCE
            ========================================== */}
            <div className="bg-blue-50 rounded-lg mt-5 p-4">

              <div className="flex justify-between items-center">

                <h3 className="font-semibold text-gray-900">
                  Profile performance
                </h3>

                <FaInfoCircle className="text-gray-500 text-sm" />

              </div>

              <div className="grid grid-cols-2 mt-4">

                {/* SEARCH APPEARANCES */}
                <div className="border-r border-gray-200">

                  <p className="text-xs text-gray-600">
                    Search
                    <br />
                    appearances
                  </p>

                  <div className="flex items-center gap-1 mt-1">

                    <span className="text-blue-600 text-xl font-semibold">
                      27
                    </span>

                    <FaChevronRight className="text-blue-600 text-xs" />

                  </div>

                </div>

                {/* RECRUITER ACTIONS */}
                <div className="pl-4">

                  <p className="text-xs text-gray-600">
                    Recruiter
                    <br />
                    actions
                  </p>

                  <div className="flex items-center gap-1 mt-1">

                    <span className="text-blue-600 text-xl font-semibold">
                      12
                    </span>

                    <FaChevronRight className="text-blue-600 text-xs" />

                  </div>

                </div>

              </div>

              {/* BOOST */}
              <div className="bg-white rounded-lg mt-4 p-3 flex items-center gap-2">

                <FaBolt className="text-gray-500 text-xl" />

                <span className="text-gray-700 text-xs">
                  Upto 3X boost to your
                  <br />
                  profile performance
                </span>

                <FaChevronRight className="ml-auto text-gray-500 text-xs" />

              </div>

            </div>

            {/* =========================================
                MENU
            ========================================== */}
            <div className="border-t border-gray-200 mt-5 pt-3">

              {/* HOME */}
              <button
                onClick={() => navigate("/profile")}
                className="w-full flex items-center gap-4 px-4 py-3 rounded-full bg-gray-100 text-gray-900 font-semibold"
              >

                <FaUser className="text-lg" />

                My home

              </button>

              {/* JOBS */}
              <button
                onClick={() => navigate("/job")}
                className="w-full flex items-center gap-4 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
              >

                <FaBriefcase className="text-lg" />

                Jobs

              </button>

              {/* COMPANIES */}
              <button
                onClick={() => navigate("/company")}
                className="w-full flex items-center gap-4 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
              >

                <FaBuilding className="text-lg" />

                Companies

              </button>

              {/* BLOGS */}
              <button
                onClick={() => navigate("/blog")}
                className="w-full flex items-center gap-4 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
              >

                <FaBookOpen className="text-lg" />

                Blogs

              </button>

            </div>

          </div>


          {/* =========================================
              CENTER
          ========================================== */}
          <div className="space-y-5">

            {/* =========================================
                DISABILITY CARD
            ========================================== */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">

              <div className="flex justify-between items-start gap-4">

                <h2 className="text-lg font-bold text-gray-900 max-w-2xl">
                  Companies want to build inclusive teams,
                  help us identify your disability status for
                  better jobs.
                </h2>

                <span className="bg-purple-50 text-purple-600 text-xs px-3 py-1 rounded-full whitespace-nowrap">
                  Diversity & inclusion
                </span>

              </div>

              {/* OPTIONS */}
              <div className="flex flex-wrap gap-3 mt-6">

                <button className="border border-blue-300 text-gray-700 px-4 py-2 rounded-full text-sm hover:bg-blue-50">
                  I have a disability
                </button>

                <button className="border border-blue-300 text-gray-700 px-4 py-2 rounded-full text-sm hover:bg-blue-50">
                  I don’t have a disability
                </button>

              </div>

              {/* SUBMIT */}
              <div className="flex justify-end mt-5">

                <button className="bg-gray-100 text-gray-400 px-5 py-2.5 rounded-full font-semibold">
                  Submit
                </button>

              </div>

            </div>


            {/* =========================================
                RECOMMENDED JOBS
            ========================================== */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">

              {/* HEADER */}
              <div className="flex justify-between items-center">

                <h2 className="text-xl font-bold text-gray-900">
                  Recommended jobs for you
                </h2>

                <button
                  onClick={() => navigate("/job")}
                  className="text-blue-600 font-semibold hover:text-blue-700"
                >
                  View all
                </button>

              </div>

              {/* TABS */}
              <div className="flex gap-6 border-b border-gray-200 mt-4">

                <button className="relative pb-3 text-gray-900 font-semibold">

                  Applies ({jobs.length})

                  <span className="absolute left-0 bottom-0 h-[3px] w-full bg-gray-900 rounded-full" />

                </button>

                <button className="pb-3 text-gray-500">
                  Profile (73)
                </button>

                <button className="pb-3 text-gray-500">
                  You might like (43)
                </button>

                <button className="pb-3 text-gray-500">
                  Preferences (0)
                </button>

              </div>


              {/* =========================================
                  JOB LIST
              ========================================== */}

              {jobLoading ? (

                <div className="py-10 text-center text-gray-500">
                  Loading jobs...
                </div>

              ) : jobs.length === 0 ? (

                <div className="py-10 text-center">

                  <p className="text-gray-500">
                    No jobs available.
                  </p>

                  <button
                    onClick={() => navigate("/job")}
                    className="mt-3 text-blue-600 font-semibold"
                  >
                    Browse jobs
                  </button>

                </div>

              ) : (

                <div className="mt-5 space-y-3">

                  {jobs.slice(0, 2).map((job, index) => (

                    <div
                      key={job._id || index}
                      onClick={() =>
                        navigate(`/job/${job._id}`)
                      }
                      className="border border-gray-200 rounded-xl p-4 hover:shadow-sm cursor-pointer transition"
                    >

                      <div className="flex gap-4">

                        {/* COMPANY ICON */}
                        <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">

                          {job.company?.image ? (

                            <img
                              src={job.company.image}
                              alt="company"
                              className="w-full h-full object-cover rounded-lg"
                            />

                          ) : (

                            <span className="text-2xl text-blue-600 font-semibold">
                              {getCompanyInitial(job)}
                            </span>

                          )}

                        </div>


                        {/* JOB CONTENT */}
                        <div className="flex-1 min-w-0">

                          {/* TITLE + DATE */}
                          <div className="flex justify-between gap-3">

                            <h3 className="font-semibold text-gray-900 truncate">

                              {job.title || "Job title"}

                            </h3>

                            <span className="text-xs text-gray-500 whitespace-nowrap">

                              {getPostedDate(job)}

                            </span>

                          </div>


                          {/* COMPANY */}
                          <p className="text-sm text-gray-600 mt-1">

                            {getCompanyName(job)}

                          </p>


                          {/* RATING */}
                          <div className="flex items-center gap-1 mt-2">

                            <FaStar className="text-yellow-400 text-sm" />

                            <span className="text-sm text-gray-700">
                              {getRating(job)}
                            </span>

                          </div>


                          {/* LOCATION + EXPERIENCE */}
                          <div className="flex flex-wrap items-center gap-5 mt-3 text-sm text-gray-500">

                            <div className="flex items-center gap-2">

                              <FaMapMarkerAlt className="text-gray-400" />

                              <span className="truncate max-w-[180px]">
                                {getLocation(job)}
                              </span>

                            </div>

                            <div className="flex items-center gap-2">

                              <FaBriefcase className="text-gray-400" />

                              <span>
                                {getExperience(job)}
                              </span>

                            </div>

                          </div>

                        </div>

                      </div>

                    </div>

                  ))}

                </div>

              )}


              {/* VIEW ALL JOBS */}
              <div className="flex justify-center mt-5">

                <button
                  onClick={() => navigate("/job")}
                  className="border border-gray-200 text-blue-600 font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-50 flex items-center gap-2"
                >

                  View all jobs

                  <FaChevronRight className="text-sm" />

                </button>

              </div>

            </div>

          </div>


          {/* =========================================
              RIGHT SIDEBAR
          ========================================== */}
          <div className="space-y-5">

            {/* =========================================
                MINIS
            ========================================== */}
            <div className="bg-white rounded-xl border border-orange-200 p-5">

              <div className="text-center">

                <h2 className="text-2xl font-bold text-blue-600">
                  minis
                </h2>

                <p className="text-xs text-gray-600 mt-2">
                  Explore top career content
                </p>

              </div>

              <div className="h-40 mt-4 bg-gray-50 rounded-lg flex items-center justify-center">

                <div className="text-center">

                  <div className="text-5xl">
                    📊
                  </div>

                  <p className="text-xs text-gray-500 mt-2">
                    Career & job insights
                  </p>

                </div>

              </div>

              <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-full text-sm font-semibold">

                ▶ Explore MINIs

              </button>

            </div>


            {/* =========================================
                SAFETY CARD
            ========================================== */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">

              <FaShieldAlt className="text-red-500 text-4xl" />

              <h3 className="font-bold text-gray-900 mt-4">
                Never pay anyone to get a job
              </h3>

              <p className="text-sm text-gray-500 mt-2 leading-6">

                Fraudsters may ask you to invest money
                either to earn money or to get a job.
                Never make such payments.

              </p>

              <button className="text-blue-600 text-sm font-semibold mt-3">

                Learn more

              </button>

            </div>


            {/* =========================================
                WORKPLACE IMAGE
            ========================================== */}
            <div className="rounded-xl overflow-hidden h-[180px]">

              <img
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=600&q=80"
                alt="Workplace"
                className="w-full h-full object-cover"
              />

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;