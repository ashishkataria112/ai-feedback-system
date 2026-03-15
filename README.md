# AI-Powered Customer Feedback and Sentiment Analysis System

A full-stack web application for collecting customer feedback with automatic sentiment analysis using AI.

## Features

- User authentication with JWT
- Role-based access (Admin/Customer)
- Customer feedback submission with real-time sentiment analysis
- Admin dashboard to view all feedback
- Analytics dashboard with charts (Pie and Bar charts)
- Responsive UI with Tailwind CSS

## Tech Stack

- **Frontend:** React.js, Tailwind CSS, Chart.js
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Authentication:** JWT
- **AI Sentiment Analysis:** Node.js Sentiment library

## Prerequisites

- Node.js (v14 or higher)
- MySQL Server
- npm or yarn

## Installation and Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ai-feedback-system
```

### 2. Backend Setup

```bash
cd backend
npm install
```

- Create a MySQL database named `feedback_db`.
- Update the `.env` file with your MySQL credentials:

```
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=feedback_db
JWT_SECRET=your_jwt_secret_key
```

- Run the database schema:

```bash
mysql -u your_user -p feedback_db < schema.sql
```

- Start the backend server:

```bash
npm run dev
```

The backend will run on `http://localhost:5000`.

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173` (Vite default).

### 4. Access the Application

- Open your browser and go to `http://localhost:5173`.
- Use the landing page to learn about the system and navigate to login/register.
- After login, customers will be redirected to `/app` for feedback submission.
- Admins are redirected to `/app/dashboard` to access analytics and management.
- For admin access, use the default admin account: email `admin@example.com`, password `admin123` (you need to hash it properly or update the schema).

## API Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/feedback` - Submit feedback (authenticated)
- `GET /api/feedback` - Get all feedback (authenticated)
- `GET /api/admin/analytics` - Get analytics data (admin only)

## Project Structure

```
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── feedbackController.js
│   │   └── adminController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   └── Feedback.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── feedback.js
│   │   └── admin.js
│   ├── schema.sql
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── layout/
    │   │   │   ├── AdminLayout.jsx
    │   │   │   ├── CustomerLayout.jsx
    │   │   │   ├── Header.jsx
    │   │   │   └── Sidebar.jsx
    │   │   ├── ui/
    │   │   │   ├── Badge.jsx
    │   │   │   ├── Button.jsx
    │   │   │   ├── Card.jsx
    │   │   │   ├── Input.jsx
    │   │   │   └── ToastContainer.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── context/
    │   │   ├── ThemeContext.jsx
    │   │   └── ToastContext.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── LoginPage.jsx
    │   │   ├── RegisterPage.jsx
    │   │   ├── FeedbackPage.jsx
    │   │   ├── AdminDashboard.jsx
    │   │   ├── FeedbackManagement.jsx
    │   │   └── AnalyticsPage.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    └── package.json
```

## Usage

1. **Registration/Login:** Users can register and login. Admins have additional access.
2. **Feedback Submission:** Customers can submit feedback, and sentiment is analyzed automatically.
3. **Admin Dashboard:** Admins can view all feedback.
4. **Analytics:** Admins can view sentiment analytics with charts.

## Security

- Passwords are hashed using bcrypt.
- JWT tokens for authentication.
- Role-based access control.
- Input validation and error handling.

## Contributing

Feel free to contribute by opening issues or pull requests.