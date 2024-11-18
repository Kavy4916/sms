import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/connection.js";
import Loader from "../components/loader.jsx";
import ShowDetail from "../components/showDetail.jsx";
import Navbar from "../components/teacherNavbar.jsx";
import Alert from "../components/alert.jsx";

const TeacherStudentAttendance = () => {
  const { teachesId, studentId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [detail, setDetail] = useState(null);
  const [attendance, setAttendance] = useState([{}]);
  const column = Object.keys(attendance[0]);

  useEffect(() => {
    window.scrollTo(0,0);
    const fetch = async () => {
      const response = await api.get("/teacher/student/attendance", {
        params: { teachesId, studentId },
      });
      setDetail(response.data.detail);
      setAttendance(response.data.attendance);
      setLoading(false);
    };
    fetch();
  }, [studentId, teachesId]);

  if (loading) return <Loader />;

  return (
    <>
      <Alert message={error} setMessage={setError} />
      <Navbar />
      <ShowDetail detail={detail} />
      <h2 className='text-2xl md:text-2xl font-semibold text-gray-900 text-center p-2'>Attendance Detail</h2>
      <div className="overflow-x-auto whitespace-nowrap">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              {column.map((col, index) => (
                <th
                  key={index}
                  className="px-4 py-2 border border-gray-200 text-left"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {attendance.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50 font-semibold">
                {column.map((col, colIndex) => {
                  if (column[colIndex] === "Status") {
                    return (
                      <td
                        key={colIndex}
                        className="px-4 py-2  border border-gray-200"
                      >
                        <div
                          className={`ml-2 ${
                            row[col] === "P" ? "bg-green-500" : "bg-red-500"
                          } text-white text-center font-bold p-2 rounded shadow-md w-8 lg:w-12`}
                        >
                          {row[col]}
                        </div>
                      </td>
                    );
                  } else if (column[colIndex] === "Date") {
                    return (
                      <td
                        key={colIndex}
                        className="px-4 py-2 color-blue-500 border border-gray-200"
                      >
                        {new Date(row[col]).toLocaleDateString("en-GB")}
                      </td>
                    );
                  } else
                    return (
                      <td
                        key={colIndex}
                        className="px-4 py-2 border border-gray-200"
                      >
                        {row[col]}
                      </td>
                    );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default TeacherStudentAttendance;
