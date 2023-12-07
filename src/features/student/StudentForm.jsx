import { useState } from "react";
import Dashboard from "../../components/Dashboard";

export default function StudentForm({
  handleAddStudent,
  handleFormVisibility,
}) {
  const [newStudent, setNewStudent] = useState({
    name: "",
    age: "",
    grade: "",
    marks: "",
    attendance: "",
    studentClass: "",
    gender: "",
  });

  return (
    <div style={styles.formContainer}>
      <h2>Add student</h2>
      <form
        style={{
          backgroundColor: "black",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <label>
          Name:
          <input
            type="text"
            value={newStudent.name}
            onChange={(e) =>
              setNewStudent({ ...newStudent, name: e.target.value })
            }
          />
        </label>
        <label>
          Age:
          <input
            type="text"
            value={newStudent.age}
            onChange={(e) =>
              setNewStudent({ ...newStudent, age: e.target.value })
            }
          />
        </label>

        <label>
          gender
          <input
            type="text"
            value={newStudent.gender}
            onChange={(e) =>
              setNewStudent({ ...newStudent, gender: e.target.value })
            }
          />
        </label>

        <label>
          Grade:
          <input
            placeholder="enter grade number"
            type="text"
            value={newStudent.grade}
            onChange={(e) =>
              setNewStudent({ ...newStudent, grade: e.target.value })
            }
          />
        </label>
        <label>
          Attendance:
          <input
            placeholder="Enter attendance in %"
            type="text"
            value={newStudent.attendance}
            onChange={(e) =>
              setNewStudent({ ...newStudent, attendance: e.target.value })
            }
          />
        </label>
        <label>
          Marks:
          <input
            placeholder="Enter marks out of 500"
            type="text"
            value={newStudent.marks}
            onChange={(e) =>
              setNewStudent({ ...newStudent, marks: e.target.value })
            }
          />
        </label>

        <label>
          studentClass
          <input
            placeholder="enter class in string A|B|C"
            type="text"
            value={newStudent.studentClass}
            onChange={(e) =>
              setNewStudent({ ...newStudent, studentClass: e.target.value })
            }
          />
        </label>
        <div style={styles.buttonContainer}>
          <button type="button" onClick={() => handleAddStudent(newStudent)}>
            Add
          </button>
          <button type="button" onClick={() => handleFormVisibility(false)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  formContainer: {
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    margin: "0 auto",
  },

  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "10px",
    padding: ".5rem",
  },
};
