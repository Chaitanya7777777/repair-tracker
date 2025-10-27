<h1 align="center">🔧 Real-Time Repair Tracker (MVP)</h1>

<p align="center">
A full-stack MVP for tracking repair jobs in real time.<br/>
Built with <b>React (Vite)</b>, <b>Node.js (Express)</b>, and <b>Socket.IO</b>.<br/>
Customers can track repair status live; Admins manage jobs instantly.
</p>

---

## 🌟 Overview

This project is a **Minimum Viable Product (MVP)** web application that enables:
- 🧑‍🔧 **Admins / Technicians** to create, update, and manage repair jobs.  
- 👤 **Customers** to check the live status of their items using a tracking ID.  
- ⚡ **Real-time updates** powered by Socket.IO so changes appear instantly.

It’s designed as a **hackathon-friendly prototype** — clean, functional, and easy to set up in minutes.

---

## ✨ Features

✅ **Live Status Tracking** — Customers see real-time updates instantly.  
✅ **Admin Dashboard** — Create, view, and update jobs in one place.  
✅ **Socket.IO Integration** — Live event-based communication.  
✅ **Simple MVP UI** — Lightweight CSS, responsive layout.  
✅ **Basic Admin Protection** — Password gate for dashboard.  
✅ **Extendable Architecture** — Ready for database, auth, notifications.

---

## 🏗️ Tech Stack

| Layer | Technologies |
|-------|---------------|
| **Frontend** | React (Vite), React Router DOM, Socket.IO Client |
| **Backend** | Node.js, Express.js, Socket.IO |
| **Utilities** | NanoID (tracking IDs), CORS, Nodemon |
| **Design** | Custom CSS (Tailwind-ready) |

---

## 🧠 How It Works

The system operates in real time using **Socket.IO**, connecting customers and admins seamlessly.

1. **Job Creation (Admin)**  
   - The admin creates a repair job via the dashboard.  
   - The backend generates a unique `trackingId` using NanoID.  
   - Job details are stored in an in-memory list (for MVP).

2. **Tracking (Customer)**  
   - The customer enters their tracking ID on the tracking page.  
   - The frontend fetches the job details via REST API.  
   - The frontend then joins a **Socket.IO room** named after that `trackingId`.

3. **Status Update (Admin → Customer)**  
   - The admin updates the repair status (e.g., *repairing*, *completed*).  
   - The backend updates the job data and emits a `status_update` event to that tracking room.

4. **Live Sync (Socket.IO)**  
   - The customer’s page listens for `status_update` events.  
   - When an update occurs, the status changes instantly on their screen without refresh.

> 💾 Currently, job data is stored **in memory** (not persistent).  
> For production, integrate MongoDB or PostgreSQL for permanent storage.

---

## 🔐 Admin Access (MVP)

To access the admin dashboard:

- Visit: `http://localhost:5173/admin`  
- Default password: `hackathon123`  
- Changeable inside: `frontend/src/pages/AdminPage.jsx`  
  ```js
  const ADMIN_PASSWORD = "hackathon123";
## ⚙️ Setup Instructions

> The app has **two parts**: backend (API + sockets) and frontend (React app).  
> Run both in separate terminals.

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Chaitanya7777777/repair-tracker.git
cd repair-tracker
```
### 2️⃣ Backend Setup
```bash
cd backend
npm install
npm run dev
```
### 3️⃣ Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```
