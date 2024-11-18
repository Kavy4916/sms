import React,{useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/loader.jsx";
import Table from "../components/table.jsx";
import ShowDetail from "../components/showDetail.jsx";
import Navbar from "../components/teacherNavbar.jsx";
import api from "../utils/connection.js";

const TeacherAllExam = ()=>{
    const {teachesId} = useParams();
    const [loading, setLoading] = useState(true);
    const [exams, setExams] = useState(null);
    const [detail, setDetail] = useState(null);
    const [link, setLink] = useState(null);

    useEffect(()=>{
        window.scrollTo(0,0);
        const fetch = async ()=>{
            try{
            const response = await api.get("/teacher/exam/all",{
                params: {teachesId}
            });
            setExams(response.data.exams);
            setDetail(response.data.detail);
            setLink(response.data.link);
            setLoading(false);
            }catch(error){

            }
        }
        fetch();
    },[teachesId])

    if(loading) return <Loader />

    return (<>
        <Navbar />
        <ShowDetail 
            detail={detail}
        />
        <Table 
            data={exams}
            heading={"All Exams"}
            link={link}
        />
    </>)

}

export default TeacherAllExam;