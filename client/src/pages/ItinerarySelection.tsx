import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../store/store';
import '../styles/ItinerarySelection.css';

const ItinerarySelection = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useSelector((state: RootState) => state.itinerary);

  useEffect(() => {
    // If no loading state and no data, redirect to home
    if (!loading && !data && !error) {
      navigate('/');
    }
  }, [loading, data, error, navigate]);

  if (error) {
    return (
      <div className="itinerary-page">
        <div className="container">
          <div className="error-container">
            <div className="error-icon">⚠️</div>
            <h2>Oops! Something went wrong</h2>
            <p className="error-message">{error}</p>
            <button className="btn-primary" onClick={() => navigate('/')}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="itinerary-page">
        <div className="container">
          <div className="loading-container">
            <div className="loading-animation">
              <div className="plane">✈️</div>
              <div className="clouds">
                <span className="cloud">☁️</span>
                <span className="cloud">☁️</span>
                <span className="cloud">☁️</span>
              </div>
            </div>
            <h2 className="loading-title">Creating Your Perfect Itinerary</h2>
            <p className="loading-subtitle">Our AI is analyzing the best places, weather, and experiences for your trip...</p>
            <div className="loading-steps">
              <div className="step active">
                <span className="step-icon">🌍</span>
                <span className="step-text">Finding destinations</span>
              </div>
              <div className="step active">
                <span className="step-icon">🌤️</span>
                <span className="step-text">Checking weather</span>
              </div>
              <div className="step active">
                <span className="step-icon">📸</span>
                <span className="step-text">Gathering images</span>
              </div>
              <div className="step">
                <span className="step-icon">✨</span>
                <span className="step-text">Finalizing itinerary</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="itinerary-page">
      <div className="container">
        <div className="itinerary-header">
          <h1 className="itinerary-title">
            <span className="icon">🗺️</span>
            Your Personalized Itinerary for {data.destination}
          </h1>
          <p className="itinerary-summary">{data.summary}</p>
        </div>

        <div className="days-container">
          {data.days?.map((day) => (
            <div key={day.day} className="day-card">
              <div className="day-header">
                <h2 className="day-title">
                  Day {day.day}
                  <span className="day-date">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </h2>
                {day.placeQueried && (
                  <div className="day-location">
                    <span className="icon">📍</span>
                    {day.placeQueried}
                  </div>
                )}
              </div>

              {day.weather && day.weather.day && (
                <div className="day-weather">
                  <div className="weather-icon-large">
                    {day.weather.day.icon && (
                      <img src={day.weather.day.icon} alt="weather" />
                    )}
                  </div>
                  <div className="weather-info">
                    <span className="weather-condition">{day.weather.day.condition}</span>
                    <span className="weather-temp">
                      {day.weather.day.maxtemp_c}°C / {day.weather.day.mintemp_c}°C
                    </span>
                  </div>
                </div>
              )}

              <div className="activities-list">
                {day.activities?.map((activity, idx) => (
                  <div key={idx} className="activity-card">
                    <div className="activity-image">
                      {activity.PublicImageURL ? (
                        <img 
                          src={activity.PublicImageURL} 
                          alt={activity.placeName || activity.title}
                          loading="lazy"
                        />
                      ) : (
                        <div className="image-placeholder">
                          <span>📷</span>
                        </div>
                      )}
                    </div>

                    <div className="activity-content">
                      <div className="activity-header">
                        <span className="activity-time">
                          <span className="icon">🕐</span>
                          {activity.time}
                        </span>
                        {activity.duration && (
                          <span className="activity-duration">
                            <span className="icon">⏱️</span>
                            {activity.duration}
                          </span>
                        )}
                      </div>

                      <h3 className="activity-title">{activity.title}</h3>
                      
                      {activity.placeName && (
                        <div className="activity-place">
                          <span className="icon">📍</span>
                          {activity.placeName}
                        </div>
                      )}

                      <p className="activity-notes">{activity.notes}</p>

                      {activity.weather && activity.weather.condition && (
                        <div className="activity-weather">
                          <span className="icon">🌤️</span>
                          <span>{activity.weather.condition}</span>
                          {activity.weather.temp_c !== undefined && (
                            <span className="temp">{activity.weather.temp_c}°C</span>
                          )}
                          {activity.weather.icon && (
                            <img src={activity.weather.icon} alt="weather" className="weather-icon-small" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {day.safety && (
                <div className="day-safety">
                  <span className="icon">⚠️</span>
                  <strong>Safety Note:</strong> {day.safety}
                </div>
              )}
            </div>
          ))}
        </div>

        {data.explanation && data.explanation.length > 0 && (
          <div className="explanation-section">
            <h2 className="section-title">
              <span className="icon">💡</span>
              Why This Itinerary?
            </h2>
            <ul className="explanation-list">
              {data.explanation.map((exp, idx) => (
                <li key={idx}>{exp}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="action-buttons">
          <button className="btn-secondary" onClick={() => navigate('/')}>
            Plan Another Trip
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItinerarySelection;
