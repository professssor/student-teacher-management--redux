import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateStudentDetails } from "./StudentSlice";
import Dashboard from "../../components/Dashboard";

function EditStudentModal({ handleSave, student, handleCloseEdit }) {
  const [editedStudent, setEditedStudent] = useState({ ...student });

  return (
    <div style={styles.modal}>
      <h3>Edit Student Details</h3>
      <label>Name:</label>
      <input
        type="text"
        value={editedStudent.name}
        onChange={(e) =>
          setEditedStudent({ ...editedStudent, name: e.target.value })
        }
      />
      <label>Age:</label>
      <input
        type="text"
        value={editedStudent.age}
        onChange={(e) =>
          setEditedStudent({ ...editedStudent, age: e.target.value })
        }
      />
      <label>Grade:</label>
      <input
        type="text"
        value={editedStudent.grade}
        onChange={(e) =>
          setEditedStudent({ ...editedStudent, grade: e.target.value })
        }
      />
      <label>Marks:</label>
      <input
        type="text"
        value={editedStudent.marks}
        onChange={(e) =>
          setEditedStudent({ ...editedStudent, marks: e.target.value })
        }
      />{" "}
      <label>Attendance:</label>
      <input
        type="text"
        value={editedStudent.attendance}
        onChange={(e) =>
          setEditedStudent({ ...editedStudent, attendance: e.target.value })
        }
      />
      <button onClick={() => handleSave(editedStudent)}>Save</button>
      <button onClick={() => handleCloseEdit()}>Cancel</button>
    </div>
  );
}

function IndividualStudent() {
  const { students } = useSelector((state) => state.students);
  const { studentId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const clickedStudent = students.find((student) => student._id === studentId);

  const dispatch = useDispatch();
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = (editedStudent) => {
    dispatch(
      updateStudentDetails({ id: studentId, updatedData: editedStudent })
    );
    setIsEditing(false);
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
  };

  return (
    <div style={styles.individualStudentContainer}>
      <Dashboard />
      <h3 style={styles.individualStudentTitle}>More Student Details</h3>
      {clickedStudent === undefined && (
        <h3 style={styles.errorMessage}>
          Error: Unable to render student details!! Go back to main page
        </h3>
      )}
      {clickedStudent && (
        <div style={styles.studentDetails}>
          <h4 style={styles.studentName}>Name: {clickedStudent.name}</h4>
          <h4 style={styles.studentInfo}>Age: {clickedStudent.age}</h4>
          <h4 style={styles.studentInfo}>Grade: {clickedStudent.grade} </h4>
          <h4 style={styles.studentInfo}>Marks: {clickedStudent.marks}</h4>
          <h4 style={styles.studentInfo}>
            Attendance: {clickedStudent.attendance}
          </h4>

          <h4 style={styles.studentInfo}>
            studentClass: {clickedStudent.studentClass}
          </h4>

          <button
            style={{ display: "block", margin: "auto", padding: "1rem" }}
            onClick={handleEdit}
          >
            Edit Details
          </button>
        </div>
      )}
      {isEditing && (
        <EditStudentModal
          handleSave={handleSaveEdit}
          student={clickedStudent}
          handleCloseEdit={handleCloseEdit}
        />
      )}
    </div>
  );
}

const styles = {
  individualStudentContainer: {
    backgroundColor: "#f5f5f5",
    padding: "20px",
    borderRadius: "5px",
    margin: "20px",
  },
  individualStudentTitle: {
    fontSize: "24px",
    color: "#333",
  },
  errorMessage: {
    color: "red",
  },
  studentDetails: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginTop: "10px",
  },
  studentName: {
    fontSize: "20px",
    color: "#333",
  },
  studentInfo: {
    fontSize: "16px",
    color: "#555",
  },
  modal: {
    backgroundColor: "black",
    padding: "20px",
    borderRadius: "5px",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
};

export default IndividualStudent;
