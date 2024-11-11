import React, { useState, useEffect, useRef} from "react";
import api from "../utils/connection";

const Notice = () => {
  const [notice, setNotice] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  let count = useRef(0); 

  useEffect(() => {
    const fetch = async () => {
      api
        .get("/student/notice")
        .then((response) => {
          count.current = response.data.length;
          setNotice(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setNotice([]);
        });
    };
    fetch();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>{
        if(prevIndex === (count.current - 1)) return 0;
        else return (prevIndex + 1);
    });
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
    {!loading && <div className="w-full p-4 sm:p-6">
      <div className="overflow-hidden text-center bg-white shadow-lg rounded-lg ">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Notice</h1>
        <div
          className="whitespace-nowrap transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
        {notice.map(({ content }, index) => (
          <div  key={index} className=" inline-block w-full h-24 m:h-20 lg:h-16">
          <div className="p-2 m-2 border rounded-lg shadow-lg border-gray-500 flex items-center justify-center h-20 md:h-16 lg:h-12">
            <div className="whitespace-normal h-16 md:h-12 lg:h-8">{content}</div>
          </div>
          </div>
        ))}
        </div>
      

      {/* Indicators */}
      <div className=" flex justify-center space-x-2">
        {notice.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 p-1 m-1 rounded-full ${
              currentIndex === index ? "bg-gray-900" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
    </div>
    }
    </>
  );
};

export default Notice;
