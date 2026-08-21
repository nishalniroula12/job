import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

// Standard SVG Icon components for clean rendering
const SearchIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" />
  </svg>
);

const MapPinIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21s8-4.5 8-11a8 8 0 1 0-16 0c0 6.5 8 11 8 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

const ArrowRightIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

const BriefcaseIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7h-3V4a1 1 0 00-1-1H8a1 1 0 00-1 1v3H4a1 1 0 00-1 1v11a1 1 0 001 1h16a1 1 0 001-1V8a1 1 0 00-1-1zM9 4h6v3H9V4z" />
  </svg>
);

const Home = () => {
  const navigate = useNavigate();

  const [job, setJob] = useState([]);
  const [company, setCompany] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchjob = async () => {
    try {
      setLoading(true);
      const jobResponse = await api.get("/allget");
      const companyResponse = await api.get("/get");

      setJob(jobResponse.data?.jobs || []);
      setCompany(companyResponse.data?.company || []);
    } catch (error) {
      console.error("Home page fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchjob();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(
      `/job?keyword=${encodeURIComponent(keyword)}&location=${encodeURIComponent(location)}`
    );
  };

  const searchCategory = (category) => {
    navigate(`/job?keyword=${encodeURIComponent(category)}`);
  };

  const categories = [
    { name: "Software Development", icon: "💻", keyword: "Software", count: "1.2k+ Jobs" },
    { name: "Web Development", icon: "🌐", keyword: "Web Developer", count: "850+ Jobs" },
    { name: "UI/UX Design", icon: "🎨", keyword: "Designer", count: "420+ Jobs" },
    { name: "Marketing", icon: "📈", keyword: "Marketing", count: "610+ Jobs" },
    { name: "Finance", icon: "💰", keyword: "Finance", count: "300+ Jobs" },
    { name: "Sales", icon: "🤝", keyword: "Sales", count: "540+ Jobs" },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans antialiased text-slate-900 selection:bg-blue-500 selection:text-white">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-950 pt-12 pb-24 lg:pt-20 lg:pb-32">
        {/* Background Gradients & Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 opacity-30 pointer-events-none blur-3xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-500" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-4 py-1.5 text-xs sm:text-sm font-medium text-slate-300 backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
              <span>Over {job.length || "1,000+"} active positions open now</span>
            </div>

            {/* Main Headline */}
            <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Find the job that <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-400 bg-clip-text text-transparent">
                fits your future
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-400 max-w-2xl mx-auto">
              Discover opportunities from top-tier companies and take the next step in your professional journey.
            </p>

            {/* Search Box - Form Styled as a Floating Card */}
            <form
              onSubmit={handleSearch}
              className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/90 p-2 sm:p-3 shadow-2xl shadow-blue-950/20 backdrop-blur-xl transition-all"
            >
              <div className="grid gap-2 sm:gap-3 md:grid-cols-[1fr_1fr_auto]">
                {/* Keyword Field */}
                <div className="flex items-center rounded-xl bg-slate-950/60 border border-slate-800/80 px-3.5 py-2.5 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                  <SearchIcon className="h-5 w-5 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Job title, skill, or keyword"
                    className="w-full bg-transparent px-3 py-1 text-sm text-slate-100 placeholder-slate-500 outline-none"
                  />
                </div>

                {/* Location Field */}
                <div className="flex items-center rounded-xl bg-slate-950/60 border border-slate-800/80 px-3.5 py-2.5 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                  <MapPinIcon className="h-5 w-5 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="City, country, or remote"
                    className="w-full bg-transparent px-3 py-1 text-sm text-slate-100 placeholder-slate-500 outline-none"
                  />
                </div>

                {/* Primary Button */}
                <button
                  type="submit"
                  className="flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-500 active:scale-[0.98]"
                >
                  Search Jobs
                </button>
              </div>
            </form>

            {/* Popular Tags */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm text-slate-400">
              <span className="font-medium text-slate-500">Popular:</span>
              {["React Developer", "MERN Stack", "Python", "UI Designer"].map((item) => (
                <button
                  key={item}
                  onClick={() => searchCategory(item)}
                  className="rounded-full border border-slate-800 bg-slate-900/50 px-3 py-1 text-slate-300 transition hover:border-slate-700 hover:bg-slate-800 hover:text-white"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* METRICS / STATS SECTION */}
      <section className="border-y border-slate-200/80 bg-white shadow-xs">
        <div className="mx-auto max-w-7xl px-6 py-8 sm:py-12">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:gap-8">
            {[
              { label: "Jobs Available", value: `${job.length || "1,200"}+` },
              { label: "Verified Companies", value: `${company.length || "450"}+` },
              { label: "Active Job Seekers", value: "10K+" },
              { label: "Successful Placements", value: "5K+" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs sm:text-sm font-medium text-slate-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Categories</span>
            <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Explore by Department
            </h2>
          </div>
          <p className="text-sm text-slate-500 max-w-md">
            Find employment tailored to your precise technical skill set and career objectives.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => searchCategory(category.keyword)}
              className="group relative flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 text-left shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md active:translate-y-0"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xl transition-colors group-hover:bg-blue-50">
                {category.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-slate-900 truncate">
                  {category.name}
                </h3>
                <p className="mt-0.5 text-xs text-slate-500">{category.count}</p>
              </div>
              <ArrowRightIcon className="h-4 w-4 text-slate-400 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5" />
            </button>
          ))}
        </div>
      </section>

      {/* FEATURED JOBS SECTION */}
      <section className="bg-slate-100/60 border-y border-slate-200/60 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Opportunities</span>
              <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Featured Openings
              </h2>
            </div>
            <button
              onClick={() => navigate("/job")}
              className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
            >
              <span>View all jobs</span>
              <ArrowRightIcon className="h-4 w-4" />
            </button>
          </div>

          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="h-64 animate-pulse rounded-2xl border border-slate-200/60 bg-white/50 p-6"
                />
              ))}
            </div>
          ) : job.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center shadow-xs">
              <BriefcaseIcon className="mx-auto h-10 w-10 text-slate-400" />
              <h3 className="mt-4 text-base font-semibold text-slate-900">
                No active listings found
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Check back soon or explore our available categories.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {job.slice(0, 6).map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <BriefcaseIcon className="h-5 w-5" />
                      </div>
                      <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 border border-emerald-200/60">
                        {item.status || "Active"}
                      </span>
                    </div>

                    <h3 className="mt-4 line-clamp-1 text-base font-bold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="text-xs font-medium text-slate-500 mt-1">
                      {item.company?.name || item.company?.companyname || item.company?.title || "Company"}
                    </p>

                    <div className="mt-6 space-y-2.5 text-xs text-slate-600">
                      <div className="flex items-center gap-2">
                        <MapPinIcon className="h-4 w-4 text-slate-400" />
                        <span>{item.location || "Not specified"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-400">Type:</span>
                        <span className="capitalize">{item.jobtype || "Full-time"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-400">Pay:</span>
                        <span>
                          {item.salary?.min && item.salary?.max
                            ? `$${item.salary.min} - $${item.salary.max}`
                            : "Negotiable"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/job/${item._id}`)}
                    className="mt-6 w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-blue-600 hover:text-white hover:border-blue-600"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* EMPLOYERS SECTION */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Top Recruiters</span>
            <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Companies hiring on our platform
            </h2>
          </div>

          {company.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {company.slice(0, 8).map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col items-center rounded-2xl border border-slate-200/80 bg-white p-6 text-center shadow-xs transition hover:border-slate-300 hover:shadow-md"
                >
                  <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-slate-100 border border-slate-200/60">
                    {item.logo || item.image || item.companyimage ? (
                      <img
                        src={item.logo || item.image || item.companyimage}
                        alt={item.name || "Company"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-xl">🏢</span>
                    )}
                  </div>
                  <h3 className="mt-3 text-sm font-bold text-slate-900 truncate w-full">
                    {item.name || item.companyname || item.title || "Company"}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {item.location || "Remote / Global"}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 py-10 text-center text-xs text-slate-500">
              No companies currently listed.
            </div>
          )}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-slate-900 px-6 py-12 sm:px-12 lg:flex lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Looking for exceptional talent?
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Post positions directly to thousands of qualified developers, designers, and industry specialists today.
            </p>
          </div>
          <div className="mt-8 lg:mt-0">
            <button
              onClick={() => navigate("/post-job")}
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-500 active:scale-[0.98]"
            >
              Post a Position
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white text-slate-600">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <span className="text-lg font-black text-slate-900">Job<span className="text-blue-600">Portal</span></span>
              <p className="text-xs text-slate-500 mt-1">Connecting professionals with exceptional organizations.</p>
            </div>
            <p className="text-xs text-slate-400">
              © {new Date().getFullYear()} JobPortal. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;