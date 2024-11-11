import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import api from "../utils/connection";
import Loader from "../components/loader.jsx";
import ShowDetail from "../components/showDetail.jsx";
import Navbar from "../components/teacherNavbar.jsx";

const TeacherEvaluationDetail = ()=>{
    const {query} = useParams(); 
    const teachesId =  query.split("_")[0];
    const studentId = query.split("_")[1]
    const [loading, setLoading] = useState(true);
    const [detail, setDetail] = useState(null);
    const [data, setData] = useState([{}]);
    const column = Object.keys(data[0]);

    useEffect(()=>{
        const fetch = async()=>{
            const response = await api.get("/teacher/evaluationDetail",{
                params: {teachesId, studentId}
            });
            setDetail(response.data.detail);
            setData(response.data.response);
            setLoading(false);
        }
        fetch();
    },[studentId, teachesId]);

    if(loading) return <Loader />

    return <>
        <Navbar />
        <ShowDetail 
            detail={detail}
        />
        <div className="overflow-x-auto whitespace-nowrap">
      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            {column.map((col, index) => (
              <th key={index} className="px-4 py-2 border border-gray-200 text-left">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50">
              {column.map((col, colIndex) =>
                {
                 return <td key={colIndex} className="px-4 py-2 border border-gray-200">
                  {row[col]}
                </td>
                }
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
}
export default TeacherEvaluationDetail;