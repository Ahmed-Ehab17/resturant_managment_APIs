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

```plaintext
resturant_managment_APIs/
│
├── controllers/       # Business logic for each route
├── models/            # Sequelize models and DB config
├── routes/            # API route definitions
├── middlewares/       # Authentication and error handling
├── config/            # DB and environment config
├── app.js             # Main Express app setup
├── server.js          # Server entry point
└── README.md



---

## 🚀 Getting Started

### Prerequisites
- Node.js
- PostgreSQL
- Git

### Installation

```bash
# Clone the repo
git clone https://github.com/Ahmed-Ehab17/resturant_managment_APIs.git

# Navigate into the folder
cd resturant_managment_APIs

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Then edit .env with your PostgreSQL credentials and JWT secret

# Run migrations or sync models (optional, based on setup)

# Start the server
npm start

## 📬 API Documentation

Use [Postman](https://www.postman.com/) or similar tools to test the following API endpoints.

### 🔐 Authentication

#### 📌 Register New User
**Endpoint:** `POST /api/auth/register`  
**Description:** Register a new customer or employee.

#### 📌 Login User
**Endpoint:** `POST /api/auth/login`  
**Description:** Authenticate user and return JWT token.

---

### 🍽️ Menu

#### 📌 Get All Menu Items
**Endpoint:** `GET /api/menu`  
**Description:** Retrieve the list of available menu items. Public access.

#### 📌 Edit Menu Item (Employee Only)
**Endpoint:** `PUT /api/menu/:id`  
**Description:** Update an existing menu item. Requires employee authentication.

---

### 🧾 Orders

#### 📌 Place an Order (Customer)
**Endpoint:** `POST /api/order`  
**Description:** Create a new order. Requires customer authentication.



