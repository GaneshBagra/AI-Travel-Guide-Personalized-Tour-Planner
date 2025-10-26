import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import ItinerarySelection from './pages/ItinerarySelection';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/guide/itinary-selection" element={<ItinerarySelection />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;