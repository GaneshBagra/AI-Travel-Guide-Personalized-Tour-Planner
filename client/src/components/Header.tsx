import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthStatus, logoutUser } from '../store/authSlice';
import type { AppDispatch, RootState } from '../store/store';
import '../styles/Header.css';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Check auth status on component mount
    dispatch(checkAuthStatus());
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="brand">
            <span className="brand-icon">✈️</span>
            <span className="brand-name">GradGuide</span>
          </Link>
          <nav className="nav-menu">
            <Link to="/suggested-trips" className="nav-link">
              🌍 Trending Destinations
            </Link>
          </nav>
          <div className="auth-buttons">
            {isAuthenticated && user ? (
              <>
                <span className="user-name">Hi, {user.fullName}</span>
                <Link to="/saved-itineraries" className="btn-auth btn-saved">
                  Saved Itineraries
                </Link>
                <button className="btn-auth btn-logout" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-auth btn-login">Login</Link>
                <Link to="/register" className="btn-auth btn-signup">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
