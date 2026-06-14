import "./StudentList.css";

function StudentList({ students, onEdit, onDelete, role, search, setSearch, page, setPage, totalPages }) {
  return (
    <div className="list-card">
      <div className="list-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>Student List</h3>
        <input 
          type="text" 
          placeholder="Search by name or email..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc', width: '250px' }}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            {role === 'ROLE_ADMIN' && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {students && students.length > 0 ? (
            students.map((s) => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{s.age}</td>
                {role === 'ROLE_ADMIN' && (
                  <td>
                    <button className="edits" onClick={() => onEdit(s)}>
                      Edit
                    </button>
                    <button className="delete" onClick={() => onDelete(s.id)}>
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={role === 'ROLE_ADMIN' ? 4 : 3} style={{ textAlign: 'center', padding: '1rem' }}>
                No students found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
          <button 
            disabled={page === 0} 
            onClick={() => setPage(page - 1)}
            style={{ padding: '0.5rem 1rem', cursor: page === 0 ? 'not-allowed' : 'pointer' }}
          >
            Previous
          </button>
          <span style={{ padding: '0.5rem' }}>Page {page + 1} of {totalPages}</span>
          <button 
            disabled={page === totalPages - 1} 
            onClick={() => setPage(page + 1)}
            style={{ padding: '0.5rem 1rem', cursor: page === totalPages - 1 ? 'not-allowed' : 'pointer' }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default StudentList;
