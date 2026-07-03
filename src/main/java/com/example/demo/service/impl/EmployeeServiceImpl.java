package com.example.demo.service.impl;

import com.example.demo.entity.Employee;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.EmployeeRepository;
import com.example.demo.service.EmployeeService;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service implementation containing the core business logic for employee CRUD operations.
 * This layer sits between the controller (HTTP) and the repository (database).
 */
@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    /**
     * Fetches every employee from the database.
     */
    @Override
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    /**
     * Fetches a single employee by primary key.
     * Throws ResourceNotFoundException if no employee exists with the given ID.
     */
    @Override
    public Employee getEmployeeById(Long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));
    }

    /**
     * Persists a new employee record. The database auto-generates the ID.
     */
    @Override
    public Employee createEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    /**
     * Updates an existing employee's fields and saves the changes.
     * Only updates if the employee with the given ID already exists.
     */
    @Override
    public Employee updateEmployee(Long id, Employee employee) {
        Employee existingEmployee = getEmployeeById(id);

        existingEmployee.setFirstName(employee.getFirstName());
        existingEmployee.setLastName(employee.getLastName());
        existingEmployee.setEmail(employee.getEmail());
        existingEmployee.setDepartment(employee.getDepartment());
        existingEmployee.setDesignation(employee.getDesignation());
        existingEmployee.setSalary(employee.getSalary());

        return employeeRepository.save(existingEmployee);
    }

    /**
     * Removes an employee from the database by ID.
     * Throws ResourceNotFoundException if the employee does not exist.
     */
    @Override
    public void deleteEmployee(Long id) {
        Employee existingEmployee = getEmployeeById(id);
        employeeRepository.delete(existingEmployee);
    }
}
