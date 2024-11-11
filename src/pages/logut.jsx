import { useEffect } from "react";
import api from "../utils/connection.js";
import { useNavigate } from "react-router-dom";
import Loader from "../components/loader.jsx";

const Logout = ()=> {
    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
          api.get("/student/logout")
            .then(()=>{
              navigate("/login");
            })
        };
        fetch();
      }, [navigate]);

      return(<Loader />)
}

export default Logout;