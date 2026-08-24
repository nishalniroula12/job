import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import Sidebar from "../../components/Sidebar";

const Employerprofile = () => {
  const [employe, setemploye] = useState(null);

  const fetchprofile = async () => {
    try {
      const res = await api.get("/profile");

      console.log("API DATA:", res.data);
      console.log("USER DATA:", res.data.user);

      setemploye(res.data.user);
    } catch (error) {
      console.error("PROFILE ERROR:", error);
    }
  };

  useEffect(() => {
    fetchprofile();
  }, []);

  console.log("STATE:", employe);

  return (
    <div className="min-h-screen bg-gray-100">

      <Sidebar />

      <main className="md:ml-64 p-6">

        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Employer Profile
        </h1>

        {employe && (
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-3xl">

            <h2 className="text-2xl font-bold text-blue-600 mb-6">
              {employe.fullname}
            </h2>

            <div className="space-y-4">

              <div>
                <p className="text-sm text-gray-500">
                  Full Name
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  {employe.fullname}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Email
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  {employe.email}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Role
                </p>
                <p className="text-lg font-semibold text-gray-800 capitalize">
                  {employe.role}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Status
                </p>
                <p className="text-lg font-semibold text-green-600 capitalize">
                  {employe.status}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Location
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  {employe.location || "Not provided"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Education
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  {employe.education || "Not provided"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Experience
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  {employe.experience || "Not provided"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Skills
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  {employe.skill || "Not provided"}
                </p>
              </div>

            </div>

          </div>
        )}

      </main>
    </div>
  );
};

export default Employerprofile;