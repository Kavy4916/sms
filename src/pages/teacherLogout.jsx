import { useEffect } from "react";
import api from "../utils/connection.js";
import { useNavigate } from "react-router-dom";
import Loader from "../components/loader.jsx";

const TeacherLogout = ()=> {
    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
          api.get("/teacher/logout")
            .then(()=>{
              navigate("/teacher/login");
            })
        };
        fetch();
      }, [navigate]);

      return(<Loader />)
}

export default TeacherLogout;