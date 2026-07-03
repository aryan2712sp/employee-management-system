import { useEffect, useState } from 'react';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import {
  createEmployee,
  deleteEmployee,
  getAllEmployees,
  updateEmployee,
} from './services/api';
import './App.css';

function App() {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Load all employees when the app first mounts
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getAllEmployees();
      setEmployees(response.data);
    } catch (err) {
      setError('Failed to load employees. Is the backend running on port 9090?');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (employeeData) => {
    try {
      setError('');
      if (editingEmployee) {
        await updateEmployee(editingEmployee.id, employeeData);
        setEditingEmployee(null);
      } else {
        await createEmployee(employeeData);
      }
      await fetchEmployees();
    } catch (err) {
      setError(
        editingEmployee
          ? 'Failed to update employee.'
          : 'Failed to create employee.'
      );
      console.error(err);
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) {
      return;
    }

    try {
      setError('');
      await deleteEmployee(id);
      if (editingEmployee?.id === id) {
        setEditingEmployee(null);
      }
      await fetchEmployees();
    } catch (err) {
      setError('Failed to delete employee.');
      console.error(err);
    }
  };

  const handleCancelEdit = () => {
    setEditingEmployee(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Employee Management System</h1>
        <p>Manage your team — add, edit, search, and delete employees.</p>
      </header>

      {error && <div className="alert alert-error">{error}</div>}

      <EmployeeForm
        employee={editingEmployee}
        onSubmit={handleFormSubmit}
        onCancel={handleCancelEdit}
      />

      {loading ? (
        <p className="loading">Loading employees...</p>
      ) : (
        <EmployeeList
          employees={employees}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default App;
