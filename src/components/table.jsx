import React from 'react';
import { Link } from 'react-router-dom';
import Message from './message.jsx';

const Table = ({data, link, heading}) => {

  if(data.length === 0) return <Message text={"Nothing to show."}/>
  
  const column = Object.keys(data[0] || {});
  return (
    <div>
    {heading && <h2 className='text-2xl md:text-2xl font-semibold text-gray-900 text-center p-2'>{heading}</h2>}
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
                if(column[colIndex] === "See Detail" || column[colIndex] === "Update"){return<td  key={colIndex} className="px-4 py-2 color-blue-500 border border-gray-200"><Link to={link[rowIndex]}>
                  {row[col]}
                </Link></td>}
                else if(column[colIndex] === "Date"){return<td  key={colIndex} className="px-4 py-2 color-blue-500 border border-gray-200">{new Date(row[col]).toLocaleDateString("en-GB")}</td>}
                else return <td key={colIndex} className="px-4 py-2 border border-gray-200">
                  {row[col]}
                </td>
                }
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default Table;
