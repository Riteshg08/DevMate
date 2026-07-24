# DevMate 🚀

A full-stack developer networking platform that enables developers to connect, build professional relationships, and communicate in real time.

🌐 **Live Demo:** https://devmate-pearl.vercel.app

---

## 📌 Overview

DevMate is a MERN stack application inspired by professional networking platforms. It allows developers to discover other developers, send connection requests, chat in real time, manage their profiles, and build meaningful professional connections.

---

## ✨ Features

### 🔐 Authentication
- User Signup & Login
- JWT Authentication
- HTTP-only Cookie-based Authentication
- Secure Password Hashing using bcrypt
- Protected Routes

### 👤 Profile Management
- Create and Update Profile
- Add Skills and Professional Information
- View Other Developer Profiles

### 🤝 Connection System
- Send Connection Requests
- Accept or Reject Requests
- View Pending Requests
- View Connected Developers

### 💬 Real-Time Chat
- One-to-One Messaging
- Socket.IO Integration
- Persistent Chat History
- Typing Indicator

### 🔔 Notifications
- Connection Request Notifications
- Real-Time Updates

### 📱 Responsive Design
- Desktop
- Tablet
- Mobile

---

# 🛠️ Tech Stack

### Frontend
- React.js
- Redux Toolkit
- React Router
- Axios
- Tailwind CSS
- DaisyUI

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Authentication
- JWT
- bcrypt
- HTTP-only Cookies

### Real-Time Communication
- Socket.IO

### Deployment
- Frontend: Vercel
- Backend: Render

---

# 📂 Project Structure

```text
DevMate
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── backend
│   ├── config
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── utils
│   └── package.json
│
└── README.md
```

---

# 🚀 Getting Started

## Clone the Repository

```bash
git clone https://github.com/Riteshg08/DevMate.git
cd DevMate
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder.

```env
PORT=7777

MONGO_URI=YOUR_MONGODB_URI

JWT_SECREAT_KEY=YOUR_SECRET_KEY

CLIENT_URL=http://localhost:5173

GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID

GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET

GOOGLE_CALLBACK_URL=http://localhost:7777/auth/google/callback

GITHUB_TOKEN=YOUR_GITHUB_TOKEN
```

Run the backend server.

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file.

```env
VITE_BASE_URL=http://localhost:7777
```

Run the frontend.

```bash
npm run dev
```

---

# 🌐 Deployment

| Service | Platform |
|---------|----------|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |

---

# 📌 API Endpoints

### Authentication

```
POST /signup
POST /login
POST /logout
```

### Profile

```
GET /profile/view
PATCH /profile/edit
```

### Feed

```
GET /feed
```

### Connection Requests

```
POST /request/send/:status/:userId
POST /request/review/:status/:requestId
```

### Notifications

```
GET /user/notifications
```

### Chat

```
GET /chat/:targetUserId
```

---

# 🎯 Key Highlights

- Full-Stack MERN Application
- JWT Authentication
- Secure HTTP-only Cookies
- RESTful APIs
- Real-Time Messaging using Socket.IO
- Responsive User Interface
- MongoDB Database
- Redux Toolkit State Management
- Protected Routes
- Professional Developer Networking Platform

---

# 🚀 Future Enhancements

- Email Verification
- Forgot Password
- Search Developers
- Online Status
- Read Receipts
- Group Chat
- Video Calling
- Push Notifications
- Dark Mode

---

# 📸 Screenshots

Add screenshots of:

- Login Page
- Home Feed
- Profile Page
- Connection Requests
- Chat Screen

Example:

```
screenshots/
├── login.png
├── feed.png
├── profile.png
├── requests.png
└── chat.png
```

---

# 👨‍💻 Author

**Ritesh Gurkhe**

- GitHub: https://github.com/Riteshg08
- LinkedIn: https://linkedin.com/in/ritesh-gurkhe-261401323
- LeetCode: https://leetcode.com/u/Ritesh_rg0
- Codeforces: https://codeforces.com/profile/Riteshg08

---

## ⭐ Support

If you like this project, consider giving it a **⭐ Star** on GitHub. It helps others discover the project and motivates future improvements.
