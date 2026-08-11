import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  // =========================================
  // NAVBAR STATE
  // =========================================
  const [isOpen, setIsOpen] = useState(false);

  // =========================================
  // SEARCH STATE
  // =========================================
  const [search, setSearch] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");

  // =========================================
  // NAVIGATION
  // =========================================
  const nav = useNavigate();

  // =========================================
  // MODAL STATE
  // =========================================
  const [isModalOpen, setIsModalOpen] = useState(false);

  // =========================================
  // OPEN SEARCH MODAL
  // =========================================
  const openSearchModal = () => {
    setIsModalOpen(true);
  };

  // =========================================
  // CLOSE SEARCH MODAL
  // =========================================
  const closeSearchModal = () => {
    setIsModalOpen(false);
  };

  // =========================================
  // SEARCH JOBS
  // =========================================
  const fetchSearch = () => {
    // Create URL query parameters
    const params = new URLSearchParams();

    // Add keyword
    if (search.trim()) {
      params.append("title", search.trim());
    }

    // Add experience
    if (experience) {
      params.append("experience", experience);
    }

    // Add location
    if (location.trim()) {
      params.append("location", location.trim());
    }

    // Close modal
    setIsModalOpen(false);

    // Close mobile menu
    setIsOpen(false);

    // Redirect to AllJob page
    nav(`/alljob?${params.toString()}`);
  };

  // =========================================
  // CLEAR SEARCH
  // =========================================
  const clearSearch = () => {
    setSearch("");
    setExperience("");
    setLocation("");
  };

  return (
    <>
      {/* ================================================= */}
      {/* NAVBAR */}
      {/* ================================================= */}

      <nav className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex items-center justify-between h-16 gap-4">

            {/* ================================================= */}
            {/* LOGO AND DESKTOP NAVIGATION */}
            {/* ================================================= */}

            <div className="flex items-center gap-8">

              {/* LOGO */}

              <a
                href="/"
                className="flex items-center gap-2 text-xl font-bold text-slate-800 shrink-0"
              >
                <span className="text-2xl">
                  💼
                </span>

                <span>
                  Job
                  <span className="text-blue-600">
                    Sphere
                  </span>
                </span>
              </a>

              {/* DESKTOP LINKS */}

              <div className="hidden lg:flex items-center space-x-6">

                <a
                  href="/job"
                  className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
                >
                  Jobs
                </a>

                <a
                  href="/company"
                  className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
                >
                  Companies
                </a>

                <a
                  href="#"
                  className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
                >
                  Salaries
                </a>

                <a
                  href="#"
                  className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
                >
                  Career Advice
                </a>

              </div>
            </div>

            {/* ================================================= */}
            {/* DESKTOP SEARCH */}
            {/* ================================================= */}

            <div className="hidden sm:flex items-center gap-2 flex-1 max-w-md mx-2">

              <div className="relative flex-1">

                {/* SEARCH ICON */}

                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>

                {/* SEARCH INPUT */}

                <input
                  type="text"
                  value={search}
                  onClick={openSearchModal}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search jobs..."
                  className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all shadow-sm cursor-pointer"
                />

              </div>

              {/* SEARCH BUTTON */}

              <button
                onClick={openSearchModal}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm shrink-0"
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
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>

              </button>

            </div>

            {/* ================================================= */}
            {/* RIGHT SIDE BUTTONS */}
            {/* ================================================= */}

            <div className="hidden md:flex items-center space-x-3 shrink-0">

              <a
                href="/profile"
                className="px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Profile
              </a>

              <a
                href="/login"
                className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
              >
                Sign In
              </a>

            </div>

            {/* ================================================= */}
            {/* MOBILE MENU BUTTON */}
            {/* ================================================= */}

            <div className="flex md:hidden">

              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              >

                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >

                  {isOpen ? (

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />

                  ) : (

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />

                  )}

                </svg>

              </button>

            </div>

          </div>
        </div>

        {/* ================================================= */}
        {/* MOBILE MENU */}
        {/* ================================================= */}

        {isOpen && (

          <div className="md:hidden border-t border-slate-100 px-4 pt-3 pb-4 space-y-3 bg-white">

            {/* MOBILE SEARCH */}

            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">

              <div className="relative flex-1">

                <input
                  type="text"
                  value={search}
                  onClick={openSearchModal}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search jobs..."
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                />

              </div>

              <button
                onClick={openSearchModal}
                className="p-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
              >

                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>

              </button>

            </div>

            {/* MOBILE LINKS */}

            <a
              href="/job"
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600"
            >
              Jobs
            </a>

            <a
              href="/company"
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600"
            >
              Companies
            </a>

            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600"
            >
              Salaries
            </a>

            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600"
            >
              Career Advice
            </a>

            {/* MOBILE ACTIONS */}

            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">

              <a
                href="/post-job"
                className="w-full text-center px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
              >
                Post a Job
              </a>

              <a
                href="/login"
                className="w-full text-center px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
              >
                Sign In
              </a>

            </div>

          </div>

        )}

      </nav>

      {/* ================================================= */}
      {/* SEARCH MODAL */}
      {/* ================================================= */}

      {isModalOpen && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={closeSearchModal}
        >

          {/* MODAL BOX */}

          <div
            className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >

            {/* ================================================= */}
            {/* MODAL HEADER */}
            {/* ================================================= */}

            <div className="flex items-center justify-between p-5 border-b border-slate-200">

              <div>

                <h2 className="text-xl font-bold text-slate-800">
                  Search Jobs
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Enter your job preferences
                </p>

              </div>

              <button
                onClick={closeSearchModal}
                className="w-8 h-8 flex items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-800 text-xl"
              >
                ×
              </button>

            </div>

            {/* ================================================= */}
            {/* MODAL BODY */}
            {/* ================================================= */}

            <div className="p-5 space-y-5">

              {/* JOB TITLE */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Job Title
                </label>

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="e.g. MERN Developer"
                  autoFocus
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

              {/* EXPERIENCE */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Experience
                </label>

                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >

                  <option value="">
                    Any Experience
                  </option>

                  <option value="fresher">
                    Fresher
                  </option>

                  <option value="1">
                    1 Year
                  </option>

                  <option value="2">
                    2 Years
                  </option>

                  <option value="3">
                    3 Years
                  </option>

                </select>

              </div>

              {/* LOCATION */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Location
                </label>

                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Kathmandu"
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

            </div>

            {/* ================================================= */}
            {/* MODAL FOOTER */}
            {/* ================================================= */}

            <div className="flex items-center justify-between p-5 bg-slate-50 border-t border-slate-200">

              {/* CLEAR */}

              <button
                onClick={clearSearch}
                className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg"
              >
                Clear
              </button>

              <div className="flex gap-3">

                {/* CANCEL */}

                <button
                  onClick={closeSearchModal}
                  className="px-5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100"
                >
                  Cancel
                </button>

                {/* SEARCH */}

                <button
                  onClick={fetchSearch}
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                >
                  Search Jobs
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </>
  );
}