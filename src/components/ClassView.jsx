import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../features/student/StudentSlice";
import Dashboard from "./Dashboard";

const cardStyle = {
  border: "1px solid #ccc",
  borderRadius: "5px",
  padding: "10px",
  margin: "10px",
  width: "300px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
};

const flexContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
};

const ClassView = () => {
  const { students, status, error } = useSelector((state) => state.students);
  const [studentArray, setStudentArray] = useState([]);
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedGender, setSelectedGender] = useState("all");
  const [selectedSort, setSelectedSort] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  useEffect(() => {
    setStudentArray(students);
  }, [students]);

  const filterStudents = () => {
    const genderFilteredStudents = students.filter(
      (student) => student.gender === selectedGender
    );
    setStudentArray([...genderFilteredStudents]);
  };

  const filterByClass = (e) => {
    setSelectedClass(e.target.value);
    setSelectedSort("");
    const selectedValue = e.target.value;

    if (selectedValue === "all") {
      setStudentArray([...students]);
    } else {
      const classFiltered = students.filter(
        (student) => student.studentClass === selectedValue
      );
      setStudentArray([...classFiltered]);
    }
  };

  const handleSort = (criteria) => {
    setSelectedSort(criteria);
    const sortedStudents = [...students];
    sortedStudents.sort((a, b) => {
      if (criteria === "name") {
        return a.name.localeCompare(b.name);
      } else if (criteria === "age") {
        return a.age - b.age;
      } else if (criteria === "attendance") {
        return a.attendance - b.attendance;
      } else if (criteria === "marks") {
        return a.marks - b.marks;
      }
      return 0;
    });
    setStudentArray(sortedStudents);
  };

  return (
    <div>
      <Dashboard />
      <select value={selectedClass} onChange={(e) => filterByClass(e)}>
        <option value="all">All Classes</option>
        <option value="A">Class A</option>
        <option value="B">Class B</option>
      </select>

      <select
        value={selectedGender}
        onChange={(e) => setSelectedGender(e.target.value)}
      >
        <option value="all">All Genders</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <button onClick={filterStudents}>Filter by Gender</button>

      <div>
        <button onClick={() => handleSort("name")}>Sort by Name</button>
        <button onClick={() => handleSort("age")}>Sort by Age</button>
        <button onClick={() => handleSort("attendance")}>
          Sort by Attendance
        </button>
        <button onClick={() => handleSort("marks")}>Sort by Marks</button>
      </div>

      <div style={flexContainer}>
        {status === "loading" && <h1>Loading</h1>}
        {error && <h1>Error</h1>}
        {studentArray.map((student) => (
          <div key={student.id} style={cardStyle}>
            <h3>Name: {student?.name}</h3>
            <h5>Age: {student?.age}</h5>
            <h5>Grade: {student?.grade}</h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassView;
