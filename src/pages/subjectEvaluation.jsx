import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Table from "../components/table.jsx";
import api from "../utils/connection.js";
import Loader from "../components/loader.jsx";
import Message from "../components/message.jsx";
import Navbar from "../components/navbar.jsx";
import ShowDetail from "../components/showDetail.jsx";

const SubjectEvaluation = () => {
  const navigate = useNavigate();
  const { subjectId } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      api
        .post("/student/subjectEvaluation", {subjectId })
        .then((response) => {
          if (response.data.payload.length) {
            response.data.payload = response.data.payload.map((element) => ({
              ...element,
              "Exam-Date": new Date(element["Exam-Date"]).toLocaleDateString(
                "en-GB"
              ),
            }));
            setResult(response.data);
            setLoading(false);
          } else {
            setMessage("Nothing To Show!");
            setLoading(false);
          }
        })
        .catch((error) => {
          setError(error.response.data.message);
          setLoading(false);
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        });
    };
    fetch();
  }, [navigate, subjectId]);

  return (
    <div className="bg-gray-100">
      <Navbar />
      {loading && <Loader />}
      {!loading && !message && result && (
        <>
          <ShowDetail detail={result.detail} />
          <Table data={result.payload} />
        </>
      )}
      {!loading && message && <Message text={message} />}
      {!loading && error && <Message text={error} />}
    </div>
  );
};

export default SubjectEvaluation;
