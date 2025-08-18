# Habit Tracker

A modern full-stack habit tracking application built with NestJS backend and React frontend.

## 🚀 Features

- **Google OAuth2 Authentication** - Secure login with Google accounts
- **Habit Management** - Create, edit, delete, and track habits
- **Daily Tracking** - Mark habits as completed each day
- **Dark/Light Theme** - Toggle between themes with persistent storage
- **Responsive Design** - Works seamlessly on all devices
- **Real-time Updates** - Instant UI updates with optimized React hooks
- **Type Safety** - Full TypeScript implementation

## 🛠 Tech Stack

### Backend (NestJS)

- **NestJS** - Progressive Node.js framework
- **TypeORM** - Object-Relational Mapping
- **PostgreSQL** - Relational database
- **Passport** - Authentication middleware (Google OAuth2)
- **JWT** - JSON Web Tokens for session management
- **class-validator** - Request validation

### Frontend (React)

- **React 18** - UI library with hooks
- **TypeScript** - Type-safe JavaScript
- **TailwindCSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Context API** - State management

## 📁 Project Architecture

### Backend Structure

```
backend/src/
├── auth/                    # Authentication module
│   ├── strategies/          # Passport strategies (Google, JWT)
│   ├── auth.controller.ts   # Auth endpoints
│   ├── auth.service.ts      # Auth business logic
│   └── auth.module.ts       # Auth module configuration
├── habits/                  # Habits module
│   ├── dto/                 # Data Transfer Objects
│   ├── habits.controller.ts # CRUD endpoints
│   ├── habits.service.ts    # Business logic
│   └── habits.module.ts     # Module configuration
├── entities/                # Database entities
│   ├── user.entity.ts       # User model
│   ├── habit.entity.ts      # Habit model
│   └── habit-entry.entity.ts # Habit completion records
├── common/                  # Shared types and utilities
│   └── types/               # Common TypeScript types
├── app.module.ts            # Root module
└── main.ts                  # Application bootstrap
```

### Frontend Structure

```
frontend/src/
├── components/              # Reusable UI components (9 files)
│   ├── Header.tsx           # Navigation header with user info
│   ├── StatsCards.tsx       # Statistics display (3 cards)
│   ├── HabitsSection.tsx    # Habits list container
│   ├── HabitCard.tsx        # Individual habit card with actions
│   ├── AddHabitModal.tsx    # Habit creation/editing modal
│   ├── SettingsModal.tsx    # User settings and theme toggle
│   ├── EmptyState.tsx       # Empty state display
│   ├── ProtectedRoute.tsx   # Route guard for authenticated users
│   └── PublicRoute.tsx      # Route guard for unauthenticated users
├── pages/                   # Page components (3 files)
│   ├── LoginPage.tsx        # Google OAuth login page
│   ├── AuthCallbackPage.tsx # OAuth callback handler
│   └── DashboardPage.tsx    # Main application dashboard
├── contexts/                # React contexts (2 files)
│   ├── AuthContext.tsx      # Authentication state management
│   └── ThemeContext.tsx     # Theme management (dark/light)
├── hooks/                   # Custom React hooks (1 file)
│   └── useHabits.ts         # Habits CRUD operations
├── services/                # API services (1 file)
│   └── api.ts               # HTTP client and API endpoints
├── types/                   # TypeScript definitions (1 file)
│   └── index.ts             # Shared type definitions
├── App.tsx                  # Root component with routing
└── index.tsx                # Application entry point
```

## 🏗 Architecture Decisions

### Backend Design Patterns

1. **Modular Architecture** - Each feature (auth, habits) is a separate module
2. **Dependency Injection** - NestJS IoC container manages dependencies
3. **Repository Pattern** - TypeORM repositories for data access
4. **DTO Validation** - Input validation with class-validator
5. **Strategy Pattern** - Passport strategies for different auth methods
6. **Type Safety** - Strict TypeScript with proper type imports

### Frontend Design Patterns

1. **Component Composition** - Small, focused, reusable components
2. **Route Guards** - ProtectedRoute/PublicRoute for authentication logic
3. **Custom Hooks** - Business logic separated from UI (useHabits, useAuth, useTheme)
4. **Context API** - Global state for auth and theme management
5. **Memoization** - React.memo, useMemo, useCallback for performance optimization
6. **Container/Presentational** - Smart containers (pages) and dumb components
7. **Single Responsibility** - Each component has one clear purpose
8. **Type-First Development** - TypeScript types drive development

### Security Considerations

1. **JWT Authentication** - Stateless session management
2. **Route Guards** - ProtectedRoute/PublicRoute prevent unauthorized access
3. **Request Validation** - All inputs validated with DTOs
4. **CORS Configuration** - Restricted to frontend origin
5. **User Isolation** - Users can only access their own data
6. **SQL Injection Prevention** - TypeORM parameterized queries

## 🚦 Quick Start

### Prerequisites

- **Node.js 16+** - JavaScript runtime
- **PostgreSQL** - Database server
- **Google Cloud Account** - For OAuth setup

### 1. Clone and Install

```bash
git clone <repository-url>
cd fullstack
cd backend && npm install
cd ../frontend && npm install
```

### 2. Database Setup

```bash
# Create database
createdb habit_tracker

# Verify connection
psql -d habit_tracker -c "SELECT version();"
```

### 3. Environment Configuration

Create `backend/.env` (copy from `.env.example`):

```bash
# Database Configuration
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=habit_tracker
DATABASE_USER=your_username
DATABASE_PASSWORD=your_password

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-min-32-chars

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Application Configuration
PORT=3001
FRONTEND_URL=http://localhost:3000
```

Create `frontend/.env`:

```bash
REACT_APP_API_URL=http://localhost:3001
```

### 4. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 Client ID:
   - **Application type**: Web application
   - **Authorized JavaScript origins**: `http://localhost:3000`
   - **Authorized redirect URIs**: `http://localhost:3001/auth/google/callback`
5. Copy Client ID and Secret to `backend/.env`

### 5. Run the Application

**Option A: Separate terminals**

```bash
# Terminal 1 - Backend
cd backend
npm run start:dev

# Terminal 2 - Frontend
cd frontend
npm start
```

**Option B: Development scripts**

```bash
# Install all dependencies
npm run install:all

# Format all code
npm run format
```

### 6. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Database**: PostgreSQL on port 5432

## 🔧 Development Commands

### Code Quality

```bash
# Format all code
npm run format

# Check formatting
npm run format:check

# Lint backend
cd backend && npm run lint

# Type check
cd backend && npx tsc --noEmit
```

### Database Operations

```bash
# View all tables
psql -d habit_tracker -c "\dt"

# View users
psql -d habit_tracker -c "SELECT id, email, name FROM users;"

# View habits with entries count
psql -d habit_tracker -c "
SELECT h.title, h.frequency, COUNT(he.id) as entries_count
FROM habits h
LEFT JOIN habit_entries he ON h.id = he.\"habitId\"
GROUP BY h.id, h.title, h.frequency;
"

# Reset database (development only)
psql -d habit_tracker -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
```

## 🏭 Production Deployment

### Environment Variables

Ensure all production environment variables are set:

- Use strong JWT secrets (min 32 characters)
- Set `synchronize: false` in TypeORM config
- Configure proper CORS origins
- Use environment-specific Google OAuth credentials

### Build Commands

```bash
# Build backend
cd backend && npm run build

# Build frontend
cd frontend && npm run build
```

## 🐛 Troubleshooting

### Common Issues

**Backend won't start:**

- Check PostgreSQL is running: `pg_ctl status`
- Verify database exists: `psql -l | grep habit_tracker`
- Check environment variables in `.env`

**Google OAuth fails:**

- Verify redirect URI matches exactly in Google Console
- Check GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET
- Ensure frontend URL is correct

**Frontend can't connect to backend:**

- Verify backend is running on port 3001
- Check REACT_APP_API_URL in frontend `.env`
- Check CORS configuration in backend

**Database connection issues:**

- Verify PostgreSQL credentials
- Check if database `habit_tracker` exists
- Ensure user has proper permissions

## 📝 API Documentation

### Authentication Endpoints

- `GET /auth/google` - Initiate Google OAuth flow
- `GET /auth/google/callback` - Handle OAuth callback
- `GET /auth/profile` - Get current user profile (requires JWT)

### Habits Endpoints

All endpoints require JWT authentication via `Authorization: Bearer <token>` header:

- `GET /habits` - Get user's habits
- `POST /habits` - Create new habit
- `GET /habits/:id` - Get specific habit
- `PATCH /habits/:id` - Update habit
- `DELETE /habits/:id` - Delete habit
- `POST /habits/:id/entries` - Mark habit as completed

### Request/Response Examples

**Create Habit:**

```bash
POST /habits
Content-Type: application/json
Authorization: Bearer <jwt-token>

{
  "title": "Read for 30 minutes",
  "description": "Read books or articles daily",
  "color": "#3B82F6",
  "frequency": "daily"
}
```

**Mark Habit Complete:**

```bash
POST /habits/:id/entries
Content-Type: application/json
Authorization: Bearer <jwt-token>

{
  "completedDate": "2025-01-15",
  "notes": "Read chapter 3"
}
```

## 📊 Project Statistics

- **Total TypeScript files**: 37 (18 backend + 19 frontend)
- **Backend modules**: 3 (auth, habits, common)
- **Frontend components**: 9 reusable components
- **Zero linting errors**: ESLint + TypeScript strict mode
- **100% TypeScript**: Type-safe codebase
- **Performance optimized**: React.memo, useCallback, useMemo throughout

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make changes and run tests
4. Format code: `npm run format`
5. Commit changes: `git commit -m 'Add amazing feature'`
6. Push to branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
