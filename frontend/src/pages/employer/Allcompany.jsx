import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  Eye,
  Pencil,
  Trash2,
  X,
  Globe,
  Mail,
  MapPin,
  ExternalLink,
  AlertTriangle,
} from "lucide-react";

const Allcompany = () => {
  const [company, setCompany] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigator = useNavigate();

  // =====================================
  // VIEW STATE
  // =====================================
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  // =====================================
  // DELETE STATE
  // =====================================
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteCompanyItem, setDeleteCompanyItem] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // =====================================
  // FETCH COMPANIES
  // =====================================
  const fetchcompany = async () => {
    try {
      setLoading(true);
      const res = await api.get("/get");
      setCompany(res.data.company || []);
    } catch (error) {
      console.log(
        "Fetch company error:",
        error.response?.data || error.message
      );
      setCompany([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchcompany();
  }, []);

  // =====================================
  // VIEW HANDLER
  // =====================================
  const openViewModal = (item) => {
    setSelectedCompany(item);
    setViewOpen(true);
  };

  // =====================================
  // DELETE HANDLERS
  // =====================================
  const openDeleteModal = (item) => {
    setDeleteCompanyItem(item);
    setDeleteOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteCompanyItem) return;

    try {
      setDeleting(true);
      await api.delete(`/companydelete/${deleteCompanyItem._id}`);

      // Remove deleted company from UI state
      setCompany((prev) =>
        prev.filter((item) => item._id !== deleteCompanyItem._id)
      );
      setDeleteOpen(false);
      setDeleteCompanyItem(null);
    } catch (error) {
      console.log(
        "Delete company error:",
        error.response?.data || error.message
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50/50">
      {/* SIDEBAR NAVIGATION */}
      <Sidebar />

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          {/* HEADER AREA */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                All Companies
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage and view registered company profiles
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 sm:text-sm">
                Total Companies: {company.length}
              </span>
            </div>
          </div>

          {/* LOADING STATE */}
          {loading && (
            <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center shadow-sm">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
              <p className="mt-3 text-sm text-gray-500">
                Loading companies...
              </p>
            </div>
          )}

          {/* EMPTY STATE */}
          {!loading && company.length === 0 && (
            <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center shadow-sm">
              <Building2 size={40} className="mx-auto text-gray-300" />
              <h2 className="mt-4 text-lg font-semibold text-gray-800">
                No companies found
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                There are currently no registered company listings available.
              </p>
            </div>
          )}

          {/* MAIN LISTINGS AREA */}
          {!loading && company.length > 0 && (
            <>
              {/* MOBILE CARD VIEW (Shown on smaller screens) */}
              <div className="grid grid-cols-1 gap-4 lg:hidden">
                {company.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                  >
                    <div>
                      <div className="flex items-start gap-3">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name || item.companyname || "Company"}
                            className="h-12 w-12 rounded-lg object-cover ring-1 ring-gray-200 shrink-0"
                          />
                        ) : (
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-400">
                            <Building2 size={22} />
                          </div>
                        )}

                        <div className="min-w-0 flex-1">
                          <h3 className="truncate text-base font-bold text-gray-900">
                            {item.name || item.companyname || "N/A"}
                          </h3>
                          <div className="mt-1 flex items-center gap-1 text-xs text-gray-500 truncate">
                            <Mail size={13} className="shrink-0 text-gray-400" />
                            <span className="truncate">{item.email || "N/A"}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-2 border-t border-gray-100 pt-3 text-xs text-gray-600">
                        <div className="flex items-center gap-1.5">
                          <MapPin size={14} className="shrink-0 text-gray-400" />
                          <span className="truncate">{item.location || "N/A"}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Globe size={14} className="shrink-0 text-gray-400" />
                          {item.website ? (
                            <a
                              href={item.website}
                              target="_blank"
                              rel="noreferrer"
                              className="truncate text-blue-600 hover:underline"
                            >
                              Website
                            </a>
                          ) : (
                            <span className="text-gray-400">N/A</span>
                          )}
                        </div>
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
                        onClick={() => navigator(`/add-company/${item._id}`)}
                        title="Edit Company"
                        className="flex items-center gap-1 rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 transition hover:bg-blue-100"
                      >
                        <Pencil size={15} />
                        Edit
                      </button>
                      <button
                        onClick={() => openDeleteModal(item)}
                        title="Delete Company"
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
                        <th scope="col" className="px-6 py-4 w-16">
                          S.N
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Company Profile
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Location
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Website
                        </th>
                        <th scope="col" className="px-6 py-4 text-center">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {company.map((item, index) => (
                        <tr
                          key={item._id}
                          className="transition hover:bg-gray-50/70"
                        >
                          {/* S.N */}
                          <td className="px-6 py-4 font-medium text-gray-500">
                            {index + 1}
                          </td>

                          {/* LOGO & NAME */}
                          <td className="px-6 py-4 font-medium text-gray-900">
                            <div className="flex items-center gap-3">
                              {item.image ? (
                                <img
                                  src={item.image}
                                  alt={item.name || item.companyname || "Company"}
                                  className="h-10 w-10 rounded-lg object-cover ring-1 ring-gray-200 shrink-0"
                                />
                              ) : (
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-400">
                                  <Building2 size={20} />
                                </div>
                              )}
                              <span className="font-bold text-gray-900">
                                {item.name || item.companyname || "N/A"}
                              </span>
                            </div>
                          </td>

                          {/* EMAIL */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.email || (
                              <span className="text-gray-400">N/A</span>
                            )}
                          </td>

                          {/* LOCATION */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.location || (
                              <span className="text-gray-400">N/A</span>
                            )}
                          </td>

                          {/* WEBSITE */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.website ? (
                              <a
                                href={item.website}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 font-medium text-blue-600 hover:underline"
                              >
                                Visit
                                <ExternalLink size={13} />
                              </a>
                            ) : (
                              <span className="text-gray-400">N/A</span>
                            )}
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
                                onClick={() => navigator(`/add-company/${item._id}`)}
                                title="Edit Company"
                                className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
                              >
                                <Pencil size={18} />
                              </button>
                              <button
                                onClick={() => openDeleteModal(item)}
                                title="Delete Company"
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
      {viewOpen && selectedCompany && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b px-6 py-4">
              <div className="flex items-center gap-3">
                {selectedCompany.image ? (
                  <img
                    src={selectedCompany.image}
                    alt={selectedCompany.name || "Company Logo"}
                    className="h-10 w-10 rounded-lg object-cover ring-1 ring-gray-200"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-400">
                    <Building2 size={20} />
                  </div>
                )}
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    {selectedCompany.name || selectedCompany.companyname || "N/A"}
                  </h2>
                  <p className="text-xs text-gray-500">Company Overview</p>
                </div>
              </div>
              <button
                onClick={() => setViewOpen(false)}
                className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="max-h-[70vh] space-y-4 overflow-y-auto p-6 text-sm text-gray-600">
              <div className="grid grid-cols-1 gap-3 rounded-xl bg-gray-50 p-4 sm:grid-cols-2">
                <div>
                  <span className="block text-xs font-semibold uppercase text-gray-400">
                    Email Address
                  </span>
                  <span className="mt-0.5 block font-medium text-gray-800 break-all">
                    {selectedCompany.email || "N/A"}
                  </span>
                </div>
                <div>
                  <span className="block text-xs font-semibold uppercase text-gray-400">
                    Location
                  </span>
                  <span className="mt-0.5 block font-medium text-gray-800">
                    {selectedCompany.location || "N/A"}
                  </span>
                </div>
              </div>

              {selectedCompany.description && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    About Company
                  </h4>
                  <p className="mt-1 whitespace-pre-line text-gray-700">
                    {selectedCompany.description}
                  </p>
                </div>
              )}

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Website
                </h4>
                {selectedCompany.website ? (
                  <a
                    href={selectedCompany.website}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-flex items-center gap-1 font-medium text-blue-600 hover:underline"
                  >
                    {selectedCompany.website}
                    <ExternalLink size={14} />
                  </a>
                ) : (
                  <p className="mt-1 text-gray-500">No website specified</p>
                )}
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
                  navigator(`/add-company/${selectedCompany._id}`);
                }}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Edit Company
              </button>
            </div>
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
              Delete Company Listing?
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-700">
                {deleteCompanyItem?.name || deleteCompanyItem?.companyname}
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
                    Delete Company
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

export default Allcompany;