# 🌾 KrishiBazar

KrishiBazar is a mobile-first platform that connects customers directly with local farmers, allowing them to purchase fresh, farm-grown produce without intermediaries. This project supports local agriculture and promotes a fair, transparent supply chain for both consumers and farmers.

---

## 📱 Features

### 👨‍🌾 Farmer Module
- Register/Login as a farmer
- Create and manage profile
- Add, edit, and remove product listings
- View and manage incoming orders

### 🛒 Customer Module
- Browse and search fresh products
- View product details and farmer info
- Add to cart and place orders
- Track orders and view order history

### 🔎 Common Features
- Category and price-based filters
- Secure JWT-based authentication
- Order management dashboard
- Role-based access control (Farmer vs. Customer)

---

## 🛠 Tech Stack

| Layer       | Technology                     |
|-------------|--------------------------------|
| Frontend    | React Native (with Expo)       |
| Backend     | Node.js, Express.js            |
| ORM         | Prisma                         |
| Database    | MySQL                          |
| Auth        | JSON Web Tokens (JWT)          |
| Dev Tools   | npm/yarn, Postman, GitHub      |

---

## 🚀 Getting Started

### 🔧 Prerequisites
- Node.js (v18+)
- MySQL
- Expo CLI
- Git

### 📦 Backend Setup

```bash
cd krishibazar-backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
