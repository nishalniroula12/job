import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Briefcase, Loader2, ArrowRight, CheckCircle2, Eye, EyeOff, Sparkles, Lock, Mail } from "lucide-react";

import api from "../api/axios.js";
import { logindata } from "../Redux/redux.js";

// ============================================
// INLINED UTILITY COMPONENTS
// ============================================

const Card = ({ className = "", children, ...props }) => (
  <div
    className={`rounded-3xl border bg-card text-card-foreground ${className}`}
    {...props}
  >
    {children}
  </div>
);

const CardContent = ({ className = "", children, ...props }) => (
  <div className={`p-6 sm:p-8 lg:p-12 ${className}`} {...props}>
    {children}
  </div>
);

const Label = ({ className = "", children, htmlFor, ...props }) => (
  <label
    htmlFor={htmlFor}
    className={`text-xs sm:text-sm font-semibold tracking-wide ${className}`}
    {...props}
  >
    {children}
  </label>
);

const Button = ({ className = "", children, disabled, type = "button", ...props }) => (
  <button
    type={type}
    disabled={disabled}
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Alert = ({ className = "", children, ...props }) => (
  <div
    role="alert"
    className={`relative w-full rounded-xl border p-3.5 text-xs sm:text-sm transition-all duration-200 ${className}`}
    {...props}
  >
    {children}
  </div>
);

// ============================================
// MAIN LOGIN COMPONENT
// ============================================

const Login = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!login.email || !login.password) {
      setMessage("Please enter both email and password");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await api.post("/login", login);

      if (!response.data.success) {
        setMessage(response.data.message || "Invalid credentials");
        return;
      }

      const user = response.data.user;

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      if (!user) {
        setMessage("User profile unavailable");
        return;
      }

      dispatch(logindata(user));

      // Role-based redirect
      switch (user.role) {
        case "admin":
          nav("/admin");
          break;
        case "employer":
          nav("/dashboard");
          break;
        case "employe":
          nav("/profile");
          break;
        default:
          nav("/");
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || "An unexpected error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 p-3 sm:p-6 lg:p-8 relative overflow-hidden font-sans">
      
      {/* BACKGROUND DECORATIVE GLOWS */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 sm:w-96 sm:h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 sm:w-96 sm:h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

      <Card className="w-full max-w-md lg:max-w-4xl grid grid-cols-1 lg:grid-cols-12 overflow-hidden border-slate-800/80 bg-slate-900/60 backdrop-blur-xl shadow-2xl shadow-slate-950 relative z-10">
        
        {/* ============================================
            FORM SECTION
           ============================================ */}
        <CardContent className="lg:col-span-7 flex flex-col justify-between space-y-8">
          
          <div className="space-y-6 sm:space-y-8">
            
            {/* BRANDING */}
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-gradient-to-tr from-blue-600 to-indigo-500 text-white rounded-2xl shadow-lg shadow-blue-500/25 ring-1 ring-white/20">
                <Briefcase className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white">
                Job<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Sphere</span>
              </span>
            </div>

            {/* HEADER */}
            <div className="space-y-1.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Welcome back
              </h1>
              <p className="text-xs sm:text-sm text-slate-400">
                Enter your details to access your account dashboard
              </p>
            </div>

            {/* ERROR ALERT */}
            {message && (
              <Alert className="bg-rose-500/10 border-rose-500/20 text-rose-400 backdrop-blur-md">
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                  <span>{message}</span>
                </div>
              </Alert>
            )}

            {/* FORM */}
            <form onSubmit={handleLogin} className="space-y-5">
              
              {/* EMAIL FIELD */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={login.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    className="flex h-12 w-full rounded-xl border border-slate-800 bg-slate-950/50 pl-10 pr-4 text-sm text-slate-100 placeholder:text-slate-500 focus:border-blue-500 focus:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                  />
                </div>
              </div>

              {/* PASSWORD FIELD */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-slate-300">
                    Password
                  </Label>
                  <button
                    type="button"
                    onClick={() => nav("/forgot-password")}
                    className="text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={login.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="flex h-12 w-full rounded-xl border border-slate-800 bg-slate-950/50 pl-10 pr-10 text-sm text-slate-100 placeholder:text-slate-500 focus:border-blue-500 focus:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors p-1"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 active:scale-[0.98]"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    Sign In <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* FOOTER */}
          <div className="pt-6 border-t border-slate-800/80 text-center text-xs sm:text-sm text-slate-400">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => nav("/signup")}
              className="text-blue-400 font-semibold hover:text-blue-300 transition-colors underline-offset-4 hover:underline"
            >
              Create an account
            </button>
          </div>

        </CardContent>

        {/* ============================================
            SIDE BANNER SECTION
           ============================================ */}
        <div className="hidden lg:flex lg:col-span-5 relative bg-gradient-to-b from-slate-900 to-slate-950 flex-col justify-between p-10 border-l border-slate-800/80 overflow-hidden">
          
          {/* Overlay Effects */}
          <div className="absolute inset-0 bg-blue-600/10 mix-blend-overlay z-0" />
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80"
            alt="Collaboration background"
            className="absolute inset-0 w-full h-full object-cover opacity-10 filter grayscale z-0"
          />

          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" /> Next-Gen Hiring Platform
            </span>
          </div>

          <div className="relative z-10 space-y-6">
            <blockquote className="space-y-3">
              <p className="text-lg font-medium leading-relaxed text-slate-200">
                "JobSphere streamlined our recruitment process. Finding verified top-tier talent is faster than ever."
              </p>
              <footer className="text-xs font-medium text-slate-400">
                — Hiring Team at TechCorp
              </footer>
            </blockquote>

            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-1 gap-3 text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Verified Employer Profiles</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>One-Click Applications</span>
              </div>
            </div>
          </div>

        </div>

      </Card>
    </div>
  );
};

export default Login;