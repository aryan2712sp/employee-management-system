import { useEffect, useState } from 'react';

const emptyForm = {
  firstName: '',
  lastName: '',
  email: '',
  department: '',
  designation: '',
  salary: '',
};

/**
 * Reusable form for adding a new employee or updating an existing one.
 * Basic client-side validation runs before calling onSubmit.
 */
function EmployeeForm({ employee, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  const isEditMode = Boolean(employee);

  // Populate form fields when editing an existing employee
  useEffect(() => {
    if (employee) {
      setFormData({
        firstName: employee.firstName || '',
        lastName: employee.lastName || '',
        email: employee.email || '',
        department: employee.department || '',
        designation: employee.designation || '',
        salary: employee.salary?.toString() || '',
      });
    } else {
      setFormData(emptyForm);
    }
    setErrors({});
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!formData.department.trim()) {
      newErrors.department = 'Department is required';
    }
    if (!formData.designation.trim()) {
      newErrors.designation = 'Designation is required';
    }
    if (!formData.salary.toString().trim()) {
      newErrors.salary = 'Salary is required';
    } else if (Number(formData.salary) <= 0) {
      newErrors.salary = 'Salary must be greater than zero';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      department: formData.department.trim(),
      designation: formData.designation.trim(),
      salary: Number(formData.salary),
    });
  };

  return (
    <form className="employee-form" onSubmit={handleSubmit}>
      <h2>{isEditMode ? 'Edit Employee' : 'Add New Employee'}</h2>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="John"
          />
          {errors.firstName && <span className="error">{errors.firstName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Doe"
          />
          {errors.lastName && <span className="error">{errors.lastName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john.doe@company.com"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="department">Department</label>
          <input
            id="department"
            name="department"
            type="text"
            value={formData.department}
            onChange={handleChange}
            placeholder="Engineering"
          />
          {errors.department && <span className="error">{errors.department}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="designation">Designation</label>
          <input
            id="designation"
            name="designation"
            type="text"
            value={formData.designation}
            onChange={handleChange}
            placeholder="Software Engineer"
          />
          {errors.designation && <span className="error">{errors.designation}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="salary">Salary</label>
          <input
            id="salary"
            name="salary"
            type="number"
            min="0"
            step="0.01"
            value={formData.salary}
            onChange={handleChange}
            placeholder="50000"
          />
          {errors.salary && <span className="error">{errors.salary}</span>}
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {isEditMode ? 'Update Employee' : 'Add Employee'}
        </button>
        {isEditMode && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default EmployeeForm;
