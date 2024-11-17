import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);


  return (
    <nav className="sticky bg-gray-800 text-white fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link className="sm:text-lg md:text-xl lg:text-2xl  font-bold" to="/">
              <img className="h-16 w-16 mx-2 inline-block" src="/logo192.png"  alt="NITJ" />NITJ
            </Link>
          </div>
          <div className="hidden md:flex space-x-4 items-center">
            <Link to="/" className="hover:bg-gray-700 px-3 py-2 rounded-md font-medium">Home</Link>
            <Link to="/changePassword" className="hover:bg-gray-700 px-3 py-2 rounded-md font-medium">Change Password</Link>
            <Link to="/register" className="hover:bg-gray-700 px-3 py-2 rounded-md font-medium">Register</Link>
            <Link to="/evaluation" className="hover:bg-gray-700 px-3 py-2 rounded-md font-medium">Evaluation</Link>
            <Link to="/attendance" className="hover:bg-gray-700 px-3 py-2 rounded-md font-medium">Attendance</Link>
            <Link to="/logout" className="hover:bg-gray-700 px-3 py-2 rounded-md font-medium">Logout</Link>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">Home</Link>
            <Link to="/changePassword" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">Change Password</Link>
            <Link to="/register" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">Register</Link>
            <Link to="/evaluation" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">Evaluation</Link>
            <Link to="/attendance" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">Attendance</Link>
            <Link to="/logout" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">Logout</Link>          
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
