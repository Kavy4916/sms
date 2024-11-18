import React, { useState, useEffect } from "react";
import useLogin from "../hooks/useTeacherLogin.js";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/connection.js";
import Notice from "../components/notice.jsx";

const TeacherLogin = () => {
  const { login, error } = useLogin();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    window.scrollTo(0,0);
    const fetch = async () => {
      api
        .get("/teacher/check")
        .then(() => {
          navigate("/teacher/");
        })
        .catch((error) => {});
    };
    fetch();
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    login(username, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen flex-col">
      <Notice />
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-white p-4 sm:p-6 rounded-2xl shadow-lg transform transition-all hover:shadow-2xl">
        <img
          className=" h-24 w-24 sm:h-32 sm:w-32  mx-auto"
          src="/logo192.png"
          alt="NITJ"
        />
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-4 sm:mb-6">
          Log In
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4 sm:mb-6">
            <label
              htmlFor="username"
              className="block text-sm sm:text-base font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              autoComplete="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition duration-200"
              placeholder="12345678"
              minLength={3}
              maxLength={20}
              required
            />
          </div>
          <div className="mb-4 sm:mb-6">
            <label
              htmlFor="password"
              className="block text-sm sm:text-base font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition duration-200"
              placeholder="********"
              minLength={8}
              maxLength={20}
              required
            />
          </div>
          {error && (
            <p className="w-full px-3 py-2 sm:py-3 text-center text-red-500 text-sm mt-1">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 sm:py-3 rounded-lg shadow-md transition-all duration-200"
          >
            Log In
          </button>
        </form>
        <p className="text-center p-2"><Link to="/login/">Login as Student</Link></p>
      </div>
    </div>
  );
};

export default TeacherLogin;
