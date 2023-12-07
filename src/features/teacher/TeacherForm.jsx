import { useState } from "react";
import Dashboard from "../../components/Dashboard";

export default function TeacherForm({
  handleAddTeacher,
  handleFormVisibility,
}) {
  const [newTeacher, setNewTeacher] = useState({
    name: "",
    contact: "",
    subject: "",
    gender: "",
    age: "",
  });

  return (
    <div>
      <h2>Add Teacher</h2>
      <form>
        <label>
          Name:
          <input
            type="text"
            value={newTeacher.name}
            onChange={(e) =>
              setNewTeacher({ ...newTeacher, name: e.target.value })
            }
          />
        </label>
        <label>
          Contact
          <input
            type="text"
            value={newTeacher.contact}
            onChange={(e) =>
              setNewTeacher({ ...newTeacher, contact: e.target.value })
            }
          />
        </label>
        <label>
          Subject:
          <input
            type="text"
            value={newTeacher.subject}
            onChange={(e) =>
              setNewTeacher({ ...newTeacher, subject: e.target.value })
            }
          />
        </label>
        <label>
          Gender:
          <input
            type="text"
            value={newTeacher.gender}
            onChange={(e) =>
              setNewTeacher({ ...newTeacher, gender: e.target.value })
            }
          />
        </label>
        <label>
          Age:
          <input
            type="text"
            value={newTeacher.age}
            onChange={(e) =>
              setNewTeacher({ ...newTeacher, age: e.target.value })
            }
          />
        </label>
        <button type="button" onClick={() => handleAddTeacher(newTeacher)}>
          Add
        </button>
        <button type="button" onClick={() => handleFormVisibility(false)}>
          Cancel
        </button>
      </form>
    </div>
  );
}
