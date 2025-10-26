# 🌍 GradGuide - AI Travel Planner

> Your personalized AI-powered travel companion that creates detailed, day-by-day itineraries with real-time weather forecasts, stunning destination imagery, and secure user authentication.

[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.19.2-brightgreen.svg)](https://www.mongodb.com/)
[![Google Gemini](https://img.shields.io/badge/AI-Google%20Gemini-orange.svg)](https://ai.google.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg)](https://www.typescriptlang.org/)

---

## 📖 Table of Contents

- [Overview](#-overview)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🏗️ Architecture](#️-architecture)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [📱 Usage](#-usage)
- [📁 Project Structure](#-project-structure)
- [📡 API Documentation](#-api-documentation)
- [🔧 How It Works](#-how-it-works)
- [🔐 Authentication Flow](#-authentication-flow)
- [📸 Screenshots](#-screenshots)
- [🐛 Troubleshooting](#-troubleshooting)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [👨‍💻 Author](#-author)

---

## 🎯 Overview

**GradGuide** is a full-stack intelligent travel planning application that leverages Google's Gemini AI to create personalized travel itineraries. With user authentication, itinerary saving, and comprehensive travel planning features, it's your complete travel companion.

### Key Capabilities:

- 🎯 **AI-Powered Planning** - Smart itineraries tailored to your preferences
- 🔐 **User Authentication** - Secure login/signup with JWT tokens
- 💾 **Save Itineraries** - Store and access your travel plans anytime
- 🌤️ **Real-time Weather** - 10-day weather forecasts for each activity
- 📸 **Beautiful Imagery** - Curated photos from Unsplash
- 💰 **Budget-Aware** - Plans that respect your spending limits
- 👥 **Group-Friendly** - Accommodates any number of travelers
- 📱 **Fully Responsive** - Works seamlessly on all devices

---

## ✨ Features

### 🤖 AI-Powered Itinerary Generation
- Uses **Google Gemini 1.5 Pro** for intelligent travel planning
- Structured JSON output with day-by-day activities
- Personalized recommendations based on interests, budget, and group size
- Automatic activity timing and duration suggestions

### 🔐 User Authentication & Management
- **JWT-based authentication** with HTTP-only cookies
- Secure password hashing with **bcrypt**
- User registration with validation
- Login/logout functionality
- Protected routes and API endpoints
- Persistent authentication state with Redux

### 💾 Itinerary Management
- **Save unlimited itineraries** to your account
- View all saved trips in a beautiful card layout
- Click any saved itinerary to regenerate and view details
- Automatic form data storage for easy re-planning
- Delete functionality (coming soon)

### 🌦️ Advanced Weather Integration
- Real-time weather forecasts for the next 10 days
- **Activity-specific weather** matching exact times (Morning, 9 AM, Evening, etc.)
- Temperature, conditions, and weather icons for each time slot
- Day-level and hourly weather data
- Powered by [WeatherAPI.com](https://www.weatherapi.com/)

### 📷 Dynamic Visual Experience
- Automatic image fetching from **Unsplash API**
- High-quality landscape photos for each destination
- Activity-specific images based on place names
- Fallback mechanisms for image loading

### 💻 Modern Frontend Architecture
- Built with **React 19** and **TypeScript** for type safety
- **Redux Toolkit** for robust state management
- **React Router v7** for seamless navigation
- **Bootstrap 5** + Custom CSS for beautiful UI
- Responsive design that works on all devices (mobile, tablet, desktop)
- Smooth animations and loading states
- Travel-themed purple gradient design

### 🎨 Enhanced User Experience
- Interactive forms with real-time validation
- Animated loading screens with progress indicators
- Success/error notifications
- Day-by-day itinerary cards with collapsible sections
- Safety tips and travel recommendations
- One-click itinerary regeneration from saved plans

---

## 🛠️ Tech Stack

### Frontend
- **React 19.1.1** - Modern UI library with latest features
- **TypeScript 5.6** - Type-safe JavaScript
- **Redux Toolkit 2.5.0** - Predictable state management
- **React Router v7** - Declarative routing
- **Vite 6.0.5** - Lightning-fast build tool
- **Bootstrap 5.3.3** - Responsive framework
- **Axios** - HTTP client
- **Custom CSS** - Travel-themed responsive design

### Backend
- **Node.js v20+** - JavaScript runtime
- **Express 5.1.0** - Fast web framework
- **MongoDB 8.19.2** - NoSQL database
- **Mongoose 8.10.5** - MongoDB ODM
- **JWT (jsonwebtoken)** - Secure authentication
- **bcrypt** - Password hashing
- **cookie-parser** - Cookie management
- **Multer** - FormData parsing middleware

### AI & External APIs
- **Google Gemini 1.5 Pro** - AI itinerary generation
- **WeatherAPI.com** - Weather forecasts
- **Unsplash API** - High-quality imagery

### Security & Authentication
- **JWT Tokens** - Stateless authentication
- **HTTP-Only Cookies** - XSS protection
- **bcrypt** - Secure password hashing
- **CORS** - Cross-origin resource sharing
- **Environment Variables** - Secure configuration

### Development Tools
- **Nodemon** - Auto-restart development server
- **ESLint** - Code linting and formatting
- **dotenv** - Environment variable management
- **Git** - Version control

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                     React Client (Vite)                      │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────┐      │
│  │   Pages     │  │  Components  │  │  Redux Store  │      │
│  │ • Home      │  │ • Header     │  │ • auth        │      │
│  │ • Login     │  │ • Loading    │  │ • itinerary   │      │
│  │ • Register  │  └──────────────┘  │ • form        │      │
│  │ • Saved     │                     │ • saved       │      │
│  │ • Itinerary │                     └───────────────┘      │
│  └─────────────┘                                            │
└──────────────────────────┬───────────────────────────────────┘
                           │ HTTP/REST API (Fetch)
                           │ • JSON Data
                           │ • JWT Cookies
                           ▼
┌──────────────────────────────────────────────────────────────┐
│                   Express Server (Node.js)                   │
│  ┌────────────────────────────────────────────────────────┐  │
│  │                    Middleware Layer                     │  │
│  │  • CORS  • JSON Parser  • Cookie Parser  • Auth JWT   │  │
│  └────────────────────────────────────────────────────────┘  │
│  ┌─────────────────────┐      ┌─────────────────────────┐   │
│  │   User Routes       │      │     AI Routes           │   │
│  │ • /register         │      │ • /generate-response    │   │
│  │ • /login            │      │ • /save-itinary         │   │
│  │ • /logout           │      │ • /list-all-itinary     │   │
│  │ • /isUserLoggedIn   │      └─────────────────────────┘   │
│  └─────────────────────┘                                     │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐  │
│  │                  Controllers Layer                      │  │
│  │  • User Controller    • Itinerary Controller          │  │
│  │  • Token Generation   • AI Processing                 │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────┬──────────────────────┬────────────────────┘
                   │                      │
                   ▼                      ▼
      ┌─────────────────────┐   ┌──────────────────────┐
      │   MongoDB Atlas     │   │   External APIs      │
      │                     │   │                      │
      │  Collections:       │   │ • Google Gemini AI   │
      │  • users            │   │ • WeatherAPI.com     │
      │  • itineraries      │   │ • Unsplash API       │
      │                     │   │                      │
      └─────────────────────┘   └──────────────────────┘
```

### Request Flow

#### 1. **New Itinerary Creation**
```
User fills form → Redux stores form data → Navigate to results page
→ Call /generate-response API → AI generates itinerary
→ Weather + images enrichment → Display results
```

#### 2. **Save Itinerary**
```
User clicks "Save" → Check authentication → Call /save-itinary API
→ Store in MongoDB → Success notification
```

#### 3. **View Saved Itineraries**
```
User navigates to /saved-itineraries → Call /list-all-itinary API
→ Display cards → User clicks card → Regenerate itinerary
```

#### 4. **Authentication Flow**
```
User registers → Password hashed → Stored in DB
→ User logs in → Password verified → JWT tokens generated
→ Tokens stored in HTTP-only cookies → Protected routes accessible
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** v20 or higher ([Download](https://nodejs.org/))
- **npm** v7 or higher (comes with Node.js)
- **MongoDB** v5 or higher ([Download](https://www.mongodb.com/try/download/community)) or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
- **Git** ([Download](https://git-scm.com/))

### API Keys Required
- [Google Gemini API Key](https://ai.google.dev/) - Free tier available
- [WeatherAPI.com API Key](https://www.weatherapi.com/signup.aspx) - Free tier available
- [Unsplash API Key](https://unsplash.com/developers) - Free tier available

---

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/GaneshBagra/AI-Travel-Guide-Personalized-Tour-Planner.git
cd AI-Travel-Guide-Personalized-Tour-Planner
```

#### 2. Install Backend Dependencies
```bash
cd server
npm install
```

**Backend Dependencies:**
```json
{
  "express": "^5.1.0",
  "mongoose": "^8.10.5",
  "bcrypt": "^5.1.1",
  "jsonwebtoken": "^9.0.2",
  "cookie-parser": "^1.4.7",
  "cors": "^2.8.5",
  "dotenv": "^16.4.7",
  "multer": "^1.4.5-lts.1",
  "@google/genai": "^0.4.0",
  "axios": "^1.7.9"
}
```

#### 3. Install Frontend Dependencies
```bash
cd ../client
npm install
```

**Frontend Dependencies:**
```json
{
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "react-router": "^7.1.1",
  "react-router-dom": "^7.1.1",
  "@reduxjs/toolkit": "^2.5.0",
  "react-redux": "^9.2.0",
  "typescript": "~5.6.2",
  "bootstrap": "^5.3.3"
}
```

---

### Environment Variables

#### Backend Environment Variables

Create a `.env` file in the `server` directory:

```env
# Server Configuration
PORT=4000
NODE_ENV=development

# MongoDB Connection
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/gradguide
# Important: URL-encode special characters in password
# @ → %40, ! → %21, # → %23, $ → %24

# JWT Secrets (generate random strings)
ACCESS_TOKEN_SECRET=your_access_token_secret_here_make_it_long_and_random
ACCESS_TOKEN_EXPIRY=1d

REFRESH_TOKEN_SECRET=your_refresh_token_secret_here_also_long_and_random
REFRESH_TOKEN_EXPIRY=10d

# Google Gemini AI API
GEMINI_API_KEY=your_gemini_api_key_here

# Weather API
WEATHERAPI_KEY=your_weatherapi_key_here

# Unsplash API
UNSPLASH_API_KEY=your_unsplash_access_key_here

# CORS Settings
CORS_ORIGIN=http://localhost:5173
```

**How to Get API Keys:**

1. **Google Gemini API**:
   - Visit https://ai.google.dev/
   - Sign in with Google account
   - Go to "Get API Key"
   - Create new API key
   - Copy and paste into `.env`

2. **WeatherAPI.com**:
   - Visit https://www.weatherapi.com/signup.aspx
   - Sign up for free account
   - Go to dashboard
   - Copy your API key
   - Paste into `.env`

3. **Unsplash API**:
   - Visit https://unsplash.com/developers
   - Register application
   - Copy "Access Key"
   - Paste into `.env`

4. **JWT Secrets**:
   - Generate random strings (use online generator or `openssl rand -base64 64`)
   - Example: `openssl rand -base64 64` in terminal

#### Frontend Environment Variables

Create a `.env` file in the `client` directory:

```env
# API Base URL
VITE_API_BASE_URL=http://localhost:4000/api/v1
```

**Important Notes:**
- Frontend environment variables MUST start with `VITE_` prefix
- Restart dev server after changing `.env` files
- Never commit `.env` files to Git (already in `.gitignore`)

---

## 📱 Usage

### Running the Application

#### 1. Start MongoDB (if running locally)
```bash
# Windows
mongod

# macOS/Linux
sudo systemctl start mongodb
```

#### 2. Start the Backend Server
```bash
cd server
npm run dev
```
✅ Server will run on: **http://localhost:4000**

Console output:
```
Server running on port : 4000
MongoDB connected successfully
```

#### 3. Start the Frontend (in a new terminal)
```bash
cd client
npm run dev
```
✅ Client will run on: **http://localhost:5173**

#### 4. Open Your Browser
Navigate to: **http://localhost:5173**

---

### Using the Application

#### 🔐 **Step 1: Register an Account**
1. Click **"Sign Up"** button in header
2. Fill in the registration form:
   - **Full Name**: Your name
   - **Email**: Valid email address
   - **Password**: At least 6 characters
   - **Confirm Password**: Must match password
3. Click **"Register"**
4. Success message appears: "Registration Successful! Please login to continue"
5. Automatically redirected to login page after 2 seconds

#### 🔑 **Step 2: Login**
1. Enter your **email** and **password**
2. Click **"Login"**
3. Upon success, redirected to home page
4. Header now shows your name and **"Saved Itineraries"** / **"Logout"** buttons

#### 🗺️ **Step 3: Create an Itinerary**
1. Fill out the travel planning form:
   - **Destination** (Required): e.g., "Paris", "Tokyo", "Rishikesh"
   - **Start Date** (Required): Select from calendar
   - **End Date** (Required): Must be within 10 days for weather data
   - **Interests** (Required): e.g., "mountains, history, food, culture"
   - **Travelers** (Optional): e.g., `{"adults": 2, "children": 1}`
   - **Budget** (Optional): e.g., `50000` (in INR)

2. Click **"Generate My Itinerary"**

3. **Loading Screen** appears with:
   - Animated airplane flying through clouds
   - 4-step progress indicator:
     1. ✓ Analyzing your preferences
     2. ✓ Crafting your itinerary
     3. ✓ Finding the best places
     4. ✓ Finalizing details

#### 📋 **Step 4: View Your Itinerary**
You'll see a detailed day-by-day plan with:

**For Each Day:**
- 📅 Date and day number
- 🌤️ Overall weather forecast (min/max temperature, condition)
- 🖼️ Destination image

**For Each Activity:**
- ⏰ Time slot (e.g., "9:00 AM", "Morning")
- 📍 Place name (exact location)
- 📝 Activity title and description
- 🕐 Duration estimate
- 📸 Activity-specific image from Unsplash
- 🌡️ Hourly weather forecast (temperature, condition, icon)
- 💡 Helpful notes and tips

**Additional Information:**
- 🛡️ Safety tips for the day
- 📖 AI's explanation of why places were chosen
- 🎯 Summary of your entire trip

#### 💾 **Step 5: Save Your Itinerary**
1. Click **"Save Itinerary"** button at the top
2. If not logged in, redirected to login page
3. If logged in, itinerary saved to your account
4. Success message: "Itinerary saved successfully!"
5. Link to view saved itineraries appears

#### 📚 **Step 6: View Saved Itineraries**
1. Click **"Saved Itineraries"** in header
2. See all your saved trips in a grid of cards
3. Each card shows:
   - ✈️ Destination name
   - 📅 Start date → End date
   - 🎯 Interests
4. Click any card to regenerate and view full itinerary

#### 🚪 **Step 7: Logout**
1. Click **"Logout"** button in header
2. Redirected to home page
3. Authentication cleared
4. Header shows **"Login"** and **"Sign Up"** buttons again

---

## 📁 Project Structure

```
AI-Travel-Guide-Personalized-Tour-Planner/
│
├── client/                                    # React Frontend Application
│   ├── public/                                # Static assets
│   │   └── vite.svg                           # Vite logo
│   │
│   ├── src/
│   │   ├── assets/                            # Images, fonts, etc.
│   │   │
│   │   ├── components/                        # Reusable React components
│   │   │   └── Header.tsx                     # Navigation header with auth
│   │   │
│   │   ├── pages/                             # Route-level page components
│   │   │   ├── Home.tsx                       # Landing page with travel form
│   │   │   ├── Login.tsx                      # User login page
│   │   │   ├── Register.tsx                   # User registration page
│   │   │   ├── ItinerarySelection.tsx         # Itinerary display page
│   │   │   └── SavedItineraries.tsx           # Saved trips page
│   │   │
│   │   ├── store/                             # Redux state management
│   │   │   ├── store.ts                       # Redux store configuration
│   │   │   ├── authSlice.ts                   # Authentication state
│   │   │   ├── itinerarySlice.ts              # Itinerary generation state
│   │   │   ├── formSlice.ts                   # Form data state
│   │   │   └── savedItinerariesSlice.ts       # Saved trips state
│   │   │
│   │   ├── styles/                            # CSS stylesheets
│   │   │   ├── Header.css                     # Header component styles
│   │   │   ├── Home.css                       # Home page styles
│   │   │   ├── Auth.css                       # Login/Register styles
│   │   │   ├── ItinerarySelection.css         # Itinerary page styles
│   │   │   └── SavedItineraries.css           # Saved trips page styles
│   │   │
│   │   ├── App.tsx                            # Main app with routing
│   │   ├── App.css                            # App-level styles
│   │   ├── main.tsx                           # React entry point
│   │   ├── index.css                          # Global styles
│   │   └── vite-env.d.ts                      # Vite environment types
│   │
│   ├── .env                                   # Environment variables (not in Git)
│   ├── .env.example                           # Environment variables template
│   ├── .gitignore                             # Git ignore rules
│   ├── eslint.config.js                       # ESLint configuration
│   ├── index.html                             # HTML entry point
│   ├── package.json                           # Frontend dependencies
│   ├── tsconfig.json                          # TypeScript configuration
│   ├── tsconfig.app.json                      # App-specific TS config
│   ├── tsconfig.node.json                     # Node-specific TS config
│   └── vite.config.ts                         # Vite build configuration
│
├── server/                                    # Node.js Backend Application
│   ├── src/
│   │   ├── controllers/                       # Request handlers (business logic)
│   │   │   ├── itinary.controller.js          # AI generation & itinerary CRUD
│   │   │   └── user.controller.js             # User authentication & management
│   │   │
│   │   ├── db/                                # Database connection
│   │   │   └── index.js                       # MongoDB connection setup
│   │   │
│   │   ├── middlewares/                       # Express middlewares
│   │   │   └── auth.middleware.js             # JWT authentication middleware
│   │   │
│   │   ├── models/                            # Mongoose schemas & models
│   │   │   ├── itinerary.model.js             # Itinerary data model
│   │   │   └── user.model.js                  # User data model
│   │   │
│   │   ├── routes/                            # API route definitions
│   │   │   ├── ai.routes.js                   # AI & itinerary routes
│   │   │   └── user.routes.js                 # User authentication routes
│   │   │
│   │   ├── utils/                             # Utility functions & helpers
│   │   │   ├── ApiError.js                    # Custom error class
│   │   │   ├── ApiResponse.js                 # Standard response formatter
│   │   │   ├── async-handler.js               # Async error wrapper
│   │   │   └── weatherAPi.service.js          # Weather & Unsplash services
│   │   │
│   │   ├── app.js                             # Express app configuration
│   │   ├── constants.js                       # App constants
│   │   └── index.js                           # Server entry point
│   │
│   ├── .env                                   # Environment variables (not in Git)
│   ├── .gitignore                             # Git ignore rules
│   └── package.json                           # Backend dependencies
│
├── .gitignore                                 # Root Git ignore
└── README.md                                  # This file
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:4000/api/v1
```

---

### 🔐 User Authentication Endpoints

#### 1. Register New User

**POST** `/user/register`

Register a new user account.

**Request Body (JSON)**:
```json
{
  "fullName": "John Doe",
  "email": "john.doe@example.com",
  "password": "SecurePassword123"
}
```

**Success Response (201)**:
```json
{
  "statusCode": 200,
  "data": {
    "_id": "6765f2a3b8e1234567890abc",
    "fullName": "John Doe",
    "email": "john.doe@example.com",
    "createdAt": "2025-10-26T10:30:00.000Z",
    "updatedAt": "2025-10-26T10:30:00.000Z"
  },
  "message": "User registered successfully",
  "success": true
}
```

**Error Responses**:
- `400` - Validation error (missing fields, password too short)
- `409` - User with email already exists

---

#### 2. Login User

**POST** `/user/login`

Login with email and password. Sets HTTP-only cookies with JWT tokens.

**Request Body (JSON)**:
```json
{
  "email": "john.doe@example.com",
  "password": "SecurePassword123"
}
```

**Success Response (200)**:
```json
{
  "statusCode": 200,
  "data": {
    "user": {
      "_id": "6765f2a3b8e1234567890abc",
      "fullName": "John Doe",
      "email": "john.doe@example.com"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "User logged in successfully",
  "success": true
}
```

**Cookies Set**:
- `accessToken` - Expires in 1 day
- `refreshToken` - Expires in 10 days

**Error Responses**:
- `400` - Missing email or password
- `404` - User doesn't exist
- `401` - Password incorrect

---

#### 3. Logout User

**POST** `/user/logout`

Logout current user. Clears JWT cookies. **Requires authentication**.

**Headers**:
```
Authorization: Bearer <accessToken>
```
OR cookies with `accessToken`

**Success Response (200)**:
```json
{
  "statusCode": 200,
  "data": {},
  "message": "User logged out successfully",
  "success": true
}
```

**Error Response**:
- `401` - Unauthorized (not logged in)

---

#### 4. Check If User is Logged In

**POST** `/user/isUserLoggedIn`

Check if current user is authenticated. **Requires authentication**.

**Headers**:
```
Authorization: Bearer <accessToken>
```
OR cookies with `accessToken`

**Success Response (200)**:
```json
{
  "statusCode": 200,
  "data": {
    "_id": "6765f2a3b8e1234567890abc",
    "fullName": "John Doe",
    "email": "john.doe@example.com"
  },
  "message": "User is logged in",
  "success": true
}
```

**Error Response**:
- `401` - User not authenticated

---

### 🗺️ Itinerary Endpoints

#### 5. Generate Itinerary

**POST** `/ai/generate-response`

Generate a personalized travel itinerary using AI.

**Request Format**: `multipart/form-data`

**Request Body**:
```javascript
{
  destination: "Paris",              // Required: Destination city/country
  start_date: "2025-11-01",         // Required: ISO date (YYYY-MM-DD)
  end_date: "2025-11-05",           // Required: ISO date (YYYY-MM-DD)
  intrests: "art, food, history",   // Required: Comma-separated interests
  travellers: '{"adults": 2, "children": 1}', // Optional: JSON string
  budget: 75000                      // Optional: Budget in INR
}
```

**Success Response (200)**:
```json
{
  "done": true,
  "data": {
    "destination": "Paris",
    "summary": "A romantic 5-day journey through Paris exploring art, cuisine, and history...",
    "days": [
      {
        "day": 1,
        "date": "2025-11-01",
        "activities": [
          {
            "time": "9:00 AM",
            "placeName": "Eiffel Tower",
            "title": "Visit the iconic Eiffel Tower",
            "PublicImageURL": "https://images.unsplash.com/photo-xyz...",
            "duration": "2-3 hours",
            "notes": "Book tickets in advance to avoid long queues. Best views from the top!",
            "weather": {
              "date": "2025-11-01",
              "time": "2025-11-01 09:00",
              "temp_c": 15.2,
              "condition": "Partly cloudy",
              "icon": "https://cdn.weatherapi.com/weather/64x64/day/116.png"
            }
          },
          {
            "time": "Afternoon (2:00 PM)",
            "placeName": "Louvre Museum",
            "title": "Explore world-famous art at the Louvre",
            "PublicImageURL": "https://images.unsplash.com/photo-abc...",
            "duration": "3-4 hours",
            "notes": "Must-see: Mona Lisa, Venus de Milo, Winged Victory",
            "weather": {
              "date": "2025-11-01",
              "time": "2025-11-01 14:00",
              "temp_c": 17.8,
              "condition": "Sunny",
              "icon": "https://cdn.weatherapi.com/weather/64x64/day/113.png"
            }
          }
        ],
        "safety": "Be cautious of pickpockets in crowded tourist areas. Keep valuables secure.",
        "weather": {
          "date": "2025-11-01",
          "day": {
            "maxtemp_c": 18.5,
            "mintemp_c": 12.3,
            "avgtemp_c": 15.4,
            "condition": "Partly cloudy",
            "icon": "https://cdn.weatherapi.com/weather/64x64/day/116.png"
          },
          "hourly": {
            "time": "2025-11-01 12:00",
            "temp_c": 16.8,
            "condition": "Partly cloudy",
            "icon": "https://cdn.weatherapi.com/weather/64x64/day/116.png"
          }
        },
        "placeQueried": "Eiffel Tower"
      }
      // ... more days
    ],
    "explanation": [
      "The Eiffel Tower is an iconic symbol of Paris and a must-visit landmark",
      "Louvre Museum houses world-class art collections including the Mona Lisa",
      "Notre-Dame Cathedral showcases stunning Gothic architecture"
    ]
  }
}
```

**Error Responses**:
- `400` - Missing required fields or invalid dates
- `503` - AI service temporarily unavailable
- `500` - Failed to generate itinerary

---

#### 6. Save Itinerary

**POST** `/ai/save-itinary`

Save an itinerary to user's account. **Requires authentication**.

**Headers**:
```
Authorization: Bearer <accessToken>
Content-Type: application/json
```

**Request Body (JSON)**:
```json
{
  "destination": "Paris",
  "start_date": "2025-11-01",
  "end_date": "2025-11-05",
  "intrests": "art, food, history",
  "travellers": "{\"adults\": 2, \"children\": 1}",
  "budget": 75000,
  "itinerary": {
    "destination": "Paris",
    "summary": "...",
    "days": [...]
  }
}
```

**Success Response (201)**:
```json
{
  "statusCode": 201,
  "data": {
    "_id": "6765f2a3b8e1234567890def",
    "userId": "6765f2a3b8e1234567890abc",
    "destination": "Paris",
    "start_date": "2025-11-01T00:00:00.000Z",
    "end_date": "2025-11-05T00:00:00.000Z",
    "intrests": "art, food, history",
    "travellers": "{\"adults\": 2, \"children\": 1}",
    "budget": 75000,
    "itinerary": {...},
    "createdAt": "2025-10-26T10:30:00.000Z",
    "updatedAt": "2025-10-26T10:30:00.000Z"
  },
  "message": "Itinerary saved successfully",
  "success": true
}
```

**Error Responses**:
- `401` - User not authenticated
- `400` - Missing required fields

---

#### 7. List All Saved Itineraries

**POST** `/ai/list-all-itinary`

Get all itineraries saved by the current user. **Requires authentication**.

**Headers**:
```
Authorization: Bearer <accessToken>
```

**Success Response (200)**:
```json
{
  "statusCode": 200,
  "data": [
    {
      "_id": "6765f2a3b8e1234567890def",
      "userId": "6765f2a3b8e1234567890abc",
      "destination": "Paris",
      "start_date": "2025-11-01T00:00:00.000Z",
      "end_date": "2025-11-05T00:00:00.000Z",
      "intrests": "art, food, history",
      "travellers": "{\"adults\": 2, \"children\": 1}",
      "budget": 75000,
      "itinerary": {...},
      "createdAt": "2025-10-26T10:30:00.000Z"
    },
    {
      "_id": "6765f2a3b8e1234567890ghi",
      "userId": "6765f2a3b8e1234567890abc",
      "destination": "Tokyo",
      "start_date": "2025-12-01T00:00:00.000Z",
      "end_date": "2025-12-07T00:00:00.000Z",
      "intrests": "technology, food, temples",
      "travellers": "{\"adults\": 1}",
      "budget": 100000,
      "itinerary": {...},
      "createdAt": "2025-10-25T08:15:00.000Z"
    }
  ],
  "message": "Itineraries retrieved successfully",
  "success": true
}
```

**Error Response**:
- `401` - User not authenticated

---

### Error Response Format

All errors follow this format:

```json
{
  "statusCode": 400,
  "message": "Detailed error message",
  "success": false,
  "errors": []
}
```

**Common Status Codes**:
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (authentication required)
- `404` - Not Found
- `409` - Conflict (e.g., user already exists)
- `500` - Internal Server Error
- `503` - Service Unavailable (external API error)

---

## 🔧 How It Works

### 1. Frontend Architecture

#### Redux State Management

**Four Main Slices:**

1. **`authSlice`** - User authentication state
   ```typescript
   {
     user: { _id, fullName, email },
     isAuthenticated: boolean,
     loading: boolean,
     error: string | null
   }
   ```

2. **`itinerarySlice`** - Generated itinerary state
   ```typescript
   {
     data: GeneratedItinerary | null,
     loading: boolean,
     error: string | null
   }
   ```

3. **`formSlice`** - Travel form data
   ```typescript
   {
     destination: string,
     start_date: string,
     end_date: string,
     intrests: string,
     travellers: string,
     budget: number | null
   }
   ```

4. **`savedItinerariesSlice`** - Saved trips
   ```typescript
   {
     itineraries: SavedItinerary[],
     loading: boolean,
     error: string | null
   }
   ```

#### Component Hierarchy

```
App
├── Header (shows on all pages except login/register)
│   ├── Brand Logo
│   ├── User Info (when authenticated)
│   ├── Saved Itineraries Link (when authenticated)
│   └── Login/Signup or Logout buttons
│
├── Routes
│   ├── / (Home)
│   │   └── Travel Form
│   │
│   ├── /login (Login)
│   │   └── Login Form
│   │
│   ├── /register (Register)
│   │   └── Registration Form
│   │
│   ├── /guide/itinary-selection (Itinerary Display)
│   │   ├── Loading Animation
│   │   ├── Day Cards
│   │   ├── Activity Cards
│   │   └── Save Button
│   │
│   └── /saved-itineraries (Saved Trips)
│       └── Itinerary Cards Grid
```

---

### 2. Backend Architecture

#### Middleware Stack

```javascript
app.use(cors())                    // CORS configuration
app.use(express.json())            // JSON body parser
app.use(express.urlencoded())      // URL-encoded body parser
app.use(cookieParser())            // Cookie parser
app.use(verifyJWT)                 // JWT authentication (protected routes)
```

#### Request Processing Flow

**Example: Saving an Itinerary**

```
1. Client → POST /api/v1/ai/save-itinary + JWT cookie
2. CORS middleware → Allow request
3. Body parser → Parse JSON body
4. Cookie parser → Extract accessToken from cookies
5. verifyJWT middleware → 
   - Decode JWT token
   - Find user in database
   - Attach user to req.user
6. Controller → saveItinerary()
   - Validate request body
   - Create new Itinerary document
   - Save to MongoDB
   - Return response
7. Response → JSON with saved itinerary data
```

---

### 3. AI Generation Process

#### Step-by-Step AI Itinerary Creation

```javascript
// 1. Receive user input
const { destination, start_date, end_date, intrests, travellers, budget } = req.body;

// 2. Calculate trip duration
const numberOfDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

// 3. Format interests and travelers
const interestsText = Array.isArray(intrests) ? intrests.join(", ") : intrests;
const travellersText = parseTravellers(travellers);
const budgetText = budget ? `Budget: ₹${budget}` : "Budget: Flexible";

// 4. Call Google Gemini AI
const aiResponse = await ai.models.generateContent({
  model: "gemini-1.5-pro",
  contents: `Create a ${numberOfDays}-day itinerary for ${destination}...`,
  config: {
    responseMimeType: "application/json",
    responseSchema: {
      // Strict JSON schema for structured output
      type: Type.OBJECT,
      properties: {
        destination: Type.STRING,
        days: Type.ARRAY,
        summary: Type.STRING,
        explanation: Type.ARRAY
      }
    }
  }
});

// 5. Parse AI response
const parsedData = JSON.parse(aiResponse.text);

// 6. Enrich with weather and images
for (const day of parsedData.days) {
  for (const activity of day.activities) {
    // Fetch Unsplash image for place
    const image = await getImageFromUnsplash(activity.placeName);
    
    // Fetch weather for specific time
    const weather = await getWeatherForDateTime(
      activity.placeName,
      day.date,
      activity.time
    );
    
    activity.PublicImageURL = image;
    activity.weather = weather;
  }
  
  // Fetch day-level weather
  day.weather = await getForecastForDate(destination, day.date);
}

// 7. Return enriched itinerary
return res.json({ done: true, data: parsedData });
```

---

### 4. Weather Integration

#### Date Normalization

Handles various date formats:

```javascript
function normalizeToYMD(dateInput) {
  // "2025-10-26" → "2025-10-26" (already correct)
  // "10/26/2025" → "2025-10-26"
  // Date object → "2025-10-26"
  
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateInput)) return dateInput;
  
  const parsed = new Date(dateInput);
  const yyyy = parsed.getUTCFullYear();
  const mm = String(parsed.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(parsed.getUTCDate()).padStart(2, "0");
  
  return `${yyyy}-${mm}-${dd}`;
}
```

#### Activity Time Parsing

Converts human-readable times to hours:

```javascript
function parseActivityTimeToHour(timeStr) {
  // "9:00 AM" → 9
  // "2:30 PM" → 14
  // "Morning" → 9
  // "Afternoon" → 15
  // "Evening" → 18
  // "Night" → 21
  
  const s = timeStr.toLowerCase();
  
  // Handle HH:MM format
  const hm = s.match(/(\d{1,2}):(\d{2})/);
  if (hm) return parseInt(hm[1], 10) % 24;
  
  // Handle AM/PM format
  const ap = s.match(/(\d{1,2})\s*(am|pm)/);
  if (ap) {
    let hour = parseInt(ap[1], 10);
    if (ap[2] === "pm" && hour !== 12) hour += 12;
    if (ap[2] === "am" && hour === 12) hour = 0;
    return hour;
  }
  
  // Handle text labels
  if (s.includes("morning")) return 9;
  if (s.includes("afternoon")) return 15;
  if (s.includes("evening")) return 18;
  if (s.includes("night")) return 21;
  
  return 12; // Default to noon
}
```

#### Weather Matching Algorithm

Finds the closest hourly weather forecast:

```javascript
async function getWeatherForDateTime(location, date, time) {
  // 1. Fetch 10-day forecast from WeatherAPI
  const forecast = await fetchWeatherForecast(location);
  
  // 2. Find the correct day
  const targetDay = forecast.days.find(d => d.date === date);
  if (!targetDay) return null;
  
  // 3. Parse activity time to hour
  const desiredHour = parseActivityTimeToHour(time);
  
  // 4. Find closest hourly forecast
  let closestHour = null;
  let minDiff = Infinity;
  
  for (const hourData of targetDay.hours) {
    const hourValue = extractHourFromTimestamp(hourData.time);
    const diff = Math.abs(hourValue - desiredHour);
    
    if (diff < minDiff) {
      minDiff = diff;
      closestHour = hourData;
    }
  }
  
  return {
    temp_c: closestHour.temp_c,
    condition: closestHour.condition.text,
    icon: closestHour.condition.icon
  };
}
```

---

### 5. Image Fetching

#### Unsplash Integration

```javascript
async function getImageFromUnsplash(query) {
  try {
    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: {
        query: query,              // e.g., "Eiffel Tower"
        per_page: 1,               // Get only 1 result
        orientation: "landscape"   // Landscape images only
      },
      headers: {
        Authorization: `Client-ID ${UNSPLASH_API_KEY}`
      },
      timeout: 8000
    });
    
    const result = response.data.results[0];
    return result?.urls?.regular || result?.urls?.small || null;
    
  } catch (error) {
    console.error("Unsplash error:", error.message);
    return null; // Fallback to no image
  }
}
```

**Image Priority:**
1. `regular` - High quality (1080px width)
2. `small` - Medium quality (400px width)
3. `thumb` - Low quality (200px width)
4. `null` - No image found

---

## 🔐 Authentication Flow

### JWT Token-Based Authentication

#### 1. Registration Flow

```
User fills registration form
   ↓
POST /api/v1/user/register
   ↓
Validate input (fullName, email, password)
   ↓
Check if email already exists
   ↓
Hash password with bcrypt (10 salt rounds)
   ↓
Create new User document in MongoDB
   ↓
Return user data (without password)
   ↓
Show success message
   ↓
Redirect to login page
```

#### 2. Login Flow

```
User enters email & password
   ↓
POST /api/v1/user/login
   ↓
Find user by email
   ↓
Compare password with hashed password (bcrypt)
   ↓
Generate Access Token (expires in 1 day)
   ↓
Generate Refresh Token (expires in 10 days)
   ↓
Save Refresh Token to user document
   ↓
Set HTTP-only cookies:
   - accessToken (secure, httpOnly, sameSite)
   - refreshToken (secure, httpOnly, sameSite)
   ↓
Return user data + tokens
   ↓
Update Redux auth state
   ↓
Redirect to home page
```

#### 3. Authentication Middleware

```javascript
// verifyJWT middleware
async function verifyJWT(req, res, next) {
  try {
    // 1. Extract token from cookies or Authorization header
    const token = req.cookies?.accessToken || 
                  req.headers.authorization?.replace("Bearer ", "");
    
    if (!token) {
      throw new ApiError(401, "No token provided");
    }
    
    // 2. Verify token with JWT secret
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
    // 3. Find user by ID from token
    const user = await User.findById(decodedToken._id)
                           .select("-password -refreshToken");
    
    if (!user) {
      throw new ApiError(401, "Invalid token - User not found");
    }
    
    // 4. Attach user to request object
    req.user = user;
    
    // 5. Continue to next middleware/controller
    next();
    
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new ApiError(401, "Token expired");
    }
    throw new ApiError(401, "Authentication failed");
  }
}
```

#### 4. Protected Routes

Routes that require authentication:

```javascript
// User must be logged in
router.post("/logout", verifyJWT, logoutUser);
router.post("/isUserLoggedIn", verifyJWT, isUserLoggedIn);
router.post("/save-itinary", verifyJWT, saveItinerary);
router.post("/list-all-itinary", verifyJWT, listAllItineraries);
```

#### 5. Frontend Authentication Check

```typescript
// On app load, check if user is logged in
useEffect(() => {
  dispatch(checkAuthStatus());
}, []);

// checkAuthStatus action
export const checkAuthStatus = createAsyncThunk(
  'auth/checkStatus',
  async () => {
    const response = await fetch('/api/v1/user/isUserLoggedIn', {
      method: 'POST',
      credentials: 'include' // Send cookies
    });
    
    if (!response.ok) {
      throw new Error('Not authenticated');
    }
    
    const data = await response.json();
    return data.data; // User object
  }
);
```

#### 6. Logout Flow

```
User clicks "Logout"
   ↓
POST /api/v1/user/logout (with accessToken cookie)
   ↓
Verify JWT token
   ↓
Remove refreshToken from user document
   ↓
Clear accessToken and refreshToken cookies
   ↓
Return success response
   ↓
Update Redux auth state (clear user)
   ↓
Redirect to home page
```

---

### Security Features

1. **Password Security**:
   - Bcrypt hashing with 10 salt rounds
   - Passwords never stored in plain text
   - Password comparison uses constant-time algorithm

2. **Token Security**:
   - JWT tokens signed with secret keys
   - HTTP-only cookies (not accessible via JavaScript)
   - Secure flag in production (HTTPS only)
   - SameSite attribute prevents CSRF attacks

3. **Environment Variables**:
   - Secrets stored in `.env` files
   - Never committed to version control
   - Different secrets for access and refresh tokens

4. **CORS Protection**:
   - Only allowed origins can make requests
   - Credentials mode required for cookies

5. **Input Validation**:
   - All inputs validated before processing
   - Email format validation
   - Password length requirements
   - Date range validation

---

## 📸 Screenshots

### 1. Home Page - Travel Planning Form
![Home Page](https://via.placeholder.com/1200x600?text=Home+Page+Screenshot)

**Features:**
- Hero section with travel background image
- Interactive form with icon-enhanced inputs
- Destination, dates, interests, travelers, budget fields
- Real-time validation
- Purple gradient theme
- Responsive design

---

### 2. Loading Animation
![Loading State](https://via.placeholder.com/1200x600?text=Loading+Animation+Screenshot)

**Features:**
- Animated airplane flying through clouds
- 4-step progress indicator:
  - ✓ Analyzing your preferences
  - ✓ Crafting your itinerary
  - ✓ Finding the best places
  - ✓ Finalizing details
- "Preparing your journey..." message
- Purple gradient background

---

### 3. Login Page
![Login Page](https://via.placeholder.com/1200x600?text=Login+Page+Screenshot)

**Features:**
- Clean card-based design
- Email and password inputs
- Error message display
- Link to registration page
- Gradient animated background
- Responsive layout

---

### 4. Registration Page
![Register Page](https://via.placeholder.com/1200x600?text=Register+Page+Screenshot)

**Features:**
- Full name, email, password, confirm password fields
- Real-time password matching validation
- Success animation on registration
- "Registration Successful!" message
- Auto-redirect to login after 2 seconds
- Link to login page

---

### 5. Itinerary Display
![Itinerary Page](https://via.placeholder.com/1200x600?text=Itinerary+Display+Screenshot)

**Features:**
- Day-by-day breakdown with cards
- Date headers with day numbers
- Activity cards with:
  - Activity images from Unsplash
  - Time slots and durations
  - Weather forecasts with icons
  - Temperature and conditions
  - Helpful notes and tips
- Safety tips section
- AI explanation of choices
- "Save Itinerary" button (for logged-in users)
- "Plan Another Trip" button

---

### 6. Saved Itineraries Page
![Saved Trips](https://via.placeholder.com/1200x600?text=Saved+Itineraries+Screenshot)

**Features:**
- Grid layout of saved trip cards
- Each card shows:
  - Destination name with ✈️ icon
  - Start date → End date
  - Interests
  - "Click to view details" prompt
- Hover effects with elevation
- Empty state with "Create New Itinerary" button
- Fully responsive grid

---

### 7. Header Component (Authenticated)
![Header](https://via.placeholder.com/1200x600?text=Header+Screenshot)

**Features:**
- "GradGuide" brand logo
- User name display (e.g., "Welcome, John!")
- "Saved Itineraries" button
- "Logout" button
- Responsive navigation
- Purple gradient theme

---

## 🐛 Troubleshooting

### Common Issues and Solutions

#### 1. MongoDB Connection Errors

**Error:**
```
Error: Authentication failed
MongoServerError: bad auth : authentication failed
```

**Solutions:**
1. **URL-encode special characters in password**:
   ```env
   # Wrong
   MONGODB_URL=mongodb+srv://user:Pass@word!123@cluster.mongodb.net/db
   
   # Correct
   MONGODB_URL=mongodb+srv://user:Pass%40word%21123@cluster.mongodb.net/db
   ```
   
   Special character encoding:
   - `@` → `%40`
   - `!` → `%21`
   - `#` → `%23`
   - `$` → `%24`
   - `%` → `%25`
   - `^` → `%5E`
   - `&` → `%26`

2. **Check MongoDB Atlas Network Access**:
   - Go to MongoDB Atlas dashboard
   - Network Access → IP Access List
   - Add your IP address or allow from anywhere (0.0.0.0/0)

3. **Verify Database User Permissions**:
   - Database Access → Database Users
   - Ensure user has "Atlas admin" or "Read and write to any database" role

---

#### 2. Weather Data Unavailable

**Issue:**
```json
{
  "weather": {
    "note": "Weather unavailable for activity time"
  }
}
```

**Causes & Solutions:**

1. **Dates beyond 10-day forecast range**:
   - WeatherAPI only provides 10-day forecasts
   - Solution: Choose dates within next 10 days

2. **Invalid WEATHERAPI_KEY**:
   - Check if key is correctly set in `.env`
   - Verify key is active at weatherapi.com
   - Check API usage limits

3. **Network/API timeout**:
   - Check internet connection
   - Verify WeatherAPI is not down
   - Increase timeout in `weatherAPi.service.js`

---

#### 3. Images Not Loading

**Issue:**
```json
{
  "PublicImageURL": null
}
```

**Causes & Solutions:**

1. **Invalid Unsplash API Key**:
   ```bash
   # Verify key in .env
   UNSPLASH_API_KEY=your_access_key_here
   ```

2. **API Rate Limit Exceeded**:
   - Unsplash free tier: 50 requests/hour
   - Solution: Upgrade plan or implement caching

3. **Query returns no results**:
   - Some place names might not have images
   - Fallback mechanism should handle this

4. **CORS Issues**:
   - Ensure Unsplash API allows your domain
   - Check browser console for CORS errors

---

#### 4. Frontend Build Errors

**Error:**
```
Error: Failed to resolve import "react-router-dom"
```

**Solution:**
```bash
cd client
rm -rf node_modules
rm package-lock.json
npm install
```

**Error:**
```
Module not found: Error: Can't resolve 'bootstrap'
```

**Solution:**
```bash
cd client
npm install bootstrap
```

---

#### 5. Backend Server Won't Start

**Error:**
```
Error: Cannot find module 'express'
```

**Solution:**
```bash
cd server
npm install
```

**Error:**
```
Error: GEMINI_API_KEY is not defined
```

**Solution:**
- Check `.env` file exists in `server/` directory
- Verify all required environment variables are set
- Restart server after changing `.env`

---

#### 6. JWT Authentication Errors

**Error:**
```json
{
  "statusCode": 401,
  "message": "Unauthorised request - No token provided"
}
```

**Solutions:**

1. **User not logged in**:
   - Navigate to login page
   - Enter credentials and login

2. **Token expired**:
   - Login again to get fresh tokens
   - Access tokens expire in 1 day

3. **Cookies not being sent**:
   - Check CORS configuration allows credentials
   - Verify frontend sends `credentials: 'include'`
   - Check browser doesn't block third-party cookies

4. **Wrong cookie domain**:
   - Ensure frontend and backend on same domain (localhost)
   - Or configure cookie domain correctly in production

---

#### 7. Login "Password Incorrect" Error

**Issue:**
User enters correct password but gets error.

**Causes & Solutions:**

1. **Password was changed directly in database**:
   - Passwords must be hashed before saving
   - Never update password field directly in MongoDB

2. **Bcrypt comparison failing**:
   - Check `isPasswordCorrect` method in user model
   - Verify bcrypt is installed: `npm list bcrypt`

3. **User registered before password hashing was implemented**:
   - Delete user and re-register
   - Or manually hash password and update in DB

---

#### 8. CORS Errors in Browser Console

**Error:**
```
Access to fetch at 'http://localhost:4000/api/v1/...' from origin 'http://localhost:5173' 
has been blocked by CORS policy
```

**Solution:**

Update `server/src/app.js`:
```javascript
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
```

---

#### 9. Itinerary Not Saving

**Issue:**
"Save Itinerary" button doesn't work.

**Debug Steps:**

1. **Check if user is logged in**:
   - Open Redux DevTools
   - Check `auth.isAuthenticated` is `true`

2. **Check console for errors**:
   - Open browser DevTools → Console
   - Look for error messages

3. **Verify API endpoint**:
   ```bash
   # Test with curl
   curl -X POST http://localhost:4000/api/v1/ai/save-itinary \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -d '{"destination":"Paris",...}'
   ```

4. **Check MongoDB connection**:
   - Verify MongoDB is running
   - Check database has `itineraries` collection

---

#### 10. Vite Dev Server Issues

**Error:**
```
Error: Failed to load config from vite.config.ts
```

**Solution:**
```bash
cd client
npm install -D @vitejs/plugin-react
```

**Error:**
```
Port 5173 is already in use
```

**Solution:**
```bash
# Kill process on port 5173 (Windows)
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Or change port in vite.config.ts
export default defineConfig({
  server: { port: 3000 }
})
```

---

### Debugging Tips

1. **Enable verbose logging**:
   - Backend: All errors logged to console with stack traces
   - Frontend: Check Redux DevTools for state changes

2. **Check API responses**:
   - Open browser DevTools → Network tab
   - Click on failed requests
   - View Response and Headers tabs

3. **Test API endpoints directly**:
   - Use Postman or Insomnia
   - Verify endpoints work without frontend

4. **Clear browser cache and cookies**:
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
   - Clear cookies: DevTools → Application → Cookies

5. **Check environment variables**:
   ```bash
   # Backend
   cd server
   cat .env
   
   # Frontend
   cd client
   cat .env
   ```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help improve GradGuide:

### How to Contribute// filepath: c:\Users\ganes\OneDrive\Desktop\gradguide\Ai travel-guide\README.md
# 🌍 GradGuide - AI Travel Planner

> Your personalized AI-powered travel companion that creates detailed, day-by-day itineraries with real-time weather forecasts, stunning destination imagery, and secure user authentication.

[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.19.2-brightgreen.svg)](https://www.mongodb.com/)
[![Google Gemini](https://img.shields.io/badge/AI-Google%20Gemini-orange.svg)](https://ai.google.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg)](https://www.typescriptlang.org/)

---

## 📖 Table of Contents

- [Overview](#-overview)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🏗️ Architecture](#️-architecture)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [📱 Usage](#-usage)
- [📁 Project Structure](#-project-structure)
- [📡 API Documentation](#-api-documentation)
- [🔧 How It Works](#-how-it-works)
- [🔐 Authentication Flow](#-authentication-flow)
- [📸 Screenshots](#-screenshots)
- [🐛 Troubleshooting](#-troubleshooting)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [👨‍💻 Author](#-author)

---

## 🎯 Overview

**GradGuide** is a full-stack intelligent travel planning application that leverages Google's Gemini AI to create personalized travel itineraries. With user authentication, itinerary saving, and comprehensive travel planning features, it's your complete travel companion.

### Key Capabilities:

- 🎯 **AI-Powered Planning** - Smart itineraries tailored to your preferences
- 🔐 **User Authentication** - Secure login/signup with JWT tokens
- 💾 **Save Itineraries** - Store and access your travel plans anytime
- 🌤️ **Real-time Weather** - 10-day weather forecasts for each activity
- 📸 **Beautiful Imagery** - Curated photos from Unsplash
- 💰 **Budget-Aware** - Plans that respect your spending limits
- 👥 **Group-Friendly** - Accommodates any number of travelers
- 📱 **Fully Responsive** - Works seamlessly on all devices

---

## ✨ Features

### 🤖 AI-Powered Itinerary Generation
- Uses **Google Gemini 1.5 Pro** for intelligent travel planning
- Structured JSON output with day-by-day activities
- Personalized recommendations based on interests, budget, and group size
- Automatic activity timing and duration suggestions

### 🔐 User Authentication & Management
- **JWT-based authentication** with HTTP-only cookies
- Secure password hashing with **bcrypt**
- User registration with validation
- Login/logout functionality
- Protected routes and API endpoints
- Persistent authentication state with Redux

### 💾 Itinerary Management
- **Save unlimited itineraries** to your account
- View all saved trips in a beautiful card layout
- Click any saved itinerary to regenerate and view details
- Automatic form data storage for easy re-planning
- Delete functionality (coming soon)

### 🌦️ Advanced Weather Integration
- Real-time weather forecasts for the next 10 days
- **Activity-specific weather** matching exact times (Morning, 9 AM, Evening, etc.)
- Temperature, conditions, and weather icons for each time slot
- Day-level and hourly weather data
- Powered by [WeatherAPI.com](https://www.weatherapi.com/)

### 📷 Dynamic Visual Experience
- Automatic image fetching from **Unsplash API**
- High-quality landscape photos for each destination
- Activity-specific images based on place names
- Fallback mechanisms for image loading

### 💻 Modern Frontend Architecture
- Built with **React 19** and **TypeScript** for type safety
- **Redux Toolkit** for robust state management
- **React Router v7** for seamless navigation
- **Bootstrap 5** + Custom CSS for beautiful UI
- Responsive design that works on all devices (mobile, tablet, desktop)
- Smooth animations and loading states
- Travel-themed purple gradient design

### 🎨 Enhanced User Experience
- Interactive forms with real-time validation
- Animated loading screens with progress indicators
- Success/error notifications
- Day-by-day itinerary cards with collapsible sections
- Safety tips and travel recommendations
- One-click itinerary regeneration from saved plans

---

## 🛠️ Tech Stack

### Frontend
- **React 19.1.1** - Modern UI library with latest features
- **TypeScript 5.6** - Type-safe JavaScript
- **Redux Toolkit 2.5.0** - Predictable state management
- **React Router v7** - Declarative routing
- **Vite 6.0.5** - Lightning-fast build tool
- **Bootstrap 5.3.3** - Responsive framework
- **Axios** - HTTP client
- **Custom CSS** - Travel-themed responsive design

### Backend
- **Node.js v20+** - JavaScript runtime
- **Express 5.1.0** - Fast web framework
- **MongoDB 8.19.2** - NoSQL database
- **Mongoose 8.10.5** - MongoDB ODM
- **JWT (jsonwebtoken)** - Secure authentication
- **bcrypt** - Password hashing
- **cookie-parser** - Cookie management
- **Multer** - FormData parsing middleware

### AI & External APIs
- **Google Gemini 1.5 Pro** - AI itinerary generation
- **WeatherAPI.com** - Weather forecasts
- **Unsplash API** - High-quality imagery

### Security & Authentication
- **JWT Tokens** - Stateless authentication
- **HTTP-Only Cookies** - XSS protection
- **bcrypt** - Secure password hashing
- **CORS** - Cross-origin resource sharing
- **Environment Variables** - Secure configuration

### Development Tools
- **Nodemon** - Auto-restart development server
- **ESLint** - Code linting and formatting
- **dotenv** - Environment variable management
- **Git** - Version control

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                     React Client (Vite)                      │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────┐      │
│  │   Pages     │  │  Components  │  │  Redux Store  │      │
│  │ • Home      │  │ • Header     │  │ • auth        │      │
│  │ • Login     │  │ • Loading    │  │ • itinerary   │      │
│  │ • Register  │  └──────────────┘  │ • form        │      │
│  │ • Saved     │                     │ • saved       │      │
│  │ • Itinerary │                     └───────────────┘      │
│  └─────────────┘                                            │
└──────────────────────────┬───────────────────────────────────┘
                           │ HTTP/REST API (Fetch)
                           │ • JSON Data
                           │ • JWT Cookies
                           ▼
┌──────────────────────────────────────────────────────────────┐
│                   Express Server (Node.js)                   │
│  ┌────────────────────────────────────────────────────────┐  │
│  │                    Middleware Layer                     │  │
│  │  • CORS  • JSON Parser  • Cookie Parser  • Auth JWT   │  │
│  └────────────────────────────────────────────────────────┘  │
│  ┌─────────────────────┐      ┌─────────────────────────┐   │
│  │   User Routes       │      │     AI Routes           │   │
│  │ • /register         │      │ • /generate-response    │   │
│  │ • /login            │      │ • /save-itinary         │   │
│  │ • /logout           │      │ • /list-all-itinary     │   │
│  │ • /isUserLoggedIn   │      └─────────────────────────┘   │
│  └─────────────────────┘                                     │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐  │
│  │                  Controllers Layer                      │  │
│  │  • User Controller    • Itinerary Controller          │  │
│  │  • Token Generation   • AI Processing                 │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────┬──────────────────────┬────────────────────┘
                   │                      │
                   ▼                      ▼
      ┌─────────────────────┐   ┌──────────────────────┐
      │   MongoDB Atlas     │   │   External APIs      │
      │                     │   │                      │
      │  Collections:       │   │ • Google Gemini AI   │
      │  • users            │   │ • WeatherAPI.com     │
      │  • itineraries      │   │ • Unsplash API       │
      │                     │   │                      │
      └─────────────────────┘   └──────────────────────┘
```

### Request Flow

#### 1. **New Itinerary Creation**
```
User fills form → Redux stores form data → Navigate to results page
→ Call /generate-response API → AI generates itinerary
→ Weather + images enrichment → Display results
```

#### 2. **Save Itinerary**
```
User clicks "Save" → Check authentication → Call /save-itinary API
→ Store in MongoDB → Success notification
```

#### 3. **View Saved Itineraries**
```
User navigates to /saved-itineraries → Call /list-all-itinary API
→ Display cards → User clicks card → Regenerate itinerary
```

#### 4. **Authentication Flow**
```
User registers → Password hashed → Stored in DB
→ User logs in → Password verified → JWT tokens generated
→ Tokens stored in HTTP-only cookies → Protected routes accessible
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** v20 or higher ([Download](https://nodejs.org/))
- **npm** v7 or higher (comes with Node.js)
- **MongoDB** v5 or higher ([Download](https://www.mongodb.com/try/download/community)) or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
- **Git** ([Download](https://git-scm.com/))

### API Keys Required
- [Google Gemini API Key](https://ai.google.dev/) - Free tier available
- [WeatherAPI.com API Key](https://www.weatherapi.com/signup.aspx) - Free tier available
- [Unsplash API Key](https://unsplash.com/developers) - Free tier available

---

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/GaneshBagra/AI-Travel-Guide-Personalized-Tour-Planner.git
cd AI-Travel-Guide-Personalized-Tour-Planner
```

#### 2. Install Backend Dependencies
```bash
cd server
npm install
```

**Backend Dependencies:**
```json
{
  "express": "^5.1.0",
  "mongoose": "^8.10.5",
  "bcrypt": "^5.1.1",
  "jsonwebtoken": "^9.0.2",
  "cookie-parser": "^1.4.7",
  "cors": "^2.8.5",
  "dotenv": "^16.4.7",
  "multer": "^1.4.5-lts.1",
  "@google/genai": "^0.4.0",
  "axios": "^1.7.9"
}
```

#### 3. Install Frontend Dependencies
```bash
cd ../client
npm install
```

**Frontend Dependencies:**
```json
{
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "react-router": "^7.1.1",
  "react-router-dom": "^7.1.1",
  "@reduxjs/toolkit": "^2.5.0",
  "react-redux": "^9.2.0",
  "typescript": "~5.6.2",
  "bootstrap": "^5.3.3"
}
```

---

### Environment Variables

#### Backend Environment Variables

Create a `.env` file in the `server` directory:

```env
# Server Configuration
PORT=4000
NODE_ENV=development

# MongoDB Connection
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/gradguide
# Important: URL-encode special characters in password
# @ → %40, ! → %21, # → %23, $ → %24

# JWT Secrets (generate random strings)
ACCESS_TOKEN_SECRET=your_access_token_secret_here_make_it_long_and_random
ACCESS_TOKEN_EXPIRY=1d

REFRESH_TOKEN_SECRET=your_refresh_token_secret_here_also_long_and_random
REFRESH_TOKEN_EXPIRY=10d

# Google Gemini AI API
GEMINI_API_KEY=your_gemini_api_key_here

# Weather API
WEATHERAPI_KEY=your_weatherapi_key_here

# Unsplash API
UNSPLASH_API_KEY=your_unsplash_access_key_here

# CORS Settings
CORS_ORIGIN=http://localhost:5173
```

**How to Get API Keys:**

1. **Google Gemini API**:
   - Visit https://ai.google.dev/
   - Sign in with Google account
   - Go to "Get API Key"
   - Create new API key
   - Copy and paste into `.env`

2. **WeatherAPI.com**:
   - Visit https://www.weatherapi.com/signup.aspx
   - Sign up for free account
   - Go to dashboard
   - Copy your API key
   - Paste into `.env`

3. **Unsplash API**:
   - Visit https://unsplash.com/developers
   - Register application
   - Copy "Access Key"
   - Paste into `.env`

4. **JWT Secrets**:
   - Generate random strings (use online generator or `openssl rand -base64 64`)
   - Example: `openssl rand -base64 64` in terminal

#### Frontend Environment Variables

Create a `.env` file in the `client` directory:

```env
# API Base URL
VITE_API_BASE_URL=http://localhost:4000/api/v1
```

**Important Notes:**
- Frontend environment variables MUST start with `VITE_` prefix
- Restart dev server after changing `.env` files
- Never commit `.env` files to Git (already in `.gitignore`)

---

## 📱 Usage

### Running the Application

#### 1. Start MongoDB (if running locally)
```bash
# Windows
mongod

# macOS/Linux
sudo systemctl start mongodb
```

#### 2. Start the Backend Server
```bash
cd server
npm run dev
```
✅ Server will run on: **http://localhost:4000**

Console output:
```
Server running on port : 4000
MongoDB connected successfully
```

#### 3. Start the Frontend (in a new terminal)
```bash
cd client
npm run dev
```
✅ Client will run on: **http://localhost:5173**

#### 4. Open Your Browser
Navigate to: **http://localhost:5173**

---

### Using the Application

#### 🔐 **Step 1: Register an Account**
1. Click **"Sign Up"** button in header
2. Fill in the registration form:
   - **Full Name**: Your name
   - **Email**: Valid email address
   - **Password**: At least 6 characters
   - **Confirm Password**: Must match password
3. Click **"Register"**
4. Success message appears: "Registration Successful! Please login to continue"
5. Automatically redirected to login page after 2 seconds

#### 🔑 **Step 2: Login**
1. Enter your **email** and **password**
2. Click **"Login"**
3. Upon success, redirected to home page
4. Header now shows your name and **"Saved Itineraries"** / **"Logout"** buttons

#### 🗺️ **Step 3: Create an Itinerary**
1. Fill out the travel planning form:
   - **Destination** (Required): e.g., "Paris", "Tokyo", "Rishikesh"
   - **Start Date** (Required): Select from calendar
   - **End Date** (Required): Must be within 10 days for weather data
   - **Interests** (Required): e.g., "mountains, history, food, culture"
   - **Travelers** (Optional): e.g., `{"adults": 2, "children": 1}`
   - **Budget** (Optional): e.g., `50000` (in INR)

2. Click **"Generate My Itinerary"**

3. **Loading Screen** appears with:
   - Animated airplane flying through clouds
   - 4-step progress indicator:
     1. ✓ Analyzing your preferences
     2. ✓ Crafting your itinerary
     3. ✓ Finding the best places
     4. ✓ Finalizing details

#### 📋 **Step 4: View Your Itinerary**
You'll see a detailed day-by-day plan with:

**For Each Day:**
- 📅 Date and day number
- 🌤️ Overall weather forecast (min/max temperature, condition)
- 🖼️ Destination image

**For Each Activity:**
- ⏰ Time slot (e.g., "9:00 AM", "Morning")
- 📍 Place name (exact location)
- 📝 Activity title and description
- 🕐 Duration estimate
- 📸 Activity-specific image from Unsplash
- 🌡️ Hourly weather forecast (temperature, condition, icon)
- 💡 Helpful notes and tips

**Additional Information:**
- 🛡️ Safety tips for the day
- 📖 AI's explanation of why places were chosen
- 🎯 Summary of your entire trip

#### 💾 **Step 5: Save Your Itinerary**
1. Click **"Save Itinerary"** button at the top
2. If not logged in, redirected to login page
3. If logged in, itinerary saved to your account
4. Success message: "Itinerary saved successfully!"
5. Link to view saved itineraries appears

#### 📚 **Step 6: View Saved Itineraries**
1. Click **"Saved Itineraries"** in header
2. See all your saved trips in a grid of cards
3. Each card shows:
   - ✈️ Destination name
   - 📅 Start date → End date
   - 🎯 Interests
4. Click any card to regenerate and view full itinerary

#### 🚪 **Step 7: Logout**
1. Click **"Logout"** button in header
2. Redirected to home page
3. Authentication cleared
4. Header shows **"Login"** and **"Sign Up"** buttons again

---

## 📁 Project Structure

```
AI-Travel-Guide-Personalized-Tour-Planner/
│
├── client/                                    # React Frontend Application
│   ├── public/                                # Static assets
│   │   └── vite.svg                           # Vite logo
│   │
│   ├── src/
│   │   ├── assets/                            # Images, fonts, etc.
│   │   │
│   │   ├── components/                        # Reusable React components
│   │   │   └── Header.tsx                     # Navigation header with auth
│   │   │
│   │   ├── pages/                             # Route-level page components
│   │   │   ├── Home.tsx                       # Landing page with travel form
│   │   │   ├── Login.tsx                      # User login page
│   │   │   ├── Register.tsx                   # User registration page
│   │   │   ├── ItinerarySelection.tsx         # Itinerary display page
│   │   │   └── SavedItineraries.tsx           # Saved trips page
│   │   │
│   │   ├── store/                             # Redux state management
│   │   │   ├── store.ts                       # Redux store configuration
│   │   │   ├── authSlice.ts                   # Authentication state
│   │   │   ├── itinerarySlice.ts              # Itinerary generation state
│   │   │   ├── formSlice.ts                   # Form data state
│   │   │   └── savedItinerariesSlice.ts       # Saved trips state
│   │   │
│   │   ├── styles/                            # CSS stylesheets
│   │   │   ├── Header.css                     # Header component styles
│   │   │   ├── Home.css                       # Home page styles
│   │   │   ├── Auth.css                       # Login/Register styles
│   │   │   ├── ItinerarySelection.css         # Itinerary page styles
│   │   │   └── SavedItineraries.css           # Saved trips page styles
│   │   │
│   │   ├── App.tsx                            # Main app with routing
│   │   ├── App.css                            # App-level styles
│   │   ├── main.tsx                           # React entry point
│   │   ├── index.css                          # Global styles
│   │   └── vite-env.d.ts                      # Vite environment types
│   │
│   ├── .env                                   # Environment variables (not in Git)
│   ├── .env.example                           # Environment variables template
│   ├── .gitignore                             # Git ignore rules
│   ├── eslint.config.js                       # ESLint configuration
│   ├── index.html                             # HTML entry point
│   ├── package.json                           # Frontend dependencies
│   ├── tsconfig.json                          # TypeScript configuration
│   ├── tsconfig.app.json                      # App-specific TS config
│   ├── tsconfig.node.json                     # Node-specific TS config
│   └── vite.config.ts                         # Vite build configuration
│
├── server/                                    # Node.js Backend Application
│   ├── src/
│   │   ├── controllers/                       # Request handlers (business logic)
│   │   │   ├── itinary.controller.js          # AI generation & itinerary CRUD
│   │   │   └── user.controller.js             # User authentication & management
│   │   │
│   │   ├── db/                                # Database connection
│   │   │   └── index.js                       # MongoDB connection setup
│   │   │
│   │   ├── middlewares/                       # Express middlewares
│   │   │   └── auth.middleware.js             # JWT authentication middleware
│   │   │
│   │   ├── models/                            # Mongoose schemas & models
│   │   │   ├── itinerary.model.js             # Itinerary data model
│   │   │   └── user.model.js                  # User data model
│   │   │
│   │   ├── routes/                            # API route definitions
│   │   │   ├── ai.routes.js                   # AI & itinerary routes
│   │   │   └── user.routes.js                 # User authentication routes
│   │   │
│   │   ├── utils/                             # Utility functions & helpers
│   │   │   ├── ApiError.js                    # Custom error class
│   │   │   ├── ApiResponse.js                 # Standard response formatter
│   │   │   ├── async-handler.js               # Async error wrapper
│   │   │   └── weatherAPi.service.js          # Weather & Unsplash services
│   │   │
│   │   ├── app.js                             # Express app configuration
│   │   ├── constants.js                       # App constants
│   │   └── index.js                           # Server entry point
│   │
│   ├── .env                                   # Environment variables (not in Git)
│   ├── .gitignore                             # Git ignore rules
│   └── package.json                           # Backend dependencies
│
├── .gitignore                                 # Root Git ignore
└── README.md                                  # This file
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:4000/api/v1
```

---

### 🔐 User Authentication Endpoints

#### 1. Register New User

**POST** `/user/register`

Register a new user account.

**Request Body (JSON)**:
```json
{
  "fullName": "John Doe",
  "email": "john.doe@example.com",
  "password": "SecurePassword123"
}
```

**Success Response (201)**:
```json
{
  "statusCode": 200,
  "data": {
    "_id": "6765f2a3b8e1234567890abc",
    "fullName": "John Doe",
    "email": "john.doe@example.com",
    "createdAt": "2025-10-26T10:30:00.000Z",
    "updatedAt": "2025-10-26T10:30:00.000Z"
  },
  "message": "User registered successfully",
  "success": true
}
```

**Error Responses**:
- `400` - Validation error (missing fields, password too short)
- `409` - User with email already exists

---

#### 2. Login User

**POST** `/user/login`

Login with email and password. Sets HTTP-only cookies with JWT tokens.

**Request Body (JSON)**:
```json
{
  "email": "john.doe@example.com",
  "password": "SecurePassword123"
}
```

**Success Response (200)**:
```json
{
  "statusCode": 200,
  "data": {
    "user": {
      "_id": "6765f2a3b8e1234567890abc",
      "fullName": "John Doe",
      "email": "john.doe@example.com"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "User logged in successfully",
  "success": true
}
```

**Cookies Set**:
- `accessToken` - Expires in 1 day
- `refreshToken` - Expires in 10 days

**Error Responses**:
- `400` - Missing email or password
- `404` - User doesn't exist
- `401` - Password incorrect

---

#### 3. Logout User

**POST** `/user/logout`

Logout current user. Clears JWT cookies. **Requires authentication**.

**Headers**:
```
Authorization: Bearer <accessToken>
```
OR cookies with `accessToken`

**Success Response (200)**:
```json
{
  "statusCode": 200,
  "data": {},
  "message": "User logged out successfully",
  "success": true
}
```

**Error Response**:
- `401` - Unauthorized (not logged in)

---

#### 4. Check If User is Logged In

**POST** `/user/isUserLoggedIn`

Check if current user is authenticated. **Requires authentication**.

**Headers**:
```
Authorization: Bearer <accessToken>
```
OR cookies with `accessToken`

**Success Response (200)**:
```json
{
  "statusCode": 200,
  "data": {
    "_id": "6765f2a3b8e1234567890abc",
    "fullName": "John Doe",
    "email": "john.doe@example.com"
  },
  "message": "User is logged in",
  "success": true
}
```

**Error Response**:
- `401` - User not authenticated

---

### 🗺️ Itinerary Endpoints

#### 5. Generate Itinerary

**POST** `/ai/generate-response`

Generate a personalized travel itinerary using AI.

**Request Format**: `multipart/form-data`

**Request Body**:
```javascript
{
  destination: "Paris",              // Required: Destination city/country
  start_date: "2025-11-01",         // Required: ISO date (YYYY-MM-DD)
  end_date: "2025-11-05",           // Required: ISO date (YYYY-MM-DD)
  intrests: "art, food, history",   // Required: Comma-separated interests
  travellers: '{"adults": 2, "children": 1}', // Optional: JSON string
  budget: 75000                      // Optional: Budget in INR
}
```

**Success Response (200)**:
```json
{
  "done": true,
  "data": {
    "destination": "Paris",
    "summary": "A romantic 5-day journey through Paris exploring art, cuisine, and history...",
    "days": [
      {
        "day": 1,
        "date": "2025-11-01",
        "activities": [
          {
            "time": "9:00 AM",
            "placeName": "Eiffel Tower",
            "title": "Visit the iconic Eiffel Tower",
            "PublicImageURL": "https://images.unsplash.com/photo-xyz...",
            "duration": "2-3 hours",
            "notes": "Book tickets in advance to avoid long queues. Best views from the top!",
            "weather": {
              "date": "2025-11-01",
              "time": "2025-11-01 09:00",
              "temp_c": 15.2,
              "condition": "Partly cloudy",
              "icon": "https://cdn.weatherapi.com/weather/64x64/day/116.png"
            }
          },
          {
            "time": "Afternoon (2:00 PM)",
            "placeName": "Louvre Museum",
            "title": "Explore world-famous art at the Louvre",
            "PublicImageURL": "https://images.unsplash.com/photo-abc...",
            "duration": "3-4 hours",
            "notes": "Must-see: Mona Lisa, Venus de Milo, Winged Victory",
            "weather": {
              "date": "2025-11-01",
              "time": "2025-11-01 14:00",
              "temp_c": 17.8,
              "condition": "Sunny",
              "icon": "https://cdn.weatherapi.com/weather/64x64/day/113.png"
            }
          }
        ],
        "safety": "Be cautious of pickpockets in crowded tourist areas. Keep valuables secure.",
        "weather": {
          "date": "2025-11-01",
          "day": {
            "maxtemp_c": 18.5,
            "mintemp_c": 12.3,
            "avgtemp_c": 15.4,
            "condition": "Partly cloudy",
            "icon": "https://cdn.weatherapi.com/weather/64x64/day/116.png"
          },
          "hourly": {
            "time": "2025-11-01 12:00",
            "temp_c": 16.8,
            "condition": "Partly cloudy",
            "icon": "https://cdn.weatherapi.com/weather/64x64/day/116.png"
          }
        },
        "placeQueried": "Eiffel Tower"
      }
      // ... more days
    ],
    "explanation": [
      "The Eiffel Tower is an iconic symbol of Paris and a must-visit landmark",
      "Louvre Museum houses world-class art collections including the Mona Lisa",
      "Notre-Dame Cathedral showcases stunning Gothic architecture"
    ]
  }
}
```

**Error Responses**:
- `400` - Missing required fields or invalid dates
- `503` - AI service temporarily unavailable
- `500` - Failed to generate itinerary

---

#### 6. Save Itinerary

**POST** `/ai/save-itinary`

Save an itinerary to user's account. **Requires authentication**.

**Headers**:
```
Authorization: Bearer <accessToken>
Content-Type: application/json
```

**Request Body (JSON)**:
```json
{
  "destination": "Paris",
  "start_date": "2025-11-01",
  "end_date": "2025-11-05",
  "intrests": "art, food, history",
  "travellers": "{\"adults\": 2, \"children\": 1}",
  "budget": 75000,
  "itinerary": {
    "destination": "Paris",
    "summary": "...",
    "days": [...]
  }
}
```

**Success Response (201)**:
```json
{
  "statusCode": 201,
  "data": {
    "_id": "6765f2a3b8e1234567890def",
    "userId": "6765f2a3b8e1234567890abc",
    "destination": "Paris",
    "start_date": "2025-11-01T00:00:00.000Z",
    "end_date": "2025-11-05T00:00:00.000Z",
    "intrests": "art, food, history",
    "travellers": "{\"adults\": 2, \"children\": 1}",
    "budget": 75000,
    "itinerary": {...},
    "createdAt": "2025-10-26T10:30:00.000Z",
    "updatedAt": "2025-10-26T10:30:00.000Z"
  },
  "message": "Itinerary saved successfully",
  "success": true
}
```

**Error Responses**:
- `401` - User not authenticated
- `400` - Missing required fields

---

#### 7. List All Saved Itineraries

**POST** `/ai/list-all-itinary`

Get all itineraries saved by the current user. **Requires authentication**.

**Headers**:
```
Authorization: Bearer <accessToken>
```

**Success Response (200)**:
```json
{
  "statusCode": 200,
  "data": [
    {
      "_id": "6765f2a3b8e1234567890def",
      "userId": "6765f2a3b8e1234567890abc",
      "destination": "Paris",
      "start_date": "2025-11-01T00:00:00.000Z",
      "end_date": "2025-11-05T00:00:00.000Z",
      "intrests": "art, food, history",
      "travellers": "{\"adults\": 2, \"children\": 1}",
      "budget": 75000,
      "itinerary": {...},
      "createdAt": "2025-10-26T10:30:00.000Z"
    },
    {
      "_id": "6765f2a3b8e1234567890ghi",
      "userId": "6765f2a3b8e1234567890abc",
      "destination": "Tokyo",
      "start_date": "2025-12-01T00:00:00.000Z",
      "end_date": "2025-12-07T00:00:00.000Z",
      "intrests": "technology, food, temples",
      "travellers": "{\"adults\": 1}",
      "budget": 100000,
      "itinerary": {...},
      "createdAt": "2025-10-25T08:15:00.000Z"
    }
  ],
  "message": "Itineraries retrieved successfully",
  "success": true
}
```

**Error Response**:
- `401` - User not authenticated

---

### Error Response Format

All errors follow this format:

```json
{
  "statusCode": 400,
  "message": "Detailed error message",
  "success": false,
  "errors": []
}
```

**Common Status Codes**:
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (authentication required)
- `404` - Not Found
- `409` - Conflict (e.g., user already exists)
- `500` - Internal Server Error
- `503` - Service Unavailable (external API error)

---

## 🔧 How It Works

### 1. Frontend Architecture

#### Redux State Management

**Four Main Slices:**

1. **`authSlice`** - User authentication state
   ```typescript
   {
     user: { _id, fullName, email },
     isAuthenticated: boolean,
     loading: boolean,
     error: string | null
   }
   ```

2. **`itinerarySlice`** - Generated itinerary state
   ```typescript
   {
     data: GeneratedItinerary | null,
     loading: boolean,
     error: string | null
   }
   ```

3. **`formSlice`** - Travel form data
   ```typescript
   {
     destination: string,
     start_date: string,
     end_date: string,
     intrests: string,
     travellers: string,
     budget: number | null
   }
   ```

4. **`savedItinerariesSlice`** - Saved trips
   ```typescript
   {
     itineraries: SavedItinerary[],
     loading: boolean,
     error: string | null
   }
   ```

#### Component Hierarchy

```
App
├── Header (shows on all pages except login/register)
│   ├── Brand Logo
│   ├── User Info (when authenticated)
│   ├── Saved Itineraries Link (when authenticated)
│   └── Login/Signup or Logout buttons
│
├── Routes
│   ├── / (Home)
│   │   └── Travel Form
│   │
│   ├── /login (Login)
│   │   └── Login Form
│   │
│   ├── /register (Register)
│   │   └── Registration Form
│   │
│   ├── /guide/itinary-selection (Itinerary Display)
│   │   ├── Loading Animation
│   │   ├── Day Cards
│   │   ├── Activity Cards
│   │   └── Save Button
│   │
│   └── /saved-itineraries (Saved Trips)
│       └── Itinerary Cards Grid
```

---

### 2. Backend Architecture

#### Middleware Stack

```javascript
app.use(cors())                    // CORS configuration
app.use(express.json())            // JSON body parser
app.use(express.urlencoded())      // URL-encoded body parser
app.use(cookieParser())            // Cookie parser
app.use(verifyJWT)                 // JWT authentication (protected routes)
```

#### Request Processing Flow

**Example: Saving an Itinerary**

```
1. Client → POST /api/v1/ai/save-itinary + JWT cookie
2. CORS middleware → Allow request
3. Body parser → Parse JSON body
4. Cookie parser → Extract accessToken from cookies
5. verifyJWT middleware → 
   - Decode JWT token
   - Find user in database
   - Attach user to req.user
6. Controller → saveItinerary()
   - Validate request body
   - Create new Itinerary document
   - Save to MongoDB
   - Return response
7. Response → JSON with saved itinerary data
```

---

### 3. AI Generation Process

#### Step-by-Step AI Itinerary Creation

```javascript
// 1. Receive user input
const { destination, start_date, end_date, intrests, travellers, budget } = req.body;

// 2. Calculate trip duration
const numberOfDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

// 3. Format interests and travelers
const interestsText = Array.isArray(intrests) ? intrests.join(", ") : intrests;
const travellersText = parseTravellers(travellers);
const budgetText = budget ? `Budget: ₹${budget}` : "Budget: Flexible";

// 4. Call Google Gemini AI
const aiResponse = await ai.models.generateContent({
  model: "gemini-1.5-pro",
  contents: `Create a ${numberOfDays}-day itinerary for ${destination}...`,
  config: {
    responseMimeType: "application/json",
    responseSchema: {
      // Strict JSON schema for structured output
      type: Type.OBJECT,
      properties: {
        destination: Type.STRING,
        days: Type.ARRAY,
        summary: Type.STRING,
        explanation: Type.ARRAY
      }
    }
  }
});

// 5. Parse AI response
const parsedData = JSON.parse(aiResponse.text);

// 6. Enrich with weather and images
for (const day of parsedData.days) {
  for (const activity of day.activities) {
    // Fetch Unsplash image for place
    const image = await getImageFromUnsplash(activity.placeName);
    
    // Fetch weather for specific time
    const weather = await getWeatherForDateTime(
      activity.placeName,
      day.date,
      activity.time
    );
    
    activity.PublicImageURL = image;
    activity.weather = weather;
  }
  
  // Fetch day-level weather
  day.weather = await getForecastForDate(destination, day.date);
}

// 7. Return enriched itinerary
return res.json({ done: true, data: parsedData });
```

---

### 4. Weather Integration

#### Date Normalization

Handles various date formats:

```javascript
function normalizeToYMD(dateInput) {
  // "2025-10-26" → "2025-10-26" (already correct)
  // "10/26/2025" → "2025-10-26"
  // Date object → "2025-10-26"
  
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateInput)) return dateInput;
  
  const parsed = new Date(dateInput);
  const yyyy = parsed.getUTCFullYear();
  const mm = String(parsed.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(parsed.getUTCDate()).padStart(2, "0");
  
  return `${yyyy}-${mm}-${dd}`;
}
```

#### Activity Time Parsing

Converts human-readable times to hours:

```javascript
function parseActivityTimeToHour(timeStr) {
  // "9:00 AM" → 9
  // "2:30 PM" → 14
  // "Morning" → 9
  // "Afternoon" → 15
  // "Evening" → 18
  // "Night" → 21
  
  const s = timeStr.toLowerCase();
  
  // Handle HH:MM format
  const hm = s.match(/(\d{1,2}):(\d{2})/);
  if (hm) return parseInt(hm[1], 10) % 24;
  
  // Handle AM/PM format
  const ap = s.match(/(\d{1,2})\s*(am|pm)/);
  if (ap) {
    let hour = parseInt(ap[1], 10);
    if (ap[2] === "pm" && hour !== 12) hour += 12;
    if (ap[2] === "am" && hour === 12) hour = 0;
    return hour;
  }
  
  // Handle text labels
  if (s.includes("morning")) return 9;
  if (s.includes("afternoon")) return 15;
  if (s.includes("evening")) return 18;
  if (s.includes("night")) return 21;
  
  return 12; // Default to noon
}
```

#### Weather Matching Algorithm

Finds the closest hourly weather forecast:

```javascript
async function getWeatherForDateTime(location, date, time) {
  // 1. Fetch 10-day forecast from WeatherAPI
  const forecast = await fetchWeatherForecast(location);
  
  // 2. Find the correct day
  const targetDay = forecast.days.find(d => d.date === date);
  if (!targetDay) return null;
  
  // 3. Parse activity time to hour
  const desiredHour = parseActivityTimeToHour(time);
  
  // 4. Find closest hourly forecast
  let closestHour = null;
  let minDiff = Infinity;
  
  for (const hourData of targetDay.hours) {
    const hourValue = extractHourFromTimestamp(hourData.time);
    const diff = Math.abs(hourValue - desiredHour);
    
    if (diff < minDiff) {
      minDiff = diff;
      closestHour = hourData;
    }
  }
  
  return {
    temp_c: closestHour.temp_c,
    condition: closestHour.condition.text,
    icon: closestHour.condition.icon
  };
}
```

---

### 5. Image Fetching

#### Unsplash Integration

```javascript
async function getImageFromUnsplash(query) {
  try {
    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: {
        query: query,              // e.g., "Eiffel Tower"
        per_page: 1,               // Get only 1 result
        orientation: "landscape"   // Landscape images only
      },
      headers: {
        Authorization: `Client-ID ${UNSPLASH_API_KEY}`
      },
      timeout: 8000
    });
    
    const result = response.data.results[0];
    return result?.urls?.regular || result?.urls?.small || null;
    
  } catch (error) {
    console.error("Unsplash error:", error.message);
    return null; // Fallback to no image
  }
}
```

**Image Priority:**
1. `regular` - High quality (1080px width)
2. `small` - Medium quality (400px width)
3. `thumb` - Low quality (200px width)
4. `null` - No image found

---

## 🔐 Authentication Flow

### JWT Token-Based Authentication

#### 1. Registration Flow

```
User fills registration form
   ↓
POST /api/v1/user/register
   ↓
Validate input (fullName, email, password)
   ↓
Check if email already exists
   ↓
Hash password with bcrypt (10 salt rounds)
   ↓
Create new User document in MongoDB
   ↓
Return user data (without password)
   ↓
Show success message
   ↓
Redirect to login page
```

#### 2. Login Flow

```
User enters email & password
   ↓
POST /api/v1/user/login
   ↓
Find user by email
   ↓
Compare password with hashed password (bcrypt)
   ↓
Generate Access Token (expires in 1 day)
   ↓
Generate Refresh Token (expires in 10 days)
   ↓
Save Refresh Token to user document
   ↓
Set HTTP-only cookies:
   - accessToken (secure, httpOnly, sameSite)
   - refreshToken (secure, httpOnly, sameSite)
   ↓
Return user data + tokens
   ↓
Update Redux auth state
   ↓
Redirect to home page
```

#### 3. Authentication Middleware

```javascript
// verifyJWT middleware
async function verifyJWT(req, res, next) {
  try {
    // 1. Extract token from cookies or Authorization header
    const token = req.cookies?.accessToken || 
                  req.headers.authorization?.replace("Bearer ", "");
    
    if (!token) {
      throw new ApiError(401, "No token provided");
    }
    
    // 2. Verify token with JWT secret
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
    // 3. Find user by ID from token
    const user = await User.findById(decodedToken._id)
                           .select("-password -refreshToken");
    
    if (!user) {
      throw new ApiError(401, "Invalid token - User not found");
    }
    
    // 4. Attach user to request object
    req.user = user;
    
    // 5. Continue to next middleware/controller
    next();
    
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new ApiError(401, "Token expired");
    }
    throw new ApiError(401, "Authentication failed");
  }
}
```

#### 4. Protected Routes

Routes that require authentication:

```javascript
// User must be logged in
router.post("/logout", verifyJWT, logoutUser);
router.post("/isUserLoggedIn", verifyJWT, isUserLoggedIn);
router.post("/save-itinary", verifyJWT, saveItinerary);
router.post("/list-all-itinary", verifyJWT, listAllItineraries);
```

#### 5. Frontend Authentication Check

```typescript
// On app load, check if user is logged in
useEffect(() => {
  dispatch(checkAuthStatus());
}, []);

// checkAuthStatus action
export const checkAuthStatus = createAsyncThunk(
  'auth/checkStatus',
  async () => {
    const response = await fetch('/api/v1/user/isUserLoggedIn', {
      method: 'POST',
      credentials: 'include' // Send cookies
    });
    
    if (!response.ok) {
      throw new Error('Not authenticated');
    }
    
    const data = await response.json();
    return data.data; // User object
  }
);
```

#### 6. Logout Flow

```
User clicks "Logout"
   ↓
POST /api/v1/user/logout (with accessToken cookie)
   ↓
Verify JWT token
   ↓
Remove refreshToken from user document
   ↓
Clear accessToken and refreshToken cookies
   ↓
Return success response
   ↓
Update Redux auth state (clear user)
   ↓
Redirect to home page
```

---

### Security Features

1. **Password Security**:
   - Bcrypt hashing with 10 salt rounds
   - Passwords never stored in plain text
   - Password comparison uses constant-time algorithm

2. **Token Security**:
   - JWT tokens signed with secret keys
   - HTTP-only cookies (not accessible via JavaScript)
   - Secure flag in production (HTTPS only)
   - SameSite attribute prevents CSRF attacks

3. **Environment Variables**:
   - Secrets stored in `.env` files
   - Never committed to version control
   - Different secrets for access and refresh tokens

4. **CORS Protection**:
   - Only allowed origins can make requests
   - Credentials mode required for cookies

5. **Input Validation**:
   - All inputs validated before processing
   - Email format validation
   - Password length requirements
   - Date range validation

---

## 📸 Screenshots

### 1. Home Page - Travel Planning Form
![Home Page](https://via.placeholder.com/1200x600?text=Home+Page+Screenshot)

**Features:**
- Hero section with travel background image
- Interactive form with icon-enhanced inputs
- Destination, dates, interests, travelers, budget fields
- Real-time validation
- Purple gradient theme
- Responsive design

---

### 2. Loading Animation
![Loading State](https://via.placeholder.com/1200x600?text=Loading+Animation+Screenshot)

**Features:**
- Animated airplane flying through clouds
- 4-step progress indicator:
  - ✓ Analyzing your preferences
  - ✓ Crafting your itinerary
  - ✓ Finding the best places
  - ✓ Finalizing details
- "Preparing your journey..." message
- Purple gradient background

---

### 3. Login Page
![Login Page](https://via.placeholder.com/1200x600?text=Login+Page+Screenshot)

**Features:**
- Clean card-based design
- Email and password inputs
- Error message display
- Link to registration page
- Gradient animated background
- Responsive layout

---

### 4. Registration Page
![Register Page](https://via.placeholder.com/1200x600?text=Register+Page+Screenshot)

**Features:**
- Full name, email, password, confirm password fields
- Real-time password matching validation
- Success animation on registration
- "Registration Successful!" message
- Auto-redirect to login after 2 seconds
- Link to login page

---

### 5. Itinerary Display
![Itinerary Page](https://via.placeholder.com/1200x600?text=Itinerary+Display+Screenshot)

**Features:**
- Day-by-day breakdown with cards
- Date headers with day numbers
- Activity cards with:
  - Activity images from Unsplash
  - Time slots and durations
  - Weather forecasts with icons
  - Temperature and conditions
  - Helpful notes and tips
- Safety tips section
- AI explanation of choices
- "Save Itinerary" button (for logged-in users)
- "Plan Another Trip" button

---

### 6. Saved Itineraries Page
![Saved Trips](https://via.placeholder.com/1200x600?text=Saved+Itineraries+Screenshot)

**Features:**
- Grid layout of saved trip cards
- Each card shows:
  - Destination name with ✈️ icon
  - Start date → End date
  - Interests
  - "Click to view details" prompt
- Hover effects with elevation
- Empty state with "Create New Itinerary" button
- Fully responsive grid

---

### 7. Header Component (Authenticated)
![Header](https://via.placeholder.com/1200x600?text=Header+Screenshot)

**Features:**
- "GradGuide" brand logo
- User name display (e.g., "Welcome, John!")
- "Saved Itineraries" button
- "Logout" button
- Responsive navigation
- Purple gradient theme

---

## 🐛 Troubleshooting

### Common Issues and Solutions

#### 1. MongoDB Connection Errors

**Error:**
```
Error: Authentication failed
MongoServerError: bad auth : authentication failed
```

**Solutions:**
1. **URL-encode special characters in password**:
   ```env
   # Wrong
   MONGODB_URL=mongodb+srv://user:Pass@word!123@cluster.mongodb.net/db
   
   # Correct
   MONGODB_URL=mongodb+srv://user:Pass%40word%21123@cluster.mongodb.net/db
   ```
   
   Special character encoding:
   - `@` → `%40`
   - `!` → `%21`
   - `#` → `%23`
   - `$` → `%24`
   - `%` → `%25`
   - `^` → `%5E`
   - `&` → `%26`

2. **Check MongoDB Atlas Network Access**:
   - Go to MongoDB Atlas dashboard
   - Network Access → IP Access List
   - Add your IP address or allow from anywhere (0.0.0.0/0)

3. **Verify Database User Permissions**:
   - Database Access → Database Users
   - Ensure user has "Atlas admin" or "Read and write to any database" role

---

#### 2. Weather Data Unavailable

**Issue:**
```json
{
  "weather": {
    "note": "Weather unavailable for activity time"
  }
}
```

**Causes & Solutions:**

1. **Dates beyond 10-day forecast range**:
   - WeatherAPI only provides 10-day forecasts
   - Solution: Choose dates within next 10 days

2. **Invalid WEATHERAPI_KEY**:
   - Check if key is correctly set in `.env`
   - Verify key is active at weatherapi.com
   - Check API usage limits

3. **Network/API timeout**:
   - Check internet connection
   - Verify WeatherAPI is not down
   - Increase timeout in `weatherAPi.service.js`

---

#### 3. Images Not Loading

**Issue:**
```json
{
  "PublicImageURL": null
}
```

**Causes & Solutions:**

1. **Invalid Unsplash API Key**:
   ```bash
   # Verify key in .env
   UNSPLASH_API_KEY=your_access_key_here
   ```

2. **API Rate Limit Exceeded**:
   - Unsplash free tier: 50 requests/hour
   - Solution: Upgrade plan or implement caching

3. **Query returns no results**:
   - Some place names might not have images
   - Fallback mechanism should handle this

4. **CORS Issues**:
   - Ensure Unsplash API allows your domain
   - Check browser console for CORS errors

---

#### 4. Frontend Build Errors

**Error:**
```
Error: Failed to resolve import "react-router-dom"
```

**Solution:**
```bash
cd client
rm -rf node_modules
rm package-lock.json
npm install
```

**Error:**
```
Module not found: Error: Can't resolve 'bootstrap'
```

**Solution:**
```bash
cd client
npm install bootstrap
```

---

#### 5. Backend Server Won't Start

**Error:**
```
Error: Cannot find module 'express'
```

**Solution:**
```bash
cd server
npm install
```

**Error:**
```
Error: GEMINI_API_KEY is not defined
```

**Solution:**
- Check `.env` file exists in `server/` directory
- Verify all required environment variables are set
- Restart server after changing `.env`

---

#### 6. JWT Authentication Errors

**Error:**
```json
{
  "statusCode": 401,
  "message": "Unauthorised request - No token provided"
}
```

**Solutions:**

1. **User not logged in**:
   - Navigate to login page
   - Enter credentials and login

2. **Token expired**:
   - Login again to get fresh tokens
   - Access tokens expire in 1 day

3. **Cookies not being sent**:
   - Check CORS configuration allows credentials
   - Verify frontend sends `credentials: 'include'`
   - Check browser doesn't block third-party cookies

4. **Wrong cookie domain**:
   - Ensure frontend and backend on same domain (localhost)
   - Or configure cookie domain correctly in production

---

#### 7. Login "Password Incorrect" Error

**Issue:**
User enters correct password but gets error.

**Causes & Solutions:**

1. **Password was changed directly in database**:
   - Passwords must be hashed before saving
   - Never update password field directly in MongoDB

2. **Bcrypt comparison failing**:
   - Check `isPasswordCorrect` method in user model
   - Verify bcrypt is installed: `npm list bcrypt`

3. **User registered before password hashing was implemented**:
   - Delete user and re-register
   - Or manually hash password and update in DB

---

#### 8. CORS Errors in Browser Console

**Error:**
```
Access to fetch at 'http://localhost:4000/api/v1/...' from origin 'http://localhost:5173' 
has been blocked by CORS policy
```

**Solution:**

Update `server/src/app.js`:
```javascript
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
```

---

#### 9. Itinerary Not Saving

**Issue:**
"Save Itinerary" button doesn't work.

**Debug Steps:**

1. **Check if user is logged in**:
   - Open Redux DevTools
   - Check `auth.isAuthenticated` is `true`

2. **Check console for errors**:
   - Open browser DevTools → Console
   - Look for error messages

3. **Verify API endpoint**:
   ```bash
   # Test with curl
   curl -X POST http://localhost:4000/api/v1/ai/save-itinary \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -d '{"destination":"Paris",...}'
   ```

4. **Check MongoDB connection**:
   - Verify MongoDB is running
   - Check database has `itineraries` collection

---

#### 10. Vite Dev Server Issues

**Error:**
```
Error: Failed to load config from vite.config.ts
```

**Solution…