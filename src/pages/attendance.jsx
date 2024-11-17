import React, { useEffect, useState } from "react";
import api from "../utils/connection.js";
import Loader from "../components/loader.jsx";
import Message from "../components/message.jsx";
import Navbar from "../components/navbar.jsx";
import ShowDetail from "../components/showDetail.jsx";
import { useNavigate, Link } from "react-router-dom";

const Attendance = () => {
  const navigate = useNavigate();
  const [attendance, setAttendance] = useState([{}]);
  const [detail, setDetail] = useState(null);
  const [link, setLink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const column = Object.keys(attendance[0] || {});

  useEffect(() => {
    const fetch = async () => {
      api
        .get("/student/attendance")
        .then((response) => {
          if (response.data.attendance.length) {
            setAttendance(response.data.attendance);
            setDetail(response.data.detail);
            setLink(response.data.link);
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
  }, [navigate]);

  if (loading) return <><Navbar /><Loader /></>;
  else if (message) return <div className="bg-gray-100"><Navbar /><Message  text={message} /></div>;
  else if (error) return <div className="bg-gray-100"><Navbar /><Message  text={error} /></div>;

  return (
    <div className="bg-gray-100">
      <Navbar />
      <ShowDetail detail={detail} />
      <h2 className="text-2xl md:text-2xl font-semibold text-gray-900 text-center p-2">
        Attendance Report
      </h2>
      <div className="overflow-x-auto whitespace-wrap">
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
              <tr key={rowIndex} className="hover:bg-gray-50">
                {column.map((col, colIndex) => {
                  if (
                    column[colIndex] === "See Detail" ||
                    column[colIndex] === "Update"
                  ) {
                    return (
                      <td
                        key={colIndex}
                        className="px-4 py-2 color-blue-500 border border-gray-200"
                      >
                        <Link to={link[rowIndex]}>{row[col]}</Link>
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
                  } else if (column[colIndex] === "Percent") {
                    return (
                      <td
                        key={colIndex}
                        className="px-4 py-2 color-blue-500 border border-gray-200"
                      >
                        <div
                          className={`${
                            row[col] >= 75 ? "bg-success" : "bg-danger"
                          } w-12 lg:w-16 rounded text-center p-1 font-semibold text-white`}
                        >
                          {row[col] + " %"}
                        </div>
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

export default Attendance;
