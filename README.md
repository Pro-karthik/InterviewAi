# 🚀 Personalized AI Mock Interviewer

An intelligent, full-stack AI-powered mock interview platform that simulates real-world technical interviews with live proctoring, performance analytics, and session tracking.

Designed to help candidates prepare for technical interviews through personalized question generation, behavioral analysis, and detailed feedback reports.

---

## 📌 Table of Contents

* Introduction
* Features
* Architecture Overview
* Tech Stack
* System Modules
* Authentication Flow
* Interview Lifecycle
* Proctoring System
* Analytics Module
* API Documentation
* Database Schema
* Environment Variables
* Installation Guide
* Running the Project
* Deployment
* Security Features
* Performance Optimizations
* Future Enhancements
* Screenshots (Optional Section)
* Contributing
* License

---

# 📖 Introduction

**Personalized AI Mock Interviewer** is a full-stack microservices-based platform that:

* Generates AI-powered interview questions
* Conducts structured interview sessions
* Tracks user performance over time
* Monitors candidate behavior via proctoring
* Provides analytics and improvement suggestions

It simulates real interview environments to help users gain confidence and improve technical performance.

---

# ✨ Core Features

## 🧠 AI-Based Question Generation

* Dynamic question generation
* Role-based question filtering
* Difficulty-based selection
* Technical + Behavioral questions
* Follow-up question support

## 🎥 Real-Time Proctoring

* Face detection
* Tab switching detection
* Multiple person detection
* Inactivity monitoring
* Violation tracking

## 📊 Performance Analytics

* Accuracy tracking
* Time taken per question
* Strength & weakness identification
* Interview history
* Score trends over time

## 🔐 Secure Authentication

* JWT-based authentication
* Refresh token mechanism
* Protected routes
* Role-based access

## 🗂 Interview Session Management

* Session lifecycle handling
* Resume session capability
* Automatic session timeout
* Result storage

---

# 🏗 Architecture Overview

This project follows a **Microservices Architecture** pattern:

```
modules/
├── user/        → Authentication & identity
├── interview/   → Question generation & lifecycle
├── session/     → Session state management
├── proctoring/  → Live security enforcement
└── analytics/   → History & performance tracking
```

Each module is independently structured and containerized.

---

# 🛠 Tech Stack

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Docker
* Kubernetes

## Frontend

* React.js
* Context API / Redux
* Tailwind CSS
* REST API Integration

## DevOps

* Docker containerization
* Kubernetes orchestration
* Environment-based configuration

---

# 🧩 System Modules Explained

---

## 1️⃣ User Module

### Responsibilities:

* Registration
* Login
* Token generation
* Token refresh
* Profile management

### Features:

* Password hashing
* JWT access token
* Refresh token rotation
* Secure cookie storage

---

## 2️⃣ Interview Module

### Responsibilities:

* Generate interview questions
* Manage interview flow
* Handle question lifecycle

### Interview Flow:

1. User selects role
2. AI generates questions
3. Questions are stored in session
4. User answers
5. Answers evaluated
6. Score calculated

---

## 3️⃣ Session Module

### Responsibilities:

* Create interview session
* Track current question index
* Save answers
* Mark session complete

### States:

* CREATED
* IN_PROGRESS
* COMPLETED
* TERMINATED

---

## 4️⃣ Proctoring Module

### Monitors:

* Face presence
* Multiple faces
* Window/tab switching
* Suspicious inactivity

### Stores:

* Violation count
* Timestamp logs
* Session-linked proctoring data

---

## 5️⃣ Analytics Module

### Tracks:

* Total interviews
* Average score
* Best performance
* Weak topics
* Time analysis

### Provides:

* Graph-based performance trends
* Historical interview data
* Comparative performance stats

---

# 🔐 Authentication Flow

1. User logs in
2. Server validates credentials
3. Access Token + Refresh Token issued
4. Access token used for protected routes
5. Refresh endpoint issues new token when expired

---

# 📡 API Documentation

---

## 🔑 Auth APIs

### POST `/api/auth/register`

Register new user

### POST `/api/auth/login`

Login user

### POST `/api/auth/refresh`

Refresh access token

---

## 👤 User APIs

### GET `/api/users/profile`

Get user profile

---

## 🎯 Interview APIs

### POST `/api/interview/start`

Start new interview

### GET `/api/interview/:id`

Get interview details

### POST `/api/interview/:id/answer`

Submit answer

### POST `/api/interview/:id/complete`

Complete interview

---

## 📋 Session APIs

### POST `/api/session/create`

Create session

### GET `/api/session/:id`

Fetch session

---

## 🎥 Proctoring APIs

### POST `/api/proctoring/log`

Log violation

### GET `/api/proctoring/:sessionId`

Get violation logs

---

## 📊 Analytics APIs

### GET `/api/analytics/summary`

Get user performance summary

### GET `/api/analytics/history`

Get interview history

### GET `/api/analytics/trends`

Performance trends over time

---

# 🗄 Database Schema Overview

## User Schema

```js
{
  name: String,
  email: String,
  password: String,
  role: String,
  createdAt: Date
}
```

## Interview Schema

```js
{
  userId: ObjectId,
  questions: Array,
  score: Number,
  difficulty: String,
  status: String
}
```

## Session Schema

```js
{
  interviewId: ObjectId,
  currentQuestionIndex: Number,
  answers: Array,
  state: String
}
```

## Proctoring Schema

```js
{
  sessionId: ObjectId,
  violations: Number,
  logs: Array
}
```

---

# ⚙️ Environment Variables

Create a `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
REFRESH_SECRET=your_refresh_secret
```

---

# 🚀 Installation Guide

```bash
git clone https://github.com/your-repo/mock-interviewer
cd mock-interviewer
npm install
```

---

# ▶️ Running the Project

### Backend

```
npm run dev
```


# 🔒 Security Features

* JWT authentication
* Refresh token rotation
* Password hashing
* Protected APIs
* Session validation
* Proctoring violation tracking

---

# ⚡ Performance Optimizations

* Modular architecture
* Microservices scalability
* Optimized MongoDB queries
* Stateless authentication
* Efficient session management

---

# 📈 Why This Project Stands Out

✅ Real-time proctoring
✅ AI-powered question generation
✅ Microservices architecture
✅ Docker + Kubernetes ready
✅ Performance analytics dashboard
✅ Scalable & production-ready structure

---

# 🔮 Future Enhancements

* AI answer evaluation scoring
* Speech-to-text integration
* Video-based interview mode
* Leaderboard system
* Admin analytics dashboard
* Recruiter access panel

---

# 📌 Use Cases

* College students preparing for placements
* Developers preparing for FAANG interviews
* Bootcamp learners
* Professional upskilling

---

# 👥 Team Members

This project was collaboratively developed as a team effort.

### 👨‍💻 CH Satya Karthikeya

* GitHub: [https://github.com/Pro-karthik](https://github.com/Pro-karthik)
* LinkedIn: [https://www.linkedin.com/in/satya-karthikeya-chapuri-73b251256/](https://www.linkedin.com/in/satya-karthikeya-chapuri-73b251256/)
---

### 👨‍💻 Bharath Bolloju

* GitHub: [https://github.com/bharathbolloju0905](https://github.com/bharathbolloju0905)
* LinkedIn: [https://www.linkedin.com/in/bharath-bolloju-5a2173258/](https://www.linkedin.com/in/bharath-bolloju-5a2173258/)

---

### 👨‍💻 Bharath Chettukindha

* GitHub: [https://github.com/bharathchettukindha](https://github.com/bharathchettukindha)
* LinkedIn: [https://www.linkedin.com/in/bharath-chettukindha-074a79258/](https://www.linkedin.com/in/bharath-chettukindha-074a79258/)
---


