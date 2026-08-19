import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import api from "../api/axios.js";
import { logoutdata } from "../Redux/redux.js";

const Navbar = () => {

  const nav = useNavigate();
  const dispatch = useDispatch();

  // ============================================
  // REDUX
  // ============================================

  const isAuthenticate = useSelector(
    (state) => state.data.isAuthenticate
  );

  const user = useSelector(
    (state) => state.data.user
  );

  console.log("NAVBAR AUTH:", isAuthenticate);
  console.log("NAVBAR USER:", user);

  // ============================================
  // STATES
  // ============================================

  const [isOpen, setIsOpen] = useState(false);

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [profile, setProfile] = useState(null);

  const [profileLoading, setProfileLoading] = useState(false);

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [search, setSearch] = useState("");

  const [experience, setExperience] = useState("");

  const [location, setLocation] = useState("");

  // ============================================
  // LOGOUT
  // ============================================

  const handleLogout = async () => {

    try {

      // If you have backend logout route
      await api.post("/logout");

    } catch (error) {

      console.log(
        "Logout API error:",
        error.response?.data || error.message
      );

    }

    dispatch(logoutdata());

    setIsOpen(false);
    setIsProfileOpen(false);

    nav("/");

  };

  // ============================================
  // LOGIN
  // ============================================

  const goLogin = () => {

    setIsOpen(false);

    nav("/login");

  };

  // ============================================
  // SIGNUP
  // ============================================

  const goSignup = () => {

    setIsOpen(false);

    nav("/signup");

  };

  // ============================================
  // PROFILE
  // ============================================

  const openProfile = async () => {

    if (!isAuthenticate) {

      nav("/login");

      return;

    }

    setIsProfileOpen(true);

    setProfileLoading(true);

    try {

      const response = await api.get("/profile");

      console.log(
        "PROFILE RESPONSE:",
        response.data
      );

      const userData =
        response.data?.user ||
        response.data?.profile ||
        response.data?.data ||
        response.data;

      setProfile(userData);

    } catch (error) {

      console.error(
        "PROFILE ERROR:",
        error
      );

    } finally {

      setProfileLoading(false);

    }

  };

  // ============================================
  // SEARCH
  // ============================================

  const searchJobs = () => {

    const params = new URLSearchParams();

    if (search.trim()) {

      params.append(
        "keyword",
        search.trim()
      );

    }

    if (experience) {

      params.append(
        "experience",
        experience
      );

    }

    if (location.trim()) {

      params.append(
        "location",
        location.trim()
      );

    }

    setIsSearchOpen(false);

    nav(`/alljob?${params.toString()}`);

  };

  // ============================================
  // NOTIFICATION
  // ============================================

  const goNotification = () => {

    if (!isAuthenticate) {

      nav("/login");

      return;

    }

    setIsOpen(false);

    nav("/notification");

  };

  return (
    <>
      {/* ================================================= */}
      {/* NAVBAR */}
      {/* ================================================= */}

      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all duration-300">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="h-16 flex items-center justify-between gap-4 md:gap-8">

            {/* ================================================= */}
            {/* LOGO */}
            {/* ================================================= */}

            <button
              onClick={() => nav("/")}
              className="flex items-center gap-2.5 group shrink-0 focus:outline-none"
            >

              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
                <span className="text-xl">
                  💼
                </span>
              </div>

              <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                Job
                <span className="text-blue-600 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Sphere
                </span>
              </span>

            </button>

            {/* ================================================= */}
            {/* DESKTOP LINKS */}
            {/* ================================================= */}

            <div className="hidden lg:flex items-center gap-1">

              <button
                onClick={() => nav("/job")}
                className="px-3.5 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-blue-600 hover:bg-slate-100/70 transition-all duration-200"
              >
                Jobs
              </button>

              <button
                onClick={() => nav("/company")}
                className="px-3.5 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-blue-600 hover:bg-slate-100/70 transition-all duration-200"
              >
                Companies
              </button>

              <button
                onClick={() => nav("/about")}
                className="px-3.5 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-blue-600 hover:bg-slate-100/70 transition-all duration-200"
              >
                About
              </button>

            </div>

            {/* ================================================= */}
            {/* SEARCH BUTTON (TRIGGER) */}
            {/* ================================================= */}

            {isAuthenticate && (

              <div className="hidden md:flex flex-1 max-w-md">

                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="w-full flex items-center justify-between gap-3 px-4 py-2 bg-slate-100/80 hover:bg-slate-100 border border-slate-200/80 rounded-xl text-slate-400 hover:text-slate-600 hover:border-blue-400/50 transition-all duration-200 group shadow-inner"
                >

                  <div className="flex items-center gap-2.5">
                    <span className="text-slate-400 group-hover:scale-110 transition-transform">🔍</span>
                    <span className="text-sm font-medium">
                      Search jobs...
                    </span>
                  </div>

                  <kbd className="hidden lg:inline-flex items-center px-2 py-0.5 text-[10px] font-semibold text-slate-400 bg-white rounded border border-slate-200 shadow-2xs">
                    Ctrl K
                  </kbd>

                </button>

              </div>

            )}

            {/* ================================================= */}
            {/* RIGHT SIDE */}
            {/* ================================================= */}

            <div className="hidden md:flex items-center gap-3">

              {isAuthenticate ? (

                <>

                  {/* USER NAME */}

                  <div className="flex flex-col text-right mr-1">
                    <span className="text-xs text-slate-400 font-medium">Welcome,</span>
                    <span className="text-sm font-bold text-slate-800 leading-tight">
                      {user?.fullname || "User"}
                    </span>
                  </div>

                  {/* PROFILE */}

                  <button
                    onClick={openProfile}
                    className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 flex items-center justify-center transition-all duration-200 hover:shadow-sm focus:ring-2 focus:ring-blue-500/20"
                    title="Profile"
                  >

                    <span className="text-lg">👤</span>

                  </button>

                  {/* NOTIFICATION */}

                  <button
                    onClick={goNotification}
                    className="relative w-10 h-10 rounded-full bg-slate-100 border border-slate-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 text-slate-600 flex items-center justify-center transition-all duration-200 shadow-2xs focus:ring-2 focus:ring-blue-500/20"
                    title="Notifications"
                  >

                    <span className="text-lg">🔔</span>
                    <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-white"></span>

                  </button>

                  {/* LOGOUT */}

                  <button
                    onClick={handleLogout}
                    className="ml-2 px-4 py-2 text-sm font-semibold border border-red-200/80 text-red-600 rounded-xl hover:bg-red-50 hover:border-red-300 transition-all duration-200 active:scale-95"
                  >

                    Logout

                  </button>

                </>

              ) : (

                <>

                  {/* LOGIN */}

                  <button
                    onClick={goLogin}
                    className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 rounded-xl hover:bg-slate-100/60 transition-all duration-200"
                  >

                    Login

                  </button>

                  {/* SIGNUP */}

                  <button
                    onClick={goSignup}
                    className="px-5 py-2 text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 active:scale-95"
                  >

                    Sign Up

                  </button>

                </>

              )}

            </div>

            {/* ================================================= */}
            {/* MOBILE BUTTON */}
            {/* ================================================= */}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >

              <span className="text-2xl leading-none">
                {isOpen ? "✕" : "☰"}
              </span>

            </button>

          </div>

        </div>

        {/* ================================================= */}
        {/* MOBILE MENU */}
        {/* ================================================= */}

        {isOpen && (

          <div className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-xl p-4 space-y-2 shadow-2xl animate-in slide-in-from-top-2 duration-200">

            {isAuthenticate && (
              <div className="pb-3 border-b border-slate-100 mb-2">
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 bg-slate-100 border border-slate-200/80 rounded-xl text-slate-400 text-sm font-medium"
                >
                  🔍 Search jobs...
                </button>
              </div>
            )}

            <button
              onClick={() => {
                nav("/job");
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-3 text-slate-700 hover:text-blue-600 hover:bg-blue-50/50 font-semibold rounded-xl transition-all"
            >
              💼 Jobs
            </button>

            <button
              onClick={() => {
                nav("/company");
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-3 text-slate-700 hover:text-blue-600 hover:bg-blue-50/50 font-semibold rounded-xl transition-all"
            >
              🏢 Companies
            </button>

            <button
              onClick={() => {
                nav("/about");
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-3 text-slate-700 hover:text-blue-600 hover:bg-blue-50/50 font-semibold rounded-xl transition-all"
            >
              ℹ️ About
            </button>

            {isAuthenticate ? (

              <>

                <div className="pt-2 border-t border-slate-100 my-2"></div>

                <button
                  onClick={() => {
                    openProfile();
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-slate-700 hover:text-blue-600 hover:bg-blue-50/50 font-semibold rounded-xl transition-all"
                >
                  👤 Profile
                </button>

                <button
                  onClick={() => {
                    goNotification();
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-slate-700 hover:text-blue-600 hover:bg-blue-50/50 font-semibold rounded-xl transition-all"
                >
                  🔔 Notifications
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 font-semibold rounded-xl transition-all"
                >
                  🚪 Logout
                </button>

              </>

            ) : (

              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2 mt-2">

                <button
                  onClick={goLogin}
                  className="w-full py-3 text-center font-semibold text-blue-600 border border-blue-600/30 bg-blue-50/30 rounded-xl hover:bg-blue-50 transition-all"
                >
                  Login
                </button>

                <button
                  onClick={goSignup}
                  className="w-full py-3 text-center font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-md shadow-blue-500/20 hover:from-blue-700 hover:to-indigo-700 transition-all"
                >
                  Sign Up
                </button>

              </div>

            )}

          </div>

        )}

      </nav>

      {/* ================================================= */}
      {/* SEARCH MODAL */}
      {/* ================================================= */}

      {isSearchOpen && (

        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setIsSearchOpen(false)}
        >

          <div
            className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 bg-slate-50/50">

              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <span>🔍</span> Search Jobs
              </h2>

              <button
                onClick={() => setIsSearchOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 text-xl transition-all"
              >
                ×
              </button>

            </div>

            <div className="p-6 space-y-4">

              {/* JOB */}

              <div>

                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Job Title
                </label>

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="e.g. MERN Developer, Frontend..."
                  className="w-full border border-slate-200 p-3 rounded-xl text-sm bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />

              </div>

              {/* EXPERIENCE */}

              <div>

                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Experience Level
                </label>

                <select
                  value={experience}
                  onChange={(e) =>
                    setExperience(e.target.value)
                  }
                  className="w-full border border-slate-200 p-3 rounded-xl text-sm bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-700"
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

                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Location
                </label>

                <input
                  value={location}
                  onChange={(e) =>
                    setLocation(e.target.value)
                  }
                  placeholder="e.g. Kathmandu, Remote..."
                  className="w-full border border-slate-200 p-3 rounded-xl text-sm bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />

              </div>

            </div>

            <div className="flex justify-end items-center gap-3 px-6 py-4 bg-slate-50 border-t border-slate-100">

              <button
                onClick={() => {
                  setSearch("");
                  setExperience("");
                  setLocation("");
                }}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-red-600 hover:bg-red-50 rounded-lg transition-all"
              >
                Clear Filters
              </button>

              <button
                onClick={() => setIsSearchOpen(false)}
                className="px-4 py-2.5 text-sm font-semibold text-slate-600 border border-slate-200 hover:bg-slate-100 rounded-xl transition-all"
              >
                Cancel
              </button>

              <button
                onClick={searchJobs}
                className="px-5 py-2.5 text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-md shadow-blue-500/20 hover:from-blue-700 hover:to-indigo-700 transition-all active:scale-95"
              >
                Search Jobs
              </button>

            </div>

          </div>

        </div>

      )}

      {/* ================================================= */}
      {/* PROFILE SIDE DRAWER */}
      {/* ================================================= */}

      {isProfileOpen && (

        <div
          className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
          onClick={() => setIsProfileOpen(false)}
        >

          <div
            className="bg-white w-full sm:w-[420px] h-full shadow-2xl overflow-y-auto flex flex-col transform transition-transform duration-300 animate-in slide-in-from-right"
            onClick={(e) => e.stopPropagation()}
          >

            {/* HEADER */}

            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">

              <h2 className="text-xl font-bold text-slate-800">
                My Profile
              </h2>

              <button
                onClick={() => setIsProfileOpen(false)}
                className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 text-xl transition-all"
              >
                ×
              </button>

            </div>

            {/* BODY */}

            <div className="p-6 flex-1 flex flex-col justify-between">

              {profileLoading ? (

                <div className="text-center py-20 my-auto">

                  <div className="w-10 h-10 mx-auto border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>

                  <p className="mt-4 text-sm font-medium text-slate-500">
                    Fetching your profile details...
                  </p>

                </div>

              ) : (

                <div className="space-y-6">

                  {/* AVATAR */}

                  <div className="flex items-center gap-4 p-4 bg-slate-50/80 rounded-2xl border border-slate-100">

                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-3xl shadow-md text-white shrink-0">
                      👤
                    </div>

                    <div className="min-w-0 flex-1">

                      <h3 className="text-lg font-extrabold text-slate-900 truncate">
                        {profile?.fullname ||
                          user?.fullname ||
                          "User"}
                      </h3>

                      <p className="text-xs text-slate-500 truncate">
                        {profile?.email ||
                          user?.email}
                      </p>

                      <span className="inline-block mt-2 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100/80 rounded-full">
                        {profile?.role ||
                          user?.role || "Member"}
                      </span>

                    </div>

                  </div>

                  {/* INFORMATION */}

                  <div className="space-y-3 bg-white p-2 rounded-2xl border border-slate-100 divide-y divide-slate-100">

                    <div className="pt-2 first:pt-0">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Education
                      </p>

                      <p className="text-sm font-semibold text-slate-700 mt-0.5">
                        {profile?.education ||
                          user?.education ||
                          "Not added"}
                      </p>
                    </div>

                    <div className="pt-3">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Experience
                      </p>

                      <p className="text-sm font-semibold text-slate-700 mt-0.5">
                        {profile?.experience ||
                          user?.experience ||
                          "Not added"}
                      </p>
                    </div>

                    <div className="pt-3">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Skills
                      </p>

                      <p className="text-sm font-semibold text-slate-700 mt-0.5">
                        {profile?.skill ||
                          user?.skill ||
                          "Not added"}
                      </p>
                    </div>

                    <div className="pt-3 pb-1">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Location
                      </p>

                      <p className="text-sm font-semibold text-slate-700 mt-0.5">
                        {profile?.location ||
                          user?.location ||
                          "Not added"}
                      </p>
                    </div>

                  </div>

                </div>

              )}

              {/* BUTTONS */}

              {!profileLoading && (
                <div className="pt-6 space-y-2 mt-auto">

                  {/* UPDATE */}

                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      nav("/updateprofile");
                    }}
                    className="w-full py-3 text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-md shadow-blue-500/20 hover:from-blue-700 hover:to-indigo-700 transition-all active:scale-95"
                  >
                    Update Profile
                  </button>

                  {/* LOGOUT */}

                  <button
                    onClick={handleLogout}
                    className="w-full py-3 text-sm font-semibold border border-red-200 text-red-600 rounded-xl hover:bg-red-50 hover:border-red-300 transition-all active:scale-95"
                  >
                    Logout
                  </button>

                </div>
              )}

            </div>

          </div>

        </div>

      )}

    </>
  );
};

export default Navbar;