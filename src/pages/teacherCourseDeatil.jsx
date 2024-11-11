import React, { useEffect, useState }  from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/teacherNavbar.jsx";
import api from "../utils/connection.js";
import Loader from "../components/loader.jsx";
import Table from "../components/table.jsx";
import ShowDetail from "../components/showDetail.jsx"

function TeacherCourseDetail(){

    const {teachesId} = useParams();
    const [timing, setTiming] = useState("");
    const [purpose, setPurpose] = useState("");
    const [type, setType] = useState("");
    const [loading, setLoading] = useState(true);
    const [attendance, setAttendance] = useState(null);
    const [classCount, setClassCount] = useState(null);
    const [evaluation, setEvaluation] = useState(null);
    const [totalMarks, setTotalMarks] = useState(null);
    const [detail, setDetail] = useState(null);

    useEffect(()=>{
      const fetch = async ()=>{
        const response = await api.get("/teacher/courseDetail",{
          params: {
            teachesId
          }
        });
        setAttendance(response.data.attendance);
        setClassCount(response.data.classCount);
        setEvaluation(response.data.evaluation);
        setTotalMarks(response.data.totalMarks);
        setDetail(response.data.detail);
        setLoading(false);
      }
      fetch();
    },[teachesId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement submit functionality here (e.g., API call to save class data)
        console.log({ timing, purpose, type});
        alert("Class created successfully!");
      }; 
          
      if(loading) return <Loader />
          return (
          <>
          <Navbar/>
          <ShowDetail
            detail={detail}
          />
          <h1 className="text-2xl font-semibold text-gray-800 mb-2 mt-6 text-center">Attendance Report</h1>
          <h2 className="text-xl font-semibold text-gray-800 my-2 text-center">Total Classes : {classCount}</h2>
          <Table
            data={attendance.attendance}
            link={attendance.attendanceLink}
          />
          <br/>
          <h1 className="text-2xl font-semibold text-gray-800 mb-2 mt-4 text-center">Evaluation Report</h1>
          <h2 className="text-xl font-semibold text-gray-800 my-2 text-center">Total Marks : {totalMarks}</h2>
          <Table
            data={evaluation.evaluation}
            link={evaluation.evaluationLink}
          />
            <div className="flex items-center justify-center min-h-auto bg-gray-100 p-4 mt-32">
              <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Create a Class</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-medium mb-1" htmlFor="type">Class Type</label>
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
              <option value="Lecture" >Lecture</option>
              <option value="Tutorial">Tutorial</option>
              <option value="Practical">Practical</option>
                    </select>
                  </div>
        
                  <div>
                    <label className="block text-gray-700 font-medium mb-1" htmlFor="timing"> Class Timing</label>
                    <select
              id="timing"
              value={timing}
              onChange={(e)=>setTiming(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
              required
            >
              <option value="" disabled>
                -- Select the timing--
              </option>
              <option value="8:30 AM-9:25 AM" >8:30 AM-9:25 AM</option>
              <option value="9:30 AM-10:25 AM">9:30 AM-10:25 AM</option>
              <option value="10:30 AM-11:25 AM">10:30 AM-11:25 AM</option>
              <option value="11:30 AM-12:25 PM">11:30 AM-12:25 PM</option>
              <option value="01:30 PM-02:25 PM">01:30 PM-02:25 PM</option>
              <option value="02:30 PM-03:25 PM">02:30 PM-03:25 PM</option>
              <option value="03:30 PM-04:25 PM">03:30 PM-04:25 PM</option>
              <option value="04:30 PM-05:25 PM">04:30 PM-05:25 PM</option>
              <option value="08:30 AM-10:25 AM">08:30 AM-10:25 AM</option>
              <option value="10:30 AM-12:25 PM">10:30 AM-12:25 PM</option>
              <option value="01:30 PM-03:25 PM">01:30 PM-03:25 PM</option>
              <option value="03:30 PM-05:25 PM">03:30 PM-05:25 PM</option>
            </select>
                  </div>
        
                  <div>
                    <label className="block text-gray-700 font-medium mb-1" htmlFor="purpose">Description</label>
                    <input
                    id="purpose"
                      value={purpose}
                      type="text"
                      onChange={(e) => setPurpose(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                      placeholder="Enter Topic Discussed in Class"
                      rows="4"
                      required
                    ></input>
                  </div>
        
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2 font-medium text-white bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                      Create Class
                    </button>
                  </div>
                </form>
              </div>
            </div>
            </>
            )
}

export default TeacherCourseDetail;