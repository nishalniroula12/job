import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Briefcase, Loader2, ArrowRight, CheckCircle2, Eye, EyeOff } from "lucide-react";

import api from "../api/axios.js";
import { logindata } from "../Redux/redux.js";

// ============================================
// INLINED SHADCN / TAILWIND UI COMPONENTS
// ============================================

const Card = ({ className = "", children, ...props }) => (
  <div
    className={`rounded-2xl border bg-card text-card-foreground shadow-sm ${className}`}
    {...props}
  >
    {children}
  </div>
);

const CardContent = ({ className = "", children, ...props }) => (
  <div className={`p-6 ${className}`} {...props}>
    {children}
  </div>
);

const Label = ({ className = "", children, htmlFor, ...props }) => (
  <label
    htmlFor={htmlFor}
    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
    {...props}
  >
    {children}
  </label>
);

const Input = ({ className = "", type = "text", ...props }) => (
  <input
    type={type}
    className={`flex h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all ${className}`}
    {...props}
  />
);

const Button = ({ className = "", children, disabled, type = "button", ...props }) => (
  <button
    type={type}
    disabled={disabled}
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Alert = ({ className = "", children, ...props }) => (
  <div
    role="alert"
    className={`relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground ${className}`}
    {...props}
  >
    {children}
  </div>
);

const AlertDescription = ({ className = "", children, ...props }) => (
  <div className={`text-sm [&_p]:leading-relaxed ${className}`} {...props}>
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

  // ============================================
  // HANDLE INPUT
  // ============================================

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  // ============================================
  // LOGIN
  // ============================================

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!login.email || !login.password) {
      setMessage("Email and password are required");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await api.post("/login", login);

      console.log("Login response:", response.data);

      if (!response.data.success) {
        setMessage(response.data.message);
        return;
      }

      // ============================================
      // GET USER
      // ============================================

      const user = response.data.user;
      console.log(response.data.token);

      console.log("Logged in user:", user);

      if (!user) {
        setMessage("User data not received from server");
        return;
      }

      // ============================================
      // STORE USER IN REDUX
      // ============================================

      // Redux
      dispatch(logindata(user));

      // ============================================
      // REDIRECT BASED ON ROLE
      // ============================================

      if (user.role === "admin") {
        nav("/admin");
      } else if (user.role === "employer") {
        nav("/dashboard");
      } else if (user.role === "employe") {
        nav("/profile");
      } else {
        nav("/");
      }
    } catch (error) {
      console.error("LOGIN ERROR:", error);

      setMessage(
        error.response?.data?.message ||
          "Something went wrong during login"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-3 sm:p-6 lg:p-8">
      <Card className="w-full max-w-sm sm:max-w-md md:max-w-xl lg:max-w-5xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden shadow-2xl border-slate-200 dark:border-slate-800">
        
        {/* ============================================
            LEFT SIDE: FORM SECTION
           ============================================ */}
        <CardContent className="p-5 sm:p-8 lg:p-12 flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            
            {/* LOGO & BRANDING */}
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-blue-600 text-white rounded-xl shadow-md shadow-blue-500/20">
                <Briefcase className="w-6 h-6" />
              </div>
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
                Job<span className="text-blue-600">Sphere</span>
              </span>
            </div>

            {/* HEADER */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                Welcome back
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Enter your credentials to access your account
              </p>
            </div>

            {/* ERROR MESSAGE */}
            {message && (
              <Alert className="bg-red-50 border-red-200 text-red-600 dark:bg-red-950/50 dark:border-red-900 dark:text-red-400">
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}

            {/* FORM */}
            <form onSubmit={handleLogin} className="space-y-4">
              
              {/* EMAIL */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700 dark:text-slate-300">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={login.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className="border-slate-300 dark:border-slate-700"
                />
              </div>

              {/* PASSWORD WITH EYE TOGGLE & FORGOT PASSWORD */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-slate-700 dark:text-slate-300">
                    Password
                  </Label>
                  <button
                    type="button"
                    onClick={() => nav("/forgot-password")}
                    className="text-xs text-blue-600 hover:underline font-medium dark:text-blue-400"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={login.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="pr-10 border-slate-300 dark:border-slate-700"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1"
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

              {/* LOGIN BUTTON */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 active:scale-[0.99] transition-all"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  <>
                    Login <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* SIGNUP LINK */}
          <div className="pt-4 text-center text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => nav("/signup")}
              className="text-blue-600 font-semibold hover:underline underline-offset-4 dark:text-blue-400"
            >
              Sign Up
            </button>
          </div>
        </CardContent>

        {/* ============================================
            RIGHT SIDE: VISUAL BANNER SECTION
           ============================================ */}
        <div className="hidden lg:flex relative bg-slate-900 text-white flex-col justify-between p-12 overflow-hidden">
          {/* Background Gradient & Image Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-indigo-900/60 z-0" />
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80"
            alt="Office Collaboration"
            className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay z-0"
          />

          {/* Content Over Overlay */}
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-400/30 backdrop-blur-md">
              Connecting Talent & Opportunity
            </span>
          </div>

          <div className="relative z-10 space-y-6">
            <blockquote className="space-y-2">
              <p className="text-xl font-medium leading-relaxed tracking-wide text-slate-100">
                "JobSphere streamlined our entire recruitment process. Finding top-tier talent has never been faster or easier."
              </p>
              <footer className="text-sm text-slate-400 font-normal">
                — Hiring Team at TechCorp
              </footer>
            </blockquote>

            {/* Feature Highlights */}
            <div className="pt-4 border-t border-slate-800 grid grid-cols-2 gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <span>Verified Employers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <span>Instant Applications</span>
              </div>
            </div>
          </div>
        </div>

      </Card>
    </div>
  );
};

export default Login;