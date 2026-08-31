
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import api from "../../api/axios";
import {
  BriefcaseBusiness,
  Building2,
  Bell,
  CheckCircle,
  Plus,
  Eye,
  Users,
  ArrowUpRight,
} from "lucide-react";

const Dashboard = () => {
  const [job, setjob] = useState([]);
  const [company, setcompany] = useState([]);
  const [read, setread] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchall = async () => {
    try {
      const res = await api.get("/allget");
      const c = await api.get("/get");
      const n = await api.get("/getread");

      setjob(res.data.jobs || []);
      setcompany(c.data.company || []);
      setread(n.data.notification || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchall();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      {/* Main Content */}
      <main className="lg:ml-64 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <p className="text-sm text-gray-500 mb-1">
              Employer Dashboard
            </p>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Dashboard
            </h1>

            <p className="text-gray-500 mt-1">
              Manage your jobs, companies and applications.
            </p>
          </div>

          <button
            onClick={() => (window.location.href = "/employer/createjob")}
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-medium transition"
          >
            <Plus size={19} />
            Post New Job
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
          
          {/* Jobs */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Total Jobs
                </p>

                <h2 className="text-3xl font-bold text-gray-900 mt-2">
                  {loading ? "..." : job.length}
                </h2>

                <p className="text-xs text-green-600 mt-2">
                  Jobs posted
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <BriefcaseBusiness size={24} />
              </div>
            </div>
          </div>

          {/* Companies */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Companies
                </p>

                <h2 className="text-3xl font-bold text-gray-900 mt-2">
                  {loading ? "..." : company.length}
                </h2>

                <p className="text-xs text-blue-600 mt-2">
                  Registered companies
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Building2 size={24} />
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Notifications
                </p>

                <h2 className="text-3xl font-bold text-gray-900 mt-2">
                  {loading ? "..." : read.length}
                </h2>

                <p className="text-xs text-orange-600 mt-2">
                  Recent notifications
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                <Bell size={24} />
              </div>
            </div>
          </div>

          {/* Applications */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Applications
                </p>

                <h2 className="text-3xl font-bold text-gray-900 mt-2">
                  0
                </h2>

                <p className="text-xs text-purple-600 mt-2">
                  Total applicants
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Users size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* Recent Jobs */}
          <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm">
            
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <div>
                <h2 className="font-bold text-gray-900 text-lg">
                  Recent Jobs
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Your recently posted jobs
                </p>
              </div>

              <button
                onClick={() => (window.location.href = "/employer/alljob")}
                className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700 font-medium"
              >
                View All
                <ArrowUpRight size={16} />
              </button>
            </div>

            <div className="overflow-x-auto">
              {loading ? (
                <div className="p-8 text-center text-gray-500">
                  Loading jobs...
                </div>
              ) : job.length === 0 ? (
                <div className="p-10 text-center">
                  <BriefcaseBusiness
                    size={40}
                    className="mx-auto text-gray-300"
                  />

                  <h3 className="font-semibold text-gray-700 mt-3">
                    No jobs posted yet
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Start by posting your first job.
                  </p>
                </div>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-500 border-b border-gray-100">
                      <th className="px-5 py-4 font-medium">
                        Job Title
                      </th>

                      <th className="px-5 py-4 font-medium">
                        Location
                      </th>

                      <th className="px-5 py-4 font-medium">
                        Type
                      </th>

                      <th className="px-5 py-4 font-medium">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {job.slice(0, 5).map((item) => (
                      <tr
                        key={item._id}
                        className="border-b last:border-0 border-gray-100 hover:bg-gray-50"
                      >
                        <td className="px-5 py-4">
                          <div className="font-medium text-gray-900">
                            {item.title || "Untitled Job"}
                          </div>

                          <div className="text-xs text-gray-500 mt-1">
                            {item.vacancy
                              ? `${item.vacancy} vacancies`
                              : ""}
                          </div>
                        </td>

                        <td className="px-5 py-4 text-gray-600">
                          {item.location || "Not specified"}
                        </td>

                        <td className="px-5 py-4 text-gray-600">
                          {item.jobtype || item.type || "N/A"}
                        </td>

                        <td className="px-5 py-4">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium">
                            <CheckCircle size={13} />
                            Active
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Right Side */}
          <div className="space-y-6">

            {/* Companies */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <div>
                  <h2 className="font-bold text-gray-900">
                    Companies
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Your companies
                  </p>
                </div>

                <Building2
                  size={20}
                  className="text-indigo-600"
                />
              </div>

              <div className="p-4">
                {company.length === 0 ? (
                  <div className="text-center py-6">
                    <Building2
                      size={35}
                      className="mx-auto text-gray-300"
                    />

                    <p className="text-sm text-gray-500 mt-2">
                      No company found
                    </p>
                  </div>
                ) : (
                  company.slice(0, 4).map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition"
                    >
                      <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                        <Building2
                          size={19}
                          className="text-indigo-600"
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="font-medium text-gray-800 truncate">
                          {item.name ||
                            item.companyname ||
                            "Company"}
                        </p>

                        <p className="text-xs text-gray-500 truncate">
                          {item.location || "Location not specified"}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-indigo-600 rounded-2xl p-5 text-white">
              <h2 className="font-bold text-lg">
                Quick Actions
              </h2>

              <p className="text-indigo-100 text-sm mt-1 mb-4">
                Manage your employer account
              </p>

              <div className="space-y-2">
                <button
                  onClick={() =>
                    (window.location.href =
                      "/employer/createjob")
                  }
                  className="w-full flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-xl p-3 text-sm transition"
                >
                  <Plus size={18} />
                  Post New Job
                </button>

                <button
                  onClick={() =>
                    (window.location.href =
                      "/employer/alljob")
                  }
                  className="w-full flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-xl p-3 text-sm transition"
                >
                  <Eye size={18} />
                  Manage Jobs
                </button>

                <button
                  onClick={() =>
                    (window.location.href =
                      "/employer/notification")
                  }
                  className="w-full flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-xl p-3 text-sm transition"
                >
                  <Bell size={18} />
                  Notifications
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

