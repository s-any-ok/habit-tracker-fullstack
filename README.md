# 🚀 Habit Tracker - Full-Stack Application

A modern habit tracking application built with NestJS backend and React frontend, featuring GitHub OAuth authentication.

## 🏗️ Architecture

### Backend (NestJS)

- **Framework**: NestJS with TypeScript
- **Database**: PostgreSQL with TypeORM
- **Authentication**: GitHub OAuth + JWT
- **Validation**: class-validator, class-transformer
- **Configuration**: @nestjs/config

### Frontend (React)

- **Framework**: React 18 with TypeScript
- **Styling**: TailwindCSS
- **State Management**: React Context API
- **HTTP Client**: Axios with interceptors
- **Routing**: React Router v6

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- PostgreSQL
- GitHub OAuth App

### Backend Setup

1. **Navigate to backend directory:**

   ```bash
   cd backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Environment setup:**

   ```bash
   cp .env.example .env
   ```

   Update `.env` with your configuration:

   ```env
   # Database
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=your_password
   DB_DATABASE=habit_tracker

   # JWT
   JWT_SECRET=your_jwt_secret_key_here

   # GitHub OAuth
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   GITHUB_CALLBACK_URL=http://localhost:3001/auth/github/callback

   # Frontend URL
   FRONTEND_URL=http://localhost:3000

   # Port
   PORT=3001
   ```

4. **Start development server:**
   ```bash
   npm run start:dev
   ```

### Frontend Setup

1. **Navigate to frontend directory:**

   ```bash
   cd frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Environment setup:**

   ```bash
   cp .env.example .env
   ```

   Update `.env`:

   ```env
   REACT_APP_API_URL=http://localhost:3001
   ```

4. **Start development server:**
   ```bash
   npm start
   ```

## 🔐 GitHub OAuth Setup

### 1. Create GitHub OAuth App

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click **"New OAuth App"**
3. Fill in the details:
   - **Application name**: Habit Tracker
   - **Homepage URL**: `http://localhost:3000` (for development)
   - **Authorization callback URL**: `http://localhost:3001/auth/github/callback`

### 2. Get Credentials

- Copy **Client ID** and **Client Secret**
- Add them to your backend `.env` file

### 3. Update Environment Variables

```env
GITHUB_CLIENT_ID=your_client_id_here
GITHUB_CLIENT_SECRET=your_client_secret_here
GITHUB_CALLBACK_URL=http://localhost:3001/auth/github/callback
```

## 🗄️ Database Setup

### Local PostgreSQL

1. **Create database:**

   ```sql
   CREATE DATABASE habit_tracker;
   ```

2. **Run migrations:**
   ```bash
   cd backend
   npm run typeorm:run
   ```

### Supabase (Production)

1. Create a new project at [supabase.com](https://supabase.com)
2. Get connection details from **Settings → Database**
3. Update environment variables with Supabase credentials

## 📱 Features

- ✅ **GitHub OAuth Authentication**
- ✅ **JWT Token Management**
- ✅ **Habit CRUD Operations**
- ✅ **Habit Entry Tracking**
- ✅ **User Profile Management**
- ✅ **Responsive Design**
- ✅ **Dark/Light Theme**
- ✅ **Real-time Updates**

## 🛠️ Development

### Code Formatting

```bash
# Backend
cd backend
npm run format

# Frontend
cd frontend
npm run format
```

### Database Commands

```bash
# View tables
\dt

# View table structure
\d table_name

# View data
SELECT * FROM table_name LIMIT 10;
```

## 🚀 Deployment

### Backend (Railway)

1. Connect GitHub repository to Railway
2. Set environment variables
3. Deploy automatically

### Frontend (Vercel)

1. Connect GitHub repository to Vercel
2. Set build settings
3. Deploy automatically

## 📁 Project Structure

```
fullstack/
├── backend/                 # NestJS backend
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── habits/         # Habits module
│   │   ├── entities/       # TypeORM entities
│   │   └── common/         # Shared utilities
│   └── package.json
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── contexts/       # React contexts
│   │   ├── hooks/          # Custom hooks
│   │   └── services/       # API services
│   └── package.json
└── README.md
```

## 🔧 Troubleshooting

### Common Issues

1. **Port already in use**: Kill processes using `lsof -ti:3001 | xargs kill -9`
2. **Database connection**: Check PostgreSQL service and credentials
3. **OAuth errors**: Verify GitHub OAuth app configuration

### Getting Help

- Check Railway logs for backend errors
- Check browser console for frontend errors
- Verify environment variables are set correctly

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Happy habit tracking! 🎯**
