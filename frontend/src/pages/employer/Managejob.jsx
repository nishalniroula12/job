import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import Sidebar from "../../components/Sidebar";

import {
  Briefcase,
  DollarSign,
  GraduationCap,
  Save,
  ArrowLeft,
  FileText,
  Building2,
} from "lucide-react";

const Managejob = () => {
  const { id } = useParams();
  const nav = useNavigate();

  const [edit, setEdit] = useState(null);
  const [companies, setCompanies] = useState([]);

  const [loading, setLoading] = useState(false);
  const [companyLoading, setCompanyLoading] = useState(false);

  // =========================================
  // FETCH SINGLE JOB FOR EDIT
  // =========================================
  const fetchSingleJob = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/singlejob/${id}`);

      console.log("Single job:", res.data);

      setEdit(res.data.job);
    } catch (error) {
      console.log(
        "Single job error:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // FETCH COMPANIES
  // =========================================
  const fetchCompanies = async () => {
    try {
      setCompanyLoading(true);

      const res = await api.get("/get");

      console.log("Companies:", res.data);

      // If your response is { companies: [...] }
      setCompanies(res.data.company || []);
    } catch (error) {
      console.log(
        "Company fetch error:",
        error.response?.data || error.message
      );

      setCompanies([]);
    } finally {
      setCompanyLoading(false);
    }
  };

  // =========================================
  // USE EFFECT
  // =========================================
  useEffect(() => {
    fetchCompanies();

    if (id) {
      fetchSingleJob();
    }
  }, [id]);

  // =========================================
  // INITIAL VALUES
  // =========================================
  const initialValues = {
    title: edit?.title || "",

    company:
      edit?.company?._id ||
      edit?.company ||
      "",

    description: edit?.description || "",

    requirements: edit?.requirements || "",

    skill: Array.isArray(edit?.skill)
      ? edit.skill.join(", ")
      : edit?.skill || "",

    responsibility: edit?.responsibility || "",

    salaryMin: edit?.salary?.min ?? "",

    salaryMax: edit?.salary?.max ?? "",

    salarytype: edit?.salarytype || "monthly",

    experience: edit?.experience || "fresher",

    education: edit?.education || "",

    jobtype: edit?.jobtype || "fulltime",

    location: edit?.location || "",

    vacancy: edit?.vacancy ?? 1,

    deadline: edit?.deadline
      ? new Date(edit.deadline).toISOString().substring(0, 10)
      : "",

    status: edit?.status || "open",
  };

  // =========================================
  // SUBMIT
  // =========================================
  const handleSubmit = async (
    values,
    { setSubmitting, resetForm }
  ) => {
    try {
      // Convert skills from string to array
      const skills = values.skill
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      // Data sent to backend
      const data = {
        title: values.title,

        company: values.company,

        description: values.description,

        requirements: values.requirements,

        skill: skills,

        responsibility: values.responsibility,

        salary: {
          min: Number(values.salaryMin),
          max: Number(values.salaryMax),
        },

        salarytype: values.salarytype,

        experience: values.experience,

        education: values.education,

        jobtype: values.jobtype,

        location: values.location,

        vacancy: Number(values.vacancy),

        deadline: values.deadline,

        status: values.status,
      };

      console.log("Sending job data:", data);

      // =====================================
      // UPDATE
      // =====================================
      if (id) {
        const res = await api.put(
          `/updatejob/${id}`,
          data
        );

        console.log("Update response:", res.data);

        alert("Job updated successfully");

        nav("/all-job");
      }

      // =====================================
      // CREATE
      // =====================================
      else {
        const res = await api.post(
          "/createjob",
          data
        );

        console.log("Create response:", res.data);

        alert("Job created successfully");

        resetForm();

        nav("/all-job");
      }
    } catch (error) {
      console.log(
        "Job error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setSubmitting(false);
    }
  };

  // =========================================
  // UI
  // =========================================
  return (
    <div className="flex min-h-screen bg-gray-50/50">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-5xl">

          {/* HEADER */}
          <div className="mb-6 flex items-center gap-3">

            <button
              type="button"
              onClick={() => nav(-1)}
              className="rounded-lg border border-gray-200 bg-white p-2 text-gray-600 shadow-sm hover:bg-gray-50"
            >
              <ArrowLeft size={18} />
            </button>

            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                {id
                  ? "Edit Job Listing"
                  : "Post a New Job"}
              </h1>

              <p className="mt-0.5 text-sm text-gray-500">
                {id
                  ? "Update position details and requirements"
                  : "Fill in the details to publish a new career opportunity"}
              </p>
            </div>
          </div>

          {/* LOADING */}
          {id && loading ? (
            <div className="rounded-2xl border bg-white p-12 text-center shadow-sm">

              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />

              <p className="mt-3 text-sm text-gray-500">
                Loading job details...
              </p>
            </div>
          ) : (
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

              <Formik
                enableReinitialize
                initialValues={initialValues}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="space-y-8">

                    {/* ================================= */}
                    {/* BASIC INFORMATION */}
                    {/* ================================= */}

                    <div>

                      <h3 className="flex items-center gap-2 text-base font-bold text-gray-900">
                        <Briefcase
                          size={18}
                          className="text-blue-600"
                        />
                        Basic Information
                      </h3>

                      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">

                        {/* TITLE */}
                        <div className="sm:col-span-2">

                          <label className="mb-1 block text-sm font-medium text-gray-700">
                            Job Title{" "}
                            <span className="text-red-500">
                              *
                            </span>
                          </label>

                          <Field
                            name="title"
                            type="text"
                            placeholder="e.g. Senior Frontend Developer"
                            className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                          />
                        </div>

                        {/* COMPANY */}
                        <div className="sm:col-span-2">

                          <label className="mb-1 flex items-center gap-1 text-sm font-medium text-gray-700">

                            <Building2 size={15} />

                            Company{" "}
                            <span className="text-red-500">
                              *
                            </span>

                          </label>

                          <Field
                            as="select"
                            name="company"
                            className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                          >

                            <option value="">
                              {companyLoading
                                ? "Loading companies..."
                                : "Select Company"}
                            </option>

                            {companies.map((company) => (
                              <option
                                key={company._id}
                                value={company._id}
                              >
                                {company.name}
                              </option>
                            ))}

                          </Field>

                          {!companyLoading &&
                            companies.length === 0 && (
                              <p className="mt-1 text-xs text-red-500">
                                No companies found. Create a company first.
                              </p>
                            )}
                        </div>

                        {/* JOB TYPE */}
                        <div>

                          <label className="mb-1 block text-sm font-medium text-gray-700">
                            Job Type
                          </label>

                          <Field
                            as="select"
                            name="jobtype"
                            className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm"
                          >
                            <option value="fulltime">
                              Full Time
                            </option>

                            <option value="parttime">
                              Part Time
                            </option>

                            <option value="remote">
                              Remote
                            </option>
                          </Field>
                        </div>

                        {/* STATUS */}
                        <div>

                          <label className="mb-1 block text-sm font-medium text-gray-700">
                            Listing Status
                          </label>

                          <Field
                            as="select"
                            name="status"
                            className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm"
                          >
                            <option value="open">
                              Open
                            </option>

                            <option value="closed">
                              Closed
                            </option>
                          </Field>
                        </div>

                      </div>
                    </div>

                    <hr className="border-gray-100" />

                    {/* ================================= */}
                    {/* SALARY / LOGISTICS */}
                    {/* ================================= */}

                    <div>

                      <h3 className="flex items-center gap-2 text-base font-bold text-gray-900">

                        <DollarSign
                          size={18}
                          className="text-blue-600"
                        />

                        Logistics & Compensation

                      </h3>

                      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">

                        {/* MIN */}
                        <div>

                          <label className="mb-1 block text-sm font-medium text-gray-700">
                            Min Salary
                          </label>

                          <Field
                            name="salaryMin"
                            type="number"
                            placeholder="30000"
                            className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm"
                          />
                        </div>

                        {/* MAX */}
                        <div>

                          <label className="mb-1 block text-sm font-medium text-gray-700">
                            Max Salary
                          </label>

                          <Field
                            name="salaryMax"
                            type="number"
                            placeholder="50000"
                            className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm"
                          />
                        </div>

                        {/* SALARY TYPE */}
                        <div>

                          <label className="mb-1 block text-sm font-medium text-gray-700">
                            Pay Frequency
                          </label>

                          <Field
                            as="select"
                            name="salarytype"
                            className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm"
                          >
                            <option value="monthly">
                              Monthly
                            </option>

                            <option value="hourly">
                              Hourly
                            </option>

                            <option value="yearly">
                              Yearly
                            </option>
                          </Field>
                        </div>

                        {/* LOCATION */}
                        <div>

                          <label className="mb-1 block text-sm font-medium text-gray-700">
                            Location
                          </label>

                          <Field
                            name="location"
                            type="text"
                            placeholder="Kathmandu"
                            className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm"
                          />
                        </div>

                        {/* VACANCY */}
                        <div>

                          <label className="mb-1 block text-sm font-medium text-gray-700">
                            Vacancies
                          </label>

                          <Field
                            name="vacancy"
                            type="number"
                            min="1"
                            className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm"
                          />
                        </div>

                        {/* DEADLINE */}
                        <div>

                          <label className="mb-1 block text-sm font-medium text-gray-700">
                            Application Deadline
                          </label>

                          <Field
                            name="deadline"
                            type="date"
                            className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm"
                          />
                        </div>

                      </div>
                    </div>

                    <hr className="border-gray-100" />

                    {/* ================================= */}
                    {/* QUALIFICATIONS */}
                    {/* ================================= */}

                    <div>

                      <h3 className="flex items-center gap-2 text-base font-bold text-gray-900">

                        <GraduationCap
                          size={18}
                          className="text-blue-600"
                        />

                        Qualifications & Experience

                      </h3>

                      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">

                        {/* EXPERIENCE */}
                        <div>

                          <label className="mb-1 block text-sm font-medium text-gray-700">
                            Experience Required
                          </label>

                          <Field
                            as="select"
                            name="experience"
                            className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm"
                          >
                            <option value="fresher">
                              Fresher
                            </option>

                            <option value="1">
                              1 Year
                            </option>

                            <option value="2">
                              2 Years
                            </option>

                            <option value="3">
                              3 Years
                            </option>

                            <option value="5+">
                              5+ Years
                            </option>
                          </Field>
                        </div>

                        {/* EDUCATION */}
                        <div>

                          <label className="mb-1 block text-sm font-medium text-gray-700">
                            Education Degree
                          </label>

                          <Field
                            name="education"
                            type="text"
                            placeholder="Bachelor in Computer Science"
                            className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm"
                          />
                        </div>

                        {/* SKILLS */}
                        <div className="sm:col-span-2">

                          <label className="mb-1 block text-sm font-medium text-gray-700">
                            Required Skills
                          </label>

                          <Field
                            name="skill"
                            type="text"
                            placeholder="React, Node.js, MongoDB"
                            className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm"
                          />

                          <p className="mt-1 text-xs text-gray-400">
                            Separate values with commas
                          </p>
                        </div>

                      </div>
                    </div>

                    <hr className="border-gray-100" />

                    {/* ================================= */}
                    {/* DESCRIPTION */}
                    {/* ================================= */}

                    <div>

                      <h3 className="flex items-center gap-2 text-base font-bold text-gray-900">

                        <FileText
                          size={18}
                          className="text-blue-600"
                        />

                        Detailed Description

                      </h3>

                      <div className="mt-4 space-y-4">

                        {/* DESCRIPTION */}
                        <div>

                          <label className="mb-1 block text-sm font-medium text-gray-700">
                            Job Summary & Description
                          </label>

                          <Field
                            as="textarea"
                            name="description"
                            rows="4"
                            placeholder="Provide a general overview..."
                            className="w-full resize-none rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm"
                          />
                        </div>

                        {/* REQUIREMENTS */}
                        <div>

                          <label className="mb-1 block text-sm font-medium text-gray-700">
                            Key Requirements
                          </label>

                          <Field
                            as="textarea"
                            name="requirements"
                            rows="4"
                            placeholder="List mandatory qualifications..."
                            className="w-full resize-none rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm"
                          />
                        </div>

                        {/* RESPONSIBILITY */}
                        <div>

                          <label className="mb-1 block text-sm font-medium text-gray-700">
                            Core Responsibilities
                          </label>

                          <Field
                            as="textarea"
                            name="responsibility"
                            rows="4"
                            placeholder="Outline day-to-day duties..."
                            className="w-full resize-none rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm"
                          />
                        </div>

                      </div>
                    </div>

                    {/* ================================= */}
                    {/* BUTTONS */}
                    {/* ================================= */}

                    <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-6">

                      <button
                        type="button"
                        onClick={() => nav(-1)}
                        className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        disabled={
                          isSubmitting ||
                          companyLoading ||
                          companies.length === 0
                        }
                        className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 disabled:opacity-50"
                      >

                        {isSubmitting ? (
                          <>
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />

                            Saving...
                          </>
                        ) : (
                          <>
                            <Save size={16} />

                            {id
                              ? "Update Job"
                              : "Publish Job"}
                          </>
                        )}

                      </button>

                    </div>

                  </Form>
                )}
              </Formik>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Managejob;