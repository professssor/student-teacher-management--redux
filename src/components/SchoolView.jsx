import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../features/student/StudentSlice";
import Dashboard from "./Dashboard";

const SchoolView = () => {
  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.students);

  const [totalStudents, setTotalStudents] = useState(0);
  const [averageAttendance, setAverageAttendance] = useState(0);
  const [averageMarks, setAverageMarks] = useState(0);
  const [topPerformer, setTopPerformer] = useState(null);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  useEffect(() => {
    // Calculate total students
    setTotalStudents(students.length);

    // Calculate average attendance
    const totalAttendance = students.reduce(
      (acc, student) => acc + student.attendance,
      0
    );
    setAverageAttendance(totalAttendance / totalStudents);

    // Calculate average marks
    const totalMarks = students.reduce(
      (acc, student) => acc + student.marks,
      0
    );
    setAverageMarks(totalMarks / totalStudents);

    // Find the top-performing student
    const sortedStudents = [...students].sort((a, b) => b.marks - a.marks);
    setTopPerformer(sortedStudents[0]);
  }, [students]);

  return (
    <div>
      <Dashboard />
      <h2>School-Wide Statistics</h2>
      <p>Total Number of Students: {totalStudents}</p>
      <p>Average Attendance: {averageAttendance.toFixed(2)}%</p>
      <p>Average Marks: {averageMarks.toFixed(2)}</p>
      {topPerformer && (
        <p>
          Top-Performing Student: {topPerformer.name} (Marks:{" "}
          {topPerformer.marks})
        </p>
      )}
    </div>
  );
};

export default SchoolView;
