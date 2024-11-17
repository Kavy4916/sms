import React, {useEffect } from 'react';

const Alert = ({ message, setMessage }) => {

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 2000); // 2 seconds

      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [message, setMessage]);

  return (
    <>
      {message && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-gray-600 text-white text-center py-2 px-4 rounded shadow-lg">
          {message}
        </div>
      )}
    </>
  );
};

export default Alert;
