import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchSuggestedTrips } from '../store/suggestedTripsSlice';
import { setFormData } from '../store/formSlice';
import type { AppDispatch, RootState } from '../store/store';
import '../styles/SuggestedTrips.css';

function SuggestedTrips() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { trips, loading, error } = useSelector((state: RootState) => state.suggestedTrips);

  useEffect(() => {
    // Fetch suggested trips on component mount
    dispatch(fetchSuggestedTrips());
  }, [dispatch]);

  const handlePlanTrip = (destination: string) => {
    // Pre-fill the form with the selected destination
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    dispatch(setFormData({
      destination,
        start_date: "",
        end_date: '',
      intrests: '',
      travellers: '',
      budget: '',
    }));

    navigate('/');
  };

  if (loading) {
    return (
      <div className="suggested-trips-container">
        <div className="loading-state">
          <div className="spinner-border text-light" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-4">✨ Discovering amazing destinations for you...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="suggested-trips-container">
        <div className="error-state">
          <div className="alert alert-danger shadow" role="alert">
            <h4>⚠️ Oops!</h4>
            <p>{error}</p>
            <button 
              className="btn btn-light mt-3"
              onClick={() => dispatch(fetchSuggestedTrips())}
            >
              🔄 Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="suggested-trips-container">
      <div className="suggested-header">
        <h1>🌍 Trending Destinations</h1>
        <p className="subtitle">Discover the world's most amazing places, curated by AI</p>
      </div>

      <div className="trips-grid">
        {trips.map((trip, index) => (
          <div key={index} className="trip-card">
            <div 
              className="trip-image"
              style={{
                backgroundImage: trip.imageUrl 
                  ? `url(${trip.imageUrl})` 
                  : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              }}
            >
              <div className="trip-category">{trip.category}</div>
              <div className="trip-overlay">
                <h3>{trip.destination}</h3>
              </div>
            </div>

            <div className="trip-content">
              <p className="trip-description">{trip.description}</p>

              <div className="trip-highlights">
                <h4>🎯 Highlights</h4>
                <ul>
                  {trip.highlights.slice(0, 4).map((highlight, idx) => (
                    <li key={idx}>{highlight}</li>
                  ))}
                </ul>
              </div>

              <div className="trip-info">
                <div className="info-item">
                  <span className="info-icon">📅</span>
                  <div>
                    <span className="info-label">Best Time</span>
                    <span className="info-value">{trip.bestTime}</span>
                  </div>
                </div>
                <div className="info-item">
                  <span className="info-icon">⏱️</span>
                  <div>
                    <span className="info-label">Duration</span>
                    <span className="info-value">{trip.duration}</span>
                  </div>
                </div>
              </div>

              <button 
                className="btn btn-primary w-100 plan-trip-btn"
                onClick={() => handlePlanTrip(trip.destination)}
              >
                Plan Your Trip →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SuggestedTrips;
