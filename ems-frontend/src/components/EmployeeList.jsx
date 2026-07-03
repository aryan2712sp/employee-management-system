/**
 * Displays employees in a searchable table with Edit and Delete actions.
 */
function EmployeeList({ employees, searchTerm, onSearchChange, onEdit, onDelete }) {
  const filteredEmployees = employees.filter((emp) => {
    const query = searchTerm.toLowerCase().trim();
    if (!query) return true;

    const fullName = `${emp.firstName} ${emp.lastName}`.toLowerCase();
    const department = (emp.department || '').toLowerCase();

    return fullName.includes(query) || department.includes(query);
  });

  return (
    <section className="employee-list">
      <div className="list-header">
        <h2>Employee List</h2>
        <input
          type="text"
          className="search-input"
          placeholder="Search by name or department..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {filteredEmployees.length === 0 ? (
        <p className="empty-message">No employees found.</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>{emp.firstName} {emp.lastName}</td>
                  <td>{emp.email}</td>
                  <td>{emp.department}</td>
                  <td>{emp.designation}</td>
                  <td>${emp.salary?.toLocaleString()}</td>
                  <td className="actions">
                    <button
                      type="button"
                      className="btn btn-edit"
                      onClick={() => onEdit(emp)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-delete"
                      onClick={() => onDelete(emp.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default EmployeeList;
