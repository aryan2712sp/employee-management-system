package com.example.demo.service;

import com.example.demo.entity.Employee;

import java.util.List;

/**
 * Service layer contract for employee business operations.
 * Controllers depend on this interface, not the implementation — a common interview talking point.
 */
public interface EmployeeService {

    List<Employee> getAllEmployees();

    Employee getEmployeeById(Long id);

    Employee createEmployee(Employee employee);

    Employee updateEmployee(Long id, Employee employee);

    void deleteEmployee(Long id);
}
