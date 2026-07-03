# Employee Management System (EMS)

> A production-style full-stack application for managing employee records — built with a layered Spring Boot REST API and a modular React single-page interface.

---

## Table of Contents

- [Project Overview](#-project-overview)
- [Tech Stack](#️-tech-stack)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Local Setup Guide](#️-local-setup-guide)
- [API Endpoints](#-api-endpoints)
- [Error Handling](#-error-handling)

---

## 🚀 Project Overview

The **Employee Management System** is a full-stack web application that enables organizations to create, read, update, and delete employee records through a clean, responsive user interface.

The **backend** follows enterprise conventions: a layered architecture (Controller → Service → Repository → Entity) with Jakarta Bean Validation, centralized exception handling, and Spring Data JPA for persistence. Hibernate auto-manages the database schema on startup.

The **frontend** is a React SPA built with Vite. It communicates with the REST API via Axios and provides real-time search, form validation, and CRUD operations — all managed with lightweight `useState` and `useEffect` hooks.

| Layer        | Responsibility                                      |
| ------------ | --------------------------------------------------- |
| **Frontend** | UI, client-side validation, API integration         |
| **API**      | REST endpoints, request validation, HTTP responses  |
| **Service**  | Business logic and transaction orchestration        |
| **Repository** | Database access via Spring Data JPA             |
| **Database** | Persistent storage (MariaDB / MySQL)                |

**Default URLs**

| Service  | URL                              |
| -------- | -------------------------------- |
| Backend  | `http://localhost:9090`          |
| Frontend | `http://localhost:5173`          |
| API Base | `http://localhost:9090/api/v1/employees` |

---

## 🛠️ Tech Stack

### Backend

| Technology            | Version / Details                          |
| --------------------- | ------------------------------------------ |
| **Java**              | 17                                         |
| **Spring Boot**       | 4.1.0                                      |
| **Spring Web MVC**    | RESTful API layer                          |
| **Spring Data JPA**   | ORM & repository abstraction               |
| **Hibernate**         | Schema management (`ddl-auto=update`)      |
| **Jakarta Validation**| Server-side input validation               |
| **MariaDB**           | Primary database (MySQL-compatible)          |
| **Maven**             | Dependency management & build tool           |

### Frontend

| Technology     | Version / Details                |
| -------------- | -------------------------------- |
| **React**      | 19.x                             |
| **Vite**       | 8.x — fast dev server & bundler  |
| **Axios**      | HTTP client for REST integration |
| **CSS**        | Component-scoped styling         |

### Prerequisites

- **JDK 17+**
- **Maven** (or use the included Maven Wrapper)
- **MariaDB** or **MySQL** (running locally on port `3306`)
- **Node.js 18+** and **npm**

---

## 🏗️ Architecture

```
┌─────────────────────┐         HTTP (JSON)         ┌──────────────────────────┐
│   React Frontend    │  ─────────────────────────► │   Spring Boot Backend    │
│   (Vite · Port 5173)│  ◄───────────────────────── │   (Port 9090)            │
└─────────────────────┘                             └────────────┬─────────────┘
                                                                 │
                                                                 ▼
                                                      ┌──────────────────────┐
                                                      │  MariaDB / MySQL     │
                                                      │  Database: ems_db    │
                                                      └──────────────────────┘
```

**Backend package layout** (`com.example.demo`)

```
controller/   → REST endpoints & HTTP mapping
service/      → Business logic interface & implementation
repository/   → JPA data access
entity/       → Database model & validation rules
exception/    → Custom exceptions & global error handler
```

---

## 📁 Project Structure

```
demo/
├── src/main/java/com/example/demo/
│   ├── controller/EmployeeController.java
│   ├── entity/Employee.java
│   ├── exception/GlobalExceptionHandler.java
│   ├── exception/ResourceNotFoundException.java
│   ├── repository/EmployeeRepository.java
│   ├── service/EmployeeService.java
│   ├── service/impl/EmployeeServiceImpl.java
│   └── DemoApplication.java
├── src/main/resources/
│   └── application.properties
├── ems-frontend/
│   ├── src/
│   │   ├── components/EmployeeForm.jsx
│   │   ├── components/EmployeeList.jsx
│   │   ├── services/api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── pom.xml
└── README.md
```

---

## ⚙️ Local Setup Guide

### 1. Database Setup

Create the database in MariaDB or MySQL:

```sql
CREATE DATABASE ems_db;
```

### 2. Backend Configuration

Open `src/main/resources/application.properties` and configure your local database credentials:

```properties
spring.application.name=demo

# MariaDB datasource (local ems_db)
spring.datasource.url=jdbc:mariadb://localhost:3306/ems_db
spring.datasource.driver-class-name=org.mariadb.jdbc.Driver
spring.datasource.username=root
spring.datasource.password=

# JPA / Hibernate
spring.jpa.database-platform=org.hibernate.dialect.MariaDBDialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# Server
server.port=9090
```

> **Note:** Set `spring.datasource.password` to your local MariaDB/MySQL root password if one is configured. With `ddl-auto=update`, Hibernate automatically creates and updates the `employees` table on startup.

### 3. Run the Backend

From the project root:

```powershell
.\mvnw spring-boot:run
```

The API will be available at **`http://localhost:9090`**.

Verify with:

```powershell
curl http://localhost:9090/api/v1/employees
```

### 4. Run the Frontend

In a separate terminal:

```powershell
cd ems-frontend
npm install
npm run dev
```

Open **`http://localhost:5173`** in your browser. The React app connects to the backend at `http://localhost:9090/api/v1/employees`.

---

## 🔌 API Endpoints

**Base URL:** `http://localhost:9090/api/v1/employees`

All endpoints return and accept `application/json`.

### Employee Resource

| Method   | Endpoint                        | Description                    | Success Status |
| -------- | ------------------------------- | ------------------------------ | -------------- |
| `GET`    | `/api/v1/employees`             | Retrieve all employees         | `200 OK`       |
| `GET`    | `/api/v1/employees/{id}`        | Retrieve employee by ID        | `200 OK`       |
| `POST`   | `/api/v1/employees`             | Create a new employee          | `201 Created`  |
| `PUT`    | `/api/v1/employees/{id}`        | Update an existing employee    | `200 OK`       |
| `DELETE` | `/api/v1/employees/{id}`        | Delete an employee by ID       | `204 No Content` |

### Request Body (POST / PUT)

```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane.smith@company.com",
  "department": "Engineering",
  "designation": "Senior Developer",
  "salary": 85000
}
```

| Field          | Type   | Required | Validation                          |
| -------------- | ------ | -------- | ----------------------------------- |
| `firstName`    | String | Yes      | Must not be blank                   |
| `lastName`     | String | Yes      | Must not be blank                   |
| `email`        | String | Yes      | Must be a valid email address       |
| `department`   | String | Yes      | Must not be blank                   |
| `designation`  | String | Yes      | Must not be blank                   |
| `salary`       | Number | Yes      | Must be a positive value            |
| `id`           | Long   | Auto     | Generated by the database on create |

### Sample Response (GET / POST / PUT)

```json
{
  "id": 1,
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane.smith@company.com",
  "department": "Engineering",
  "designation": "Senior Developer",
  "salary": 85000
}
```

### Example cURL Commands

**Create an employee**

```bash
curl -X POST http://localhost:9090/api/v1/employees \
  -H "Content-Type: application/json" \
  -d "{\"firstName\":\"Jane\",\"lastName\":\"Smith\",\"email\":\"jane.smith@company.com\",\"department\":\"Engineering\",\"designation\":\"Senior Developer\",\"salary\":85000}"
```

**Update an employee**

```bash
curl -X PUT http://localhost:9090/api/v1/employees/1 \
  -H "Content-Type: application/json" \
  -d "{\"firstName\":\"Jane\",\"lastName\":\"Smith\",\"email\":\"jane.updated@company.com\",\"department\":\"Engineering\",\"designation\":\"Tech Lead\",\"salary\":95000}"
```

**Delete an employee**

```bash
curl -X DELETE http://localhost:9090/api/v1/employees/1
```

---

## 🛡️ Error Handling

When a resource is not found (e.g., invalid employee ID), the API returns a structured **404 Not Found** response:

```json
{
  "timestamp": "2026-07-04T01:30:00",
  "status": 404,
  "error": "Not Found",
  "message": "Employee not found with id: 99"
}
```

This is handled centrally by `GlobalExceptionHandler`, ensuring consistent error responses across all endpoints.

---

## 📄 License

This project is open source and available for educational and portfolio use.
