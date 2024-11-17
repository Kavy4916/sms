import LoginForm from "./pages/login.jsx";  
import Dashboard  from "./pages/dashboard.jsx";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Logout from "./pages/logut.jsx";
import ChangePassword from "./pages/changePassword.jsx";
import Register from "./pages/register.jsx";
import Evaluation from "./pages/evaluation.jsx";
import Attendance from "./pages/attendance.jsx";
import SubjectEvaluation from "./pages/subjectEvaluation.jsx";
import SubjectAttendance from "./pages/subjectAttendance.jsx";
import RequestUpdate from "./pages/requestUpdate.jsx";
import TeacherLogin from "./pages/teacherLogin.jsx";
import TeacherDashboard from "./pages/teacherDashboard.jsx";
import TeacherLogout from "./pages/teacherLogout.jsx";
import TeacherCourseDetail from "./pages/teacherCourseDeatil.jsx";
import TeacherChangePassword from "./pages/teacherChangePassword.jsx";
import TeacherStudentAttendance from "./pages/teacherStudentAttendance.jsx";
import TeacherStudentEvaluation from "./pages/teacherStudentEvaluation.jsx";
import TeacherCreateClass from "./pages/teacherCreateClass.jsx";
import TeacherAllClass from "./pages/teacherAllClass.jsx";
import TeacherUpdateClass from "./pages/teacherUpdateClass.jsx";
import TeacherCreateExam from "./pages/teacherCreateExam.jsx";
import TeacherAllExam from "./pages/teacherAllExam.jsx";
import TeacherUpdateExam from "./pages/teacherUpdateExam.jsx"
import Footer from "./components/footer.jsx";

function App() {
  return (
    <>
    <div className="bg-gray-100 min-h-[50vh]">
    <Router>
    <Routes>
             <Route  index element={<Dashboard />}/>
             <Route path="/login" element={<LoginForm />}/>
             <Route path="/logout" element={<Logout />}/>
             <Route path="/changePassword" element={<ChangePassword />}/>
             <Route path="/register" element={<Register />}/>
             <Route path="/evaluation" element={<Evaluation />}/>
             <Route path="/attendance" element={<Attendance />}/>
             <Route path="/evaluation/:subjectId" element={<SubjectEvaluation />}/>
             <Route path="/attendance/:subjectId" element={<SubjectAttendance />}/>
             <Route path="/requestUpdate" element={<RequestUpdate />}/>
             <Route path="/teacher/login" element={<TeacherLogin />}/>
             <Route path="/teacher" element={<TeacherDashboard />}/>
             <Route path="/teacher/logout" element={<TeacherLogout />}/>
             <Route path="/teacher/courseDetail/:teachesId" element={<TeacherCourseDetail />}/>
             <Route path="/teacher/changePassword" element={<TeacherChangePassword />}/>
             <Route path="/teacher/student/attendance/:teachesId/:studentId" element={<TeacherStudentAttendance />}/>
             <Route path="/teacher/student/evaluation/:query" element={<TeacherStudentEvaluation />}/>
             <Route path="/teacher/class/create/:teachesId" element={<TeacherCreateClass />}/>
             <Route path="teacher/class/all/:teachesId" element={<TeacherAllClass />}/>
             <Route path="/teacher/class/update/:query" element={<TeacherUpdateClass />}/>
             <Route path="/teacher/exam/create/:teachesId" element={<TeacherCreateExam />}/>
             <Route path="teacher/exam/all/:teachesId" element={<TeacherAllExam />}/>
             <Route path="/teacher/exam/update/:query" element={<TeacherUpdateExam />}/>
    </Routes>
    </Router>
    </div>
    <Footer />
    </>
  );
}

export default App;
