package com.example.demo.repository;

import com.example.demo.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for Employee entities.
 * Extends JpaRepository to get built-in CRUD methods like save, findById, and delete.
 */
@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
