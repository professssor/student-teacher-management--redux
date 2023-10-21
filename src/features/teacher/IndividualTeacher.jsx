import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateTeacherDetails } from "./TeacherSlice";
import Dashboard from "../../components/Dashboard";

function EditTeacherModal({ handleSave, teacher, handleCloseEdit }) {
  const [editedTeacher, setEditedTeacher] = useState({ ...teacher });

  return (
    <div style={styles.modal}>
      <h3>Edit Teacher Details</h3>
      <label>Name:</label>
      <input
        type="text"
        value={editedTeacher.name}
        onChange={(e) =>
          setEditedTeacher({ ...editedTeacher, name: e.target.value })
        }
      />
      <label>Subject:</label>
      <input
        type="text"
        value={editedTeacher.subject}
        onChange={(e) =>
          setEditedTeacher({ ...editedTeacher, subject: e.target.value })
        }
      />
      <label>contact</label>
      <input
        type="text"
        value={editedTeacher.contact}
        onChange={(e) =>
          setEditedTeacher({ ...editedTeacher, contact: e.target.value })
        }
      />
      <button onClick={() => handleSave(editedTeacher)}>Save</button>
      <button onClick={() => handleCloseEdit()}>Cancel</button>
    </div>
  );
}

function IndividualTeacher() {
  const { teachers } = useSelector((state) => state.teachers);
  const { teacherId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const clickedTeacher = teachers.find((teacher) => teacher._id === teacherId);

  const dispatch = useDispatch();
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = (editedTeacher) => {
    dispatch(
      updateTeacherDetails({ id: teacherId, updatedData: editedTeacher })
    );
    setIsEditing(false);
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
  };

  return (
    <div style={styles.individualTeacherContainer}>
      <Dashboard />
      <h3 style={styles.individualTeacherTitle}>More Teacher Details</h3>
      {clickedTeacher === undefined && (
        <h3 style={styles.errorMessage}>
          Error: Unable to render teacher details!! Go back to the main page
        </h3>
      )}
      {clickedTeacher && (
        <div style={styles.teacherDetails}>
          <h4 style={styles.teacherName}>Name: {clickedTeacher.name}</h4>
          <h4 style={styles.teacherInfo}>Subject: {clickedTeacher.subject}</h4>
          <h4 style={styles.teacherInfo}>Contact: {clickedTeacher.contact}</h4>
          <h4 style={styles.teacherInfo}>Age: {clickedTeacher.age}</h4>
          <h4 style={styles.teacherInfo}>Gender: {clickedTeacher.gender}</h4>

          <button
            style={{ display: "block", margin: "auto", padding: "1rem" }}
            onClick={handleEdit}
          >
            Edit Details
          </button>
        </div>
      )}
      {isEditing && (
        <EditTeacherModal
          handleSave={handleSaveEdit}
          teacher={clickedTeacher}
          handleCloseEdit={handleCloseEdit}
        />
      )}
    </div>
  );
}

const styles = {
  individualTeacherContainer: {
    backgroundColor: "#f5f5f5",
    padding: "20px",
    borderRadius: "5px",
    margin: "20px",
  },
  individualTeacherTitle: {
    fontSize: "24px",
    color: "#333",
  },
  errorMessage: {
    color: "red",
  },
  teacherDetails: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginTop: "10px",
  },
  teacherName: {
    fontSize: "20px",
    color: "#333",
  },
  teacherInfo: {
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

export default IndividualTeacher;
