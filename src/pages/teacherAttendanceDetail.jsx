import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";

const TeacherAttendanceDetail = ()=>{
    const {query} = useParams();  
    return <h1>Viwing detail of student id {query.split("_")[1]} for teaches id {query.split("_")[0]}</h1>
}
export default TeacherAttendanceDetail;