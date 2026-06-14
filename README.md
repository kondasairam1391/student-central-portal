# Student-central-portal - Complete Feature List
---

## 🛡️ Security & Authentication
1. **JWT Stateless Authentication**: Secure login/registration system that issues cryptographically signed JSON Web Tokens (JWT) for secure, sessionless user tracking.
2. **Role-Based Access Control (RBAC)**: Strict permission enforcement on both the frontend and backend.
   - **Admins** have full control over the system.
   - **Users** have "Read-Only" privileges for viewing student data.
3. **Password Encryption**: All passwords are hashed using industry-standard `BCrypt` before being stored in the database.
4. **Anti-Brute-Force Rate Limiting**: The login endpoint is protected by an in-memory `Bucket4j` token bucket. It actively tracks IPs and blocks users after 5 rapid login attempts, preventing automated spam attacks.
5. **Secure Configuration Injection**: Sensitive credentials (like the JWT Secret Key and the default Admin password) are injected via `application.properties` instead of being hardcoded in Java classes.

---

## 👥 Admin & User Management
6. **Admin Dashboard**: A dedicated frontend control panel exclusively visible to Admins.
7. **Dynamic Role Promotion/Demotion**: Admins can instantly upgrade standard Users to Admins, or demote Admins back to standard Users with a single click.
8. **Admin Failsafe System**: The backend API actively prevents Admins from accidentally demoting themselves, preventing "lockout" scenarios.

---

## 🎓 Student Management (CRUD)
9. **Full CRUD Operations**: Admins can seamlessly Create, Read, Update, and Delete student records. Standard users can only Read.
10. **Data Transfer Objects (DTOs)**: The API strictly uses DTOs to filter sensitive data (like database IDs and hashed passwords) before transmitting information across the internet.

---

## ⚡ User Experience (UX) & Quality of Life
11. **Live Search & Filtering**: A highly responsive search bar that allows users to instantly filter the student table by Name or Email. The heavy lifting is done at the database level via custom Spring Data JPA queries.
12. **Server-Side Pagination**: The backend splits thousands of records into small chunks (pages) to drastically reduce server load and frontend lag. The React frontend includes dynamic "Previous" and "Next" navigation controls.
13. **Strict Input Validation**:
    - Passwords must be at least 6 characters long.
    - Emails must follow a valid format (e.g., `user@domain.com`).
    - Blank names and passwords are automatically rejected.
14. **Global Exception Handling**: A centralized Spring Boot `@ControllerAdvice` intercepts catastrophic backend errors to return clean JSON error maps instead of leaking dangerous Java stack traces to the internet.
15. **Premium Toast Notifications**: Beautiful, animated popups (via `react-toastify`) that appear in the top right corner to notify users of successful actions (e.g., "Student updated!") or validation errors (e.g., "Passwords do not match").

---

## 🛠️ Technology Stack
- **Frontend**: React (Vite), HTML5, Vanilla CSS, React-Toastify.
- **Backend**: Java 17, Spring Boot, Spring Security, Spring Data JPA, Bucket4j, Hibernate Validator.
- **Database**: H2 In-Memory Database (easily swappable to PostgreSQL or MySQL).
