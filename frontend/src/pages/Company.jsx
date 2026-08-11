import React, { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

const Company = () => {
  const [company, setCompany] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FILTER STATES =================
  const [search, setSearch] = useState("");
  const [companyType, setCompanyType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  // ================= FETCH ALL COMPANIES =================
  const fetchCompany = async () => {
    try {
      setLoading(true);

      const res = await api.get("/get");

      console.log("All Company Data:", res.data);

      setCompany(res.data.company || []);
    } catch (error) {
      console.log("Error fetching company:", error);
      setCompany([]);
    } finally {
      setLoading(false);
    }
  };

  // ================= SEARCH / FILTER COMPANIES =================
  const fetchSearch = async (type = "", location = "") => {
    try {
      setLoading(true);

      const res = await api.get("/get", {
        params: {
          keyword: search,
          type: type,
          location: location,
        },
      });

      console.log("Filtered Company Data:", res.data);

      setCompany(res.data.company || []);

    } catch (error) {
      console.log("Error searching companies:", error);
      setCompany([]);
    } finally {
      setLoading(false);
    }
  };

  // ================= HANDLE COMPANY TYPE =================
  const handleCompanyType = (type) => {
    if (companyType === type) {
      // Remove company type filter
      setCompanyType("");

      // Keep location filter if selected
      fetchSearch("", selectedLocation);
    } else {
      setCompanyType(type);

      // Apply company type + location
      fetchSearch(type, selectedLocation);
    }
  };

  // ================= HANDLE LOCATION =================
  const handleLocation = (location) => {
    if (selectedLocation === location) {
      // Remove location filter
      setSelectedLocation("");

      // Keep company type filter
      fetchSearch(companyType, "");
    } else {
      setSelectedLocation(location);

      // Apply location + company type
      fetchSearch(companyType, location);
    }
  };

  // ================= INITIAL LOAD =================
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


          {/* ================================================= */}
          {/* LEFT SIDEBAR */}
          {/* ================================================= */}

          <div className="lg:col-span-1 space-y-6">


            {/* ================= COMPANY TYPE FILTER ================= */}

            <div className="bg-white rounded-xl border border-gray-200 p-6">

              <h2 className="text-lg font-bold mb-6">
                All Filters
              </h2>

              <hr className="mb-6" />

              <h3 className="font-semibold mb-4">
                Company Type
              </h3>

              <div className="space-y-4">

                {/* CORPORATE */}
                <label className="flex items-center gap-3 cursor-pointer">

                  <input
                    type="checkbox"
                    className="w-5 h-5"
                    checked={companyType === "c"}
                    onChange={() => handleCompanyType("c")}
                  />

                  <span>
                    Corporate
                  </span>

                </label>


                {/* FOREIGN MNC */}
                <label className="flex items-center gap-3 cursor-pointer">

                  <input
                    type="checkbox"
                    className="w-5 h-5"
                    checked={companyType === "f"}
                    onChange={() => handleCompanyType("f")}
                  />

                  <span>
                    Foreign MNC
                  </span>

                </label>


                {/* STARTUP */}
                <label className="flex items-center gap-3 cursor-pointer">

                  <input
                    type="checkbox"
                    className="w-5 h-5"
                    checked={companyType === "Startup"}
                    onChange={() => handleCompanyType("Startup")}
                  />

                  <span>
                    Startup
                  </span>

                </label>


                {/* INDIAN MNC */}
                <label className="flex items-center gap-3 cursor-pointer">

                  <input
                    type="checkbox"
                    className="w-5 h-5"
                    checked={companyType === "Indian MNC"}
                    onChange={() => handleCompanyType("Indian MNC")}
                  />

                  <span>
                    Indian MNC
                  </span>

                </label>

              </div>

            </div>


            {/* ================= LOCATION FILTER ================= */}

            <div className="bg-white rounded-xl border border-gray-200 p-6">

              <h3 className="font-semibold mb-4">
                Location
              </h3>

              <div className="space-y-4">

                {/* KATHMANDU */}
                <label className="flex items-center gap-3 cursor-pointer">

                  <input
                    type="checkbox"
                    className="w-5 h-5"
                    checked={selectedLocation === "k"}
                    onChange={() => handleLocation("k")}
                  />

                  <span>
                    Kathmandu
                  </span>

                </label>


                {/* JHAPA */}
                <label className="flex items-center gap-3 cursor-pointer">

                  <input
                    type="checkbox"
                    className="w-5 h-5"
                    checked={selectedLocation === "Jhapa"}
                    onChange={() => handleLocation("Jhapa")}
                  />

                  <span>
                    Jhapa
                  </span>

                </label>


                {/* ILAM */}
                <label className="flex items-center gap-3 cursor-pointer">

                  <input
                    type="checkbox"
                    className="w-5 h-5"
                    checked={selectedLocation === "Ilam"}
                    onChange={() => handleLocation("Ilam")}
                  />

                  <span>
                    Ilam
                  </span>

                </label>


                {/* CHITWAN */}
                <label className="flex items-center gap-3 cursor-pointer">

                  <input
                    type="checkbox"
                    className="w-5 h-5"
                    checked={selectedLocation === "Chitwan"}
                    onChange={() => handleLocation("Chitwan")}
                  />

                  <span>
                    Chitwan
                  </span>

                </label>

              </div>

            </div>

          </div>


          {/* ================================================= */}
          {/* RIGHT SIDE - COMPANY LIST */}
          {/* ================================================= */}

          <div className="lg:col-span-3">


            {/* HEADER */}

            <div className="flex justify-between items-center mb-5">

              <h2 className="text-lg font-medium">

                Showing {company.length} companies

              </h2>


              <div className="flex gap-2">

                {companyType && (
                  <span className="text-sm text-blue-600">
                    Type: {companyType}
                  </span>
                )}

                {selectedLocation && (
                  <span className="text-sm text-green-600">
                    Location: {selectedLocation}
                  </span>
                )}

              </div>

            </div>


            {/* LOADING */}

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

              /* COMPANY CARDS */

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {company.map((item) => (

                  <div
                    key={item._id}
                    className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition cursor-pointer"
                  >

                    <div className="flex items-center gap-4">


                      {/* COMPANY LOGO */}

                      <div className="w-16 h-16 border border-gray-200 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">

                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />

                      </div>


                      {/* COMPANY INFORMATION */}

                      <div className="flex-1 min-w-0">

                        <div className="flex items-center justify-between">

                          <h2 className="text-lg font-semibold text-gray-900 truncate">
                            {item.name}
                          </h2>

                          <span className="text-xl">
                            →
                          </span>

                        </div>


                        {/* LOCATION */}

                        <p className="text-sm text-gray-500 mt-1">
                          {item.location}
                        </p>


                        {/* TAGS */}

                        <div className="flex flex-wrap gap-2 mt-3">

                          {/* INDUSTRY */}

                          {item.industry && (

                            <span className="px-3 py-1 text-xs rounded-full bg-gray-50 border border-gray-200 text-gray-600">

                              {item.industry}

                            </span>

                          )}


                          {/* COMPANY TYPE */}

                          {item.type && (

                            <span className="px-3 py-1 text-xs rounded-full bg-blue-50 border border-blue-200 text-blue-600">

                              {item.type}

                            </span>

                          )}


                          {/* FOUNDED YEAR */}

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