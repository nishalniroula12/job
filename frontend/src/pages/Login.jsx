import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import api from "../api/axios.js";
import { logindata  } from "../Redux/redux.js";

const Login = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

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
      console.log(response.data.token)

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
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">

      <div className="w-full max-w-md">

        <div className="bg-white rounded-2xl shadow-lg p-8">

          {/* LOGO */}

          <div className="text-center mb-8">

            <div className="text-4xl mb-2">
              💼
            </div>

            <h1 className="text-3xl font-bold text-slate-800">
              Job
              <span className="text-blue-600">
                Sphere
              </span>
            </h1>

            <p className="text-slate-500 mt-2">
              Login to your account
            </p>

          </div>

          {/* MESSAGE */}

          {message && (
            <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
              {message}
            </div>
          )}

          {/* FORM */}

          <form onSubmit={handleLogin}>

            {/* EMAIL */}

            <div className="mb-5">

              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={login.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            {/* PASSWORD */}

            <div className="mb-6">

              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={login.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            {/* LOGIN BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          {/* SIGNUP */}

          <p className="text-center text-sm text-slate-500 mt-6">

            Don't have an account?

            <button
              type="button"
              onClick={() => nav("/signup")}
              className="ml-1 text-blue-600 font-semibold hover:underline"
            >
              Sign Up
            </button>

          </p>

        </div>

      </div>

    </div>
  );
};

export default Login;