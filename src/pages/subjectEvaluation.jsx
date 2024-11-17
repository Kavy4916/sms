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
        .get("/student/evaluation/subject", {
          params: { subjectId },
        })
        .then((response) => {
          if (response.data.payload.length) {
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

  if (loading) return <Loader />;
  else if (message) return <Message text={message} />;
  else if (error) return <Message text={error} />;
  else
    return (
      <div className="bg-gray-100">
        <Navbar />
        <ShowDetail detail={result.detail} />
        <Table data={result.payload} heading={"Subject Evaluation Report"} />
      </div>
    );
};

export default SubjectEvaluation;
