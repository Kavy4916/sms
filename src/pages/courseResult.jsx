import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Table from "../components/table.jsx";
import api from "../utils/connection.js";
import Loader from "../components/loader.jsx";
import Message from "../components/message.jsx";
import Navbar from "../components/navbar.jsx";
import ShowDetail from "../components/showDetail.jsx";

const CourseResult = () => {

  const {sessionCourse} = useParams();
  const [sessionId, courseId] = sessionCourse.split('_');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    window.scrollTo(0,0);
    const fetch = async () => {
      try {
        api.post("/student/courseResult",{sessionId, courseId}).then((response) => {
          if (response.data.payload.length) {
            setResult(response.data);
            setLoading(false);
          } else {
            setMessage("Nothing To Show!");
            setLoading(false);
          }
        });
      } catch (error) {
        console.log(error);
        setError(error.response.data.message);
      }
    };
    fetch();
  }, [courseId, sessionId]);

  return (
    <div className="bg-gray-100">
      <Navbar />
      {loading && <Loader />}
      {!loading && !message && result && (
        <><ShowDetail detail={result.detail}/><Table data={result.payload} link={result.link} /></>
      )}
      {!loading && message && <Message text={message} />}
      {error && <Message text={error} />}
    </div>
  );
};

export default CourseResult;
