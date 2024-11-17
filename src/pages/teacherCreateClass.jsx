import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/connection";
import Loader from "../components/loader.jsx";
import ShowDetail from "../components/showDetail.jsx";
import Navbar from "../components/teacherNavbar";
import Message from "../components/message.jsx";

const CreateClass = () => {
  const { teachesId } = useParams();
  const [timing, setTiming] = useState("");
  const [topic, setTopic] = useState("");
  const [type, setType] = useState("");
  const tempDate = new Date();
  const [date, setDate] = useState(new Date(tempDate.getTime() - (tempDate.getTimezoneOffset()*60000)).toISOString().split("T")[0]);
  const [subjectType, setSubjectType] = useState(null);
  const [attendance, setAttendance] = useState([{}]);
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const column = Object.keys(attendance[0]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await api.get("/teacher/class/create", {
          params: { teachesId },
        });
        response.data.subjectType === "Practical" ? setType("Practical"):setType("Lecture");
        setSubjectType(response.data.subjectType);
        setAttendance(response.data.attendance);
        setDetail(response.data.detail);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [teachesId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await api.post("/teacher/class/create", {attendance, time: timing, date, purpose: topic, type, teachesId});
    if(response?.data === "created"){
      setMessage("Created Successfully");
      setTimeout(()=>{setMessage(null); navigate(-1)}, 2000);
  }
  else console.log("error");
  };


  const handelAttendanceChange = async (e) => {
    e.preventDefault();
    const index = e.target.id;
    const status = e.target.value === "P" ? "A" : "P";

    setAttendance((prev) => {
      if (index < 0 || index > attendance.length) return prev;
      const updatedData = [...prev];
      updatedData[index] = { ...updatedData[index], Status: status };
      return updatedData;
    });
  };

  if(loading) return <><Navbar /><Loader /></>

  if(message) return <Message text={message}/>


  return (
    <>
    <Navbar />
    <ShowDetail detail={detail}/>
      <div className="flex items-center justify-center min-h-auto bg-gray-100 p-4 mt-4">
        <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            Create Class
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                className="block text-gray-700 font-medium mb-1"
                htmlFor="type"
              >
                Class Type
              </label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
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

            <div>
              <label
                className="block text-gray-700 font-medium mb-1"
                htmlFor="date"
              >
                Date
              </label>
              <input
                id="date"
                value={date}
                type="date"
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="Enter Date"
                required
              ></input>
            </div>
            <div>
              <label
                className="block text-gray-700 font-medium mb-1"
                htmlFor="timing"
              >
                {" "}
                Class Timing
              </label>
              <select
                id="timing"
                value={timing}
                onChange={(e) => setTiming(e.target.value)}
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

            <div>
              <label
                className="block text-gray-700 font-medium mb-1"
                htmlFor="topic"
              >
                Topic
              </label>
              <input
                id="purpose"
                value={topic}
                type="text"
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="Enter Topic Discussed in Class"
                minLength={5}
                maxLength={100}
                required
              ></input>
            </div>
            <h2 className="text-xl mt-4 font-semibold text-black-900 text-center p-1 m-1">
        Attendance
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
            {attendance.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50 font-semibold">
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
                          onClick={handelAttendanceChange}
                          className={`ml-2 ${
                            row[col] === "P" ? "bg-success" : "bg-danger"
                          } text-white font-bold p-2 rounded shadow-md w-8 lg:w-12`}
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
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 font-medium text-white bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateClass;
