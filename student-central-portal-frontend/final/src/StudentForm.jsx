import { useState } from "react";
import "./StudentForm.css";

const empty = { name: "", email: "", age: "" };

function StudentForm({ selectedStudent, onSubmit }) {
  const [student, setStudent] = useState(selectedStudent ?? empty);

  const submit = () => {
    if (!student.name) {
      alert("Name field must be entered");
      return;
    }
    if (!student.email.includes("@")) {
      alert("Invalid email");
      return;
    }
    if (!student.age || Number(student.age) < 0) {
      alert("Age must be greater than zero");
      return;
    }

    onSubmit(student);
    setStudent(empty);
  };

  return (
    <div className="form-card">
      <h3>{student.id ? "Update Student" : "Add Student"}</h3>

      <input
        placeholder="Name"
        value={student.name}
        onChange={(e) => setStudent({ ...student, name: e.target.value })}
      />

      <input
        placeholder="Email"
        value={student.email}
        onChange={(e) => setStudent({ ...student, email: e.target.value })}
      />

      <input
        min="1"
        type="number"
        placeholder="Age"
        value={student.age}
        onChange={(e) => setStudent({ ...student, age: e.target.value })}
      />

      <button onClick={submit}>{student.id ? "Update" : "Add"}</button>
    </div>
  );
}

export default StudentForm;
