# 🌍 GradGuide - AI Travel Planner

> Your personalized AI-powered travel companion that creates detailed, day-by-day itineraries with real-time weather forecasts and stunning destination imagery.

[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.19.2-brightgreen.svg)](https://www.mongodb.com/)
[![Google Gemini](https://img.shields.io/badge/AI-Google%20Gemini-orange.svg)](https://ai.google.dev/)

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [How It Works](#-how-it-works)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## 🎯 Overview

**GradGuide** is an intelligent travel planning application that leverages the power of Google's Gemini AI to create personalized travel itineraries. Simply input your destination, dates, interests, and budget, and watch as AI crafts a detailed day-by-day plan complete with:

- 🎯 **Smart Activity Planning** - Activities tailored to your interests
- 🌤️ **Real-time Weather** - 10-day weather forecasts for each activity
- 📸 **Beautiful Imagery** - Curated photos from Unsplash for every location
- 💰 **Budget-Aware** - Plans that respect your spending limits
- 👥 **Group-Friendly** - Accommodates any number of travelers

---

## ✨ Features

### 🤖 AI-Powered Itinerary Generation
- Uses **Google Gemini 2.5 Pro** to generate intelligent, context-aware travel plans
- Structured JSON output with day-by-day activities
- Personalized recommendations based on your interests

### 🌦️ Weather Integration
- Real-time weather forecasts for the next 10 days
- Activity-specific weather (Morning, Afternoon, Evening)
- Temperature, conditions, and weather icons for each time slot
- Powered by [WeatherAPI.com](https://www.weatherapi.com/)

### 📷 Visual Experience
- Automatic image fetching from **Unsplash API**
- High-quality landscape photos for each destination
- Fallback to Wikipedia images when needed

### 💻 Modern Frontend
- Built with **React 19** and **TypeScript**
- Responsive design that works on all devices
- **Redux Toolkit** for state management
- Smooth animations and loading states
- Travel-themed UI with purple gradient design

### 🎨 User Experience
- Interactive form with validation
- Animated loading screens with progress indicators
- Error handling with friendly messages
- Day-by-day itinerary cards with collapsible sections
- Safety tips and travel recommendations

---

## 🛠️ Tech Stack

### Frontend
- **React 19.1.1** - Modern UI library
- **TypeScript** - Type-safe JavaScript
- **Redux Toolkit** - State management
- **React Router v7** - Client-side routing
- **Vite** - Fast build tool and dev server
- **Bootstrap 5** - Base styling framework
- **Custom CSS** - Travel-themed responsive design

### Backend
- **Node.js** - JavaScript runtime
- **Express 5.1.0** - Web application framework
- **MongoDB 8.19.2** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Multer** - FormData parsing middleware

### AI & APIs
- **Google Gemini API** - AI itinerary generation
- **WeatherAPI.com** - Weather forecasts
- **Unsplash API** - High-quality imagery
- **Wikipedia API** - Fallback images

### Development Tools
- **Nodemon** - Auto-restart development server
- **ESLint** - Code linting
- **dotenv** - Environment variable management

---

## 🏗️ Architecture

```
┌─────────────────┐
│   React Client  │
│                 │
└────────┬────────┘
         │
         │ HTTP/REST API
         ▼
┌─────────────────┐
│  Express Server │
│                 │
└────────┬────────┘
         │
    ┌────┴──────────────────────┐
    │                           │
    ▼                           ▼
┌─────────┐            ┌──────────────┐
│ MongoDB │            │  External    │
│Database │            │  APIs        │
└─────────┘            │              │
                       │ • Gemini AI  │
                       │ • WeatherAPI │
                       │ • Unsplash   │
                       └──────────────┘
```

### Request Flow

1. **User Input** → User fills form on Home page (`/`)
2. **Redux Action** → Form data dispatched to Redux store
3. **API Call** → Frontend calls `/api/v1/ai/generate-response`
4. **AI Processing** → Backend calls Google Gemini API
5. **Data Enrichment** → Weather and images fetched for each activity
6. **Response** → Complete itinerary returned to frontend
7. **Display** → User sees detailed day-by-day plan on `/guide/itinary-selection`

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** (v7 or higher)
- **MongoDB** (v5 or higher) or MongoDB Atlas account
- API keys for:
  - [Google Gemini API](https://ai.google.dev/)
  - [WeatherAPI.com](https://www.weatherapi.com/)
  - [Unsplash API](https://unsplash.com/developers)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/GaneshBagra/AI-Travel-Guide-Personalized-Tour-Planner.git
   cd AI-Travel-Guide-Personalized-Tour-Planner
   ```

2. **Install Backend Dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../client
   npm install
   ```

### Environment Variables

#### Backend (.env file in `/server`)

Create a `.env` file in the `server` directory with the following variables:

```env
# Server Configuration
PORT=4000
NODE_ENV=development

# MongoDB Connection
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/gradguide
# Note: URL-encode special characters in password (e.g., @ becomes %40)

# Google Gemini AI API
GEMINI_API_KEY=your_gemini_api_key_here

# Weather API
WEATHERAPI_KEY=your_weatherapi_key_here

# Unsplash API
UNSPLASH_API_KEY=your_unsplash_access_key_here

# CORS Settings (optional)
CORS_ORIGIN=http://localhost:5173
```

#### Important Notes:
- **MongoDB URL**: If your password contains special characters like `@`, `!`, or `#`, you must URL-encode them:
  - `@` → `%40`
  - `!` → `%21`
  - `#` → `%23`
  - Example: `Ganesh..@1` becomes `Ganesh..%401`

- **API Keys**: Get your free API keys from:
  - Google Gemini: https://ai.google.dev/
  - WeatherAPI: https://www.weatherapi.com/signup.aspx
  - Unsplash: https://unsplash.com/oauth/applications

---

## 📱 Usage

### Running the Application

1. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

2. **Start the Backend Server**
   ```bash
   cd server
   npm run dev
   ```
   Server will run on http://localhost:4000

3. **Start the Frontend** (in a new terminal)
   ```bash
   cd client
   npm run dev
   ```
   Client will run on http://localhost:5173

4. **Open your browser** and navigate to:
   ```
   http://localhost:5173
   ```

### Using the Application

1. **Fill the Travel Form**:
   - **Destination**: Enter where you want to go (e.g., "Paris", "Rishikesh")
   - **Start Date**: Select your trip start date
   - **End Date**: Select your trip end date (must be within 10 days for weather data)
   - **Interests**: Enter your interests separated by commas (e.g., "mountains, history, food")
   - **Travelers**: Optionally specify number (e.g., `{"adults": 2, "children": 1}`)
   - **Budget**: Optionally enter your budget in INR

2. **Generate Itinerary**:
   - Click "Generate My Itinerary" button
   - Watch the animated loading screen with progress indicators

3. **View Your Plan**:
   - See your complete day-by-day itinerary
   - Each day shows:
     - Date and day number
     - Multiple activities with timing
     - Destination images from Unsplash
     - Weather forecasts for each activity time
     - Duration and helpful notes
     - Safety tips
   - Read the AI's explanation of why places were chosen

4. **Navigate**:
   - Use the "Plan Another Trip" button to start over
   - Header navigation always available

---

## 📁 Project Structure

```
AI-Travel-Guide-Personalized-Tour-Planner/
│
├── client/                          # React Frontend
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── assets/                  # Images, fonts, etc.
│   │   ├── components/              # React components
│   │   │   └── Header.tsx           # Navigation header
│   │   ├── pages/                   # Route pages
│   │   │   ├── Home.tsx             # Landing page with form
│   │   │   └── ItinerarySelection.tsx # Itinerary display page
│   │   ├── store/                   # Redux store
│   │   │   ├── store.ts             # Store configuration
│   │   │   └── itinerarySlice.ts    # Itinerary state slice
│   │   ├── styles/                  # CSS files
│   │   │   ├── Header.css
│   │   │   ├── Home.css
│   │   │   └── ItinerarySelection.css
│   │   ├── App.tsx                  # Main app with routing
│   │   ├── App.css                  # App styles
│   │   ├── main.tsx                 # React entry point
│   │   └── index.css                # Global styles
│   ├── package.json                 # Frontend dependencies
│   ├── tsconfig.json                # TypeScript config
│   └── vite.config.ts               # Vite configuration
│
├── server/                          # Node.js Backend
│   ├── src/
│   │   ├── controllers/             # Request handlers
│   │   │   └── itinary.controller.js # AI generation logic
│   │   ├── db/                      # Database connection
│   │   │   └── index.js             # MongoDB connection
│   │   ├── models/                  # Mongoose schemas
│   │   │   └── itinerary.js         # Itinerary model
│   │   ├── routes/                  # API routes
│   │   │   ├── ai.routes.js         # AI generation routes
│   │   │   └── weather.routes.js    # Weather routes
│   │   ├── utils/                   # Utility functions
│   │   │   ├── ApiError.js          # Error handling
│   │   │   ├── ApiResponse.js       # Response formatting
│   │   │   ├── async-handler.js     # Async error wrapper
│   │   │   └── weatherAPi.service.js # Weather & image services
│   │   ├── app.js                   # Express app setup
│   │   ├── constants.js             # Constants
│   │   └── index.js                 # Server entry point
│   ├── .env                         # Environment variables
│   └── package.json                 # Backend dependencies
│
└── README.md                        # This file
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:4000/api/v1
```

### Endpoints

#### 1. Generate Itinerary

**POST** `/ai/generate-response`

Generates a personalized travel itinerary using AI.

**Request Format**: `multipart/form-data`

**Request Body**:
```javascript
{
  destination: string,      // Required: Destination city/country
  start_date: string,       // Required: ISO date (YYYY-MM-DD)
  end_date: string,         // Required: ISO date (YYYY-MM-DD)
  intrests: string,         // Required: Comma-separated interests
  travellers: string,       // Optional: JSON string {"adults": 2, "children": 1}
  budget: number            // Optional: Budget in INR
}
```

**Response Format**:
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
            "notes": "Book tickets in advance to avoid queues",
            "weather": {
              "date": "2025-11-01",
              "time": "2025-11-01 09:00",
              "temp_c": 15.2,
              "condition": "Partly cloudy",
              "icon": "https://cdn.weatherapi.com/..."
            }
          }
        ],
        "safety": "Keep belongings secure in crowded areas",
        "weather": {
          "date": "2025-11-01",
          "day": {
            "maxtemp_c": 18,
            "mintemp_c": 12,
            "avgtemp_c": 15,
            "condition": "Partly cloudy",
            "icon": "https://cdn.weatherapi.com/..."
          }
        }
      }
    ],
    "explanation": [
      "The Eiffel Tower is a must-see iconic landmark",
      "Louvre Museum offers world-class art collections"
    ]
  }
}
```

**Error Response**:
```json
{
  "error": "Error message here",
  "statusCode": 400
}
```

---

## 🔧 How It Works

### 1. Frontend Form Submission
When a user fills out the travel form and clicks "Generate My Itinerary":
- Form data is validated (required fields, date range)
- User is navigated to `/guide/itinary-selection`
- Redux async thunk `generateItinerary` is dispatched
- Loading state is shown with animated airplane

### 2. Backend AI Processing
The Express server receives the request:
```javascript
// server/src/controllers/itinary.controller.js
1. Validates input data
2. Calculates number of days
3. Formats interests array
4. Calls Google Gemini API with structured schema
5. Receives AI-generated itinerary in JSON format
```

### 3. Data Enrichment
For each activity in each day:
```javascript
// server/src/utils/weatherAPi.service.js
1. Fetches image from Unsplash based on placeName
2. Calls WeatherAPI for 10-day forecast
3. Normalizes dates to YYYY-MM-DD format
4. Parses activity time (Morning/9 AM/etc.)
5. Finds closest hourly weather data
6. Enriches activity object with weather and image
```

### 4. Response & Display
The enriched itinerary is sent back to the frontend:
- Redux store updates with complete data
- Loading state transitions to display state
- Day cards render with all information
- Images and weather icons load progressively

### 5. Key Features

#### Date Normalization
```javascript
// Handles various date formats
normalizeToYMD("2025-10-26") → "2025-10-26"
normalizeToYMD("10/26/2025") → "2025-10-26"
```

#### Time Parsing
```javascript
// Converts activity times to hours
parseActivityTimeToHour("Morning") → 9
parseActivityTimeToHour("9:00 AM") → 9
parseActivityTimeToHour("Evening") → 18
```

#### Weather Matching
```javascript
// Finds closest hourly weather to activity time
Activity: "9:00 AM" → Matches with 9:00 hour forecast
Activity: "Morning" → Matches with 9:00 hour forecast
Activity: "Evening" → Matches with 18:00 hour forecast
```

---

## 📸 Screenshots

### Home Page - Travel Form
Beautiful hero section with background image and interactive form:
- Responsive design
- Input validation
- Icon-enhanced fields
- Purple gradient theme

### Loading State
Engaging loading animation:
- Animated airplane flying across clouds
- 4-step progress indicator
- "Preparing your journey" messaging

### Itinerary Display
Comprehensive day-by-day breakdown:
- Day cards with date headers
- Activity cards with images
- Weather forecasts with icons
- Duration and helpful notes
- Safety tips section
- AI explanation of choices

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Update README if needed

---

## 🐛 Troubleshooting

### Common Issues

**1. MongoDB Connection Failed**
```
Error: Authentication failed
```
**Solution**: Check if special characters in password are URL-encoded in `.env` file.

**2. Weather Data Unavailable**
```
Weather: "Weather unavailable for activity time"
```
**Solution**: Ensure dates are within 10 days from today. WeatherAPI only provides 10-day forecasts.

**3. Images Not Loading**
```
PublicImageURL: null
```
**Solution**: Verify `UNSPLASH_API_KEY` is set correctly in `.env` file.

**4. Vite Server Won't Start**
```
Error: Failed to resolve import
```
**Solution**: Run `npm install` in client directory to ensure all dependencies are installed.

**5. Gemini API Error**
```
Error: GEMINI_API_KEY not set
```
**Solution**: Add your Google Gemini API key to `.env` file in server directory.

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 👨‍💻 Author

**Ganesh Bagra**

- GitHub: [@GaneshBagra](https://github.com/GaneshBagra)
- Repository: [AI-Travel-Guide-Personalized-Tour-Planner](https://github.com/GaneshBagra/AI-Travel-Guide-Personalized-Tour-Planner)

---

## 🙏 Acknowledgments

- **Google Gemini** for powerful AI capabilities
- **WeatherAPI.com** for accurate weather forecasts
- **Unsplash** for beautiful destination imagery
- **React & Redux** teams for excellent frameworks
- **MongoDB** for flexible data storage

---

## 🚧 Future Enhancements

- [ ] User authentication and saved itineraries
- [ ] Social sharing features
- [ ] Print/PDF export functionality
- [ ] Multi-language support
- [ ] Integration with booking platforms
- [ ] Offline mode with PWA
- [ ] Mobile app (React Native)
- [ ] Real-time collaboration for group planning
- [ ] Budget tracking and expense management
- [ ] Integration with maps for navigation

---

## 📞 Support

If you have any questions or need help, please:
1. Check the [Troubleshooting](#-troubleshooting) section
2. Open an [Issue](https://github.com/GaneshBagra/AI-Travel-Guide-Personalized-Tour-Planner/issues)
3. Contact the author through GitHub

---

<div align="center">

### ⭐ If you found this project helpful, please give it a star!

**Made with ❤️ and ☕ by Ganesh Bagra**

</div>