import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/teacherNavbar.jsx";
import api from "../utils/connection.js";
import Loader from "../components/loader.jsx";
import ShowDetail from "../components/showDetail.jsx";
import Message from "../components/message.jsx";

function TeacherCourseDetail() {
  const { teachesId } = useParams();
  const [loading, setLoading] = useState(true);
  const [attendance, setAttendance] = useState({
    attendance: [{}],
    attendanceLink: [],
  });
  const [classCount, setClassCount] = useState(null);
  const [evaluation, setEvaluation] = useState({
    evaluation: [{}],
    evaluationLink: [],
  });
  const [totalMarks, setTotalMarks] = useState(null);
  const [detail, setDetail] = useState(null);
  const attendanceColumn = Object.keys(attendance.attendance[0] || {});
  const evaluationColumn = Object.keys(evaluation.evaluation[0] || {});

  useEffect(() => {
    const fetch = async () => {
      const response = await api.get("/teacher/course/detail", {
        params: {
          teachesId,
        },
      });
      setAttendance(response.data.attendance);
      setClassCount(response.data.classCount);
      setEvaluation(response.data.evaluation);
      setTotalMarks(response.data.totalMarks);
      setDetail(response.data.detail);
      setLoading(false);
    };
    fetch();
  }, [teachesId]);

  if (loading) return <Loader />;
  return (
    <>
      <Navbar />
      <div className="grid grid-cols-2 lg:grid-cols-4 h-auto text-xl">
        <Link to={`/teacher/class/create/${teachesId}`}>
          <div className="bg-gray-300 text-center font-semibold p-1 border border-gray-500">
            Create Class
          </div>
        </Link>
        <Link to={`/teacher/class/all/${teachesId}`}>
          <div className="bg-gray-300 text-center font-semibold p-1 border border-gray-500">
            Update Class
          </div>
        </Link>
        <Link to={`/teacher/exam/create/${teachesId}`}>
          <div className="bg-gray-300 text-center font-semibold p-1 border border-gray-500">
            Create Exam
          </div>
        </Link>
        <Link to={`/teacher/exam/all/${teachesId}`}>
          <div className="bg-gray-300 text-center font-semibold p-1 border border-gray-500">
            Update Exam
          </div>
        </Link>
      </div>
      <ShowDetail detail={detail} />
      <h1 className="text-2xl font-semibold text-gray-800 mb-2 mt-6 text-center">
        Attendance Report
      </h1>
      <h2 className="text-xl font-semibold text-gray-800 my-2 text-center">
        Total Classes : {classCount}
      </h2>
      {attendance.attendance.length ? (
        <div className="overflow-x-auto whitespace-nowrap">
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                {attendanceColumn.map((col, index) => (
                  <th
                    key={index}
                    className="px-4 py-2 border border-gray-200 text-left text-gray-900"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {attendance.attendance.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="hover:bg-gray-50 font-semibold text-gray-800"
                >
                  {attendanceColumn.map((col, colIndex) => {
                    if (
                      attendanceColumn[colIndex] === "See Detail" ||
                      attendanceColumn[colIndex] === "Update"
                    ) {
                      return (
                        <td
                          key={colIndex}
                          className="px-4 py-2 color-blue-500 border border-gray-200"
                        >
                          <Link to={attendance.attendanceLink[rowIndex]}>
                            {row[col]}
                          </Link>
                        </td>
                      );
                    } else if (attendanceColumn[colIndex] === "Percent") {
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
      ) : (
        <Message text={"Nothing to show."} />
      )}
      <br />
      <h1 className="text-2xl font-semibold text-gray-800 mb-2 mt-4 text-center">
        Evaluation Report
      </h1>
      <h2 className="text-xl font-semibold text-gray-800 my-2 text-center">
        Total Marks : {totalMarks}
      </h2>
      {evaluation.evaluation.length ? (
        <div className="overflow-x-auto whitespace-nowrap">
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                {evaluationColumn.map((col, index) => (
                  <th
                    key={index}
                    className="px-4 py-2 border border-gray-200 text-left text-gray-900"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {evaluation.evaluation.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="hover:bg-gray-50 font-semibold text-gray-800"
                >
                  {evaluationColumn.map((col, colIndex) => {
                    if (
                      evaluationColumn[colIndex] === "See Detail" ||
                      evaluationColumn[colIndex] === "Update"
                    ) {
                      return (
                        <td
                          key={colIndex}
                          className="px-4 py-2 color-blue-500 border border-gray-200"
                        >
                          <Link to={evaluation.evaluationLink[rowIndex]}>
                            {row[col]}
                          </Link>
                        </td>
                      );
                    } else if (evaluationColumn[colIndex] === "Percent") {
                      return (
                        <td
                          key={colIndex}
                          className="px-4 py-2 color-blue-500 border border-gray-200"
                        >
                          <div
                            className={`${
                              row[col] >= 40 ? "bg-success" : "bg-danger"
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
      ) : (
        <Message text={"Nothing to show."} />
      )}
    </>
  );
}

export default TeacherCourseDetail;
