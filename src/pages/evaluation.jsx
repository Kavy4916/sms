import Table from "../components/table.jsx";
import api from "../utils/connection.js";
import React, { useEffect, useState } from "react";
import Loader from "../components/loader.jsx";
import Message from "../components/message.jsx";
import Navbar from "../components/navbar.jsx";
import ShowDetail from "../components/showDetail.jsx";
import { useNavigate } from "react-router-dom";

const Evaluation = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    window.scrollTo(0,0);
    const fetch = async () => {
      api
        .get("/student/evaluation")
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
  }, [navigate]);

  return (
    <div className="bg-gray-100">
      <Navbar />
      {loading && <Loader />}
      {!loading && !message && result && (
        <>
          <ShowDetail detail={result.detail} />
          <Table data={result.payload} link={result.link} heading={"Evaluation Report"}/>
        </>
      )}
      {!loading && message && <Message text={message} />}
      {error && <Message text={error} />}
    </div>
  );
};

export default Evaluation;
