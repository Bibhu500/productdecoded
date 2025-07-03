# ProductDecoded Server

A complete MERN stack backend server for tracking user learning progress, practice streaks, and achievements in the ProductDecoded learning platform. **Fully integrated with Clerk authentication**.

## 🚀 Quick Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
1. Copy `.env.example` to `.env`:
   ```bash
   copy .env.example .env
   ```
2. Replace `your_mongodb_atlas_uri_here` with your actual MongoDB Atlas URI

### 3. Start the Server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:5000`

### 4. Configure Clerk Webhooks
Add this webhook URL to your Clerk dashboard:
```
http://localhost:5000/api/webhooks/clerk
```
Subscribe to events: `user.created`, `user.updated`, `user.deleted`

## 📊 API Endpoints

### Health Check
- `GET /api/health` - Server health status

### Users
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile

### Progress Tracking
- `GET /api/progress/:userId` - Get user progress
- `POST /api/progress/:userId/scenario` - Update scenario progress
- `POST /api/progress/:userId/lesson` - Update lesson progress
- `GET /api/progress/:userId/stats` - Get user statistics

### Achievements
- `GET /api/achievements` - Get all achievements
- `GET /api/achievements/:userId` - Get user achievements
- `POST /api/achievements/check/:userId` - Check for new achievements
- `POST /api/achievements/seed` - Seed initial achievements

### Learning Content
- `GET /api/scenarios` - Get practice scenarios
- `GET /api/scenarios/:id` - Get specific scenario
- `POST /api/scenarios/:id/submit` - Submit scenario solution
- `GET /api/lessons` - Get learning lessons
- `GET /api/lessons/:id` - Get specific lesson
- `POST /api/lessons/:id/complete` - Mark lesson complete

## 🎯 Features

### Progress Tracking
- **Scenario Progress**: Best scores, attempts, time spent
- **Lesson Progress**: Completion status, scores, time tracking
- **XP & Levels**: Automatic level calculation based on experience points
- **Learning Streaks**: Daily streak tracking with automatic updates

### Achievement System
- **Dynamic Achievements**: Automatically check and unlock achievements
- **Multiple Categories**: Learning, practice, streak, score, time, level
- **Rarity System**: Common, uncommon, rare, epic, legendary
- **Points & Rewards**: XP rewards for achievement unlocks

### User Management
- **Secure Authentication**: Password hashing with bcrypt
- **Profile Management**: User profiles with preferences
- **Data Validation**: Input validation with express-validator

## 📋 Example API Usage

### Register User
```javascript
POST /api/users/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Update Scenario Progress
```javascript
POST /api/progress/USER_ID/scenario
{
  "scenarioId": "user-engagement-drop",
  "score": 85,
  "timeSpent": 25
}
```

### Update Lesson Progress
```javascript
POST /api/progress/USER_ID/lesson
{
  "lessonId": "rca-intro",
  "completed": true,
  "timeSpent": 15,
  "score": 95
}
```

## 🔧 Data Models

### User Model
- Basic info (name, email, password)
- Profile data (avatar, bio, company, position)
- Preferences (notifications, dark mode)

### Progress Model
- Scenario progress with scores and attempts
- Lesson completion tracking
- XP, levels, and streak management
- Comprehensive stats calculation

### Achievement System
- Achievement definitions with requirements
- User achievement tracking
- Progress calculation and unlocking

## 🛡️ Security Features

- **CORS Protection**: Configured for frontend origin
- **Rate Limiting**: 100 requests per 15 minutes
- **Helmet**: Security headers
- **Input Validation**: Request validation middleware
- **Password Security**: Bcrypt hashing

## 🚀 Production Ready

This server is production-ready with:
- Error handling middleware
- Database indexing for performance
- Environment variable management
- Logging and monitoring support
- Scalable architecture

Connect your MongoDB Atlas URI and you're ready to go! 