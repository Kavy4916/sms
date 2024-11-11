import { useState} from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/connection.js";


const useLogin = () => {
    const[error, setError] = useState(null);
    const navigate = useNavigate();
    const login = async (username, password) => {

    setError(null);
    api.post("/student/login", {
        studentId: username,
        password: password,
      })
      .then((response) => {
        if(response.data.message) setError(response.data.message);
        else navigate("/")
      })
      .catch((error) => {
        console.log(error);
      });
    }
return {login, error};
}

export default useLogin;