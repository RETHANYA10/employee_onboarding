Employee Onboarding Web Application

Overview
--------
A full-stack Employee Onboarding System built with React (Vite) frontend, Node.js/Express backend and MySQL database. The app collects employee details, uploads documents (photo, Aadhaar, PAN), performs basic verification checks, captures geolocation, and stores verified records in MySQL. A dashboard displays stored employees and uploaded document thumbnails.

Features
--------
- Collects: name, email, phone, current address, permanent address, Aadhaar number, PAN number.
- File uploads: employee photo, Aadhaar image, PAN image.
- Verification:
  - Aadhaar: basic length check (12 digits) — placeholder for real API.
  - PAN: regex format check.
  - Location: captured via browser geolocation.
- Stores uploaded files under backend uploads folder and saves file paths in MySQL.
- Dashboard: lists employees with verification flags and image thumbnails.

Project structure
-----------------
employee_onboarding/
├─ backend/
│  ├─ server.js
│  ├─ package.json
│  ├─ .env
│  └─ src/
│     ├─ db.js
│     ├─ routes/
│     │  └─ employees.js
│     └─ uploads/
└─ frontend/
   ├─ index.html
   ├─ package.json
   └─ src/
      ├─ main.jsx
      ├─ App.jsx
      ├─ components/
      │  ├─ EmployeeForm.jsx
      │  └─ Dashboard.jsx
      └─ services/
         └─ api.js

Database schema (MySQL)
-----------------------
CREATE DATABASE IF NOT EXISTS onboarding;
USE onboarding;

CREATE TABLE IF NOT EXISTS employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  roll_number VARCHAR(50),
  name VARCHAR(200) NOT NULL,
  email VARCHAR(200) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address TEXT,
  permanent_address TEXT,
  aadhaar_number VARCHAR(12),
  pan_number VARCHAR(10),
  photo_path VARCHAR(255),
  aadhaar_image_path VARCHAR(255),
  pan_image_path VARCHAR(255),
  aadhaar_verified TINYINT(1) DEFAULT 0,
  pan_verified TINYINT(1) DEFAULT 0,
  location_verified TINYINT(1) DEFAULT 0,
  latitude VARCHAR(50),
  longitude VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

Local setup instructions
------------------------
Prerequisites:
- Node.js (v18+)
- npm
- MySQL
- Git

Backend
1. Open terminal and run:
   cd path/to/employee_onboarding/backend
2. Install dependencies:
   npm install
3. Create .env in backend folder with:
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=onboarding
   DB_PORT=3306
   PORT=4000
4. Start backend:
   node server.js
   (server listens on http://localhost:4000)

Frontend
1. Open a new terminal and run:
   cd path/to/employee_onboarding/frontend
2. Install dependencies:
   npm install
3. Start frontend dev server:
   npm run dev
   (open the URL printed by Vite, typically http://localhost:5173)

Usage
-----
1. Open frontend in browser.
2. Fill the onboarding form, upload photo/Aadhaar/PAN, click "Get Location" then "Submit".
3. If verification passes, the record is saved to MySQL and appears in the dashboard with image thumbnails and verification flags.

Notes and next steps
--------------------
- The Aadhaar and PAN verification in this implementation are basic/local checks. Replace with real third-party APIs for production use.
- Secure credentials: do not commit `.env` to version control.
- Add authentication and access control for the dashboard before deploying publicly.

Contact
-------
Author: Rethanya M
Email: rethanyamaharajan9@gmail.com
Year: 2025
