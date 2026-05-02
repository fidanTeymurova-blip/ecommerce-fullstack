# 🛒 E-Commerce Fullstack Platform

A modern fullstack e-commerce web application built for learning and portfolio purposes.

---

## 🚀 Project Overview

This project is a simple but real-world inspired online shopping platform with full authentication, product management, cart system, and order processing.

It demonstrates fullstack development skills using React frontend and ASP.NET Core backend.

---

## 🏗️ Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Axios
- Context API
- React Router

### Backend
- ASP.NET Core 8 Web API
- Entity Framework Core
- JWT Authentication
- REST API architecture

### Database
- MySQL
- Tables:
  - Users
  - Products
  - Categories
  - Orders
  - OrderItems

---

## ✨ Features

### 🔐 Authentication
- User registration
- Login with JWT
- Protected routes

### 🛍️ Product System
- Product listing
- Category filtering
- Search functionality

### 🛒 Shopping Cart
- Add/remove products
- Quantity management
- Persistent cart state

### 📦 Orders
- Place order
- Order history
- User-specific orders

---

## 📁 Project Structure


ecommerce-fullstack
│
├── backend
│ └── ECommerceAPI (ASP.NET Core 8 Web API)
│
├── frontend
│ └── ecommerce-frontend3 (React + TypeScript + Vite)


---

## ⚙️ How to Run Locally

### Backend

```bash
cd backend/ECommerceAPI
dotnet restore
dotnet build
dotnet run

Backend runs on:

https://localhost:5062
Frontend
cd frontend/ecommerce-frontend3
npm install
npm run dev

Frontend runs on:

http://localhost:5173
🔗 API Connection

Frontend connects to backend via Axios:

baseURL = "https://localhost:5062/api"
📌 Why This Project?

This project was built to demonstrate:

Fullstack development skills
REST API design
Authentication systems (JWT)
Real-world e-commerce logic
Frontend state management

It is suitable for:

Junior Fullstack Developer roles
Internship applications
Portfolio showcase
👩‍💻 Author
Fidan Teymurova
GitHub: fidanTeymurova-blip

Fidan Teymurova
GitHub: fidanTeymurova-blip
