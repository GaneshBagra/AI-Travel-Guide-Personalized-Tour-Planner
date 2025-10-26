import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchSavedItineraries } from '../store/savedItinerariesSlice';
import { generateItinerary } from '../store/itinerarySlice';
import { setFormData } from '../store/formSlice';
import type { AppDispatch, RootState } from '../store/store';
import '../styles/SavedItineraries.css';

function SavedItineraries() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { itineraries, loading, error } = useSelector((state: RootState) => state.savedItineraries);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    dispatch(fetchSavedItineraries());
  }, [dispatch, isAuthenticated, navigate]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleItineraryClick = async (itinerary: any) => {
    // Store form data for saving later if needed
    dispatch(setFormData({
      destination: itinerary.destination,
      start_date: itinerary.start_date,
      end_date: itinerary.end_date,
      intrests: Array.isArray(itinerary.intrests) ? itinerary.intrests.join(', ') : itinerary.intrests,
      travellers: itinerary.travellers || '',
      budget: itinerary.budget || '',
    }));

    // Navigate to itinerary selection page
    navigate('/guide/itinary-selection');

    // Regenerate the itinerary
    const formData = new FormData();
    formData.append('destination', itinerary.destination);
    formData.append('start_date', itinerary.start_date);
    formData.append('end_date', itinerary.end_date);
    formData.append('intrests', Array.isArray(itinerary.intrests) ? itinerary.intrests.join(', ') : itinerary.intrests);
    if (itinerary.travellers) formData.append('travellers', itinerary.travellers);
    if (itinerary.budget) formData.append('budget', itinerary.budget);

    dispatch(generateItinerary(formData));
  };

  if (loading) {
    return (
      <div className="saved-itineraries-container">
        <div className="loading-spinner">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading your saved itineraries...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="saved-itineraries-container">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="saved-itineraries-container">
      <div className="saved-header">
        <h1>My Saved Itineraries</h1>
        <p className="subtitle">Your travel plans at a glance</p>
      </div>

      {itineraries.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <h3>No Saved Itineraries Yet</h3>
          <p>Start planning your next adventure!</p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Create New Itinerary
          </button>
        </div>
      ) : (
        <div className="itineraries-grid">
          {itineraries.map((itinerary) => (
            <div 
              key={itinerary._id} 
              className="itinerary-card"
              onClick={() => handleItineraryClick(itinerary)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleItineraryClick(itinerary);
                }
              }}
            >
              <div className="card-icon">✈️</div>
              <div className="card-content">
                <h3 className="destination">{itinerary.destination}</h3>
                <div className="date-range">
                  <div className="date-item">
                    <span className="date-label">Start Date</span>
                    <span className="date-value">{formatDate(itinerary.start_date)}</span>
                  </div>
                  <div className="date-separator">→</div>
                  <div className="date-item">
                    <span className="date-label">End Date</span>
                    <span className="date-value">{formatDate(itinerary.end_date)}</span>
                  </div>
                </div>
                {itinerary.intrests && (
                  <div className="interests">
                    <span className="interests-label">Interests:</span>
                    <span className="interests-value">
                      {Array.isArray(itinerary.intrests) ? itinerary.intrests.join(', ') : itinerary.intrests}
                    </span>
                  </div>
                )}
              </div>
              <div className="card-footer">
                <span className="view-details">Click to view details →</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SavedItineraries;
