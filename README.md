# School Website & Management System

A comprehensive, full-stack school website designed to showcase the institution to the public while providing a powerful admin dashboard for managing day-to-day operations.

## Features

- **Public Website:** Beautiful, responsive UI built with modern web technologies, showcasing school facilities, faculty, gallery, notices, and admission processes.
- **Admin Dashboard:** Secure authentication system to manage various aspects of the school:
  - **Admissions:** Review and process student admission applications.
  - **Inquiries:** Handle contact forms and parent inquiries.
  - **Notices & Events:** Publish important announcements.
  - **Gallery:** Upload and manage school event photos.
  - **Careers & Faculty:** Manage job applications and staff directory.

## Tech Stack

**Frontend:**
- React 19 (Vite)
- Tailwind CSS v4 for styling
- Framer Motion for rich animations
- React Router DOM for routing
- Axios for API requests
- Lucide React for modern icons
- React Hook Form for form handling

**Backend:**
- Node.js & Express.js
- Sequelize ORM (MySQL) for database management
- JSON Web Token (JWT) & bcrypt for secure authentication
- Helmet & Express Rate Limit for security

## Project Structure

The repository is organized into two main directories:
- `/frontend` - Contains the React web application
- `/backend` - Contains the Node.js API server

## Getting Started

### Prerequisites
- Node.js (v18+)
- MySQL Server

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder and configure the required environment variables (Database credentials, JWT Secret).
4. Start the development server:
   ```bash
   npm run dev
   ```
   *The server will run with nodemon for automatic restarts.*

### 2. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend` folder and add your API URL (e.g., `VITE_API_URL=http://localhost:5000/api`).
4. Start the Vite development server:
   ```bash
   npm run dev
   ```

## License

This project is proprietary. All rights reserved.
