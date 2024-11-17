import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/loader.jsx";
import Navbar from "../components/teacherNavbar.jsx";
import api from "../utils/connection.js";
import Message from "../components/message.jsx";
import ShowDetail from "../components/showDetail.jsx";

const TeacherClassAttendance = () => {
  const { query } = useParams();
  const teachesId = query.split("_")[0];
  const classId = query.split("_")[1];
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [data, setData] = useState([{}]);
  const [detail, setDetail] = useState(null);
  const [subjectType, setSubjectType] = useState(null);
  const [checked, setChecked] = useState(false);
  const [tableData, setTableData] = useState(null);
  const column = Object.keys(data[0]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await api.get("/teacher/class/update", {
          params: { teachesId, classId },
        });
        const date = new Date(response.data.detail.Date);
        response.data.detail.Date = new Date(
          date.getTime() - date.getTimezoneOffset() * 60000
        )
          .toISOString()
          .split("T")[0];
        setTableData({
          "Dept.": response.data.detail["Dept."],
          Degree: response.data.detail.Degree,
          Semester: response.data.detail.Semester,
          Section: response.data.detail.Section,
          Group: response.data.detail.Group,
        });
        setData(response.data.data);
        setDetail(response.data.detail);
        setSubjectType(response.data.subjectType);
        setLoading(false);
      } catch (error) {}
    };
    fetch();
  }, [teachesId, classId]);

  const handelClassUpdate = async (e) => {
    e.preventDefault();
    let response = await api.post("/teacher/class/update", {
      classId,
      date: detail.Date,
      time: detail.Time,
      purpose: detail.Topic,
      type: detail.Type,
      teachesId,
    });
    if (response.data === "updated") {
      response = await api.get("/teacher/class/update", {
        params: { teachesId, classId },
      });
      const date = new Date(response.data.detail.Date);
      response.data.detail.Date = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];
      setData(response.data.data);
      setDetail(response.data.detail);
      setSubjectType(response.data.subjectType);
    }
  };

  const handelAttendanceUpdate = async (e) => {
    e.preventDefault();
    const studentId = e.target.name;
    const index = e.target.id;
    const status = e.target.value === "P" ? "A" : "P";
    const response = await api.post("/teacher/class/attendance/update", {
      studentId,
      status,
      classId,
      teachesId,
    });
    if (response.data === "updated") {
      setData((prev) => {
        if (index < 0 || index > data.length) return prev;
        const updatedData = [...prev];
        updatedData[index] = { ...updatedData[index], Status: status };
        return updatedData;
      });
    }
  };

  const handelDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/teacher/class/delete", {
        classId,
        teachesId,
      });
      if (response?.data === "deleted") {
        setMessage("Deleted Successfully");
        setTimeout(() => {
          setMessage(null);
          navigate(-1);
        }, 2000);
      } else console.log("error");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <Loader />;

  if (message) return <Message text={message} />;

  return (
    <>
      <Navbar />
      <ShowDetail detail={tableData} />
      <form className="bg-gary-100 rounded-lg p-6 w-full mx-auto">
        <h2 className="text-xl font-semibold text-black-900 text-center p-1 m-1">
          Edit Class
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 md:gap-4">
          <div className=" grid grid-cols-7 justify-items-stretch bg-white px-3 py-2 rounded-md h-auto text-lg md:text-xl ">
            <div className="py-1 px-2 col-span-3 text-gray-600 inline">
              Date :
            </div>
            <div className="py-1 px-2  col-span-4 text-gray-700  rounded-md font-semibold inline">
              <input
                type="date"
                required
                value={detail["Date"]}
                onChange={(e) =>
                  setDetail((prev) => {
                    return { ...prev, Date: e.target.value };
                  })
                }
              />
            </div>
          </div>
          <div className=" grid grid-cols-7 justify-items-stretch bg-white px-3 py-2 rounded-md h-auto text-lg md:text-xl ">
            <div className="py-1 px-2 col-span-3 text-gray-600 inline">
              Time :
            </div>
            <div className="py-1 px-2  col-span-4 text-gray-700  rounded-md font-semibold inline">
              <select
                id="timing"
                value={detail.Time}
                onChange={(e) =>
                  setDetail((prev) => {
                    return { ...prev, Time: e.target.value };
                  })
                }
                className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
                required
              >
                <option value="" disabled>
                  -- Select the timing--
                </option>
                {subjectType === "Practical" ? (
                  <>
                    <option value="08:30 AM-10:25 AM">08:30 AM-10:25 AM</option>
                    <option value="10:30 AM-12:25 PM">10:30 AM-12:25 PM</option>
                    <option value="01:30 PM-03:25 PM">01:30 PM-03:25 PM</option>
                    <option value="03:30 PM-05:25 PM">03:30 PM-05:25 PM</option>
                  </>
                ) : (
                  <>
                    <option value="08:30 AM-09:25 AM">08:30 AM-09:25 AM</option>
                    <option value="09:30 AM-10:25 AM">09:30 AM-10:25 AM</option>
                    <option value="10:30 AM-11:25 AM">10:30 AM-11:25 AM</option>
                    <option value="11:30 AM-12:25 PM">11:30 AM-12:25 PM</option>
                    <option value="01:30 PM-02:25 PM">01:30 PM-02:25 PM</option>
                    <option value="02:30 PM-03:25 PM">02:30 PM-03:25 PM</option>
                    <option value="03:30 PM-04:25 PM">03:30 PM-04:25 PM</option>
                    <option value="04:30 PM-05:25 PM">04:30 PM-05:25 PM</option>
                  </>
                )}
              </select>
            </div>
          </div>
          <div className=" grid grid-cols-7 justify-items-stretch bg-white px-3 py-2 rounded-md h-auto text-lg md:text-xl ">
            <div className="py-1 px-2 col-span-3 text-gray-600 inline">
              Type :
            </div>
            <div className="py-1 px-2 col-span-4 text-gray-700  rounded-md font-semibold inline overflow-x-scroll lg:overflow-x-hidden">
              <select
                id="Type"
                value={detail.Type}
                onChange={(e) =>
                  setDetail((prev) => {
                    return { ...prev, Type: e.target.value };
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                required
              >
                <option value="" disabled>
                  -- Select the type--
                </option>
                {subjectType === "Practical" ? (
                  <option value="Practical">Practical</option>
                ) : (
                  <option value="Lecture">Lecture</option>
                )}
                {subjectType === "Lecture/Tutorial" && (
                  <option value="Tutorial">Tutorial</option>
                )}
              </select>
            </div>
          </div>
          <div className=" grid grid-cols-7 justify-items-stretch bg-white px-3 py-2 rounded-md h-auto text-lg md:text-xl ">
            <div className="py-1 px-2 col-span-3 text-gray-600 inline">
              Topic :
            </div>
            <div className="py-1 px-2 col-span-4 text-gray-700  rounded-md font-semibold inline overflow-x-scroll lg:overflow-x-hidden">
              <input
                type="text"
                maxLength={100}
                value={detail["Topic"]}
                onChange={(e) =>
                  setDetail((prev) => {
                    return { ...prev, Topic: e.target.value };
                  })
                }
              />
            </div>
          </div>
        </div>
        <div className=" mt-4 lg:flex lg:justify-around">
          <button
            type="button"
            onClick={handelClassUpdate}
            className="bg-gray-500 text-xl text-white p-1 lg:px-8 rounded hover:bg-gray-600 my-2 w-full lg:w-auto"
          >
            Edit
          </button>
          <div>
            <input
              type="checkbox"
              id="checkbox"
              checked={checked}
              onChange={(e) => {
                setChecked(e.target.checked);
              }}
            />
            <label
              className={"m-2 mt-4 p-2 pointer-events-none lg:text-xl"}
              htmlFor="checkbox"
            >
              Click the checkbox to enable delete.
            </label>
            <button
              disabled={!checked}
              type="button"
              onClick={handelDelete}
              className="bg-gray-500 text-xl text-white p-1 lg:px-8 rounded hover:bg-gray-600 my-2 w-full lg:w-auto"
            >
              Delete
            </button>
          </div>
        </div>
      </form>
      <hr className="my-4 border-gray-300"/>
      <h2 className="text-xl mt-4 font-semibold text-black-900 text-center p-1 m-1">
        Attendance Detail
      </h2>
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
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {column.map((col, colIndex) => {
                  if (column[colIndex] === "Status") {
                    return (
                      <td
                        key={colIndex}
                        className="px-4 py-2  border border-gray-200"
                      >
                        <button
                          type="button"
                          value={row[col]}
                          id={rowIndex}
                          name={row["Student Id"]}
                          onClick={handelAttendanceUpdate}
                          className={`ml-2 ${
                            row[col] === "P" ? "bg-success" : "bg-danger"
                          } text-white font-bold p-2 rounded shadow-md  w-12 lg:w-16`}
                        >
                          {row[col]}
                        </button>
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

export default TeacherClassAttendance;
