# 🌍 GradGuide - AI Travel Planner

> Your personalized AI-powered travel companion that creates detailed, day-by-day itineraries with real-time weather forecasts, stunning destination imagery, and secure user authentication.

[![React](https://img.shields.io/badge/React-19.0-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.19-brightgreen.svg)](https://www.mongodb.com/)
[![Google Gemini](https://img.shields.io/badge/AI-Gemini%201.5%20Pro-orange.svg)](https://ai.google.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg)](https://www.typescriptlang.org/)

---

## 📖 Table of Contents

- [Overview](#-overview)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🏗️ Architecture](#️-architecture)
- [🚀 Getting Started](#-getting-started)
- [📱 Usage Guide](#-usage-guide)
- [📁 Project Structure](#-project-structure)
- [📡 API Documentation](#-api-documentation)
- [🔐 Authentication Flow](#-authentication-flow)
- [🐛 Troubleshooting](#-troubleshooting)
- [🤝 Contributing](#-contributing)
- [👨‍💻 Author](#-author)

---

## 🎯 Overview

**GradGuide** is a full-stack intelligent travel planning application that leverages Google's Gemini AI to create personalized travel itineraries. Built with modern technologies, it provides a seamless experience from planning to execution.

### 🌟 What Makes It Special?

- **🤖 AI-Powered**: Uses Google Gemini 1.5 Pro for intelligent itinerary generation
- **🔐 Secure Authentication**: JWT-based user authentication with HTTP-only cookies
- **💾 Save & Manage**: Store unlimited itineraries to your personal account
- **🌤️ Weather-Aware**: Real-time 10-day weather forecasts for each activity
- **📸 Visual Experience**: High-quality destination images from Unsplash
- **💰 Budget-Conscious**: Plans that respect your spending limits
- **👥 Group-Friendly**: Supports any number of travelers
- **📱 Fully Responsive**: Beautiful UI that works on all devices

---

## ✨ Features

### 🤖 AI-Powered Itinerary Generation
- **Google Gemini 1.5 Pro** integration for intelligent travel planning
- Structured JSON output with day-by-day breakdown
- Personalized recommendations based on destination, dates, interests, group size, and budget
- Activity timing and duration suggestions
- Safety tips and travel recommendations

### 🔐 User Authentication & Management
- **JWT-based authentication** with access and refresh tokens
- **Secure password hashing** using bcrypt (10 salt rounds)
- HTTP-only cookies for XSS protection
- User registration with validation
- Login/logout functionality
- Protected API routes and middleware
- Persistent authentication state with Redux Toolkit

### 💾 Itinerary Management
- Save unlimited itineraries to your account
- View all saved trips in a beautiful card grid
- Click any saved itinerary to regenerate and view full details
- Automatic form data storage for easy re-planning

### 🌦️ Advanced Weather Integration
- **WeatherAPI.com** integration for accurate forecasts
- 10-day weather forecasts for trip planning
- **Activity-specific weather** matching exact times (Morning, Afternoon, Evening)
- Temperature, conditions, and weather icons
- Fallback mechanisms for unavailable data

### 📷 Dynamic Visual Experience
- **Unsplash API** integration for high-quality imagery
- Automatic image fetching for destinations, attractions, and activities
- Landscape-oriented images for better display
- Fallback mechanisms for missing images

### 💻 Modern Frontend Architecture
- **React 19** with latest features and hooks
- **TypeScript 5.6** for type safety
- **Redux Toolkit** for state management
- **React Router v7** for client-side navigation
- **Bootstrap 5** + Custom CSS for responsive design
- **Vite 6** for lightning-fast development and builds
- Travel-themed purple gradient design

---

## 🛠️ Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.0 | Modern UI library with concurrent features |
| **TypeScript** | 5.6 | Type-safe JavaScript |
| **Redux Toolkit** | 2.5.0 | State management |
| **React Router** | 7.1.1 | Client-side routing |
| **Vite** | 6.0.5 | Build tool |
| **Bootstrap** | 5.3.3 | CSS framework |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 20+ | JavaScript runtime |
| **Express** | 5.1.0 | Web framework |
| **MongoDB** | 8.19.2 | NoSQL database |
| **Mongoose** | 8.10.5 | MongoDB ODM |
| **JWT** | 9.0.2 | Authentication |
| **bcrypt** | 5.1.1 | Password hashing |

### AI & External APIs

- **Google Gemini 1.5 Pro** - AI itinerary generation
- **WeatherAPI.com** - Real-time weather forecasts
- **Unsplash API** - High-quality travel imagery

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                     React Client (Vite)                      │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────┐      │
│  │   Pages     │  │  Components  │  │  Redux Store  │      │
│  │ • Home      │  │ • Header     │  │ • auth        │      │
│  │ • Login     │  └──────────────┘  │ • itinerary   │      │
│  │ • Register  │                     │ • form        │      │
│  │ • Saved     │                     │ • savedItems  │      │
│  │ • Itinerary │                     └───────────────┘      │
│  └─────────────┘                                            │
└──────────────────────────┬───────────────────────────────────┘
                           │ HTTP/REST API
                           ▼
┌──────────────────────────────────────────────────────────────┐
│                   Express Server (Node.js)                   │
│  ┌────────────────────────────────────────────────────────┐  │
│  │              Middleware Layer                           │  │
│  │  • CORS  • JSON Parser  • Cookie Parser  • Auth JWT   │  │
│  └────────────────────────────────────────────────────────┘  │
│  ┌─────────────────────┐      ┌─────────────────────────┐   │
│  │   User Routes       │      │     AI Routes           │   │
│  │ • /register         │      │ • /generate-response    │   │
│  │ • /login            │      │ • /save-itinary         │   │
│  │ • /logout           │      │ • /list-all-itinary     │   │
│  │ • /isUserLoggedIn   │      └─────────────────────────┘   │
│  └─────────────────────┘                                     │
└──────────────────┬──────────────────────┬────────────────────┘
                   │                      │
                   ▼                      ▼
      ┌─────────────────────┐   ┌──────────────────────┐
      │   MongoDB Atlas     │   │   External APIs      │
      │  • users            │   │ • Google Gemini AI   │
      │  • itineraries      │   │ • WeatherAPI.com     │
      └─────────────────────┘   │ • Unsplash API       │
                                └──────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

| Requirement | Version | Download Link |
|-------------|---------|---------------|
| **Node.js** | 20.x or higher | [Download](https://nodejs.org/) |
| **npm** | 7.x or higher | Comes with Node.js |
| **MongoDB** | 5.x or higher | [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) |
| **Git** | Latest | [Download](https://git-scm.com/) |

### API Keys Required

1. **Google Gemini API** - https://ai.google.dev/
2. **WeatherAPI.com** - https://www.weatherapi.com/signup.aspx
3. **Unsplash API** - https://unsplash.com/developers

---

### Installation

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/GaneshBagra/AI-Travel-Guide-Personalized-Tour-Planner.git
cd AI-Travel-Guide-Personalized-Tour-Planner
```

#### 2️⃣ Install Backend Dependencies

```bash
cd server
npm install
```

#### 3️⃣ Install Frontend Dependencies

```bash
cd ../client
npm install
```

---

### Environment Variables

#### 🔧 Backend Environment Setup

Create a `.env` file in the `server/` directory:

```env
# ========================================
# Server Configuration
# ========================================
PORT=4000
NODE_ENV=development

# ========================================
# MongoDB Configuration
# ========================================
MONGODB_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/gradguide?retryWrites=true&w=majority

# ⚠️ IMPORTANT: URL-encode special characters in password
# Examples: @ → %40, ! → %21, # → %23

# ========================================
# JWT Configuration
# ========================================
ACCESS_TOKEN_SECRET=your_super_secret_access_token_key_min_32_characters
ACCESS_TOKEN_EXPIRY=1d

REFRESH_TOKEN_SECRET=your_super_secret_refresh_token_key_different_from_access
REFRESH_TOKEN_EXPIRY=10d

# ========================================
# External API Keys
# ========================================
GEMINI_API_KEY=your_gemini_api_key_here
WEATHERAPI_KEY=your_weather_api_key_here
UNSPLASH_API_KEY=your_unsplash_access_key_here

# ========================================
# CORS Configuration
# ========================================
CORS_ORIGIN=http://localhost:5173
```

#### 🎨 Frontend Environment Setup

Create a `.env` file in the `client/` directory:

```env
# ========================================
# API Configuration
# ========================================
VITE_API_BASE_URL=http://localhost:4000/api/v1

# ⚠️ IMPORTANT: Vite env vars MUST start with VITE_
```

---

## 📱 Usage Guide

### Starting the Application

#### Step 1: Start Backend Server

```bash
cd server
npm run dev
```

✅ Server available at: **http://localhost:4000**

#### Step 2: Start Frontend Development Server

```bash
cd client
npm run dev
```

✅ Client available at: **http://localhost:5173**

---

### Complete User Journey

#### 🔐 1. Register New Account

1. Click **"Sign Up"** button in the header
2. Fill in: Full Name, Email, Password, Confirm Password
3. Click **"Sign Up"** button
4. ✅ Success message appears
5. Auto-redirect to login page

#### 🔑 2. Login to Your Account

1. Enter **email** and **password**
2. Click **"Login"** button
3. ✅ Redirected to home page
4. Header displays your name and "Saved Itineraries" button

#### 🗺️ 3. Create Travel Itinerary

1. Fill out the travel planning form:
   - **Destination**: City or country
   - **Start Date**: Select from calendar
   - **End Date**: Must be after start date
   - **Interests**: Comma-separated (e.g., "history, food, beaches")
   - **Travelers** (optional): JSON format (e.g., `{"adults": 2}`)
   - **Budget** (optional): Amount in INR

2. Click **"Generate My Itinerary"** button
3. View loading animation with progress steps
4. View your detailed itinerary!

#### 📋 4. View Generated Itinerary

The itinerary displays:
- 📅 Day-by-day breakdown
- 🌤️ Weather forecasts
- 🖼️ Beautiful destination images
- ⏰ Activity times and durations
- 📸 Activity-specific images
- 🌡️ Hourly weather data
- 🛡️ Safety tips

**Action Buttons:**
- **"Save Itinerary"** - Save to your account
- **"Plan Another Trip"** - Return to home

#### 💾 5. Save Your Itinerary

1. Click **"Save Itinerary"** button
2. If not logged in: Redirect to login
3. If logged in: Itinerary saved successfully

#### 📚 6. View Saved Itineraries

1. Click **"Saved Itineraries"** in header
2. See all saved trips as cards
3. Click any card to regenerate full itinerary

#### 🚪 7. Logout

1. Click **"Logout"** button
2. Authentication cleared
3. Redirected to home page

---

## 📁 Project Structure

```
AI-Travel-Guide-Personalized-Tour-Planner/
│
├── client/                                    # Frontend React Application
│   ├── public/                                # Static assets
│   │   └── vite.svg
│   │
│   ├── src/
│   │   ├── assets/                            # Images, fonts, icons
│   │   │
│   │   ├── components/                        # Reusable components
│   │   │   └── Header.tsx                     # Navigation header
│   │   │
│   │   ├── pages/                             # Route-level pages
│   │   │   ├── Home.tsx                       # Landing page with form
│   │   │   ├── Login.tsx                      # User login
│   │   │   ├── Register.tsx                   # User registration
│   │   │   ├── ItinerarySelection.tsx         # Itinerary display
│   │   │   └── SavedItineraries.tsx           # Saved trips
│   │   │
│   │   ├── store/                             # Redux state management
│   │   │   ├── store.ts                       # Redux store config
│   │   │   ├── authSlice.ts                   # Authentication state
│   │   │   ├── itinerarySlice.ts              # Itinerary generation
│   │   │   ├── formSlice.ts                   # Form data state
│   │   │   └── savedItinerariesSlice.ts       # Saved trips state
│   │   │
│   │   ├── styles/                            # CSS stylesheets
│   │   │   ├── Header.css
│   │   │   ├── Home.css
│   │   │   ├── Auth.css
│   │   │   ├── ItinerarySelection.css
│   │   │   └── SavedItineraries.css
│   │   │
│   │   ├── App.tsx                            # Main app with routing
│   │   ├── App.css
│   │   ├── main.tsx                           # React entry point
│   │   ├── index.css
│   │   └── vite-env.d.ts                      # TypeScript declarations
│   │
│   ├── .env                                   # Environment variables
│   ├── .env.example                           # Env template
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
│
├── server/                                    # Backend Node.js Application
│   ├── src/
│   │   ├── controllers/                       # Request handlers
│   │   │   ├── itinary.controller.js          # AI & itinerary logic
│   │   │   └── user.controller.js             # User auth logic
│   │   │
│   │   ├── db/                                # Database connection
│   │   │   └── index.js                       # MongoDB setup
│   │   │
│   │   ├── middlewares/                       # Express middlewares
│   │   │   └── auth.middleware.js             # JWT authentication
│   │   │
│   │   ├── models/                            # Mongoose schemas
│   │   │   ├── itinerary.model.js             # Itinerary model
│   │   │   └── user.model.js                  # User model
│   │   │
│   │   ├── routes/                            # API routes
│   │   │   ├── ai.routes.js                   # AI & itinerary routes
│   │   │   └── user.routes.js                 # User auth routes
│   │   │
│   │   ├── utils/                             # Utility functions
│   │   │   ├── ApiError.js                    # Custom error class
│   │   │   ├── ApiResponse.js                 # Response formatter
│   │   │   ├── async-handler.js               # Async error wrapper
│   │   │   └── weatherAPi.service.js          # Weather & images
│   │   │
│   │   ├── app.js                             # Express config
│   │   ├── constants.js                       # App constants
│   │   └── index.js                           # Server entry point
│   │
│   ├── .env                                   # Environment variables
│   └── package.json
│
└── README.md                                  # This file
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:4000/api/v1
```

---

### 🔐 Authentication Endpoints

#### 1. Register User

**POST** `/user/register`

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "securePass123"
}
```

**Success Response (201):**
```json
{
  "statusCode": 200,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "fullName": "John Doe",
    "email": "john@example.com"
  },
  "message": "User registered successfully",
  "success": true
}
```

---

#### 2. Login User

**POST** `/user/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePass123"
}
```

**Success Response (200):**
```json
{
  "statusCode": 200,
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "fullName": "John Doe",
      "email": "john@example.com"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "User logged in successfully",
  "success": true
}
```

**Cookies Set:**
- `accessToken` - Expires in 1 day
- `refreshToken` - Expires in 10 days

---

#### 3. Check Auth Status

**POST** `/user/isUserLoggedIn` 🔒

**Success Response (200):**
```json
{
  "statusCode": 200,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "fullName": "John Doe",
    "email": "john@example.com"
  },
  "message": "User is logged in",
  "success": true
}
```

---

#### 4. Logout User

**POST** `/user/logout` 🔒

**Success Response (200):**
```json
{
  "statusCode": 200,
  "data": {},
  "message": "User logged out successfully",
  "success": true
}
```

---

### 🗺️ Itinerary Endpoints

#### 5. Generate Itinerary

**POST** `/ai/generate-response`

**Content-Type:** `multipart/form-data`

**Request Body:**
```javascript
{
  destination: "Paris",
  start_date: "2025-11-01",
  end_date: "2025-11-05",
  intrests: "art, food, history",
  travellers: '{"adults": 2}',
  budget: "75000"
}
```

**Success Response (200):**
```json
{
  "done": true,
  "data": {
    "destination": "Paris",
    "summary": "A romantic 5-day journey through Paris...",
    "days": [
      {
        "day": 1,
        "date": "2025-11-01",
        "activities": [
          {
            "time": "9:00 AM",
            "placeName": "Eiffel Tower",
            "title": "Visit the iconic Eiffel Tower",
            "PublicImageURL": "https://images.unsplash.com/...",
            "duration": "2-3 hours",
            "notes": "Book tickets in advance",
            "weather": {
              "temp_c": 15.2,
              "condition": "Partly cloudy"
            }
          }
        ],
        "safety": "Be cautious of pickpockets",
        "weather": {
          "day": {
            "maxtemp_c": 18.5,
            "mintemp_c": 12.3
          }
        }
      }
    ]
  }
}
```

---

#### 6. Save Itinerary

**POST** `/ai/save-itinary` 🔒

**Content-Type:** `multipart/form-data`

**Request Body:** Same as generate-response

**Success Response (201):**
```json
{
  "statusCode": 201,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439011",
    "destination": "Paris",
    "start_date": "2025-11-01",
    "end_date": "2025-11-05"
  },
  "message": "Itinerary saved successfully",
  "success": true
}
```

---

#### 7. List Saved Itineraries

**POST** `/ai/list-all-itinary` 🔒

**Success Response (200):**
```json
{
  "statusCode": 200,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "destination": "Paris",
      "start_date": "2025-11-01",
      "end_date": "2025-11-05",
      "intrests": ["art", "food", "history"]
    }
  ],
  "message": "Itineraries retrieved successfully",
  "success": true
}
```

---

### Error Response Format

```json
{
  "statusCode": 400,
  "message": "Detailed error message",
  "success": false,
  "errors": []
}
```

**HTTP Status Codes:**
- `200` - Success
- `201` - Resource created
- `400` - Bad request
- `401` - Unauthorized
- `404` - Not found
- `409` - Conflict
- `500` - Internal server error

---

## 🔐 Authentication Flow

### Registration Flow

```
1. User fills registration form
   ↓
2. POST /user/register
   ↓
3. Validate input
   ↓
4. Hash password with bcrypt
   ↓
5. Create user in MongoDB
   ↓
6. Return success
```

### Login Flow

```
1. User enters credentials
   ↓
2. POST /user/login
   ↓
3. Verify password
   ↓
4. Generate JWT tokens
   ↓
5. Set HTTP-only cookies
   ↓
6. Return user data
```

### Protected Route Access

```
1. Request to protected route
   ↓
2. Extract token from cookies/headers
   ↓
3. Verify JWT signature
   ↓
4. Attach user to request
   ↓
5. Continue to controller
```

---

## 🐛 Troubleshooting

### MongoDB Connection Errors

**Problem:** `MongoServerError: bad auth`

**Solution:** URL-encode special characters in password

```env
# Wrong
MONGODB_URL=mongodb+srv://user:Pass@word!@cluster.mongodb.net/db

# Correct
MONGODB_URL=mongodb+srv://user:Pass%40word%21@cluster.mongodb.net/db
```

**Character Encoding:**
- `@` → `%40`
- `!` → `%21`
- `#` → `%23`
- `$` → `%24`

---

### Port Already in Use

**Windows:**
```powershell
netstat -ano | findstr :4000
taskkill /PID <PID> /F
```

**macOS/Linux:**
```bash
lsof -i :4000
kill -9 <PID>
```

---

### CORS Errors

Update `server/src/app.js`:

```javascript
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
```

---

### JWT Authentication Errors

1. Clear browser cookies
2. Verify JWT secrets in `.env`
3. Check token expiration
4. Login again

---

### Environment Variables Not Loading

1. Check `.env` file exists
2. Verify variable names (frontend must start with `VITE_`)
3. Restart servers after changes

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 👨‍💻 Author

**Ganesh Bagra**

- 🌐 GitHub: [@GaneshBagra](https://github.com/GaneshBagra)
- 📧 Repository: [AI-Travel-Guide-Personalized-Tour-Planner](https://github.com/GaneshBagra/AI-Travel-Guide-Personalized-Tour-Planner)

---

## 🙏 Acknowledgments

- **Google Gemini AI** - AI capabilities
- **WeatherAPI.com** - Weather data
- **Unsplash** - Travel imagery
- **MongoDB** - Data storage
- **React Team** - Frontend framework
- **Vite Team** - Build tool

---

## 🗺️ Roadmap

- [ ] User profile management
- [ ] Itinerary sharing
- [ ] Export to PDF
- [ ] Collaborative planning
- [ ] Budget tracking
- [ ] Offline mode
- [ ] Mobile app (React Native)
- [ ] Multiple languages (i18n)
- [ ] Social features
- [ ] Maps integration

---

<div align="center">

**Made with ❤️ by [Ganesh Bagra](https://github.com/GaneshBagra)**

**⭐ Star this repo if you find it helpful!**

</div>
