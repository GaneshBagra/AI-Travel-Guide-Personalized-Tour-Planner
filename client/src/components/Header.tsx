import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="brand">
            <span className="brand-icon">✈️</span>
            <span className="brand-name">GradGuide</span>
          </Link>
          <div className="auth-buttons">
            <button className="btn-auth btn-login">Login</button>
            <button className="btn-auth btn-signup">Sign Up</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
