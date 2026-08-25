import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  Pencil,
  Trash2,
  X,
  Save,
  Briefcase,
  AlertTriangle,
  Eye,
  MapPin,
  Clock,
  DollarSign,
  Building,
  BriefcaseBusiness,
} from "lucide-react";
import Sidebar from "../../components/Sidebar";

const Alljobs = () => {
  const [job, setJob] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user, isAuthenticate } = useSelector((state) => state.data);
  const navigator = useNavigate();

  // EDIT STATE
  const [editOpen, setEditOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    experience: "",
    location: "",
    jobtype: "",
    skill: "",
    vacancy: "",
  });
  const [updating, setUpdating] = useState(false);

  // DELETE STATE
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteJob, setDeleteJob] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // VIEW STATE
  const [viewOpen, setViewOpen] = useState(false);
  const [viewJob, setViewJob] = useState(null);

  // FETCH JOBS
  const fetchjob = async () => {
    try {
      setLoading(true);
      const res = await api.get("/allget");
      setJob(res.data.jobs || []);
    } catch (error) {
      console.log("Error fetching jobs:", error);
      setJob([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchjob();
  }, [user, isAuthenticate]);

  // VIEW HANDLER
  const openViewModal = (item) => {
    setViewJob(item);
    setViewOpen(true);
  };

  // EDIT HANDLERS
  const openEditModal = (item) => {
    setSelectedJob(item);
    setEditData({
      title: item.title || "",
      description: item.description || "",
      experience: item.experience || "",
      location: item.location || "",
      jobtype: item.jobtype || "",
      skill: Array.isArray(item.skill)
        ? item.skill.join(", ")
        : item.skill || "",
      vacancy: item.vacancy || "",
    });
    setEditOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedJob) return;

    try {
      setUpdating(true);
      const dataToSend = {
        ...editData,
        skill: editData.skill
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      };

      await api.put(`/job/${selectedJob._id}`, dataToSend);
      setEditOpen(false);
      setSelectedJob(null);
      await fetchjob();
    } catch (error) {
      console.log("Update error:", error);
    } finally {
      setUpdating(false);
    }
  };

  // DELETE HANDLERS
  const openDeleteModal = (item) => {
    setDeleteJob(item);
    setDeleteOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteJob) return;

    try {
      setDeleting(true);
      await api.delete(`/job/${deleteJob._id}`);
      setDeleteOpen(false);
      setDeleteJob(null);
      await fetchjob();
    } catch (error) {
      console.log("Delete error:", error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50/50">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          {/* HEADER AREA */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                All Jobs
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage, inspect, and update your active listings
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 sm:text-sm">
                Total Jobs: {job.length}
              </span>
            </div>
          </div>

          {/* LOADING STATE */}
          {loading && (
            <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center shadow-sm">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
              <p className="mt-3 text-sm text-gray-500">Loading listings...</p>
            </div>
          )}

          {/* EMPTY STATE */}
          {!loading && job.length === 0 && (
            <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center shadow-sm">
              <Briefcase size={40} className="mx-auto text-gray-300" />
              <h2 className="mt-4 text-lg font-semibold text-gray-800">
                No listings found
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                You currently have no active job positions available.
              </p>
            </div>
          )}

          {/* MAIN LISTINGS AREA */}
          {!loading && job.length > 0 && (
            <>
              {/* MOBILE CARD VIEW (Shown on smaller screens) */}
              <div className="grid grid-cols-1 gap-4 lg:hidden">
                {job.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3
                            onClick={() => navigator(`/apply/${item._id}`)}
                            className="cursor-pointer text-base font-bold text-gray-900 hover:text-blue-600"
                          >
                            {item.title}
                          </h3>
                          {item.company?.name && (
                            <div className="mt-0.5 flex items-center gap-1.5 text-xs text-gray-500">
                              <Building size={14} />
                              {item.company.name}
                            </div>
                          )}
                        </div>
                        {item.jobtype && (
                          <span className="shrink-0 rounded-full bg-purple-50 px-2.5 py-1 text-xs font-semibold capitalize text-purple-700">
                            {item.jobtype}
                          </span>
                        )}
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-2 border-y border-gray-100 py-3 text-xs text-gray-600">
                        <div className="flex items-center gap-1.5">
                          <MapPin size={14} className="text-gray-400" />
                          <span className="truncate">{item.location || "N/A"}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock size={14} className="text-gray-400" />
                          <span className="truncate">{item.experience || "N/A"}</span>
                        </div>
                        <div className="col-span-2 flex items-center gap-1.5 font-medium text-green-700">
                          <DollarSign size={14} className="text-green-600" />
                          {item.salary ? (
                            <span>
                              ${item.salary.min || 0} - ${item.salary.max || 0}
                            </span>
                          ) : (
                            <span className="text-gray-400 font-normal">N/A</span>
                          )}
                        </div>
                      </div>

                      {/* SKILLS CHIPS */}
                      <div className="mt-3 flex flex-wrap gap-1">
                        {Array.isArray(item.skill) ? (
                          item.skill.map((s, idx) => (
                            <span
                              key={idx}
                              className="rounded bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-600"
                            >
                              {s}
                            </span>
                          ))
                        ) : item.skill ? (
                          <span className="rounded bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-600">
                            {item.skill}
                          </span>
                        ) : null}
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="mt-4 flex items-center justify-end gap-2 border-t border-gray-100 pt-3">
                      <button
                        onClick={() => openViewModal(item)}
                        title="Quick View"
                        className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
                      >
                        <Eye size={15} />
                        View
                      </button>
                      <button
                        onClick={() => navigator(`/managejob/${item._id}`)}
                        title="Edit Job"
                        className="flex items-center gap-1 rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 transition hover:bg-blue-100"
                      >
                        <Pencil size={15} />
                        Edit
                      </button>
                      <button
                        onClick={() => openDeleteModal(item)}
                        title="Delete Job"
                        className="flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 transition hover:bg-red-100"
                      >
                        <Trash2 size={15} />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* DESKTOP TABLE VIEW (Shown on larger screens) */}
              <div className="hidden overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm lg:block">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-gray-600">
                    <thead className="border-b border-gray-200 bg-gray-50/70 text-xs font-semibold uppercase tracking-wider text-gray-600">
                      <tr>
                        <th scope="col" className="px-6 py-4">
                          Job Details
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Type
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Location
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Experience
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Salary Range
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Required Skills
                        </th>
                        <th scope="col" className="px-6 py-4 text-center">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {job.map((item) => (
                        <tr
                          key={item._id}
                          className="transition hover:bg-gray-50/70"
                        >
                          {/* TITLE & COMPANY */}
                          <td className="px-6 py-4 font-medium text-gray-900">
                            <div
                              onClick={() => navigator(`/apply/${item._id}`)}
                              className="cursor-pointer font-bold text-gray-900 hover:text-blue-600"
                            >
                              {item.title}
                            </div>
                            {item.company?.name && (
                              <div className="text-xs text-gray-500">
                                {item.company.name}
                              </div>
                            )}
                          </td>

                          {/* JOB TYPE */}
                          <td className="px-6 py-4">
                            {item.jobtype ? (
                              <span className="inline-block rounded-full bg-purple-50 px-2.5 py-1 text-xs font-semibold capitalize text-purple-700">
                                {item.jobtype}
                              </span>
                            ) : (
                              <span className="text-gray-400">N/A</span>
                            )}
                          </td>

                          {/* LOCATION */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.location || (
                              <span className="text-gray-400">N/A</span>
                            )}
                          </td>

                          {/* EXPERIENCE */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.experience || (
                              <span className="text-gray-400">N/A</span>
                            )}
                          </td>

                          {/* SALARY */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.salary ? (
                              <span className="font-semibold text-green-700">
                                ${item.salary.min || 0} - ${item.salary.max || 0}
                              </span>
                            ) : (
                              <span className="text-gray-400">N/A</span>
                            )}
                          </td>

                          {/* SKILLS */}
                          <td className="px-6 py-4">
                            <div className="flex max-w-xs flex-wrap gap-1">
                              {Array.isArray(item.skill) ? (
                                item.skill.map((s, idx) => (
                                  <span
                                    key={idx}
                                    className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                                  >
                                    {s}
                                  </span>
                                ))
                              ) : item.skill ? (
                                <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                                  {item.skill}
                                </span>
                              ) : (
                                <span className="text-gray-400">N/A</span>
                              )}
                            </div>
                          </td>

                          {/* ACTIONS */}
                          <td className="px-6 py-4 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <button
                                onClick={() => openViewModal(item)}
                                title="View Details"
                                className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                              >
                                <Eye size={18} />
                              </button>
                              <button
                                onClick={() => navigator(`/managejob/${item._id}`)}
                                title="Edit Job"
                                className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
                              >
                                <Pencil size={18} />
                              </button>
                              <button
                                onClick={() => openDeleteModal(item)}
                                title="Delete Job"
                                className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      {/* QUICK VIEW MODAL */}
      {viewOpen && viewJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b px-6 py-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {viewJob.title}
                </h2>
                {viewJob.company?.name && (
                  <p className="text-sm font-medium text-blue-600">
                    {viewJob.company.name}
                  </p>
                )}
              </div>
              <button
                onClick={() => setViewOpen(false)}
                className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="max-h-[70vh] space-y-4 overflow-y-auto p-6 text-sm text-gray-600">
              <div className="grid grid-cols-2 gap-4 rounded-xl bg-gray-50 p-4">
                <div>
                  <span className="block text-xs font-semibold uppercase text-gray-400">
                    Job Type
                  </span>
                  <span className="font-medium capitalize text-gray-800">
                    {viewJob.jobtype || "N/A"}
                  </span>
                </div>
                <div>
                  <span className="block text-xs font-semibold uppercase text-gray-400">
                    Vacancies
                  </span>
                  <span className="font-medium text-gray-800">
                    {viewJob.vacancy || "N/A"}
                  </span>
                </div>
                <div>
                  <span className="block text-xs font-semibold uppercase text-gray-400">
                    Location
                  </span>
                  <span className="font-medium text-gray-800">
                    {viewJob.location || "N/A"}
                  </span>
                </div>
                <div>
                  <span className="block text-xs font-semibold uppercase text-gray-400">
                    Experience
                  </span>
                  <span className="font-medium text-gray-800">
                    {viewJob.experience || "N/A"}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Description
                </h4>
                <p className="mt-1 whitespace-pre-line text-gray-700">
                  {viewJob.description || "No description provided."}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Skills Required
                </h4>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {Array.isArray(viewJob.skill) ? (
                    viewJob.skill.map((s, idx) => (
                      <span
                        key={idx}
                        className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
                      >
                        {s}
                      </span>
                    ))
                  ) : (
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                      {viewJob.skill || "N/A"}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t bg-gray-50 px-6 py-4">
              <button
                type="button"
                onClick={() => setViewOpen(false)}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setViewOpen(false);
                  navigator(`/apply/${viewJob._id}`);
                }}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Go to Application Page
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b px-6 py-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Edit Job</h2>
                <p className="text-sm text-gray-500">
                  Update your job listing details
                </p>
              </div>
              <button
                onClick={() => setEditOpen(false)}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdate}>
              <div className="max-h-[70vh] space-y-4 overflow-y-auto p-6">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Job Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={editData.title}
                    onChange={handleEditChange}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={editData.description}
                    onChange={handleEditChange}
                    rows="4"
                    className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Experience
                    </label>
                    <input
                      type="text"
                      name="experience"
                      value={editData.experience}
                      onChange={handleEditChange}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={editData.location}
                      onChange={handleEditChange}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Job Type
                    </label>
                    <select
                      name="jobtype"
                      value={editData.jobtype}
                      onChange={handleEditChange}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="">Select Job Type</option>
                      <option value="fulltime">Full Time</option>
                      <option value="parttime">Part Time</option>
                      <option value="remote">Remote</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Vacancy
                    </label>
                    <input
                      type="number"
                      name="vacancy"
                      value={editData.vacancy}
                      onChange={handleEditChange}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Skills
                  </label>
                  <input
                    type="text"
                    name="skill"
                    value={editData.skill}
                    onChange={handleEditChange}
                    placeholder="React, Node.js, MongoDB"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                  <p className="mt-1 text-xs text-gray-400">
                    Comma separated values
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-2 border-t bg-gray-50 px-6 py-4">
                <button
                  type="button"
                  onClick={() => setEditOpen(false)}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
                >
                  {updating ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle size={24} className="text-red-600" />
            </div>

            <h2 className="mt-4 text-lg font-bold text-gray-900">
              Delete Job Listing?
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-700">
                {deleteJob?.title}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setDeleteOpen(false)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-60"
              >
                {deleting ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={16} />
                    Delete Job
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Alljobs;