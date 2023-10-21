import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import {
//   AddTeacherDetails,
//   fetchTeachers,
//   removeTeacherData,
// } from "./TeacherSlice"; // Assuming you have a TeacherSlice

import {
  addTeacherDetails,
  fetchTeachers,
  removeTeacherData,
  updateTeacherDetails,
} from "./TeacherSlice";
import { useEffect, useState } from "react";
import TeacherForm from "./TeacherForm"; // Create a TeacherForm component
import { Link } from "react-router-dom";
import Dashboard from "../../components/Dashboard";

export default function TeacherDetails() {
  const dispatch = useDispatch();
  const { teachers, status, error } = useSelector((state) => state.teachers);
  const [showAddTeacherForm, setShowAddTeacherForm] = useState(false);
  const [teacherArray, setTeacherArray] = useState([]);

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  useEffect(() => {
    setTeacherArray(teachers);
  }, [teachers]);

  const handleAddTeacher = (teacherData) => {
    dispatch(addTeacherDetails(teacherData));
  };

  const handleFormVisibility = (value) => {
    setShowAddTeacherForm(value);
  };

  const handleRemoveTeacher = (teacherId) => {
    dispatch(removeTeacherData(teacherId));
  };

  return (
    <div>
      <Dashboard />
      <button onClick={() => setShowAddTeacherForm(true)}>Add Teacher</button>

      {showAddTeacherForm && (
        <TeacherForm
          handleAddTeacher={handleAddTeacher}
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
          teacherArray.map((teacher, index) => (
            <div key={index} style={styles.teacherCard}>
              <h3 style={styles.teacherName}>Name: {teacher?.name}</h3>
              <h5 style={styles.teacherDetail}>Subject: {teacher?.subject}</h5>
              <h5 style={styles.teacherDetail}>contact: {teacher?.contact}</h5>
              <button
                style={styles.removeButton}
                onClick={() => handleRemoveTeacher(teacher?._id)}
              >
                Remove
              </button>
              <Link to={`/teacher/${teacher._id}`}>
                <button style={styles.viewButton}>View Teacher</button>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}

const styles = {
  teacherCard: {
    border: "1px solid #ccc",
    padding: "10px",
    margin: "10px",
    width: "15rem",
    backgroundColor: "#f4f4f4",
  },
  teacherName: {
    fontSize: "1.2em",
    color: "#333",
  },
  teacherDetail: {
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
  viewButton: {
    margin: "4px",
    background: "#0073e6",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
    marginTop: "10px",
  },
};
