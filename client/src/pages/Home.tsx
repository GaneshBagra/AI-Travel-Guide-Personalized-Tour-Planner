import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import { generateItinerary } from '../store/itinerarySlice';
import { setFormData } from '../store/formSlice';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [formErrors, setFormErrors] = useState<string>('');
  
  // Get stored form data from Redux
  const storedFormData = useSelector((state: RootState) => state.form.formData);
  
  // State for destination only
  const [destination, setDestination] = useState('');

  // Update destination when stored form data changes
  useEffect(() => {
    if (storedFormData?.destination) {
      setDestination(storedFormData.destination);
    }
  }, [storedFormData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormErrors('');

    const formData = new FormData(e.currentTarget);
    
    // Validate required fields
    const destination = formData.get('destination');
    const startDate = formData.get('start_date');
    const endDate = formData.get('end_date');
    const interests = formData.get('intrests');
    const travellers = formData.get('travellers');
    const budget = formData.get('budget');

    if (!destination || !startDate || !endDate || !interests) {
      setFormErrors('Please fill in all required fields');
      return;
    }

    // Validate dates
    const start = new Date(startDate as string);
    const end = new Date(endDate as string);
    if (end <= start) {
      setFormErrors('End date must be after start date');
      return;
    }

    // Store form data in Redux for later use (saving itinerary)
    dispatch(setFormData({
      destination: destination as string,
      start_date: startDate as string,
      end_date: endDate as string,
      intrests: interests as string,
      travellers: travellers as string || '',
      budget: budget as string || '',
    }));

    // Navigate to loading page and dispatch async action
    navigate('/guide/itinary-selection');
    dispatch(generateItinerary(formData));
  };

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">Discover Your Next Adventure</h1>
            <p className="hero-subtitle">
              Let AI plan your perfect trip tailored to your interests, budget, and schedule
            </p>
          </div>
          
          <div className="form-container">
            <form onSubmit={handleSubmit} className="travel-form">
              <h2 className="form-title">Plan Your Journey</h2>
              
              {formErrors && (
                <div className="alert alert-danger">
                  {formErrors}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="destination">
                  <span className="icon">📍</span>
                  Destination *
                </label>
                <input
                  type="text"
                  id="destination"
                  name="destination"
                  placeholder="Where do you want to go?"
                  className="form-control"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="start_date">
                    <span className="icon">📅</span>
                    Start Date *
                  </label>
                  <input
                    type="date"
                    id="start_date"
                    name="start_date"
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="end_date">
                    <span className="icon">📅</span>
                    End Date *
                  </label>
                  <input
                    type="date"
                    id="end_date"
                    name="end_date"
                    className="form-control"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="intrests">
                  <span className="icon">❤️</span>
                  Interests *
                </label>
                <input
                  type="text"
                  id="intrests"
                  name="intrests"
                  placeholder="e.g., history, mountains, food, beaches (comma separated)"
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="travellers">
                  <span className="icon">👥</span>
                  Travelers
                </label>
                <textarea
                  id="travellers"
                  name="travellers"
                  placeholder='{"adults": 2, "children": 0}'
                  className="form-control"
                  rows={2}
                />
              </div>

              <div className="form-group">
                <label htmlFor="budget">
                  <span className="icon">💰</span>
                  Budget (INR)
                </label>
                <input
                  type="number"
                  id="budget"
                  name="budget"
                  placeholder="Enter your budget"
                  className="form-control"
                />
              </div>

              <button type="submit" className="btn-submit">
                <span className="icon">✨</span>
                Generate My Itinerary
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;