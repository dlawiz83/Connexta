# Connexta

[![In Progress](https://img.shields.io/badge/status-in%20progress-yellow)](#)

**Connexta** is a networking and outreach tracker designed to help professionals and students manage their connections, follow-ups, and next actions. It’s a full-stack MERN application built for tracking interactions, managing contacts, and staying on top of networking goals.

---

## Features

- **User Authentication**: Secure signup/login with JWT.
- **Contacts Management**: Add, edit, delete, and categorize your contacts.
- **Interaction Timeline**: Log DMs, emails, calls, and meetings with notes.
- **Next Actions Dashboard**: See upcoming follow-ups and reminders.
- **Pipeline View**: Track contacts by stage (Prospect → Reached Out → Scheduled → Referred → Interviewing).
- **Search & Filters**: Quickly find contacts by name, company, or stage.
- **CSV Import** _(Stretch feature)_: Bulk upload contacts from CSV files.
- **Time Zone Awareness**: Schedule outreach based on local time of your contacts.

---

## Tech Stack

**Backend**: Node.js, Express, MongoDB, Mongoose, JWT, bcrypt
**Frontend**: React, React Router v6, React Hook Form, React Query/Redux Toolkit, Tailwind CSS  
**Dev Tools**: Nodemon, Postman, ESLint, Prettier  
**Deployment**: Vercel (frontend), Render/Railway (backend)

---

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend:

cd backend

Install dependencies:

npm install

Create .env based on .env.example and add your MongoDB URI and JWT secret.

Start server:

npm run dev

Frontend Setup

Navigate to frontend:

cd frontend

Install dependencies:

npm install

Start React dev server:

npm run dev

All rights reserved
