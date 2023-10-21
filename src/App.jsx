import { Route, Routes } from "react-router-dom";
import "./App.css";
import StudentDetails from "./features/student/StudentDetail";
import IndividualStudent from "./features/student/IndividualStudent";
import TeacherDetails from "./features/teacher/TeacherDetails";
import IndividualTeacher from "./features/teacher/IndividualTeacher";
import ClassView from "./components/ClassView";
import SchoolView from "./components/SchoolView";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/student" element={<StudentDetails />} />
        <Route path="/teacher" element={<TeacherDetails />} />
        <Route path="/student/:studentId" element={<IndividualStudent />} />
        <Route path="/teacher/:teacherId" element={<IndividualTeacher />} />
        <Route path="/classview" element={<ClassView />} />
        <Route path="/schoolView" element={<SchoolView />} />
      </Routes>
    </div>
  );
}

export default App;
