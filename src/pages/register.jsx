import React, { useEffect, useState } from "react";
import Loader from "../components/loader.jsx";
import { useNavigate } from "react-router-dom";
import api from "../utils/connection.js";
import Message from "../components/message.jsx";
import Navbar from "../components/navbar.jsx";
import Table from "../components/table.jsx";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDisable, setIsDisable] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false); 
  const [success, setSuccess] = useState(null);
  const [message, setMessage] = useState(null);


  const [data, setData] = useState(null);
  const [mode, setMode] = useState("UPI");

  
  const handleCheckboxChange = (e) => {
    setIsAgreed(e.target.checked); 
  };

  const generateRandomString = (length) => {
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsDisable(true);
    if(!isAgreed){
      setError("Click the checkbox first!");
      setTimeout(()=>{
        setError(null);
        setIsDisable(false);
      },2000);
    }
    else{
    api.post("/student/register", {
        status: "successful",
        paymentId: generateRandomString(10),
        date: new Date().toISOString(),
        amount: 50000,
        mode: mode,
        enrolling: data.enrolling,
    }).then((response)=>{
        if(response.data.message) {
          setError(response.data.message);
          setTimeout(()=>{
            setError(null);
            setIsDisable(false);
          },3000);
        }
        else {
          setIsDisable(true);
          setSuccess("You are Registered successfully!");
          setTimeout(()=>{
          navigate("/");
        },4000);
      }
     }).catch((error)=>{
        setError(error.message);
        setTimeout(()=>{
          navigate("/");
        },2000);
     })
    }
    
  };


  useEffect(() => {
    const fetch = async () => {
      api
        .get("/student/register")
        .then((response) => {
            setData(response.data);
            setLoading(false);
        })
        .catch((error) => {
          console.log(error.response.data);
          setMessage(error.response.data.message);
          setLoading(false);
        });
    };

    fetch();
  }, []);

  const tableHeading = "You are enrolling in the following courses";

  return (
    <div className=" bg-gray-200 min-h-screen">
      <Navbar />
      {loading && <Loader />}
      {!loading && message && <Message text={message} />}
      {!loading && data && data.message && <Message text={data.message} />} 
      {!loading && data && data.enrollment && (
        <>
        <Table data={data.enrollment}/>
        </>
      )}
      
      {!loading && data && data.enrolling && (
        <div>
          <div className="flex items-center justify-center m-4 sm:m-2  bg-gray-200">
            <div className=" w-full max-w-sm sm:max-w-sm md:max-w-md lg:max-w-lg bg-white p-6 sm:p-8 rounded-2xl shadow-lg transform transition-all hover:shadow-2xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-4 sm:mb-6">
                Enroll
              </h2>
              <form onSubmit={handleSubmit} >
                <div className="mb-4 sm:mb-6">
                  <label
                    htmlFor="username"
                    className="block text-sm sm:text-base font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    autoComplete="off"
                    id="username"
                    disabled={true}
                    value={data.student.fName + " " + data.student.lName}
                    className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition duration-200"
                    placeholder="Ram"
                    required
                  />
                  <label
                    htmlFor="roll"
                    className="block text-sm sm:text-base font-medium text-gray-700 mb-1"
                  >
                    Roll
                  </label>
                  <input
                    type="text"
                    autoComplete="off"
                    id="roll"
                    disabled={true}
                    value={data.student.studentId}
                    className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition duration-200"
                    placeholder="11111111"
                    required
                  />
                  <label
                    htmlFor="department"
                    className="block text-sm sm:text-base font-medium text-gray-700 mb-1"
                  >
                    Deparment
                  </label>
                  <input
                    type="text"
                    autoComplete="off"
                    id="department"
                    disabled={true}
                    value={data.student.deptId}
                    className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition duration-200"
                    placeholder="XYZ"
                    required
                  />
                </div>
                <Table data={data.enrolling} heading={tableHeading}/>
                <div className="flex items-center my-6">
            <input
              type="checkbox"
              id="terms"
              className="w-4 h-4 text-gray-500 border-gray-300 rounded focus:ring-gray-400"
              checked={isAgreed}
              onChange={handleCheckboxChange}
            />
            <label
              className="ml-2 text-gray-700 text-sm"
            >
              All the informaton given above is correct.(If not please raise a concern.)
            </label>
          </div>
          <label
                    htmlFor="Amount"
                    className="block text-sm sm:text-base font-medium text-gray-700 mb-1"
                  >
                    Amount
                  </label>
                  <input
                    type="text"
                    autoComplete="off"
                    id="amount"
                    disabled={true}
                    value={50000}
                    className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition duration-200"
                    placeholder="0"
                    required
                  />
          <div className="mb-4">
            <label
              htmlFor="mode"
              className="block text-gray-700 font-medium mb-2"
            >
              Select Mode
            </label>
            <select
              id="mode"
              value={mode}
              onChange={(e)=>setMode(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              <option value="" disabled>
                -- Select the mode of Payment --
              </option>
              <option value="UPI" >UPI</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="Net Banking">Net Banking</option>
            </select>
          </div>
                {error && <p className="w-full px-3 py-2 sm:py-3 text-center text-red-500 text-md my-1">{error}</p>}
                {success && <p className="w-full px-3 py-2 sm:py-3 text-center text-green-500 text-md my-1">{success}</p>}
                <button
                  type="submit"
                  className="w-full bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 sm:py-3 rounded-lg shadow-md transition-all duration-200"
                  disabled={isDisable}
                >
                  Pay
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
