import LoginForm from "./pages/login.jsx";  
import Dashboard  from "./pages/dashboard.jsx";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Logout from "./pages/logut.jsx";
import ChangePassword from "./pages/changePassword.jsx";
import Register from "./pages/register.jsx";
import Evaluation from "./pages/evaluation.jsx";
import SubjectEvaluation from "./pages/subjectEvaluation.jsx";
import RequestUpdate from "./pages/requestUpdate.jsx";
import TeacherLogin from "./pages/teacherLogin.jsx";
import TeacherDashboard from "./pages/teacherDashboard.jsx";
import TeacherLogout from "./pages/teacherLogout.jsx";
import TeacherCourseDetail from "./pages/teacherCourseDeatil.jsx";
import TeacherChangePassword from "./pages/teacherChangePassword.jsx";
import TeacherAttendanceDetail from "./pages/teacherAttendanceDetail.jsx";
import TeacherEvaluationDetail from "./pages/teacherEvaluationDetail.jsx";

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
    <Router>
    <Routes>
             <Route  index element={<Dashboard />}/>
             <Route path="/login" element={<LoginForm />}/>
             <Route path="/logout" element={<Logout />}/>
             <Route path="/changePassword" element={<ChangePassword />}/>
             <Route path="/register" element={<Register />}/>
             <Route path="/evaluation" element={<Evaluation />}/>
             <Route path="/evaluation/:subjectId" element={<SubjectEvaluation />}/>
             <Route path="/requestUpdate" element={<RequestUpdate />}/>
             <Route path="/teacher/login" element={<TeacherLogin />}/>
             <Route path="/teacher" element={<TeacherDashboard />}/>
             <Route path="/teacher/logout" element={<TeacherLogout />}/>
             <Route path="/teacher/courseDetail/:teachesId" element={<TeacherCourseDetail />}/>
             <Route path="/teacher/changePassword" element={<TeacherChangePassword />}/>
             <Route path="/teacher/attendanceDetail/:query" element={<TeacherAttendanceDetail />}/>
             <Route path="/teacher/evaluationDetail/:query" element={<TeacherEvaluationDetail />}/>
    </Routes>
    </Router>
    </div>
  );
}

export default App;
