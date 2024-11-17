import React, { useState } from 'react';
import TeacherNavbar from "../components/teacherNavbar.jsx";
import Message from "../components/message.jsx";
import api from '../utils/connection.js';
import { useNavigate } from 'react-router-dom';

const TeacherChangePassword = () => {

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here
     api.post("/teacher/changePassword",{
        password,
        newPassword
      }).then((response)=>{
        if(response.error){
          setError(response.error);
          setTimeout(() => {
            setError(null);
          }, 3000);
        }
        else{
          setMessage(response.success);
          setTimeout(() => {
            navigate("/teacher");
          }, 3000);
        }
      }).catch((error)=>{
        if(error.response.status === 401 || error.response.status === 401)
        {
          setMessage(error.response.data.error);
        }
        setTimeout(() => {
          navigate("/teacher/login");
        }, 3000);
      })
  };

  return (
    <>
    <TeacherNavbar />
    {message && <Message text={message} />}
    {!message && (
    <div className="flex items-center justify-center py-16">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-white p-6 sm:p-8 rounded-2xl shadow-lg transform transition-all hover:shadow-2xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-4 sm:mb-6">Change Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 sm:mb-6">
            <label htmlFor="password" className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
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
            <label htmlFor="newPassword" className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition duration-200"
              placeholder="********"
              minLength={8}
              maxLength={20}
              required
            />
          </div>
          <div className="mb-4 sm:mb-6">
            <label htmlFor="confirmPassword" className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="text"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition duration-200"
              placeholder="12345678"
              autoComplete='off'
              minLength={8}
              maxLength={20}
              required
            />
          </div>
          {error && <p className="w-full px-3 py-2 sm:py-3 text-center text-red-500 text-sm mt-1">{error}</p>}
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

export default TeacherChangePassword;
