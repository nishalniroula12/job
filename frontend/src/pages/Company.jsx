import React, { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

const Company = () => {
  const [company, setCompany] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCompany = async () => {
    try {
      const res = await api.get("/get");

      console.log("Company Data:", res.data);

      setCompany(res.data.company || []);
    } catch (error) {
      console.log("Error fetching company:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompany();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* ================= TOP SECTION ================= */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Top companies hiring now
        </h1>

        {/* Category Cards */}
        <div className="bg-indigo-50 rounded-2xl p-6">
          <div className="flex gap-4 overflow-x-auto">

            <div className="min-w-[200px] bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold">
                MNCs
              </h2>

              <p className="text-blue-600 mt-2 font-medium">
                2.4K+ Companies →
              </p>
            </div>

            <div className="min-w-[200px] bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold">
                Product
              </h2>

              <p className="text-blue-600 mt-2 font-medium">
                1.3K+ Companies →
              </p>
            </div>

            <div className="min-w-[200px] bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold">
                Banking & Finance
              </h2>

              <p className="text-blue-600 mt-2 font-medium">
                456 Companies →
              </p>
            </div>

            <div className="min-w-[200px] bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold">
                Hospitality
              </h2>

              <p className="text-blue-600 mt-2 font-medium">
                163 Companies →
              </p>
            </div>

            <div className="min-w-[200px] bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold">
                Fintech
              </h2>

              <p className="text-blue-600 mt-2 font-medium">
                155 Companies →
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-6 mt-8">

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* ================= FILTER SIDEBAR ================= */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 h-fit">

            <h2 className="text-lg font-bold mb-6">
              All Filters
            </h2>

            <hr className="mb-6" />

            <h3 className="font-semibold mb-4">
              Company type
            </h3>

            <div className="space-y-4">

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="w-5 h-5"
                />
                <span>
                  Corporate
                </span>
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="w-5 h-5"
                />
                <span>
                  Foreign MNC
                </span>
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="w-5 h-5"
                />
                <span>
                  Startup
                </span>
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="w-5 h-5"
                />
                <span>
                  Indian MNC
                </span>
              </label>

            </div>
          </div>

          {/* ================= COMPANY LIST ================= */}
          <div className="lg:col-span-3">

            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-medium">
                Showing {company.length} companies
              </h2>
            </div>

            {loading ? (
              <div className="text-center py-10">
                Loading companies...
              </div>
            ) : company.length === 0 ? (
              <div className="bg-white rounded-xl p-10 text-center">
                <p className="text-gray-500">
                  No companies found
                </p>
              </div>
            ) : (

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {company.map((item) => (

                  <div
                    key={item._id}
                    className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition cursor-pointer"
                  >

                    <div className="flex items-center gap-4">

                      {/* Company Logo */}
                      <div className="w-16 h-16 border border-gray-200 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">

                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />

                      </div>

                      {/* Company Information */}
                      <div className="flex-1 min-w-0">

                        <div className="flex items-center justify-between">

                          <h2 className="text-lg font-semibold text-gray-900 truncate">
                            {item.name}
                          </h2>

                          <span className="text-xl">
                            →
                          </span>

                        </div>

                        <p className="text-sm text-gray-500 mt-1">
                          {item.location}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-3">

                          {item.industry && (
                            <span className="px-3 py-1 text-xs rounded-full bg-gray-50 border border-gray-200 text-gray-600">
                              {item.industry}
                            </span>
                          )}

                          {item.foundedyear && (
                            <span className="px-3 py-1 text-xs rounded-full bg-gray-50 border border-gray-200 text-gray-600">
                              Founded: {item.foundedyear}
                            </span>
                          )}

                        </div>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>

        </div>

      </div>
    </div>
  );
};

export default Company; 