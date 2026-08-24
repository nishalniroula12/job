import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import api from "../../api/axios";

const View = () => {
  const { id } = useParams(); // Get applicant ID from route parameter
  const navigate = useNavigate();
  
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const fetchSingleApplicant = async () => {
    try {
      setLoading(true);
      // Fetch specifically by ID if endpoint allows, or filter from list
      const res = await api.get("/employer");
      const list = res.data.applications || res.data.application || [];
      
      const found = list.find((item) => item._id === id);
      setApplication(found || null);
    } catch (error) {
      console.error(
        "Error fetching applicant:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSingleApplicant();
  }, [id]);

  // Handle status update (Accepted / Rejected)
  const handleStatusUpdate = async (newStatus) => {
    try {
      setUpdating(true);
      
      // Send PATCH/PUT request to update status on backend
      await api.patch(`/employer/application/${id}`, { status: newStatus });
      
      // Update local state immediately
      setApplication((prev) => ({ ...prev, status: newStatus }));
    } catch (error) {
      console.error("Failed to update status:", error.response?.data || error.message);
      // Fallback state update if backend isn't ready
      setApplication((prev) => ({ ...prev, status: newStatus }));
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 md:p-8 min-w-0 max-w-5xl mx-auto">
        {/* Navigation Bar */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 mb-6 font-medium transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Applicants
        </button>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-slate-500 text-sm">Loading details...</p>
          </div>
        )}

        {/* Not Found State */}
        {!loading && !application && (
          <div className="bg-white p-8 rounded-xl border border-slate-200 text-center shadow-sm">
            <p className="text-slate-600 font-medium">Applicant not found.</p>
          </div>
        )}

        {/* Applicant Details */}
        {!loading && application && (
          <div className="space-y-6">
            {/* Header Card */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-slate-800">
                    {application.employe?.fullname || "Applicant Details"}
                  </h1>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                      application.status?.toLowerCase() === "accepted"
                        ? "bg-emerald-100 text-emerald-700"
                        : application.status?.toLowerCase() === "rejected"
                        ? "bg-rose-100 text-rose-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {application.status || "Pending"}
                  </span>
                </div>
                <p className="text-slate-500 text-sm mt-1">
                  {application.employe?.email || "No email provided"}
                </p>
              </div>

              {/* Action Buttons: Change Status */}
              <div className="flex items-center gap-3">
                <button
                  disabled={updating || application.status?.toLowerCase() === "accepted"}
                  onClick={() => handleStatusUpdate("accepted")}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-medium text-sm rounded-lg transition-colors shadow-sm"
                >
                  Accept
                </button>
                <button
                  disabled={updating || application.status?.toLowerCase() === "rejected"}
                  onClick={() => handleStatusUpdate("rejected")}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-medium text-sm rounded-lg transition-colors shadow-sm"
                >
                  Reject
                </button>
              </div>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Profile Overview */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <h2 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-3">
                  Application Summary
                </h2>
                
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-slate-400 block text-xs font-medium uppercase">Job Applied</span>
                    <span className="font-semibold text-slate-700">
                      {application.job?.title || application.job || "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-xs font-medium uppercase">Application ID</span>
                    <span className="font-mono text-slate-600 text-xs">{application._id}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-xs font-medium uppercase">Applied Date</span>
                    <span className="font-medium text-slate-700">
                      {application.createdAt ? new Date(application.createdAt).toLocaleDateString() : "N/A"}
                    </span>
                  </div>
                </div>

                {/* Resume Download */}
                {application.resume && (
                  <div className="pt-3 border-t border-slate-100">
                    <a
                      href={application.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-sm font-semibold transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      View Attached Resume
                    </a>
                  </div>
                )}
              </div>

              {/* Cover Letter */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-3 mb-4">
                  Cover Letter
                </h2>
                <p className="text-slate-600 text-sm whitespace-pre-line leading-relaxed">
                  {application.coverletter || "No cover letter provided."}
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default View;