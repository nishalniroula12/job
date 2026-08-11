import React, { useState } from "react";
import api from "../api/axios";

const Login = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const fetchlogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      const res = await api.post("/login", {
        email: login.email,
        password: login.password,
      });

      console.log("Login response:", res.data);

      if (res.data.success) {
        setMessage("Login successful!");

        console.log("Logged in user:", res.data.user);

        // Go to profile after login
        window.location.href = "/profile";
      } else {
        setMessage(res.data.message || "Login failed");
      }

    } catch (error) {
      console.log(
        "Login error:",
        error.response?.data || error.message
      );

      setMessage(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">

        <h1 className="text-2xl font-bold text-gray-900 text-center">
          Login
        </h1>

        <p className="text-gray-500 text-sm text-center mt-2">
          Login to your account
        </p>

        <form
          onSubmit={fetchlogin}
          className="mt-6 space-y-5"
        >

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={login.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={login.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* MESSAGE */}
          {message && (
            <div
              className={`text-sm text-center ${
                message === "Login successful!"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {message}
            </div>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default Login;