# 🗂️ Project & Task Management System

A full-stack web application that enables multiple users to manage their personal projects and associated tasks. Built with **Express.js**, **React.js**, and **MongoDB/PostgreSQL**, this app supports full CRUD operations and secure user authentication.

---

## 🚀 Features

### 👤 User Management
- User **Signup** with Name, Email, Password, and Country.
- **Login** using secure JWT authentication.
- Passwords are hashed for security.

### 📁 Project Management
- Each user can create up to **4 projects**.
- Projects are isolated per user.

### ✅ Task Management
- Each project can have multiple tasks.
- Perform **Create**, **Read**, **Update**, and **Delete** operations on tasks.
- Task attributes:
  - `Title`
  - `Description`
  - `Status` (e.g., Todo, In Progress, Done)
  - `Created At` and `Completed At` timestamps

---

## 🛠️ Tech Stack

| Tech        | Description                       |
|-------------|-----------------------------------|
| **Frontend**| React.js + Tailwind CSS 
| **Backend** | Express.js (Node.js)              |
| **Database**| Supabase            
| **Auth**    | JWT-based Authentication          |

---
