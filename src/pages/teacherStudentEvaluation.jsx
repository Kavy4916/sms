import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/connection.js";
import Loader from "../components/loader.jsx";
import ShowDetail from "../components/showDetail.jsx";
import Navbar from "../components/teacherNavbar.jsx";
import Alert from "../components/alert.jsx";
import Table from "../components/table.jsx";

const TeacherStudentEvaluation = () => {
  const { query } = useParams();
  const teachesId = query.split("_")[0];
  const studentId = query.split("_")[1];
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [detail, setDetail] = useState(null);
  const [data, setData] = useState([{}]);

  useEffect(() => {
    window.scrollTo(0,0);
    const fetch = async () => {
      const response = await api.get("/teacher/student/evaluation", {
        params: { teachesId, studentId },
      });
      setDetail(response.data.detail);
      setData(response.data.response);
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
      <Table data={data}
        heading={"Evaluation Detail"}
      />
    </>
  );
};
export default TeacherStudentEvaluation;
