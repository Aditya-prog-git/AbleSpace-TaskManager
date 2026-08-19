# AbleSpace

A full-stack task and project management application built with React, Node.js, Express, and MongoDB.

AbleSpace provides a clean workspace for organizing tasks into projects, tracking progress, managing priorities and due dates, and signing in with Google.

---

## Features

### Task Management

* Create, edit and delete tasks
* Track task status:

  * To do
  * In progress
  * Completed
* Set task priority:

  * Low
  * Medium
  * High
* Add descriptions and due dates
* Assign tasks to projects
* Search tasks by title or description
* Filter tasks by priority
* Switch between board and list views
* View detailed information for individual tasks
* Mark tasks as completed

### Project Management

* Create and delete projects
* Add project descriptions
* Customize project accent colors
* View project details
* View project-specific task statistics
* View all tasks belonging to a project
* Automatically detach tasks from a project when the project is deleted

### Authentication

* Google OAuth authentication
* Guest login for quick access
* Protected application routes
* Persistent login state using browser local storage
* User profile page
* Logout functionality

### User Experience

* Responsive application layout
* Desktop sidebar navigation
* Mobile navigation menu
* Light and dark themes
* Help & support modal
* Loading and error states
* Modal-based forms for creating and editing data

---

## Tech Stack

### Frontend

* React 18
* Vite
* React Router
* JavaScript (ES Modules)
* CSS
* `@react-oauth/google`

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Google Auth Library
* CORS
* dotenv

### Authentication

Google OAuth 2.0 is handled on the frontend using Google's OAuth component and verified on the backend using Google's `google-auth-library`.

---

## Application Architecture

```text
                    ┌─────────────────────┐
                    │      React UI       │
                    │      Vite           │
                    └──────────┬──────────┘
                               │
                               │ REST API
                               ▼
                    ┌─────────────────────┐
                    │   Express Server    │
                    │      Node.js        │
                    └───────┬───────┬─────┘
                            │       │
                  ┌─────────┘       └──────────┐
                  ▼                            ▼
          ┌───────────────┐           ┌────────────────┐
          │    MongoDB    │           │  Google OAuth  │
          │   + Mongoose  │           │ Token Verify   │
          └───────────────┘           └────────────────┘
```

The frontend communicates with the Express backend through REST APIs. MongoDB stores tasks and projects, while Google credentials are verified server-side before a user session is created on the client.

---

## Project Structure

```text
AbleSpace/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── AppLayout.jsx
│   │   │   │   ├── Header.jsx
│   │   │   │   └── Sidebar.jsx
│   │   │   │
│   │   │   ├── tasks/
│   │   │   │   ├── TaskBoard.jsx
│   │   │   │   ├── TaskCard.jsx
│   │   │   │   └── TaskForm.jsx
│   │   │   │
│   │   │   └── ui/
│   │   │       ├── Button.jsx
│   │   │       └── Modal.jsx
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Tasks.jsx
│   │   │   ├── TaskDetails.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── ProjectDetails.jsx
│   │   │   └── Profile.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   └── package.json
│
├── server/
│   ├── models/
│   │   ├── Project.js
│   │   └── Task.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── projectRoutes.js
│   │   └── taskRoutes.js
│   │
│   ├── server.js
│   ├── seed.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js
* npm
* MongoDB database
* Google Cloud project with OAuth credentials

---

## 1. Clone the Repository

```bash
git clone <your-repository-url>
cd AbleSpace
```

---

## 2. Install Frontend Dependencies

```bash
cd client
npm install
```

---

## 3. Install Backend Dependencies

Open another terminal:

```bash
cd server
npm install
```

---

## 4. Configure Environment Variables

Create a `.env` file inside the `client` directory:

```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

Create a `.env` file inside the `server` directory:

```env
MONGO_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
PORT=5000
```

### Environment Variables

| Variable                | Location | Description                                              |
| ----------------------- | -------- | -------------------------------------------------------- |
| `VITE_GOOGLE_CLIENT_ID` | Client   | Google OAuth Client ID used by the frontend              |
| `MONGO_URI`             | Server   | MongoDB connection string                                |
| `GOOGLE_CLIENT_ID`      | Server   | Google OAuth Client ID used to verify Google credentials |
| `PORT`                  | Server   | Backend port; defaults to `5000`                         |

> Never commit `.env` files or database credentials to GitHub.

---

## 5. Configure Google OAuth

Create a Google OAuth 2.0 Client ID for a **Web application** in Google Cloud.

For local development, add your frontend origin to the authorized JavaScript origins.

For a Vite development server:

```text
http://localhost:5173
```

The Google Client ID should then be added to both:

```text
client/.env
server/.env
```

The frontend uses the Client ID to initialize Google OAuth, while the backend uses the same Client ID to verify the Google ID token.

---

## 6. Start the Backend

From the `server` directory:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

You can also run the production-style server with:

```bash
npm start
```

---

## 7. Start the Frontend

From the `client` directory:

```bash
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

Open the URL in your browser.

---

## Demo Data

The project includes a seed script containing sample projects and tasks.

To populate the database:

```bash
cd server
npm run seed
```

The seed script uses upsert-style project handling and replaces only the predefined seed tasks, leaving manually created tasks untouched.

---

## API Endpoints

### Tasks

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| GET    | `/api/tasks`     | Get all tasks     |
| GET    | `/api/tasks/:id` | Get a single task |
| POST   | `/api/tasks`     | Create a task     |
| PUT    | `/api/tasks/:id` | Update a task     |
| DELETE | `/api/tasks/:id` | Delete a task     |

Tasks can also be filtered by project:

```text
GET /api/tasks?project=<projectId>
```

### Projects

| Method | Endpoint            | Description          |
| ------ | ------------------- | -------------------- |
| GET    | `/api/projects`     | Get all projects     |
| GET    | `/api/projects/:id` | Get a single project |
| POST   | `/api/projects`     | Create a project     |
| PUT    | `/api/projects/:id` | Update a project     |
| DELETE | `/api/projects/:id` | Delete a project     |

### Authentication

| Method | Endpoint           | Description                    |
| ------ | ------------------ | ------------------------------ |
| POST   | `/api/auth/google` | Verify Google OAuth credential |

The backend validates the Google ID token and returns the authenticated user's basic profile information.

---

## Task Data Model

A task contains:

```text
title
description
status
priority
dueDate
project
createdAt
updatedAt
```

Supported statuses:

```text
todo
in-progress
completed
```

Supported priorities:

```text
low
medium
high
```

---

## Project Data Model

A project contains:

```text
name
description
color
createdAt
updatedAt
```

Tasks can reference projects through MongoDB ObjectIds.

---

## Available Scripts

### Client

```bash
npm run dev
```

Starts the Vite development server.

```bash
npm run build
```

Creates a production build.

```bash
npm run preview
```

Previews the production build locally.

### Server

```bash
npm run dev
```

Starts the backend using Nodemon.

```bash
npm start
```

Starts the backend using Node.js.

```bash
npm run seed
```

Adds the predefined demo projects and tasks to MongoDB.

---

## Current Authentication Flow

```text
User
 │
 ▼
React Login Page
 │
 │ Google Sign-In
 ▼
Google OAuth
 │
 │ ID Token
 ▼
Express /api/auth/google
 │
 │ Verify ID Token
 ▼
Google Auth Library
 │
 │ Valid credential
 ▼
User information returned
 │
 ▼
React AuthContext
 │
 ▼
Local Storage
 │
 ▼
Protected Application
```

Guest login bypasses Google authentication and creates a local guest session for quickly exploring the application.

---

## Future Improvements

Some potential improvements for future versions include:

* JWT-based session management
* User-specific task and project ownership
* Role-based access control
* Drag-and-drop task management
* Task labels and tags
* Task comments
* Notifications and reminders
* Pagination and server-side filtering
* Better API validation
* Automated testing
* API documentation with Swagger/OpenAPI
* Production deployment
* CI/CD pipeline
* Improved authentication and session security

---

## Deployment

The application is designed to be deployable as two services:

```text
Frontend → Static React/Vite hosting
Backend  → Node.js hosting
Database → MongoDB
```

Before deployment, update the frontend API URL from the local development server:

```text
http://localhost:5000/api
```

to the deployed backend URL.

Google OAuth also needs to be updated with the production frontend domain under the appropriate OAuth client configuration.

---

## Security Notes

* `.env` files should never be committed.
* MongoDB credentials should never be exposed in source control.
* Google OAuth credentials should be configured through environment variables.
* Production deployments should use HTTPS.
* API authentication and authorization should be strengthened before using the application with real user data.

---

## License

This project is intended for learning, portfolio, and demonstration purposes.
