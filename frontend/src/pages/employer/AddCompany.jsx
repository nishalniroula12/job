import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import api from "../../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

import {
  Building2,
  Globe,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Gift,
  FileText,
  Upload,
  User,
  Save,
  ArrowLeft,
  CheckCircle2,
  Image as ImageIcon,
} from "lucide-react";

const AddCompany = () => {
  const { id } = useParams();
  const nav = useNavigate();

  const [editmode, setEditmode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  // =========================
  // GET SINGLE COMPANY
  // =========================
  const fetchcompany = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/getcompany/${id}`);
      setEditmode(res.data.company);
      if (res.data.company?.image) {
        setImagePreview(res.data.company.image);
      }
    } catch (error) {
      console.log("Fetch company error:", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchcompany();
    }
  }, [id]);

  // =========================
  // FORMIK SUBMIT
  // =========================
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("type", values.type);
      formData.append("location", values.location);
      formData.append("website", values.website);
      formData.append("email", values.email);
      formData.append("status", values.status);
      formData.append("owner", values.owner);
      formData.append("benefits", values.benefits);
      formData.append("description", values.description);
      formData.append("foundedyear", values.foundedyear);
      formData.append("industry", values.industry);
      formData.append("phone", values.phone);

      if (values.image) {
        formData.append("image", values.image);
      }

      // EDIT
      if (id) {
        await api.put(`/editcompany/${id}`, formData);
        alert("Company updated successfully");
        nav("/allcompany");
      }
      // CREATE
      else {
        await api.post("/createcompany", formData);
        alert("Company created successfully");
        resetForm();
        nav("/allcompany");
      }
    } catch (error) {
      console.log("Company error:", error.response?.data || error);
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50/50">
      {/* SIDEBAR NAVIGATION */}
      <Sidebar />

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-5xl">
          {/* TOP BAR / HEADER */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => nav(-1)}
                className="rounded-lg border border-gray-200 bg-white p-2 text-gray-600 shadow-sm transition hover:bg-gray-50 hover:text-gray-900"
              >
                <ArrowLeft size={18} />
              </button>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {id ? "Edit Company" : "Add New Company"}
                </h1>
                <p className="mt-0.5 text-sm text-gray-500">
                  {id
                    ? "Update organizational profile and contact details"
                    : "Create a new company profile to manage jobs and listings"}
                </p>
              </div>
            </div>
          </div>

          {/* LOADING STATE */}
          {id && loading ? (
            <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center shadow-sm">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
              <p className="mt-3 text-sm text-gray-500">Loading company details...</p>
            </div>
          ) : (
            /* FORM CARD */
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <Formik
                initialValues={{
                  name: editmode?.name || "",
                  type: editmode?.type || "",
                  image: null,
                  location: editmode?.location || "",
                  website: editmode?.website || "",
                  email: editmode?.email || "",
                  status: editmode?.status || "active",
                  owner: editmode?.owner?._id || editmode?.owner || "",
                  benefits: editmode?.benefits || "",
                  description: editmode?.description || "",
                  foundedyear: editmode?.foundedyear || "",
                  industry: editmode?.industry || "",
                  phone: editmode?.phone || "",
                }}
                enableReinitialize
                onSubmit={handleSubmit}
              >
                {({ setFieldValue, isSubmitting }) => (
                  <Form className="space-y-8">
                    {/* SECTION 1: GENERAL INFORMATION */}
                    <div>
                      <h3 className="flex items-center gap-2 text-base font-bold text-gray-900">
                        <Building2 size={18} className="text-blue-600" />
                        Company Profile
                      </h3>
                      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {/* NAME */}
                        <div className="sm:col-span-2">
                          <label className="mb-1 block text-sm font-medium text-gray-700">
                            Company Name <span className="text-red-500">*</span>
                          </label>
                          <Field
                            name="name"
                            type="text"
                            placeholder="e.g. Acme Corporation"
                            className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                          />
                        </div>

                        {/* INDUSTRY */}
                        <div>
                          <label className="mb-1 block text-sm font-medium text-gray-700">
                            Industry
                          </label>
                          <Field
                            name="industry"
                            type="text"
                            placeholder="e.g. Information Technology"
                            className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                          />
                        </div>

                        {/* TYPE */}
                        <div>
                          <label className="mb-1 block text-sm font-medium text-gray-700">
                            Company Type
                          </label>
                          <Field
                            name="type"
                            type="text"
                            placeholder="e.g. Private / Public / Startup"
                            className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                          />
                        </div>

                        {/* FOUNDED YEAR */}
                        <div>
                          <label className="mb-1 block text-sm font-medium text-gray-700">
                            Founded Year
                          </label>
                          <Field
                            name="foundedyear"
                            type="number"
                            placeholder="2020"
                            className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                          />
                        </div>

                        {/* STATUS */}
                        <div>
                          <label className="mb-1 block text-sm font-medium text-gray-700">
                            Account Status
                          </label>
                          <Field
                            as="select"
                            name="status"
                            className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                          >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                          </Field>
                        </div>

                        {/* OWNER */}
                        <div className="sm:col-span-2">
                          <label className="mb-1 block text-sm font-medium text-gray-700">
                            Owner / Admin ID
                          </label>
                          <Field
                            name="owner"
                            type="text"
                            placeholder="User ID or Owner Name"
                            className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                          />
                        </div>
                      </div>
                    </div>

                    <hr className="border-gray-100" />

                    {/* SECTION 2: CONTACT & LOCATION */}
                    <div>
                      <h3 className="flex items-center gap-2 text-base font-bold text-gray-900">
                        <Globe size={18} className="text-blue-600" />
                        Contact & Location
                      </h3>
                      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {/* LOCATION */}
                        <div className="sm:col-span-2">
                          <label className="mb-1 block text-sm font-medium text-gray-700">
                            Headquarters / Location
                          </label>
                          <Field
                            name="location"
                            type="text"
                            placeholder="e.g. Kathmandu, Nepal"
                            className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                          />
                        </div>

                        {/* EMAIL */}
                        <div>
                          <label className="mb-1 block text-sm font-medium text-gray-700">
                            Official Email
                          </label>
                          <Field
                            name="email"
                            type="email"
                            placeholder="contact@company.com"
                            className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                          />
                        </div>

                        {/* PHONE */}
                        <div>
                          <label className="mb-1 block text-sm font-medium text-gray-700">
                            Phone Number
                          </label>
                          <Field
                            name="phone"
                            type="text"
                            placeholder="+977 9800000000"
                            className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                          />
                        </div>

                        {/* WEBSITE */}
                        <div className="sm:col-span-2">
                          <label className="mb-1 block text-sm font-medium text-gray-700">
                            Website URL
                          </label>
                          <Field
                            name="website"
                            type="text"
                            placeholder="https://example.com"
                            className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                          />
                        </div>
                      </div>
                    </div>

                    <hr className="border-gray-100" />

                    {/* SECTION 3: MEDIA & DETAILS */}
                    <div>
                      <h3 className="flex items-center gap-2 text-base font-bold text-gray-900">
                        <FileText size={18} className="text-blue-600" />
                        Media & Additional Details
                      </h3>
                      <div className="mt-4 space-y-4">
                        {/* COMPANY LOGO / IMAGE */}
                        <div>
                          <label className="mb-1 block text-sm font-medium text-gray-700">
                            Company Logo / Branding Image
                          </label>
                          <div className="mt-1 flex items-center gap-4">
                            {imagePreview && (
                              <img
                                src={imagePreview}
                                alt="Company Preview"
                                className="h-16 w-16 rounded-lg border border-gray-200 object-cover"
                              />
                            )}
                            <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 bg-gray-50/50 p-4 transition hover:bg-gray-50">
                              <Upload size={18} className="text-gray-400" />
                              <span className="text-sm text-gray-600">
                                Click to upload new logo image
                              </span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(event) => {
                                  const file = event.currentTarget.files[0];
                                  if (file) {
                                    setFieldValue("image", file);
                                    setImagePreview(URL.createObjectURL(file));
                                  }
                                }}
                              />
                            </label>
                          </div>
                        </div>

                        {/* DESCRIPTION */}
                        <div>
                          <label className="mb-1 block text-sm font-medium text-gray-700">
                            Company Overview & Description
                          </label>
                          <Field
                            as="textarea"
                            name="description"
                            rows="4"
                            placeholder="Summarize the company's mission, values, and story..."
                            className="w-full resize-none rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                          />
                        </div>

                        {/* BENEFITS */}
                        <div>
                          <label className="mb-1 block text-sm font-medium text-gray-700">
                            Perks & Benefits
                          </label>
                          <Field
                            as="textarea"
                            name="benefits"
                            rows="3"
                            placeholder="Health insurance, flexible hours, remote work setup..."
                            className="w-full resize-none rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                          />
                        </div>
                      </div>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-6">
                      <button
                        type="button"
                        onClick={() => nav(-1)}
                        className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save size={16} />
                            {id ? "Update Company" : "Add Company"}
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

export default AddCompany;