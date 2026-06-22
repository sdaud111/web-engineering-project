# Job Connect — Full-Stack Job Portal

A full-stack web application that connects job seekers with employers through role-based workflows, real-time job listings, and a complete application management system.

---

## Features

**For Job Seekers**
- Register and build a profile
- Search and filter job listings
- Apply to jobs and track application status
- Message employers directly

**For Employers**
- Post and manage job listings
- Review incoming applications
- Message applicants directly
- Manage hiring pipeline through a dashboard

**General**
- Role-based access control (applicant and employer flows)
- Protected routing based on authentication
- Responsive design across desktop, tablet, and mobile
- Dynamic navigation based on user role

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Authentication | JWT |
| API | REST |
| Version Control | Git, GitHub |

---

## Getting Started

### Prerequisites

Make sure you have the following installed:
- Node.js (v16 or above)
- MongoDB (local or Atlas)
- Git

### Installation

1. Clone the repository

```bash
git clone https://github.com/Rida4142/job-connect.git
cd job-connect
```

2. Install dependencies for the backend

```bash
cd server
npm install
```

3. Install dependencies for the frontend

```bash
cd ../client
npm install
```

4. Create a `.env` file in the server folder and add the following

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

5. Run the backend server

```bash
cd server
npm start
```

6. Run the frontend

```bash
cd client
npm start
```

The app will be running at `http://localhost:3000`

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Login and receive JWT token |
| GET | /api/jobs | Get all job listings |
| POST | /api/jobs | Post a new job (employer only) |
| POST | /api/jobs/:id/apply | Apply to a job (applicant only) |
| GET | /api/applications | Get applications for logged in user |
| POST | /api/messages | Send a message |
| GET | /api/messages/:userId | Get conversation with a user |

---

## Project Structure

```
job-connect/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── App.js
├── server/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   └── server.js
```

---

## Screenshots
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/0a24df00-826e-4f1e-b6d1-af13d0f43c51" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/c184aca5-95bf-4094-82d7-c73468444680" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/4f1a231d-2b74-470a-9790-74f392731438" />


<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/accdf244-fae3-49bf-b11d-ea523ff063eb" />


<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/a24d4307-db24-42f7-8c2a-c9d9b52e59d3" />


---

## Built By

**Rida Waheed** — Software Engineering Student at NUST Islamabad  
[LinkedIn](https://linkedin.com/in/rida-waheed-4b5166319) | [GitHub](https://github.com/Rida4142)
