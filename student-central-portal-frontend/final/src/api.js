const BASE_URL = "http://localhost:8080/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const loginUser = async (credentials) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Login failed");
  }
  return res.json();
};

export const registerUser = async (credentials) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const messages = Object.values(errorData).join(", ");
    throw new Error(messages || "Registration failed");
  }
  return res.json();
};

export const getStudents = (search = "", page = 0, size = 10) => 
  fetch(`${BASE_URL}/students?search=${encodeURIComponent(search)}&page=${page}&size=${size}`, {
    headers: { ...getAuthHeaders() }
  }).then((res) => {
    if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("token");
        window.location.href = '/login';
    }
    return res.json();
  });

export const addStudent = async (student) => {
  const res = await fetch(`${BASE_URL}/students`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify(student),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(Object.values(err).join(", ") || "Failed to add student");
  }
  return res.json();
};

export const updateStudent = async (id, student) => {
  const res = await fetch(`${BASE_URL}/students/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify(student),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(Object.values(err).join(", ") || "Failed to update student");
  }
  return res.json();
};

export const deleteStudent = (id) =>
  fetch(`${BASE_URL}/students/${id}`, { 
    method: "DELETE",
    headers: { ...getAuthHeaders() }
  });

export const getUsers = () => 
  fetch(`${BASE_URL}/users`, {
    headers: { ...getAuthHeaders() }
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch users");
    return res.json();
  });

export const updateUserRole = (id, role) =>
  fetch(`${BASE_URL}/users/${id}/role`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify({ role }),
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to update role");
    return res.json();
  });
