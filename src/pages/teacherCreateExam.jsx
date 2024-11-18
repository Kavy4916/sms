import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/connection";
import Loader from "../components/loader.jsx";
import ShowDetail from "../components/showDetail.jsx";
import Navbar from "../components/teacherNavbar";
import Message from "../components/message.jsx";

const TeacherCreateExam = () => {
  const { teachesId } = useParams();
  const [exam, setExam] = useState("");
  const [maxMarks, setMaxMarks] = useState(null);
  const tempDate = new Date();
  const [date, setDate] = useState(new Date(tempDate.getTime() - (tempDate.getTimezoneOffset()*60000)).toISOString().split("T")[0]);
  const [result, setResult] = useState([{}]);
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const column = Object.keys(result[0]);

  useEffect(() => {
    window.scrollTo(0,0);
    const fetch = async () => {
      try {
        const response = await api.get("/teacher/exam/create", {
          params: { teachesId },
        });
        setResult(response.data.result);
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
    const response = await api.post("/teacher/exam/create", {result, name: exam, maxMarks, date, teachesId});
    if(response?.data === "created"){
      window.scrollTo(0,0);
      setMessage("Created Successfully");
      setTimeout(()=>{setMessage(null); navigate(-1)}, 2000);
  }
  else console.log("error");
  };


  const handelResultChange = async (e) => {
    e.preventDefault();
    const index = e.target.id;
    const mark = Math.floor(parseFloat(e.target.value) * 100) / 100;

    if (index < 0 || index >= result.length || mark < 0 || mark > maxMarks) {
      return;
    }
    else{
      setResult((prevData) => {
        const updatedData = [...prevData];
        updatedData[index] = { ...updatedData[index], Marks: mark };
        return updatedData;
      });
    }
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
            Create Exam
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
          <div>
              <label
                className="block text-gray-700 font-medium mb-1"
                htmlFor="exam"
              >
                Exam
              </label>
              <input
                id="exam"
                value={exam}
                type="text"
                onChange={(e) => setExam(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="Enter Exam"
                minLength={5}
                maxLength={50}
                required
              ></input>
            </div>
            <div>
              <label
                className="block text-gray-700 font-medium mb-1"
                htmlFor="maxMarks"
              >
                Max Marks
              </label>
              <input
                id="maxMarks"
                value={maxMarks || ""}
                type="number"
                step="0.01"
                onWheel={(e) => e.target.blur()} 
                onChange={(e) => setMaxMarks(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="Enter Maximum Marks"
                min={0}
                max={100}
                required
              ></input>
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
            
            <h2 className="text-xl mt-4 font-semibold text-black-900 text-center p-1 m-1">
        Result
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
            {result.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {column.map((col, colIndex) => {
                  if (column[colIndex] === "Marks") {
                    return (
                      <td
                        key={colIndex}
                        className="px-4 py-2  border border-gray-200"
                      >
                        <input
                          type="number"
                          id={rowIndex}
                          name={row["Exam"]}
                          step="0.01"
                          value={row[col] || ""}
                          max={maxMarks}
                          min={0}
                          onWheel={(e) => e.target.blur()} 
                          onChange={handelResultChange}
                        />
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

export default TeacherCreateExam;
