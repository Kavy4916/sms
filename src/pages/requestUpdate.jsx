import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar.jsx";
import Message from "../components/message.jsx";
import api from "../utils/connection.js";
import { useNavigate } from "react-router-dom";

const RequestUpdate = () => {
  const [value, setValue] = useState("");
  const [field, setField] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0,0);
    const fetch = async () => {
      api
        .get("/student/check")
        .then(() => {
          navigate("/");
        })
        .catch((error) => {});
    };
    fetch();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here
    api
      .post("/student/requestUpdate", { password, field, value })
      .then((response) => {
      if(response.status === 201) {
        setMessage(response.data.message);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
      else{
        setError(response.data.message);
        setTimeout(() => {
          setError(null);
        }, 3000);
      }
      })
      .catch((error) => {
        setMessage(error.response.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      });
  };

  return (
    <>
      <Navbar />
      {message && <Message text={message} />}
      {!message && (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-white p-6 sm:p-8 rounded-2xl shadow-lg transform transition-all hover:shadow-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-4 sm:mb-6">
              Update Request
            </h2>
            <form onSubmit={handleSubmit}>
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
              <div className="mb-4 sm:mb-6">
                <label
                  htmlFor="field"
                  className="block text-sm sm:text-base font-medium text-gray-700 mb-1"
                >
                  Select Field
                </label>
                <select
                  id="field"
                  value={field}
                  onChange={(e) => setField(e.target.value)}
                  className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition duration-200"
                  placeholder="********"
                  minLength={8}
                  maxLength={20}
                  required
                >
                  <option value="" disabled>
                    -- Select the Field--
                  </option>
                  <option value="name">Name</option>
                  <option value="phoneNo">Phone no.</option>
                  <option value="email">Email</option>
                  <option value="fatherName">Father's Name</option>
                  <option value="motherName">Mother's Name</option>
                  <option value="address">Address</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="mb-4 sm:mb-6">
                <label
                  htmlFor="value"
                  className="block text-sm sm:text-base font-medium text-gray-700 mb-1"
                >
                  New Value
                </label>
                <input
                  type="textArea"
                  id="value"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition duration-200"
                  placeholder="12345678"
                  autoComplete="off"
                  minLength={8}
                  maxLength={200}
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
                Change
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default RequestUpdate;
