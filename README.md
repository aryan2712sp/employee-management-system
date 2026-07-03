# 🚀 Enterprise Employee Management System (Full-Stack)

A professional, enterprise-grade full-stack HR portal developed to streamline corporate workspace management, department auditing, and employee data persistence.

## 🛠️ Technology Stack
* **Backend Framework:** Java 17, Spring Boot 3.x, Spring Data JPA
* **Database Engine:** MariaDB / MySQL Relational Database
* **Frontend UI:** React.js (Vite), Axios, HTML5, CSS3

## ✨ Core Features
* **Full CRUD Functionality:** Seamlessly add, view, update, and remove corporate employee records.
* **Live Search Optimization:** Real-time client-side filtering to parse employee directories by name or department instantly.
* **Robust Exception Handling:** Integrated custom global exception handling returning unified API error configurations.

## 🔌 API Documentation
* `GET /api/v1/employees` - Retrieves the entire active employee roster.
* `POST /api/v1/employees` - Validates and persists a new employee object.
* `PUT /api/v1/employees/{id}` - Updates details of an existing employee by ID.
* `DELETE /api/v1/employees/{id}` - Safely deletes an employee record.

## ⚙️ Local Setup Instructions

### Backend (Spring Boot)
1. Ensure MariaDB/MySQL is running locally and create a database named `ems_db`.
2. Configure your local database credentials in `src/main/resources/application.properties`.
3. Launch the server from your terminal:
   ```bash
   .\mvnw spring-boot:run
   ```

### Frontend (React)
1. Navigate into the frontend folder: `cd ems-frontend`
2. Install dependencies: `npm install`
3. Run the web server: `npm run dev`
