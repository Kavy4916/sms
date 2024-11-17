import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/connection.js";
import Loader from "../components/loader.jsx";
import Message from "../components/message.jsx";
import Navbar from "../components/navbar.jsx";
import ShowDetail from "../components/showDetail.jsx";

const SubjectAttendance = () => {
  const navigate = useNavigate();
  const { subjectId } = useParams();
  const [attendance, setAttendance] = useState([{}]);
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const column = Object.keys(attendance[0] || {});

  useEffect(() => {
    const fetch = async () => {
      api
        .get("/student/attendance/subject", {
          params: { subjectId },
        })
        .then((response) => {
          if (response.data.attendance.length) {
            setAttendance(response.data.attendance);
            setDetail(response.data.detail);
            setLoading(false);
          } else {
            setMessage("Nothing To Show!");
            setLoading(false);
          }
        })
        .catch((error) => {
          setError(error.response.data.message);
          setLoading(false);
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        });
    };
    fetch();
  }, [navigate, subjectId]);

  if(loading) return <Loader />

  else if(message) return<Message text={message}/>

  else if(error) return <Message text={error} />


else
  return (
    <div className="bg-gray-100">
      <Navbar />
          <ShowDetail detail={detail} />
          <h2 className="text-2xl md:text-2xl font-semibold text-gray-900 text-center p-2">
            Subject Attendance Report
          </h2>
          <div className="overflow-x-auto whitespace-wrap">
            <table className="min-w-full table-auto border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  {column.map((col, index) => (
                    <th
                      key={index}
                      className="px-4 py-2 border border-gray-200 text-left min-w-32"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {attendance.map((row, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-gray-50">
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
    </div>
  );
};

export default SubjectAttendance;
