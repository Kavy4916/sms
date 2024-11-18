import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/loader.jsx";
import Navbar from "../components/teacherNavbar.jsx";
import api from "../utils/connection.js";
import Message from "../components/message.jsx";
import ShowDetail from "../components/showDetail.jsx";

const TeacherUpdateExam = () => {
  const { query } = useParams();
  const teachesId = query.split("_")[0];
  const examId = query.split("_")[1];
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(null);
  const [result, setResult] = useState([{}]);
  const [detail, setDetail] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [checked, setChecked] = useState(false);
  const [processing, setProcessing] = useState(false);
  const column = Object.keys(result[0]);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetch = async () => {
      try {
        const response = await api.get("/teacher/exam/update", {
          params: { teachesId, examId },
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
        setResult(response.data.result);
        setDetail(response.data.detail);
        setLoading(false);
      } catch (error) {}
    };
    fetch();
  }, [teachesId, examId]);

  const handelExamUpdate = async (e) => {
    e.preventDefault();
    let response = await api.post("/teacher/exam/update", {
      examId,
      date: detail["Date"],
      name: detail["Exam"],
      maxMarks: detail["Max Marks"],
      teachesId,
    });
    if (response.data === "updated") {
      setSuccess("Exam updated successfully");
      setTimeout(() => {
        setSuccess(null);
      }, 2000);
      response = await api.get("/teacher/exam/update", {
        params: { teachesId, examId },
      });
      const date = new Date(response.data.detail.Date);
      response.data.detail.Date = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];
      setResult(response.data.result);
      setDetail(response.data.detail);
    }
  };

  const handelResultChange = async (e) => {
    e.preventDefault();
    const index = e.target.id;
    const mark = Math.floor(parseFloat(e.target.value) * 100) / 100;

    if (
      index < 0 ||
      index >= result.length ||
      mark < 0 ||
      mark > detail["Max Marks"]
    ) {
      return;
    } else {
      setResult((prevData) => {
        const updatedData = [...prevData];
        updatedData[index] = { ...updatedData[index], Marks: mark };
        return updatedData;
      });
    }
  };

  const handelResultUpdate = async (e) => {
    e.preventDefault();
    if (!processing) {
      setProcessing(true);
      const studentId = e.target.name;
      const index = e.target.id;
      const mark = e.target.value;
      if (
        index < 0 ||
        index >= result.length ||
        mark < 0 ||
        mark > detail["Max Marks"]
      )
        return;
      const response = await api.post("/teacher/exam/mark/update", {
        studentId,
        mark,
        examId,
        teachesId,
      });
      if (response.data === "updated") {
        setResult((prev) => {
          const updatedData = [...prev];
          updatedData[index] = {
            ...updatedData[index],
            Marks: mark,
            Update: "Updated",
          };
          return updatedData;
        });
        setTimeout(() => {
          setResult((prev) => {
            const updatedData = [...prev];
            updatedData[index] = {
              ...updatedData[index],
              Update: "Update",
            };
            return updatedData;
          });
        },2000);
      }
    }
    setProcessing(false);
  };

  const handelDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/teacher/exam/delete", {
        examId,
        teachesId,
      });
      if (response?.data === "deleted") {
        window.scrollTo(0, 0);
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
          Edit Exam
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 md:gap-4">
          <div className=" grid grid-cols-7 justify-items-stretch bg-white px-3 py-2 rounded-md h-auto text-lg md:text-xl ">
            <div className="py-1 px-2 col-span-3 text-gray-600 inline">
              Exam:
            </div>
            <div className="py-1 px-2 col-span-4 text-gray-700  rounded-md font-semibold inline overflow-x-scroll lg:overflow-x-hidden">
              <input
                type="text"
                minLength={5}
                maxLength={50}
                value={detail["Exam"]}
                onChange={(e) =>
                  setDetail((prev) => {
                    return { ...prev, Exam: e.target.value };
                  })
                }
              />
            </div>
          </div>
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
              Max Marks :
            </div>
            <div className="py-1 px-2 col-span-4 text-gray-700  rounded-md font-semibold inline overflow-x-scroll lg:overflow-x-hidden">
              <input
                id="Max Marks"
                type="number"
                step="0.01"
                min={5}
                max={100}
                value={detail["Max Marks"]}
                onWheel={(e) => e.target.blur()}
                onChange={(e) =>
                  setDetail((prev) => {
                    return { ...prev, "Max Marks": e.target.value };
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                required
              />
            </div>
          </div>
        </div>
        {success && (
          <p className="w-full px-3 py-2 sm:py-3 text-center text-green-500 text-md my-1">
            {success}
          </p>
        )}
        <div className=" mt-4 lg:flex lg:justify-around">
          <button
            type="button"
            onClick={handelExamUpdate}
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
      <hr className="my-4 border-gray-300" />
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
                <td className="px-4 py-2 border border-gray-200">
                  {row["Student Id"]}
                </td>
                <td className="min-w-28 px-4 py-2 border border-gray-200">
                  <input
                    type="number"
                    id={rowIndex}
                    name={row["Student Id"]}
                    step="0.01"
                    value={row["Marks"]}
                    max={detail["Max Marks"]}
                    min={0}
                    onWheel={(e) => e.target.blur()}
                    onChange={handelResultChange}
                  />
                </td>
                <td className="px-4 py-2 border border-gray-200">
                  <button
                    type="submit"
                    onClick={handelResultUpdate}
                    value={row["Marks"]}
                    id={rowIndex}
                    name={row["Student Id"]}
                    className="min-w-24 bg-gray-500 hover:bg-gray-700 text-white font-bold p-1 rounded-lg shadow-md transition-all duration-200"
                  >
                    {row["Update"]}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TeacherUpdateExam;
