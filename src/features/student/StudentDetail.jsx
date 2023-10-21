import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddStudentDetails,
  fetchStudents,
  removeStudentData,
} from "./StudentSlice";
import { useEffect, useState } from "react";
import StudentForm from "./StudentForm";
import { Link } from "react-router-dom";
import Dashboard from "../../components/Dashboard";

export default function StudentDetails() {
  const dispatch = useDispatch();
  const { students, status, error } = useSelector((state) => state.students);
  const [showAddStudentForm, setShowAddStudentForm] = useState(false);
  const [studentArray, setStudentArray] = useState([]);

  console.log(students);

  useEffect(() => {
    console.log("run check");
    dispatch(fetchStudents());
  }, [dispatch]);

  useEffect(() => {
    setStudentArray(students);
  }, [students]);

  const handleAddStudent = (studentData) => {
    if (
      studentData.name === "" ||
      studentData.age === "" ||
      studentData.grade === "" ||
      studentData.marks === "" ||
      studentData.attendance === ""
    ) {
      alert("Please fill in all the fields.");
    } else {
      console.log(studentData, "sher");
      dispatch(AddStudentDetails(studentData));
    }
  };

  const handleFormVisibility = (value) => {
    setShowAddStudentForm(value);
  };

  const handleRemoveStudent = (studentId) => {
    dispatch(removeStudentData(studentId));
  };

  return (
    <div>
      <Dashboard />
      <button onClick={() => setShowAddStudentForm(true)}>Add Student</button>

      {showAddStudentForm && (
        <StudentForm
          handleAddStudent={handleAddStudent}
          handleFormVisibility={handleFormVisibility}
        />
      )}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "",
        }}
      >
        {status === "loading" && <h3>{status}</h3>}

        {error && <h3>{error.message}</h3>}
        {status === "success" &&
          studentArray.map((student, index) => (
            <div key={index} style={styles.studentCard}>
              <h3 style={styles.studentName}>Name: {student?.name}</h3>
              <h5 style={styles.studentDetail}>Age: {student?.age}</h5>
              <h5 style={styles.studentDetail}>Gender: {student?.gender}</h5>
              <h5 style={styles.studentDetail}>Grade: {student?.grade}</h5>
              <button
                style={styles.removeButton}
                onClick={() => handleRemoveStudent(student?._id)}
              >
                Remove
              </button>
              <Link to={`/student/${student._id}`}>
                <button style={styles.removeButton}>view student</button>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}

const styles = {
  studentCard: {
    border: "1px solid #ccc",
    padding: "10px",
    margin: "10px",
    width: "15rem",
    backgroundColor: "#f4f4f4",
  },
  studentName: {
    fontSize: "1.2em",
    color: "#333",
  },
  studentDetail: {
    fontSize: "1em",
    color: "#666",
  },
  removeButton: {
    margin: "4px",
    background: "#ff0000",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
    marginTop: "10px",
  },
};
