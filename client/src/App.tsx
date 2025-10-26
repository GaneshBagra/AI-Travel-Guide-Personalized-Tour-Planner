import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import ItinerarySelection from './pages/ItinerarySelection';
import Login from './pages/Login';
import Register from './pages/Register';
import SavedItineraries from './pages/SavedItineraries';
import './App.css';

function AppContent() {
  const location = useLocation();
  const hideHeaderPaths = ['/login', '/register'];
  const shouldHideHeader = hideHeaderPaths.includes(location.pathname);

  return (
    <div className="app">
      {!shouldHideHeader && <Header />}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/guide/itinary-selection" element={<ItinerarySelection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/saved-itineraries" element={<SavedItineraries />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;