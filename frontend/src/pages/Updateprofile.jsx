import React, { useEffect, useRef, useState } from "react";
import api from "../api/axios";
import { useSelector } from "react-redux";

import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaBriefcase,
  FaCalendarAlt,
  FaFilePdf,
  FaEdit,
  FaCamera,
  FaGraduationCap,
  FaTimes,
  FaEye,
  FaUpload,
  FaCheck,
  FaDownload,
  FaTrash,
} from "react-icons/fa";

const Updateprofile = () => {
  // =========================================================
  // PROFILE
  // =========================================================

  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const { user, isAuthenticate } = useSelector((state) => state.data);

  // =========================================================
  // MODAL
  // =========================================================

  const [activeModal, setActiveModal] = useState(null);

  // =========================================================
  // FILE
  // =========================================================

  const resumeInputRef = useRef(null);

  const [resumeFile, setResumeFile] = useState(null);

  // =========================================================
  // PROFILE FORM
  // =========================================================

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    location: "",
    skill: "",
    education: "",
    experience: "",
    resumeHeadline: "",
  });

  // =========================================================
  // EMPLOYMENT FORM
  // =========================================================

  const [employment, setEmployment] = useState({
    company: "",
    designation: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  // =========================================================
  // EDUCATION FORM
  // =========================================================

  const [educationData, setEducationData] = useState({
    degree: "",
    institute: "",
    startYear: "",
    endYear: "",
    educationType: "Full Time",
  });

  // =========================================================
  // GET PROFILE
  // =========================================================

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get("/profile");

      console.log("Profile:", res.data);

      if (res.data.success) {
        const user = res.data.user;

        setProfile(user);

        // -------------------------------------------------
        // Fill main form
        // -------------------------------------------------

        setFormData({
          fullname: user?.fullname || "",
          email: user?.email || "",
          phone: user?.phone || "",
          location: user?.location || "",
          skill: Array.isArray(user?.skill)
            ? user.skill.join(", ")
            : user?.skill || "",
          education: user?.education || "",
          experience: user?.experience || "",
          resumeHeadline: user?.resumeHeadline || "",
        });

      } else {
        setError(res.data.message || "Unable to get profile");
      }

    } catch (err) {
      console.log("Profile error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to fetch profile"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // USE EFFECT
  // =========================================================

  useEffect(() => {
    fetchProfile();
  }, [user,isAuthenticate]);

  // =========================================================
  // HANDLE INPUT
  // =========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================================
  // OPEN PERSONAL MODAL
  // =========================================================

  const openPersonalModal = () => {
    if (!profile) return;

    setFormData({
      fullname: profile.fullname || "",
      email: profile.email || "",
      phone: profile.phone || "",
      location: profile.location || "",
      skill: Array.isArray(profile.skill)
        ? profile.skill.join(", ")
        : profile.skill || "",
      education: profile.education || "",
      experience: profile.experience || "",
      resumeHeadline: profile.resumeHeadline || "",
    });

    setActiveModal("personal");
  };

  // =========================================================
  // UPDATE PROFILE
  // =========================================================

  const updateProfile = async (data) => {
    try {
      setSaving(true);
      setError("");

      const res = await api.put(
        `/updateprofile/${profile._id}`,
        data
      );

      console.log("Update profile:", res.data);

      if (res.data.success) {
        await fetchProfile();

        setActiveModal(null);

        alert("Profile updated successfully");
      } else {
        alert(res.data.message || "Profile update failed");
      }

    } catch (err) {
      console.log("Update error:", err);

      alert(
        err.response?.data?.message ||
          "Something went wrong while updating profile"
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // SAVE PERSONAL DETAILS
  // =========================================================

  const savePersonalDetails = async () => {
    const data = new FormData();

    data.append("fullname", formData.fullname);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("location", formData.location);
    data.append("skill", formData.skill);
    data.append("education", formData.education);
    data.append("experience", formData.experience);

    await updateProfile(data);
  };

  // =========================================================
  // RESUME FILE SELECT
  // =========================================================

  const handleResumeChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // 2 MB validation
    if (file.size > 2 * 1024 * 1024) {
      alert("Resume must be less than 2 MB");
      return;
    }

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/rtf",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Only PDF, DOC, DOCX and RTF files are allowed");
      return;
    }

    setResumeFile(file);
  };

  // =========================================================
  // UPLOAD RESUME
  // =========================================================

  const uploadResume = async () => {
    if (!resumeFile) {
      alert("Please select a resume");
      return;
    }

    const data = new FormData();

    data.append("resume", resumeFile);

    await updateProfile(data);

    setResumeFile(null);

    if (resumeInputRef.current) {
      resumeInputRef.current.value = "";
    }
  };

  // =========================================================
  // SAVE HEADLINE
  // =========================================================

  const saveHeadline = async () => {
    const data = new FormData();

    data.append(
      "resumeHeadline",
      formData.resumeHeadline
    );

    await updateProfile(data);
  };

  // =========================================================
  // SAVE SKILLS
  // =========================================================

  const saveSkills = async () => {
    const data = new FormData();

    data.append(
      "skill",
      formData.skill
    );

    await updateProfile(data);
  };

  // =========================================================
  // SAVE EMPLOYMENT
  // =========================================================

  const saveEmployment = async () => {
    const experienceText = [
      employment.designation,
      employment.company
        ? `at ${employment.company}`
        : "",
      employment.startDate
        ? `(${employment.startDate}`
        : "",
      employment.endDate
        ? `- ${employment.endDate})`
        : employment.startDate
        ? "- Present)"
        : "",
      employment.description
        ? `| ${employment.description}`
        : "",
    ]
      .filter(Boolean)
      .join(" ");

    const data = new FormData();

    data.append(
      "experience",
      experienceText
    );

    await updateProfile(data);
  };

  // =========================================================
  // SAVE EDUCATION
  // =========================================================

  const saveEducation = async () => {
    const educationText = [
      educationData.degree,
      educationData.institute
        ? `at ${educationData.institute}`
        : "",
      educationData.startYear
        ? `${educationData.startYear}`
        : "",
      educationData.endYear
        ? `- ${educationData.endYear}`
        : "",
      educationData.educationType
        ? `| ${educationData.educationType}`
        : "",
    ]
      .filter(Boolean)
      .join(" ");

    const data = new FormData();

    data.append(
      "education",
      educationText
    );

    await updateProfile(data);
  };

  // =========================================================
  // LOAD EMPLOYMENT INTO FORM
  // =========================================================

  const openEmploymentModal = () => {
    setEmployment({
      company: "",
      designation: profile?.experience || "",
      startDate: "",
      endDate: "",
      description: "",
    });

    setActiveModal("employment");
  };

  // =========================================================
  // LOAD EDUCATION INTO FORM
  // =========================================================

  const openEducationModal = () => {
    setEducationData({
      degree: profile?.education || "",
      institute: "",
      startYear: "",
      endYear: "",
      educationType: "Full Time",
    });

    setActiveModal("education");
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
        
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">

        <div className="text-center">
            

          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="mt-4 text-gray-600">
            Loading profile...
          </p>

        </div>

      </div>
    );
  }

  // =========================================================
  // LOGIN ERROR
  // =========================================================

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">

        <div className="bg-white rounded-2xl p-8 shadow-sm text-center">

          <FaUser className="text-4xl text-gray-300 mx-auto mb-4" />

          <h2 className="text-xl font-bold text-gray-900">
            {error || "Please login"}
          </h2>

          <p className="text-gray-500 mt-2">
            You need to login to view your profile.
          </p>

        </div>

      </div>
    );
  }

  // =========================================================
  // MAIN UI
  // =========================================================

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* ===================================================
            PROFILE HEADER
        =================================================== */}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* LEFT PROFILE */}

            <div className="lg:col-span-2">

              <div className="flex flex-col md:flex-row gap-7">

                {/* PROFILE IMAGE */}

                <div className="relative flex-shrink-0">

                  <div className="w-36 h-36 rounded-full bg-gray-100 border-4 border-white shadow-md flex items-center justify-center overflow-hidden">

                    {profile.profileImage ? (

                      <img
                        src={profile.profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />

                    ) : (

                      <FaUser className="text-6xl text-gray-300" />

                    )}

                  </div>


                  {/* PERCENTAGE */}

                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-white border border-gray-100 shadow-sm px-4 py-1 rounded-full">

                    <span className="text-sm text-orange-500 font-semibold">
                      65%
                    </span>

                  </div>

                </div>


                {/* DETAILS */}

                <div className="flex-1">

                  <div className="flex items-center gap-3">

                    <h1 className="text-2xl font-bold text-gray-900">

                      {profile.fullname || "Your Name"}

                    </h1>

                    {/* EDIT ICON */}

                    <button
                      type="button"
                      onClick={openPersonalModal}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit profile"
                    >

                      <FaEdit />

                    </button>

                  </div>


                  <p className="text-sm text-gray-500 mt-1">

                    Profile last updated -

                    <span className="text-gray-700 ml-1">
                      Today
                    </span>

                  </p>


                  <div className="border-t border-gray-200 mt-5 pt-5">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                      {/* LOCATION */}

                      <div className="flex gap-3 items-center">

                        <FaMapMarkerAlt className="text-blue-500" />

                        <span className="text-gray-700">

                          {profile.location || "Add location"}

                        </span>

                      </div>


                      {/* PHONE */}

                      <div className="flex gap-3 items-center">

                        <FaPhone className="text-blue-500" />

                        <span className="text-gray-700">

                          {profile.phone || "Add phone"}

                        </span>

                      </div>


                      {/* EXPERIENCE */}

                      <div className="flex gap-3 items-center">

                        <FaBriefcase className="text-blue-500" />

                        <span className="text-gray-700">

                          {profile.experience || "Fresher"}

                        </span>

                      </div>


                      {/* EMAIL */}

                      <div className="flex gap-3 items-center min-w-0">

                        <FaEnvelope className="text-blue-500 flex-shrink-0" />

                        <span className="text-gray-700 truncate">

                          {profile.email}

                        </span>

                      </div>


                      {/* EDUCATION */}

                      <div className="flex gap-3 items-center">

                        <FaGraduationCap className="text-blue-500" />

                        <span className="text-gray-700 truncate">

                          {profile.education || "Add education"}

                        </span>

                      </div>


                      {/* AVAILABILITY */}

                      <div className="flex gap-3 items-center">

                        <FaCalendarAlt className="text-blue-500" />

                        <span className="text-gray-700">

                          Available to join

                        </span>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>


            {/* RIGHT PROFILE COMPLETION */}

            <div className="bg-orange-50 rounded-xl p-5">

              <div className="space-y-5">

                {/* VERIFY */}

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">

                      <FaPhone className="text-blue-500" />

                    </div>

                    <span className="text-sm font-semibold text-gray-700">

                      Verify mobile number

                    </span>

                  </div>

                  <span className="text-green-500 text-sm">
                    ↑ 10%
                  </span>

                </div>


                {/* PHOTO */}

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">

                      <FaCamera className="text-blue-500" />

                    </div>

                    <span className="text-sm font-semibold text-gray-700">

                      Add photo

                    </span>

                  </div>

                  <span className="text-green-500 text-sm">
                    ↑ 5%
                  </span>

                </div>


                {/* PERSONAL */}

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">

                      <FaUser className="text-blue-500" />

                    </div>

                    <span className="text-sm font-semibold text-gray-700">

                      Add personal details

                    </span>

                  </div>

                  <span className="text-green-500 text-sm">
                    ↑ 2%
                  </span>

                </div>


                <button
                  type="button"
                  onClick={openPersonalModal}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-full font-semibold"
                >

                  Add missing details

                </button>

              </div>

            </div>

          </div>

        </div>


        {/* ===================================================
            QUICK LINKS + CONTENT
        =================================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 mt-5">

          {/* =================================================
              QUICK LINKS
          ================================================= */}

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 h-fit lg:sticky lg:top-5">

            <h2 className="text-lg font-bold text-gray-900 mb-5">

              Quick links

            </h2>


            <div className="space-y-5">

              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("resume")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    })
                }
                className="w-full flex justify-between items-center text-left"
              >

                <span className="text-gray-700">
                  Resume
                </span>

                <span className="text-blue-600 font-semibold">

                  {profile.resume ? "View" : "Add"}

                </span>

              </button>


              <button
                type="button"
                onClick={() => {
                  setFormData((prev) => ({
                    ...prev,
                    resumeHeadline:
                      profile.resumeHeadline || "",
                  }));

                  setActiveModal("headline");
                }}
                className="w-full flex justify-between items-center text-left"
              >

                <span className="text-gray-700">
                  Resume headline
                </span>

                <span className="text-blue-600 font-semibold">

                  {profile.resumeHeadline
                    ? "Edit"
                    : "Add"}

                </span>

              </button>


              <button
                type="button"
                onClick={() => setActiveModal("skills")}
                className="w-full flex justify-between items-center text-left"
              >

                <span className="text-gray-700">
                  Key skills
                </span>

                <span className="text-blue-600 font-semibold">
                  Edit
                </span>

              </button>


              <button
                type="button"
                onClick={openEmploymentModal}
                className="w-full flex justify-between items-center text-left"
              >

                <span className="text-gray-700">
                  Employment
                </span>

                <span className="text-blue-600 font-semibold">

                  {profile.experience
                    ? "Edit"
                    : "Add"}

                </span>

              </button>


              <button
                type="button"
                onClick={openEducationModal}
                className="w-full flex justify-between items-center text-left"
              >

                <span className="text-gray-700">
                  Education
                </span>

                <span className="text-blue-600 font-semibold">

                  {profile.education
                    ? "Edit"
                    : "Add"}

                </span>

              </button>

            </div>

          </div>


          {/* =================================================
              RIGHT CONTENT
          ================================================= */}

          <div className="lg:col-span-3 space-y-5">


            {/* =================================================
                RESUME
            ================================================= */}

            <div
              id="resume"
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >

              <div className="flex items-center justify-between">

                <h2 className="text-lg font-bold text-gray-900">

                  Resume

                </h2>


                {profile.resume && (

                  <div className="flex items-center gap-2">

                    {/* VIEW */}

                    <a
                      href={profile.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-blue-600 hover:bg-blue-50"
                      title="View resume"
                    >

                      <FaEye />

                    </a>


                    {/* DOWNLOAD */}

                    <a
                      href={profile.resume}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-blue-600 hover:bg-blue-50"
                      title="Download resume"
                    >

                      <FaDownload />

                    </a>

                  </div>

                )}

              </div>


              {profile.resume ? (

                <div className="mt-5">

                  <div className="flex items-center gap-4">

                    <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center">

                      <FaFilePdf className="text-red-500 text-xl" />

                    </div>


                    <div>

                      <p className="font-semibold text-gray-900">

                        Resume

                      </p>

                      <p className="text-sm text-gray-500">

                        Resume uploaded successfully

                      </p>

                    </div>

                  </div>


                  <div className="border border-dashed border-blue-300 rounded-xl p-7 mt-5 text-center">

                    <input
                      ref={resumeInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx,.rtf"
                      onChange={handleResumeChange}
                      className="hidden"
                    />


                    <button
                      type="button"
                      onClick={() =>
                        resumeInputRef.current?.click()
                      }
                      className="border border-blue-600 text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-blue-50"
                    >

                      <FaUpload className="inline mr-2" />

                      Update resume

                    </button>


                    {resumeFile && (

                      <div className="mt-4">

                        <p className="text-sm font-semibold text-gray-700">

                          {resumeFile.name}

                        </p>


                        <button
                          type="button"
                          onClick={uploadResume}
                          disabled={saving}
                          className="mt-3 bg-blue-600 text-white px-6 py-2 rounded-full font-semibold disabled:opacity-50"
                        >

                          {saving
                            ? "Uploading..."
                            : "Upload resume"}

                        </button>

                      </div>

                    )}


                    <p className="text-sm text-gray-500 mt-3">

                      Supported Formats: doc, docx, rtf, pdf, upto 2 MB

                    </p>

                  </div>

                </div>

              ) : (

                <div className="border border-dashed border-blue-300 rounded-xl p-8 mt-5 text-center">

                  <FaFilePdf className="text-red-400 text-4xl mx-auto mb-4" />

                  <p className="text-gray-600 mb-4">

                    No resume uploaded

                  </p>


                  <input
                    ref={resumeInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,.rtf"
                    onChange={handleResumeChange}
                    className="hidden"
                  />


                  <button
                    type="button"
                    onClick={() =>
                      resumeInputRef.current?.click()
                    }
                    className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-semibold"
                  >

                    Add resume

                  </button>


                  {resumeFile && (

                    <div className="mt-4">

                      <p className="text-sm font-semibold">
                        {resumeFile.name}
                      </p>


                      <button
                        type="button"
                        onClick={uploadResume}
                        disabled={saving}
                        className="mt-3 bg-blue-600 text-white px-6 py-2 rounded-full font-semibold"
                      >

                        {saving
                          ? "Uploading..."
                          : "Upload resume"}

                      </button>

                    </div>

                  )}

                </div>

              )}

            </div>


            {/* =================================================
                RESUME HEADLINE
            ================================================= */}

            <div
              id="headline"
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >

              <div className="flex items-start justify-between gap-5">

                <div>

                  <div className="flex items-center gap-2">

                    <h2 className="text-lg font-bold text-gray-900">

                      Resume headline

                    </h2>

                    <span className="text-green-500 text-sm">
                      Add 8%
                    </span>

                  </div>


                  <p className="text-sm text-gray-600 mt-4">

                    {profile.resumeHeadline ||
                      "Add a summary of your resume to introduce yourself to recruiters"}

                  </p>

                </div>


                <button
                  type="button"
                  onClick={() => {

                    setFormData((prev) => ({
                      ...prev,
                      resumeHeadline:
                        profile.resumeHeadline || "",
                    }));

                    setActiveModal("headline");

                  }}
                  className="text-blue-600 font-semibold whitespace-nowrap"
                >

                  {profile.resumeHeadline
                    ? "Edit resume headline"
                    : "Add resume headline"}

                </button>

              </div>

            </div>


            {/* =================================================
                KEY SKILLS
            ================================================= */}

            <div
              id="skills"
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >

              <div className="flex items-center gap-3">

                <h2 className="text-lg font-bold text-gray-900">

                  Key skills

                </h2>


                <button
                  type="button"
                  onClick={() => {

                    setFormData((prev) => ({
                      ...prev,
                      skill: Array.isArray(profile.skill)
                        ? profile.skill.join(", ")
                        : profile.skill || "",
                    }));

                    setActiveModal("skills");

                  }}
                  className="text-blue-500"
                >

                  <FaEdit />

                </button>

              </div>


              <div className="flex flex-wrap gap-3 mt-6">

                {Array.isArray(profile.skill) &&
                profile.skill.length > 0 ? (

                  profile.skill.map((skill, index) => (

                    <span
                      key={index}
                      className="border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-700"
                    >

                      {skill}

                    </span>

                  ))

                ) : profile.skill ? (

                  profile.skill
                    .split(",")
                    .map((skill, index) => (

                      <span
                        key={index}
                        className="border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-700"
                      >

                        {skill.trim()}

                      </span>

                    ))

                ) : (

                  <button
                    type="button"
                    onClick={() =>
                      setActiveModal("skills")
                    }
                    className="border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-500"
                  >

                    + Add skill

                  </button>

                )}

              </div>

            </div>


            {/* =================================================
                EMPLOYMENT
            ================================================= */}

            <div
              id="employment"
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >

              <div className="flex items-center justify-between">

                <h2 className="text-lg font-bold text-gray-900">

                  Employment

                </h2>


                <button
                  type="button"
                  onClick={openEmploymentModal}
                  className="text-blue-600 font-semibold"
                >

                  {profile.experience
                    ? "Edit employment"
                    : "Add employment"}

                </button>

              </div>


              {profile.experience ? (

                <div className="mt-6 flex gap-4">

                  <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">

                    <FaBriefcase className="text-blue-600" />

                  </div>


                  <div>

                    <h3 className="font-semibold text-gray-900">

                      {profile.experience}

                    </h3>

                    <p className="text-sm text-gray-500 mt-2">

                      Employment experience

                    </p>

                  </div>

                </div>

              ) : (

                <p className="text-sm text-gray-600 mt-5">

                  Your employment details will help recruiters
                  understand your experience.

                </p>

              )}

            </div>


            {/* =================================================
                EDUCATION
            ================================================= */}

            <div
              id="education"
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >

              <div className="flex items-center justify-between">

                <h2 className="text-lg font-bold text-gray-900">

                  Education

                </h2>


                <button
                  type="button"
                  onClick={openEducationModal}
                  className="text-blue-600 font-semibold"
                >

                  {profile.education
                    ? "Edit education"
                    : "Add education"}

                </button>

              </div>


              {profile.education ? (

                <div className="mt-6 flex gap-4">

                  <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">

                    <FaGraduationCap className="text-blue-600 text-xl" />

                  </div>


                  <div>

                    <h3 className="font-bold text-gray-900">

                      {profile.education}

                    </h3>

                    <p className="text-sm text-gray-500 mt-2">

                      Educational qualification

                    </p>

                  </div>

                </div>

              ) : (

                <p className="text-sm text-gray-600 mt-5">

                  Add your education details to help recruiters
                  understand your academic background.

                </p>

              )}

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          MODAL
      ===================================================== */}

      {activeModal && (

        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={(e) => {

            if (e.target === e.currentTarget) {
              setActiveModal(null);
            }

          }}
        >

          <div className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl">

            {/* =================================================
                MODAL HEADER
            ================================================= */}

            <div className="flex items-center justify-between p-6 border-b">

              <h2 className="text-xl font-bold text-gray-900">

                {activeModal === "personal" &&
                  "Edit personal details"}

                {activeModal === "headline" &&
                  "Resume headline"}

                {activeModal === "skills" &&
                  "Key skills"}

                {activeModal === "employment" &&
                  "Employment"}

                {activeModal === "education" &&
                  "Education"}

              </h2>


              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
              >

                <FaTimes />

              </button>

            </div>


            {/* =================================================
                MODAL BODY
            ================================================= */}

            <div className="p-6">


              {/* =================================================
                  PERSONAL DETAILS
              ================================================= */}

              {activeModal === "personal" && (

                <div className="space-y-5">

                  {/* FULL NAME */}

                  <div>

                    <label className="block text-sm font-semibold text-gray-700 mb-2">

                      Full name

                    </label>

                    <input
                      type="text"
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                    />

                  </div>


                  {/* EMAIL */}

                  <div>

                    <label className="block text-sm font-semibold text-gray-700 mb-2">

                      Email

                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                    />

                  </div>


                  {/* PHONE */}

                  <div>

                    <label className="block text-sm font-semibold text-gray-700 mb-2">

                      Phone number

                    </label>

                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                    />

                  </div>


                  {/* LOCATION */}

                  <div>

                    <label className="block text-sm font-semibold text-gray-700 mb-2">

                      Location

                    </label>

                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Kathmandu, Nepal"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                    />

                  </div>


                  {/* SAVE */}

                  <button
                    type="button"
                    onClick={savePersonalDetails}
                    disabled={saving}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full font-semibold disabled:opacity-50"
                  >

                    {saving
                      ? "Saving..."
                      : "Save personal details"}

                  </button>

                </div>

              )}


              {/* =================================================
                  HEADLINE
              ================================================= */}

              {activeModal === "headline" && (

                <div>

                  <p className="text-sm text-gray-500 mb-6">

                    Add a short summary that introduces you
                    to recruiters.

                  </p>


                  <label className="block text-sm font-semibold text-gray-700 mb-2">

                    Resume headline

                  </label>


                  <textarea
                    name="resumeHeadline"
                    value={formData.resumeHeadline}
                    onChange={handleChange}
                    rows="5"
                    placeholder="MERN Stack Developer | React | Node.js | MongoDB"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500 resize-none"
                  />


                  <button
                    type="button"
                    onClick={saveHeadline}
                    disabled={saving}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full mt-5 font-semibold disabled:opacity-50"
                  >

                    {saving
                      ? "Saving..."
                      : "Save resume headline"}

                  </button>

                </div>

              )}


              {/* =================================================
                  SKILLS
              ================================================= */}

              {activeModal === "skills" && (

                <div>

                  <p className="text-sm text-gray-500 mb-6">

                    Add the skills that describe your technical
                    expertise.

                  </p>


                  <label className="block text-sm font-semibold text-gray-700 mb-2">

                    Skills

                  </label>


                  <input
                    type="text"
                    name="skill"
                    value={formData.skill}
                    onChange={handleChange}
                    placeholder="React, Node.js, MongoDB, Express"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                  />


                  <p className="text-xs text-gray-500 mt-2">

                    Separate skills using commas.

                  </p>


                  {/* PREVIEW */}

                  {formData.skill && (

                    <div className="flex flex-wrap gap-2 mt-5">

                      {formData.skill
                        .split(",")
                        .filter((item) => item.trim())
                        .map((skill, index) => (

                          <span
                            key={index}
                            className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm"
                          >

                            {skill.trim()}

                          </span>

                        ))}

                    </div>

                  )}


                  <button
                    type="button"
                    onClick={saveSkills}
                    disabled={saving}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full mt-6 font-semibold disabled:opacity-50"
                  >

                    {saving
                      ? "Saving..."
                      : "Save skills"}

                  </button>

                </div>

              )}


              {/* =================================================
                  EMPLOYMENT
              ================================================= */}

              {activeModal === "employment" && (

                <div className="space-y-5">

                  <p className="text-sm text-gray-500">

                    Add your employment details.

                  </p>


                  {/* COMPANY */}

                  <div>

                    <label className="block text-sm font-semibold text-gray-700 mb-2">

                      Company name

                    </label>

                    <input
                      type="text"
                      value={employment.company}
                      onChange={(e) =>
                        setEmployment({
                          ...employment,
                          company: e.target.value,
                        })
                      }
                      placeholder="Astral Tech"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                    />

                  </div>


                  {/* DESIGNATION */}

                  <div>

                    <label className="block text-sm font-semibold text-gray-700 mb-2">

                      Designation

                    </label>

                    <input
                      type="text"
                      value={employment.designation}
                      onChange={(e) =>
                        setEmployment({
                          ...employment,
                          designation: e.target.value,
                        })
                      }
                      placeholder="Software Developer"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                    />

                  </div>


                  {/* DATES */}

                  <div className="grid grid-cols-2 gap-4">

                    <div>

                      <label className="block text-sm font-semibold text-gray-700 mb-2">

                        Start date

                      </label>

                      <input
                        type="date"
                        value={employment.startDate}
                        onChange={(e) =>
                          setEmployment({
                            ...employment,
                            startDate: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                      />

                    </div>


                    <div>

                      <label className="block text-sm font-semibold text-gray-700 mb-2">

                        End date

                      </label>

                      <input
                        type="date"
                        value={employment.endDate}
                        onChange={(e) =>
                          setEmployment({
                            ...employment,
                            endDate: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                      />

                    </div>

                  </div>


                  {/* DESCRIPTION */}

                  <div>

                    <label className="block text-sm font-semibold text-gray-700 mb-2">

                      Description

                    </label>

                    <textarea
                      rows="4"
                      value={employment.description}
                      onChange={(e) =>
                        setEmployment({
                          ...employment,
                          description: e.target.value,
                        })
                      }
                      placeholder="Describe your responsibilities..."
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500 resize-none"
                    />

                  </div>


                  <button
                    type="button"
                    onClick={saveEmployment}
                    disabled={saving}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full font-semibold disabled:opacity-50"
                  >

                    {saving
                      ? "Saving..."
                      : "Save employment"}

                  </button>

                </div>

              )}


              {/* =================================================
                  EDUCATION
              ================================================= */}

              {activeModal === "education" && (

                <div className="space-y-5">

                  <p className="text-sm text-gray-500">

                    Add your educational qualification.

                  </p>


                  {/* DEGREE */}

                  <div>

                    <label className="block text-sm font-semibold text-gray-700 mb-2">

                      Degree / Qualification

                    </label>

                    <input
                      type="text"
                      value={educationData.degree}
                      onChange={(e) =>
                        setEducationData({
                          ...educationData,
                          degree: e.target.value,
                        })
                      }
                      placeholder="Diploma Engineering"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                    />

                  </div>


                  {/* INSTITUTE */}

                  <div>

                    <label className="block text-sm font-semibold text-gray-700 mb-2">

                      Institute

                    </label>

                    <input
                      type="text"
                      value={educationData.institute}
                      onChange={(e) =>
                        setEducationData({
                          ...educationData,
                          institute: e.target.value,
                        })
                      }
                      placeholder="Mechinagar Polytechnic"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                    />

                  </div>


                  {/* YEARS */}

                  <div className="grid grid-cols-2 gap-4">

                    <div>

                      <label className="block text-sm font-semibold text-gray-700 mb-2">

                        Start year

                      </label>

                      <input
                        type="number"
                        value={educationData.startYear}
                        onChange={(e) =>
                          setEducationData({
                            ...educationData,
                            startYear: e.target.value,
                          })
                        }
                        placeholder="2021"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                      />

                    </div>


                    <div>

                      <label className="block text-sm font-semibold text-gray-700 mb-2">

                        End year

                      </label>

                      <input
                        type="number"
                        value={educationData.endYear}
                        onChange={(e) =>
                          setEducationData({
                            ...educationData,
                            endYear: e.target.value,
                          })
                        }
                        placeholder="2024"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                      />

                    </div>

                  </div>


                  {/* TYPE */}

                  <div>

                    <label className="block text-sm font-semibold text-gray-700 mb-2">

                      Education type

                    </label>

                    <select
                      value={educationData.educationType}
                      onChange={(e) =>
                        setEducationData({
                          ...educationData,
                          educationType: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                    >

                      <option value="Full Time">
                        Full Time
                      </option>

                      <option value="Part Time">
                        Part Time
                      </option>

                    </select>

                  </div>


                  {/* SAVE */}

                  <button
                    type="button"
                    onClick={saveEducation}
                    disabled={saving}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full font-semibold disabled:opacity-50"
                  >

                    {saving
                      ? "Saving..."
                      : "Save education"}

                  </button>

                </div>

              )}

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default Updateprofile;