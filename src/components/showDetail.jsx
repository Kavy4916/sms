import React from "react";


const ShowDetail = ({detail}) => {
  const field = Object.keys(detail);
  return (
    <>
    <div className="bg-gary-100  rounded-lg p-6 w-full mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 md:gap-4">
        {field.map((element, index) => (
          <div key={index} className=" grid grid-cols-7 justify-items-stretch bg-white px-3 py-2 rounded-md h-auto text-lg md:text-xl ">
            <div className="py-1 px-2 col-span-3 text-gray-600 inline">{element} :</div>
            <div className="py-1 px-2  col-span-4 text-gray-700  rounded-md font-semibold inline">{detail[element]}</div>
          </div>
        ))}
      </div>
    </div>
    <hr className="border-gray-300"  />
    </>
  );
};

export default ShowDetail;
