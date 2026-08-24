import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import Sidebar from "../../components/Sidebar";

const Employerprofile = () => {
  const [employe, setEmploye] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchprofile = async () => {
    try {
      setLoading(true);
      const res = await api.get("/profile");
      setEmploye(res.data.user);
    } catch (error) {
      console.error("PROFILE ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchprofile();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 w-full p-4 sm:p-6 lg:p-8 overflow-x-hidden">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Employer Profile
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage and review your account details
            </p>
          </div>

          {/* LOADING STATE */}
          {loading && (
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
              <div className="animate-pulse space-y-6">
                <div className="h-8 w-48 rounded bg-gray-200"></div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <div className="h-4 w-24 rounded bg-gray-200"></div>
                      <div className="h-6 w-3/4 rounded bg-gray-100"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* PROFILE CARD */}
          {!loading && employe && (
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              {/* CARD HEADER */}
              <div className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {employe.fullname || "N/A"}
                    </h2>
                    <p className="text-sm font-medium text-blue-600">
                      {employe.email}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold capitalize text-blue-800">
                      {employe.role || "Employer"}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold capitalize text-green-800">
                      {employe.status || "Active"}
                    </span>
                  </div>
                </div>
              </div>

              {/* DETAILS GRID */}
              <div className="p-6 sm:p-8">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="rounded-xl bg-gray-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Full Name
                    </p>
                    <p className="mt-1 text-base font-semibold text-gray-800">
                      {employe.fullname || "Not provided"}
                    </p>
                  </div>

                  <div className="rounded-xl bg-gray-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Email Address
                    </p>
                    <p className="mt-1 text-base font-semibold text-gray-800 break-all">
                      {employe.email || "Not provided"}
                    </p>
                  </div>

                  <div className="rounded-xl bg-gray-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Location
                    </p>
                    <p className="mt-1 text-base font-semibold text-gray-800">
                      {employe.location || "Not provided"}
                    </p>
                  </div>

                  <div className="rounded-xl bg-gray-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Education
                    </p>
                    <p className="mt-1 text-base font-semibold text-gray-800">
                      {employe.education || "Not provided"}
                    </p>
                  </div>

                  <div className="rounded-xl bg-gray-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Experience
                    </p>
                    <p className="mt-1 text-base font-semibold text-gray-800">
                      {employe.experience || "Not provided"}
                    </p>
                  </div>

                  <div className="rounded-xl bg-gray-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Skills
                    </p>
                    <p className="mt-1 text-base font-semibold text-gray-800">
                      {employe.skill || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Employerprofile;