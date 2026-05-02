# 🛒 E-Commerce Fullstack Platform

A modern fullstack e-commerce web application built with React + TypeScript frontend and ASP.NET Core 8 Web API backend.

---

## 🚀 Project Overview

This project is a real-world inspired e-commerce platform with authentication, product management, shopping cart, and order processing.

It demonstrates fullstack development skills using modern web technologies.

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
- Users, Products, Categories, Orders, OrderItems

---

## ✨ Features

### 🔐 Authentication
- User registration
- Login with JWT
- Protected routes

### 🛍️ Products
- Product listing
- Category filtering
- Search functionality

### 🛒 Cart System
- Add / remove products
- Quantity management
- Persistent cart state

### 📦 Orders
- Place orders
- Order history
- User-specific data

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

## ⚙️ Running the Project Locally

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

Frontend connects to backend using Axios:

baseURL = "https://localhost:5062/api"
📌 Purpose

This project was built to demonstrate:

Fullstack development skills
REST API design
JWT authentication
Real-world e-commerce logic
Frontend state management
👩‍💻 Author

Fidan Teymurova
GitHub: fidanTeymurova-blip
