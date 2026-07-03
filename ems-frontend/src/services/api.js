import axios from 'axios';

// Base Axios instance pointing to the Spring Boot backend
const api = axios.create({
  baseURL: 'http://localhost:9090/api/v1/employees',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Fetch all employees from the backend.
 */
export const getAllEmployees = () => api.get('');

/**
 * Fetch a single employee by ID.
 */
export const getEmployeeById = (id) => api.get(`/${id}`);

/**
 * Create a new employee record.
 * REMOVED the trailing slash here so it hits the base URL exactly
 */
export const createEmployee = (employee) => api.post('', employee);

/**
 * Update an existing employee by ID.
 */
export const updateEmployee = (id, employee) => api.put(`/${id}`, employee);

/**
 * Delete an employee by ID.
 */
export const deleteEmployee = (id) => api.delete(`/${id}`);

export default api;
