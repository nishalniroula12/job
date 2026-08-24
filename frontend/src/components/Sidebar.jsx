import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  Briefcase,
  Users,
  User,
  LogOut,
  ChevronDown,
  PlusCircle,
  List,
  BriefcaseBusiness,
} from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();

  // State to toggle sub-menus
  const [companyOpen, setCompanyOpen] = useState(false);
  const [jobsOpen, setJobsOpen] = useState(false);

  // Handle Logout Logic
  const handleLogout = () => {
    // Clear auth state/tokens here if needed
    console.log("Logging out...");
    navigate("/login");
  };

  const navItemClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
      isActive
        ? "bg-blue-600 text-white shadow-sm"
        : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
    }`;

  const subNavItemClass = ({ isActive }) =>
    `flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
      isActive
        ? "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400"
        : "text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
    }`;

  return (
    <aside className="w-64 h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between p-4 sticky top-0">
      
      <div className="space-y-6">
        {/* BRAND LOGO */}
        <div className="flex items-center gap-2.5 px-2">
          <div className="p-2 bg-blue-600 text-white rounded-xl shadow-md shadow-blue-500/20">
            <BriefcaseBusiness className="w-5 h-5" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
            Employer<span className="text-blue-600">Hub</span>
          </span>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="space-y-1">
          
          {/* DASHBOARD */}
          <NavLink to="/dashboard" className={navItemClass}>
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </NavLink>

          {/* COMPANY DROPDOWN */}
          <div>
            <button
              type="button"
              onClick={() => setCompanyOpen((prev) => !prev)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-all"
            >
              <div className="flex items-center gap-3">
                <Building2 className="w-4 h-4" />
                <span>Company</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  companyOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* COMPANY SUB-MENU */}
            {companyOpen && (
              <div className="ml-7 mt-1 space-y-1 border-l-2 border-slate-100 dark:border-slate-800 pl-2">
                <NavLink to="/add-company" className={subNavItemClass}>
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Add Company</span>
                </NavLink>
                <NavLink to="/allcompany" className={subNavItemClass}>
                  <List className="w-3.5 h-3.5" />
                  <span>All Companies</span>
                </NavLink>
              </div>
            )}
          </div>

          {/* JOBS DROPDOWN */}
          <div>
            <button
              type="button"
              onClick={() => setJobsOpen((prev) => !prev)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-all"
            >
              <div className="flex items-center gap-3">
                <Briefcase className="w-4 h-4" />
                <span>Jobs</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  jobsOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* JOBS SUB-MENU */}
            {jobsOpen && (
              <div className="ml-7 mt-1 space-y-1 border-l-2 border-slate-100 dark:border-slate-800 pl-2">
                <NavLink to="/post-job" className={subNavItemClass}>
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Post Job</span>
                </NavLink>
                <NavLink to="/all-jobs" className={subNavItemClass}>
                  <List className="w-3.5 h-3.5" />
                  <span>Manage Jobs</span>
                </NavLink>
              </div>
            )}
          </div>

          {/* APPLICANTS */}
          <NavLink to="/applicant" className={navItemClass}>
            <Users className="w-4 h-4" />
            <span>Applicants</span>
          </NavLink>

          {/* PROFILE */}
          <NavLink to="/employer." className={navItemClass}>
            <User className="w-4 h-4" />
            <span>Profile</span>
          </NavLink>

        </nav>
      </div>

      {/* FOOTER / LOGOUT BUTTON */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;