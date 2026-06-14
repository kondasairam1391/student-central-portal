import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { getUsers, updateUserRole } from "./api";
import "./AdminPanel.css";

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const currentUser = localStorage.getItem("username");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRoleToggle = async (user) => {
    const newRole = user.role === "ROLE_ADMIN" ? "ROLE_USER" : "ROLE_ADMIN";
    try {
      await updateUserRole(user.id, newRole);
      toast.success(`User ${user.username} is now ${newRole === 'ROLE_ADMIN' ? 'an Admin' : 'a User'}`);
      fetchUsers();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="admin-panel">
      <h2>User Management</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.username} {user.username === currentUser && "(You)"}</td>
              <td><span className={`role-badge ${user.role}`}>{user.role.replace("ROLE_", "")}</span></td>
              <td>
                {user.username !== currentUser && (
                  <button 
                    className={`toggle-btn ${user.role === 'ROLE_ADMIN' ? 'demote' : 'promote'}`}
                    onClick={() => handleRoleToggle(user)}
                  >
                    {user.role === "ROLE_ADMIN" ? "Demote to User" : "Promote to Admin"}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPanel;
