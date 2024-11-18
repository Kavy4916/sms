import React, { useState, useEffect } from "react";
import api from "../utils/connection.js";
import DataTable from "../components/table.jsx";
import Loader from "../components/loader.jsx";
import Message from "../components/message.jsx";
import ShowDetail from "../components/showDetail.jsx";
import TeacherNavbar from "../components/teacherNavbar.jsx";

function TeacherDashboard() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    window.scrollTo(0,0);
    const fetch = async () => {
      api
        .get("/teacher/course/all")
        .then((response) => {
          if (response.data.message) {
            setMessage(response.data.message);
          } else {
            setResponse({subjects: response.data.subjects, link: response.data.link});
            const temp = {
              Name:
                response.data.teacher.fName + " " + response.data.teacher.lName,
              "Teacher Id": response.data.teacher.teacherId,
              "Dept.": response.data.teacher.deptId,
              Email: response.data.teacher.email,
            };
            setTeacher(temp);
          }
          setLoading(false);
        })
        .catch((error) => {
          setError(error.response.data.message);
          setLoading(false);
        });
    };
    fetch();
  }, []);

  return (
    <>
    <TeacherNavbar/>
      {loading && <Loader />}
      {!loading && error && <Message text={error} />}
      {!loading && message && <Message text={message} />}
      {!loading && response && (
        <div>
          <ShowDetail detail={teacher} />
          <DataTable data={response.subjects} link={response.link} heading={"Courses"} />
        </div>
      )}
    </>
  );
}

export default TeacherDashboard;
