# 🍽️ Restaurant Full Stack Project (Laravel + React)

## 📌 Overview

This is a full-stack restaurant web application built using **Laravel (Backend API)** and **React (Frontend)**.  
The system provides a complete restaurant experience including menu browsing, ordering, booking tables, and admin management.

---

## 🎯 Purpose

This project was built to demonstrate real-world full-stack development skills using modern web technologies and API-driven architecture.

---

## 🚀 Features

- 🔐 User Authentication (Register / Login)
- 🍔 Dynamic Menu with Categories & Items
- 🛒 Shopping Cart System
- 📅 Table Booking System
- 📦 Order Management (Create, Track, Update Status)
- 🧑‍💼 Admin Dashboard
- 📱 Fully Responsive Design

---

## 🧱 Tech Stack

- Laravel 10 (REST API)
- React.js (Vite)
- Axios
- MySQL
- Tailwind CSS

---

## 🎥 Demo Video

👉 Watch Demo Video:  
https://youtu.be/OMLRkXJ0UfU

---

## 🖼️ Screenshots

### 🏠 Home Page
![Home](./assets/images/home.JPEG)

### 📖 About Page
![About](./assets/images/about.JPEG)

### 📋 Menu Page
![Menu](./assets/images/menu.JPEG)

### 🛒 Cart Page
![Cart](./assets/images/cart.JPEG)

### 📅 Booking Modal
![Booking](./assets/images/Booking-modal.JPEG)

---

## 📂 Project Structure

Back-End/ → Laravel API  
Front-End/ → React App  
assets/ → Project screenshots & media  

---

## ⚙️ Setup Instructions

### Backend

cd Back-End/restaurant-api  
composer install  
cp .env.example .env  
php artisan key:generate  
php artisan migrate --seed  
php artisan serve  

---

### Frontend

cd Front-End/restaurant-frontend  
npm install  
npm run dev  

---

## 🔐 Authentication

- Laravel Sanctum is used for API authentication  
- Protected routes for users and admin  
- Token-based session handling  

---

## 🌟 Highlights

- Full-stack RESTful architecture  
- Secure authentication with Laravel Sanctum  
- Clean React component-based UI  
- Real-time cart and order flow  
- Responsive design for all devices  

---

## ⭐ Notes

This project is part of a full-stack portfolio demonstrating:

- CRUD operations  
- Authentication (Sanctum)  
- REST API integration  
- React state management  
- Real-world restaurant system flow  
