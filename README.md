# 🍽️ Restaurant Management System - Backend APIs

This is the backend implementation of a Restaurant Management System built using **Node.js**, **Express.js**, and **PostgreSQL**. The system supports two separate user roles: **customers** and **employees**, with distinct functionalities and secure access control.

Hosted on an **AWS EC2** server, this backend powers two applications:
- A **Customer App** for placing orders, browsing the menu, and managing reservations.
- An **Employee App** for managing orders, updating the menu, and viewing reservations.

---

## 🔧 Technologies Used

- **Node.js**
- **Express.js**
- **PostgreSQL** (with Sequelize ORM)
- **JWT** (Authentication)
- **Amazon EC2** (Deployment)
- **Postman** (Testing)
- **bcrypt** (Password Hashing)
- **CORS, dotenv, morgan**, and other middleware

---

## 🔐 Features

- Secure user authentication with JWT
- Role-based access for customers and employees
- CRUD operations for:
  - Menu items
  - Orders
  - Reservations
  - Users
- Input validation and error handling
- RESTful API design
- Deployment-ready (hosted on AWS EC2)

---

## 📁 Project Structure

resturant_managment_APIs/
│
├── controllers/ # Business logic for each route
├── models/ # Sequelize models and DB config
├── routes/ # API route definitions
├── middlewares/ # Authentication and error handling
├── config/ # DB and environment config
├── app.js # Main Express app setup
├── server.js # Server entry point
└── README.md

