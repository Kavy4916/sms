import React, { useEffect, useState } from "react";
import api from "../utils/connection";
import { useNavigate } from "react-router-dom";
import Loader from "../components/loader.jsx";
import Navbar from "../components/navbar.jsx";
import Notice from "../components/notice.jsx";
import Message from "../components/message.jsx";

const Dashboard = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handelClick = (e) => {
    e.preventDefault();
    navigate("/requestUpdate");
  };

  useEffect(() => {
    const fetch = async () => {
      api
        .get("/student/detail", {})
        .then((response) => {
          response.data.dob = new Date(response.data.dob).toLocaleDateString(
            "en-GB"
          );
          response.data.image = `data:image/jpeg;base64,${response.data.image}`;
          setStudent(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.response.data.message);
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        });
    };
    fetch();
  }, [navigate]);

  return (
    <div className="bg-gray-100">
      {loading && <Loader />}
      {!loading && error && <Message text={error} />}
      {!loading && !error && (
        <div>
          <Navbar />
          <Notice />
          <div className="h-auto flex items-center justify-center p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full sm:p-8 sm:max-w-lg ">
              <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                Student Details
              </h1>
              <div className="mb-4 sm:mb-6 flex justify-center items-center ">
                <img className="rounded-lg h-64 w-"
                  src={student.imageURL}
                  alt="Student img"
                />
              </div>
              <div className="mb-4 sm:mb-6">
                <div className="text-gray-700 text-sm uppercase">Name</div>
                <div className="text-lg sm:text-xl font-semibold text-gray-900">
                  {student.fName + " " + student.lName}
                </div>
              </div>
              <div className="mb-4 sm:mb-6">
                <div className="text-gray-700 text-sm uppercase">Roll no.</div>
                <div className="text-lg sm:text-xl font-semibold text-gray-900">
                  {student.studentId}
                </div>
              </div>
              <div className="mb-4 sm:mb-6">
                <div className="text-gray-700 text-sm uppercase">DOB</div>
                <div className="text-lg sm:text-xl font-semibold text-gray-900">
                  {student.dob}
                </div>
              </div>
              <div className="mb-4 sm:mb-6">
                <div className="text-gray-700 text-sm uppercase">Email</div>
                <div className="text-lg sm:text-xl font-semibold text-gray-900">
                  {student.email}
                </div>
              </div>
              <div className="mb-4 sm:mb-6">
                <div className="text-gray-700 text-sm uppercase">Phone no</div>
                <div className="text-lg sm:text-xl font-semibold text-gray-900">
                  {student.phoneNo}
                </div>
              </div>
              <div className="mb-4 sm:mb-6">
                <div className="text-gray-700 text-sm uppercase">Batch</div>
                <div className="text-lg sm:text-xl font-semibold text-gray-900">
                  {student.batch}
                </div>
              </div>
              <div className="mb-4 sm:mb-6">
                <div className="text-gray-700 text-sm uppercase">Deparment</div>
                <div className="text-lg sm:text-xl font-semibold text-gray-900">
                  {student.deptId}
                </div>
              </div>
              <div className="mb-4 sm:mb-6">
                <div className="text-gray-700 text-sm uppercase">Semester</div>
                <div className="text-lg sm:text-xl font-semibold text-gray-900">
                  {student.sem}
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="px-4 sm:px-6 py-2 text-white bg-gray-500 hover:bg-gray-700 rounded-lg focus:outline-none w-full sm:w-auto"
                  onClick={handelClick}
                >
                  Request Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
