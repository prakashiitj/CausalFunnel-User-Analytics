# CausalFunnel User Analytics Dashboard

## Overview

This project is a full-stack user analytics application built for the CausalFunnel Full Stack Engineer Assignment.

The application tracks user interactions on a webpage, stores them in MongoDB Atlas, and visualizes user behavior through an analytics dashboard.

---

## Features

### Event Tracking

- Page View Tracking
- Click Tracking
- Session Tracking
- Timestamp Recording
- Click Position (X, Y) Tracking

### Analytics Dashboard

- View All Sessions
- Session-wise Event Counts
- User Journey Visualization
- Heatmap Visualization

### Database

- MongoDB Atlas Integration
- Event Storage
- Session-based Analytics

---

## Tech Stack

### Frontend

- React.js
- Axios

### Backend

- Node.js
- Express.js

### Database

- MongoDB Atlas
- Mongoose

---

## Project Structure

```text
CausalFunnel_Assignment
│
├── backend
│   ├── models
│   │   └── Event.js
│   ├── routes
│   │   └── eventRoutes.js
│   ├── server.js
│   └── package.json
│
├── frontend
│   ├── public
│   │   └── tracker.js
│   ├── src
│   │   └── App.js
│   └── package.json
│
└── README.md
```

---

## API Endpoints

### POST /api/events

Stores user events.

#### Request Body

```json
{
  "session_id": "session123",
  "event_type": "click",
  "page_url": "http://localhost:3000",
  "x": 150,
  "y": 300
}
```

---

### GET /api/sessions

Returns all sessions with total event counts.

#### Example Response

```json
[
  {
    "_id": "session123",
    "totalEvents": 10
  }
]
```

---

### GET /api/session/:id

Returns all events belonging to a session.

---

### GET /api/heatmap?page=<url>

Returns click coordinates used for heatmap visualization.

---

## Setup Instructions

### Clone Repository

```bash
git clone https://github.com/prakashiitj/CausalFunnel-User-Analytics.git
cd CausalFunnel-User-Analytics
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Start Backend Server:

```bash
node server.js
```

Expected Output:

```text
MongoDB Connected
Server running on port 5000
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm start
```

Application runs on:

```text
http://localhost:3000
```

---

## Tracker Script

The project includes a lightweight tracking script:

```text
frontend/public/tracker.js
```

The tracker automatically records:

- Page Views
- Click Events
- Session IDs
- Timestamps
- Click Coordinates

and sends them to the backend API.

---

## Assumptions

- Session IDs are stored using browser localStorage.
- Click heatmaps are generated using X/Y click coordinates.
- MongoDB Atlas is used as the cloud database.
- The tracker runs automatically when the webpage loads.

---

## Screenshots

### Dashboard

- Session Analytics
- User Journey View
- Heatmap View

---

## Repository

GitHub Repository:

https://github.com/prakashiitj/CausalFunnel-User-Analytics

---

## Author

**Gnani Prakash Yaddanapudi**

IIT Jodhpur  
Computer Science & Engineering
