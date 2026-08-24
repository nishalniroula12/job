import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";

const StatusBadge = ({ status }) => {
  const styles = {
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    accepted: "bg-emerald-50 text-emerald-700 border-emerald-200",
    rejected: "bg-rose-50 text-rose-700 border-rose-200",
  };

  const key = (status || "").toLowerCase();

  return (
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-semibold border capitalize whitespace-nowrap ${
        styles[key] || "bg-blue-50 text-blue-700 border-blue-200"
      }`}
    >
      {status || "Unknown"}
    </span>
  );
};

const Applicant = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigator =useNavigate()

  const fetchApplicants = async () => {
    try {
      setLoading(true);
      const res = await api.get("/employer");
      setApplications(res.data.applications || []);
    } catch (error) {
      console.log("Applicant error:", error.response?.data || error.message);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 md:p-8 min-w-0 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
              Applicants
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Manage and review incoming candidate applications
            </p>
          </div>
          <div className="inline-flex items-center gap-2 self-start sm:self-auto bg-white border border-slate-200 px-3.5 py-1.5 rounded-lg shadow-sm">
            <span className="text-xs text-slate-500 font-medium">Total:</span>
            <span className="text-sm font-bold text-blue-600">
              {applications.length}
            </span>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-slate-500 text-sm">Loading applicants...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && applications.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200 shadow-sm">
            <svg
              className="mx-auto h-12 w-12 text-slate-300 mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <p className="text-slate-600 font-medium">No applicants found</p>
            <p className="text-slate-400 text-sm mt-1">
              New job applications will appear here.
            </p>
          </div>
        )}

        {/* Responsive Grid View */}
        {!loading && applications.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {applications.map((application, index) => {
              const name = application.employe?.fullname || "N/A";
              const avatarLetter = name.charAt(0).toUpperCase();

              return (
                <div
                  key={application._id || index}
                  className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Avatar/Name & Status */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-sm shrink-0 border border-blue-100">
                          {avatarLetter}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-slate-800 text-base truncate">
                            {name}
                          </p>
                          <p className="text-xs text-slate-500 truncate">
                            {application.employe?.email || "N/A"}
                          </p>
                        </div>
                      </div>
                      <StatusBadge status={application.status} />
                    </div>

                    {/* Job Applied Info */}
                    <div className="bg-slate-50 rounded-lg p-3 mb-4 border border-slate-100">
                      <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block mb-0.5">
                        Applied Position
                      </span>
                      <p className="text-sm font-medium text-slate-700 truncate">
                        {application.job?.title || "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    {/* Resume Link with Icon */}
                    {application.resume ? (
                      <a
                        href={application.resume}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        Resume
                      </a>
                    ) : (
                      <span className="text-xs text-slate-400">No Resume</span>
                    )}

                    {/* View Details Icon Button */}
                    <button
                    onClick={()=>navigator(`/view/${application._id}`)}
                      title="View Applicant Details"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
                    >
                      <svg
                        className="w-4 h-4 text-slate-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      View
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default Applicant;