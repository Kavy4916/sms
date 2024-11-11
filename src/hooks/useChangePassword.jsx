import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/connection.js";


const useChangePassword = () => {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();
  const changePassword = async (password, newPassword, confirmPassword) => {
    if (newPassword !== confirmPassword)
      setError("Confirm password should be same as New password!");
    else if(newPassword === password) setError("Old password and new password should not be same!");
    else {
      api
        .post("/student/changePassword", {
          password: password,
          newPassword: newPassword,
        })
        .then((response) => {
          if(response.data.message) setError(response.data.message)
          else navigate("/");
        })
        .catch((error) => {
          setMessage(error.response.data.message);
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        });
    }
  };
  return { changePassword, error, message };
};

export default useChangePassword;
