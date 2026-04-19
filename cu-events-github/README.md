# CU Events — Chandigarh University Event Registration System

A full-stack web application built with Node.js, Express, MongoDB and REST APIs.

## Tech Stack
- **Backend**: Node.js + Express.js
- **Database**: MongoDB + Mongoose ODM
- **Auth**: express-session + bcryptjs
- **Frontend**: Vanilla HTML/CSS/JS (SPA)
- **API Style**: RESTful

## REST API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /api/auth/register | Register student | — |
| POST | /api/auth/login | Login | — |
| POST | /api/auth/logout | Logout | — |
| GET | /api/auth/me | Get current user | — |
| GET | /api/events | Get all events | — |
| GET | /api/events/:id | Get single event | — |
| POST | /api/events | Create event | Admin |
| PUT | /api/events/:id | Update event | Admin |
| DELETE | /api/events/:id | Delete event | Admin |
| POST | /api/registrations/:eventId | Register for event | Student |
| DELETE | /api/registrations/:eventId | Cancel registration | Student |
| GET | /api/registrations/my/list | My registrations | Student |
| GET | /api/registrations/event/:id | Event attendees | Admin |
| GET | /api/admin/stats | Dashboard stats | Admin |
| GET | /api/admin/users | All students | Admin |

---

## HOW TO RUN — Step by Step

### Prerequisites
1. Install Node.js → https://nodejs.org (LTS version)
2. Install MongoDB Community → https://www.mongodb.com/try/download/community
3. Install VS Code (optional but recommended)

---

### Step 1 — Start MongoDB
Open a terminal and run:
```
mongod
```
Keep this terminal open. MongoDB must be running.

---

### Step 2 — Install project dependencies
Open a NEW terminal in the project folder:
```
cd cu-events
npm install
```
Wait for all packages to download (~1 min).

---

### Step 3 — Seed demo data (first time only)
```
node seed.js
```
This creates:
- Admin account: admin@cu.ac.in / admin123
- Student account: rahul@cumail.in / student123
- 6 sample events

---

### Step 4 — Start the server
```
npm start
```
You should see:
  MongoDB connected successfully
  CU Events server running on http://localhost:3000

---

### Step 5 — Open in browser
Go to: http://localhost:3000

---

## Test the App

### As Student:
1. Login → rahul@cumail.in / student123
2. Click "Events" to browse all events
3. Click "Register" on any event
4. Click "My Events" to see your registrations
5. Click "Cancel" to cancel a registration

### As Admin:
1. Login → admin@cu.ac.in / admin123
2. Click "Admin" in the navbar
3. View stats, all events, all students
4. Click "+ Add Event" to create a new event
5. Click "Edit" or "Delete" on any event

---

## Project Structure
```
cu-events/
├── server.js           ← Entry point
├── seed.js             ← Demo data
├── .env                ← Config (port, DB URL)
├── config/
│   └── db.js           ← MongoDB connection
├── models/
│   ├── User.js         ← User schema
│   ├── Event.js        ← Event schema
│   └── Registration.js ← Registration schema
├── routes/
│   ├── auth.js         ← Login/Register API
│   ├── events.js       ← Events CRUD API
│   ├── registrations.js← Register/Cancel API
│   └── admin.js        ← Admin stats API
├── middleware/
│   └── auth.js         ← Session middleware
└── public/
    └── index.html      ← Frontend (SPA)
```
