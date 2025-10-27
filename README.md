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

## ⚙️ Setup Instructions

> The app has **two parts**: backend (API + sockets) and frontend (React app).  
> Run both in separate terminals.

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/repair-tracker.git
cd repair-tracker
