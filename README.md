# 🌍 GradGuide - AI Travel Planner

> An intelligent travel planning application that generates personalized itineraries using Google Gemini AI, complete with real-time weather forecasts and stunning destination imagery.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-47A248?logo=mongodb)](https://www.mongodb.com/)

---

## ✨ Key Features

- 🤖 **AI-Powered Itineraries** - Personalized day-by-day travel plans using Google Gemini 1.5 Pro
- 🌤️ **Real-Time Weather** - Hour-by-hour weather forecasts for each activity
- 📸 **Beautiful Imagery** - Stunning destination photos from Unsplash API
- 🔐 **User Authentication** - Secure JWT-based login and registration
- 💾 **Save & Manage** - Store and retrieve your favorite itineraries
- 🎯 **Trending Destinations** - AI-curated popular travel spots
- 📱 **Responsive Design** - Seamless experience across all devices

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 20+ and npm
- **MongoDB** (local or MongoDB Atlas)
- **API Keys:**
  - Google Gemini API
  - WeatherAPI.com
  - Unsplash API

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/ai-travel-guide.git
cd ai-travel-guide

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Environment Setup

**Server (`.env` in `/server`):**
```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/gradguide
CORS_ORIGIN=http://localhost:5174

ACCESS_TOKEN_SECRET=your_access_token_secret_here
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret_here
REFRESH_TOKEN_EXPIRY=10d

GEMINI_API_KEY=your_gemini_api_key
WEATHERAPI_KEY=your_weatherapi_key
UNSPLASH_API_KEY=your_unsplash_api_key
```

**Client (`.env` in `/client`):**
```env
VITE_API_BASE_URL=http://localhost:4000/api/v1
```

### Run the Application

```bash
# Terminal 1 - Start server
cd server
npm run dev

# Terminal 2 - Start client
cd client
npm run dev
```

🎉 **Application running at:** `http://localhost:5174`

---

## 🏗️ Tech Stack

### Frontend
- **React 19** with TypeScript
- **Redux Toolkit** - State management
- **React Router** - Navigation
- **Vite** - Build tool
- **CSS3** - Custom styling

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **JWT** - Authentication
- **Google Gemini AI** - Itinerary generation
- **WeatherAPI.com** - Weather forecasts
- **Unsplash API** - Destination images

---

## 📂 Project Structure

```
gradguide/
├── client/                    # Frontend React app
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── pages/             # Page components
│   │   ├── store/             # Redux slices
│   │   └── styles/            # CSS files
│   └── .env                   # Client environment variables
│
└── server/                    # Backend Node.js app
    ├── src/
    │   ├── controllers/       # Route controllers
    │   ├── models/            # MongoDB models
    │   ├── routes/            # API routes
    │   ├── middlewares/       # Auth & error handling
    │   └── utils/             # Helper functions
    └── .env                   # Server environment variables
```

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/user/register` | Register new user |
| POST | `/api/v1/user/login` | Login user |
| POST | `/api/v1/user/logout` | Logout user |
| POST | `/api/v1/user/isUserLoggedIn` | Check auth status |

### Itinerary
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/v1/ai/generate-response` | Generate itinerary | No |
| GET | `/api/v1/ai/suggested-trips` | Get trending destinations | No |
| POST | `/api/v1/ai/save-itinary` | Save itinerary | Yes |
| POST | `/api/v1/ai/list-all-itinary` | List saved itineraries | Yes |

---

## 🎨 Screenshots

### Home Page - Plan Your Trip
![Home Page](https://via.placeholder.com/800x400?text=Home+Page)

### AI-Generated Itinerary
![Itinerary](https://via.placeholder.com/800x400?text=Generated+Itinerary)

### Trending Destinations
![Destinations](https://via.placeholder.com/800x400?text=Trending+Destinations)

---

## 🎯 How It Works

1. **Enter Details** - Destination, dates, interests, travelers, and budget
2. **AI Generation** - Gemini AI creates a personalized day-by-day plan
3. **Weather Integration** - Real-time forecasts added for each activity
4. **Image Enhancement** - Beautiful photos fetched for each location
5. **Save & Share** - Store itineraries to your account for future reference

---

## 🔒 Security Features

- ✅ **JWT Authentication** with HTTP-only cookies
- ✅ **Password Hashing** using bcrypt
- ✅ **CORS Protection** with configured origins
- ✅ **Input Validation** on all API endpoints
- ✅ **Error Handling** with detailed logging

---

## 🌟 Unique Features

- **Chain of Thought (COT)** visualization during AI generation
- **Activity-level weather** matching exact time and location
- **Smart date handling** with UTC normalization
- **Image fallbacks** for reliable destination photos
- **Responsive design** optimized for mobile and desktop

---

## 📝 Assignment Compliance

This project was built as part of an internship assignment and meets all requirements:

✅ **Itinerary Builder** - AI-powered personalized travel plans  
✅ **Suggested Trips** - Pre-curated trending destinations  
✅ **Weather Integration** - Real-time forecasts via WeatherAPI  
✅ **Streaming AI Responses** - Interactive generation experience  
✅ **Modern Tech Stack** - React, Node.js, MongoDB, Gemini AI  

---

## 🚧 Future Enhancements

- [ ] Social sharing of itineraries
- [ ] Multi-language support
- [ ] Budget breakdown and tracking
- [ ] Integration with booking platforms
- [ ] Offline mode with PWA
- [ ] Mobile app (React Native)

---

## 👨‍💻 Developer

**Ganesh Bagra**

- 📧 Email: ganeshmb8530@gmail.com
- 💼 LinkedIn: [linkedin.com/in/ganeshbagra](https://linkedin.com/in/ganeshbagra)
- 🐙 GitHub: [github.com/GaneshBagra](https://github.com/GaneshBagra)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Google Gemini AI** for intelligent itinerary generation
- **WeatherAPI.com** for accurate weather forecasts
- **Unsplash** for stunning destination imagery
- **GradGuide** for the internship opportunity

---

<div align="center">
  <p>Made with ❤️ by Ganesh Bagra</p>
  <p>⭐ Star this repo if you found it helpful!</p>
</div>