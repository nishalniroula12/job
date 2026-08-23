import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import Sidebar from "../../components/Sidebar";

const Allcompany = () => {
  const [company, setCompany] = useState([]);
  const [loading, setLoading] = useState(true);

  // =====================================
  // GET ALL COMPANIES
  // =====================================
  const fetchcompany = async () => {
    try {
      setLoading(true);

      const res = await api.get("/get");

      console.log("Company response:", res.data);

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
  // DELETE COMPANY
  // =====================================
  const deletecompany = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this company?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const res = await api.delete(`/companydelete/${id}`);

      console.log("Delete response:", res.data);

      // Remove deleted company from UI
      setCompany((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.log(
        "Delete company error:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">

        <div className="bg-white shadow-md rounded-lg p-6">

          {/* Header */}
          <div className="flex justify-between items-center mb-6">

            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                All Companies
              </h1>

              <p className="text-gray-500 mt-1">
                Total Companies: {company.length}
              </p>
            </div>

          </div>

          {/* Loading */}
          {loading && (
            <div className="text-center py-10">
              <p className="text-gray-500">
                Loading companies...
              </p>
            </div>
          )}

          {/* No Companies */}
          {!loading && company.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500">
                No companies found
              </p>
            </div>
          )}

          {/* Company Table */}
          {!loading && company.length > 0 && (
            <div className="overflow-x-auto">

              <table className="min-w-full border border-gray-200">

                <thead>
                  <tr className="bg-gray-100 text-left">

                    <th className="px-4 py-3 border">
                      S.N
                    </th>

                    <th className="px-4 py-3 border">
                      Logo
                    </th>

                    <th className="px-4 py-3 border">
                      Company Name
                    </th>

                    <th className="px-4 py-3 border">
                      Email
                    </th>

                    <th className="px-4 py-3 border">
                      Location
                    </th>

                    <th className="px-4 py-3 border">
                      Website
                    </th>

                    <th className="px-4 py-3 border">
                      Actions
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {company.map((item, index) => (

                    <tr
                      key={item._id}
                      className="hover:bg-gray-50"
                    >

                      {/* S.N */}
                      <td className="px-4 py-3 border">
                        {index + 1}
                      </td>

                      {/* Logo */}
                      <td className="px-4 py-3 border">

                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name || "Company"}
                            className="w-12 h-12 object-cover rounded"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-xs">
                            No Logo
                          </div>
                        )}

                      </td>

                      {/* Company Name */}
                      <td className="px-4 py-3 border font-medium">
                        {item.name ||
                          item.companyname ||
                          "N/A"}
                      </td>

                      {/* Email */}
                      <td className="px-4 py-3 border">
                        {item.email || "N/A"}
                      </td>

                      {/* Location */}
                      <td className="px-4 py-3 border">
                        {item.location || "N/A"}
                      </td>

                      {/* Website */}
                      <td className="px-4 py-3 border">

                        {item.website ? (
                          <a
                            href={item.website}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Visit
                          </a>
                        ) : (
                          "N/A"
                        )}

                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3 border">

                        <div className="flex gap-2">

                          <button
                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                          >
                            View
                          </button>

                          <button
                            onClick={() =>
                              deletecompany(item._id)
                            }
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default Allcompany;