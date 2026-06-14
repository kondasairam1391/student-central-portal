import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentForm from "./StudentForm";
import StudentList from "./StudentList";
import AdminPanel from "./AdminPanel";
import { toast } from "react-toastify";
import { getStudents, addStudent, updateStudent, deleteStudent } from "./api";
import "./Dashboard.css";

function Dashboard() {
  const [pageData, setPageData] = useState({ content: [], totalPages: 0, number: 0 });
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [activeTab, setActiveTab] = useState("students");
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  const fetchStudents = () => {
    getStudents(search, page, 10)
      .then(setPageData)
      .catch(err => toast.error(err.message));
  };

  useEffect(() => {
    fetchStudents();
  }, [search, page]);

  const submit = async (student) => {
    try {
      if (student.id) {
        await updateStudent(student.id, student);
        toast.success("Student updated successfully!");
      } else {
        await addStudent(student);
        toast.success("Student added successfully!");
      }
      fetchStudents();
      setSelectedStudent(null);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const remove = async (id) => {
    try {
      await deleteStudent(id);
      toast.success("Student deleted!");
      fetchStudents();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="dashboard-layout">
      <header className="dashboard-header">
        <h1>Student Central Portal</h1>
        {role === 'ROLE_ADMIN' && (
          <div className="admin-tabs">
            <button className={`tab-btn ${activeTab === 'students' ? 'active' : ''}`} onClick={() => setActiveTab('students')}>Students</button>
            <button className={`tab-btn ${activeTab === 'admin' ? 'active' : ''}`} onClick={() => setActiveTab('admin')}>Manage Users</button>
          </div>
        )}
        <div className="user-info">
          <span>Welcome, {localStorage.getItem("username") || 'User'} ({role === 'ROLE_ADMIN' ? 'Admin' : 'User'})</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </header>
      <div className="app-container">
        {activeTab === 'admin' ? (
          <AdminPanel />
        ) : (
          <>
            {role === 'ROLE_ADMIN' && (
              <StudentForm
                key={selectedStudent?.id || "new"}
                selectedStudent={selectedStudent}
                onSubmit={submit}
              />
            )}
            <StudentList
              students={pageData.content}
              onEdit={setSelectedStudent}
              onDelete={remove}
              role={role}
              search={search}
              setSearch={setSearch}
              page={page}
              setPage={setPage}
              totalPages={pageData.totalPages}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
