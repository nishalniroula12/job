import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Alljob = () => {
  const [job, setJob] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticate } = useSelector((state) => state.data);


  // Filters
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [jobtype, setJobtype] = useState("");
  const navigator =useNavigate()

  // ==============================
  // FETCH JOBS
  // ==============================
  const fetchjob = async () => {
    try {
      setLoading(true);

      const res = await api.get("/allget", {
        params: {
        
          experience: experience,
          location: location,
          jobtype: jobtype,
        },
      });

      console.log("Jobs:", res.data);

      setJob(res.data.jobs || []);

    } catch (error) {
      console.log("Error fetching jobs:", error);
      setJob([]);
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // FETCH ON FILTER CHANGE
  // ==============================
  useEffect(() => {
    fetchjob();
  }, [experience, location, jobtype, user,isAuthenticate]);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ========================= */}
      {/* NAVBAR */}
      {/* ========================= */}

      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-6">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* ================================= */}
          {/* LEFT SIDEBAR */}
          {/* ================================= */}

          <aside className="lg:col-span-3">

            <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-24">

              <h2 className="text-lg font-bold text-gray-900">
                All Filters
              </h2>

              <hr className="my-5" />

              {/* ========================= */}
              {/* WORK MODE */}
              {/* ========================= */}

              <div className="mb-7">

                <h3 className="font-semibold text-gray-900 mb-4">
                  Work mode
                </h3>

                <div className="space-y-3">

                  <label className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer">
                    <input
                      type="checkbox"
                      value="fulltime"
                      checked={jobtype === "fulltime"}
                      onChange={(e) =>
                        setJobtype(
                          e.target.checked
                            ? "fulltime"
                            : ""
                        )
                      }
                      className="w-4 h-4"
                    />

                    Full Time
                  </label>

                  <label className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer">
                    <input
                      type="checkbox"
                      value="parttime"
                      checked={jobtype === "parttime"}
                      onChange={(e) =>
                        setJobtype(
                          e.target.checked
                            ? "parttime"
                            : ""
                        )
                      }
                      className="w-4 h-4"
                    />

                    Part Time
                  </label>

                  <label className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer">
                    <input
                      type="checkbox"
                      value="remote"
                      checked={jobtype === "remote"}
                      onChange={(e) =>
                        setJobtype(
                          e.target.checked
                            ? "remote"
                            : ""
                        )
                      }
                      className="w-4 h-4"
                    />

                    Remote
                  </label>

                </div>

              </div>

              <hr className="mb-7" />

              {/* ========================= */}
              {/* EXPERIENCE */}
              {/* ========================= */}

              <div className="mb-7">

                <h3 className="font-semibold text-gray-900 mb-4">
                  Experience
                </h3>

                <div className="space-y-3">

                  <label className="flex items-center gap-3 text-sm text-gray-600">
                    <input
                      type="radio"
                      name="experience"
                      checked={experience === ""}
                      onChange={() => setExperience("")}
                    />

                    Any Experience
                  </label>

                  <label className="flex items-center gap-3 text-sm text-gray-600">
                    <input
                      type="radio"
                      name="experience"
                      checked={experience === "fresher"}
                      onChange={() => setExperience("fresher")}
                    />

                    Fresher
                  </label>

                  <label className="flex items-center gap-3 text-sm text-gray-600">
                    <input
                      type="radio"
                      name="experience"
                      checked={experience === "1"}
                      onChange={() => setExperience("1")}
                    />

                    1 Year
                  </label>

                  <label className="flex items-center gap-3 text-sm text-gray-600">
                    <input
                      type="radio"
                      name="experience"
                      checked={experience === "2"}
                      onChange={() => setExperience("2")}
                    />

                    2 Years
                  </label>

                  <label className="flex items-center gap-3 text-sm text-gray-600">
                    <input
                      type="radio"
                      name="experience"
                      checked={experience === "3"}
                      onChange={() => setExperience("3")}
                    />

                    3 Years
                  </label>

                </div>

              </div>

              <hr className="mb-7" />

              {/* ========================= */}
              {/* LOCATION */}
              {/* ========================= */}

              <div>

                <h3 className="font-semibold text-gray-900 mb-4">
                  Location
                </h3>

                <input
                  type="text"
                  placeholder="Search location"
                  value={location}
                  onChange={(e) =>
                    setLocation(e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

            </div>

          </aside>

          {/* ================================= */}
          {/* CENTER JOB LIST */}
          {/* ================================= */}

          <main className="lg:col-span-6">

            {/* TOP BAR */}

            <div className="flex items-center justify-between mb-5">

              <div>

                <h2 className="text-lg font-semibold text-gray-900">
                  {job.length} Jobs Found
                </h2>

                <p className="text-sm text-gray-500">
                  Latest job opportunities
                </p>

              </div>

              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white">
                <option>
                  Sort by: Recommended
                </option>

                <option>
                  Latest
                </option>

                <option>
                  Salary
                </option>
              </select>

            </div>

            {/* LOADING */}

            {loading && (
              <div className="bg-white rounded-xl p-10 text-center">
                <p className="text-gray-500">
                  Loading jobs...
                </p>
              </div>
            )}

            {/* NO JOB */}

            {!loading && job.length === 0 && (
              <div className="bg-white rounded-xl p-10 text-center border">
                <h2 className="text-lg font-semibold">
                  No jobs found
                </h2>

                <p className="text-gray-500 mt-2">
                  Try changing your filters.
                </p>
              </div>
            )}

            {/* JOB LIST */}

            <div className="space-y-4">

              {!loading &&
                job.map((item) => (

                  <div
                    key={item._id}
                    className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-lg transition-shadow"
                  >

                    {/* JOB HEADER */}

                    <div className="flex justify-between gap-4">

                      <div onClick={()=>navigator(`/apply/${id}`)}>

                        <h2 className="text-lg font-bold text-gray-900 hover:text-blue-600 cursor-pointer">
                          {item.title}
                        </h2>

                        {item.company && (
                          <p className="text-sm text-gray-600 mt-1">
                            {item.company.name}
                          </p>
                        )}

                        {item.employer && (
                          <p className="text-xs text-gray-500 mt-1">
                            Posted by{" "}
                            {item.employer.fullname}
                          </p>
                        )}

                      </div>

                      {/* COMPANY LOGO */}

                      <div className="w-12 h-12 border rounded-lg flex items-center justify-center overflow-hidden">

                        {item.company?.image ? (

                          <img
                            src={item.company.image}
                            alt={item.company.name}
                            className="w-full h-full object-contain"
                          />

                        ) : (

                          <span className="text-xl font-bold text-blue-600">
                            {item.title?.charAt(0)}
                          </span>

                        )}

                      </div>

                    </div>

                    {/* JOB INFO */}

                    <div className="flex flex-wrap gap-4 mt-5 text-sm text-gray-600">

                      {item.experience && (
                        <span>
                          💼 {item.experience}
                        </span>
                      )}

                      {item.salary && (
                        <span>
                          💰{" "}
                          {item.salary.min || 0}
                          -
                          {item.salary.max || 0}
                        </span>
                      )}

                      {item.location && (
                        <span>
                          📍 {item.location}
                        </span>
                      )}

                    </div>

                    {/* DESCRIPTION */}

                    {item.description && (

                      <p className="text-sm text-gray-600 mt-4 line-clamp-2">
                        {item.description}
                      </p>

                    )}

                    {/* SKILLS */}

                    {item.skill && (

                      <div className="flex flex-wrap gap-2 mt-4">

                        {Array.isArray(item.skill) ? (

                          item.skill.map((skill, index) => (

                            <span
                              key={index}
                              className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                            >
                              {skill}
                            </span>

                          ))

                        ) : (

                          <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            {item.skill}
                          </span>

                        )}

                      </div>

                    )}

                    {/* FOOTER */}

                    <div className="flex justify-between items-center mt-5 pt-4 border-t">

                      <span className="text-xs text-gray-500">
                        Recently posted
                      </span>

                      <button className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600">
                        ♡ Save
                      </button>

                    </div>

                  </div>

                ))}

            </div>

          </main>

          {/* ================================= */}
          {/* RIGHT SIDEBAR */}
          {/* ================================= */}

          <aside className="lg:col-span-3">

            <div className="bg-white border border-gray-200 rounded-xl p-5 sticky top-24">

              <h2 className="font-bold text-gray-900">
                Featured Companies
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Top companies hiring now
              </p>

              <div className="grid grid-cols-2 gap-3 mt-5">

                <div className="h-16 border rounded-lg flex items-center justify-center font-bold text-orange-500">
                  Company 1
                </div>

                <div className="h-16 border rounded-lg flex items-center justify-center font-bold text-gray-500">
                  Company 2
                </div>

                <div className="h-16 border rounded-lg flex items-center justify-center font-bold text-blue-500">
                  Company 3
                </div>

                <div className="h-16 border rounded-lg flex items-center justify-center font-bold text-green-500">
                  Company 4
                </div>

              </div>

            </div>

            {/* ADVERTISEMENT */}

            <div className="bg-white border border-gray-200 rounded-xl p-5 mt-5">

              <p className="text-xs text-gray-400">
                Advertisement
              </p>

              <h2 className="font-bold text-gray-900 mt-3">
                Find your dream job
              </h2>

              <p className="text-sm text-gray-500 mt-2">
                Explore thousands of opportunities and find the right job for you.
              </p>

              <button className="mt-4 text-sm font-semibold text-blue-600">
                Know More →
              </button>

            </div>

          </aside>

        </div>

      </div>

    </div>
  );
};

export default Alljob;