# Student Feedback Management System

A full-stack web application for managing student feedback on various subjects.

## Features

- Submit feedback with student name, subject, rating (1-5), and optional comments
- View all feedbacks in a table
- Filter feedbacks by subject
- Display average rating per subject
- Client-side validation and success/error messages

## Tech Stack

- Backend: Express.js, MongoDB with Mongoose
- Frontend: React.js with Vite

## Setup Instructions

### Prerequisites

- Node.js installed
- MongoDB installed and running locally on port 27017

### Backend Setup

1. Navigate to the `backend` directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   npm run dev
   ```
   The server will run on http://localhost:5000

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```
   The app will run on http://localhost:5173

### Usage

- Open the frontend in your browser
- Submit feedback using the form
- View and filter feedbacks in the list

## API Endpoints

- `POST /feedback` - Submit new feedback
- `GET /feedbacks` - Get all feedbacks
- `GET /feedbacks/:subject` - Get feedbacks for a specific subject