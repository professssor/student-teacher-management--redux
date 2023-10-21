import { configureStore } from "@reduxjs/toolkit";
import { studentSlice } from "../features/student/StudentSlice";
import { teacherSlice } from "../features/teacher/TeacherSlice";

export default configureStore({
  reducer: {
    students: studentSlice.reducer,
    teachers: teacherSlice.reducer,
  },
});
