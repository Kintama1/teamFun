import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ user, onLoginClick, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    onLogout();
    closeMobileMenu();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo/Brand */}
        <div className="navbar-brand">
          <Link to="/">
            <h2>Stock League</h2>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-menu">
          {user ? (
            // Logged-in navigation
            <div className="navbar-nav">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/select-team" className="nav-link">Select Stock Team</Link>
              <div className="nav-dropdown">
                <span className="nav-link dropdown-toggle">Private Leagues</span>
                <div className="dropdown-menu">
                  <Link to="/create-league" className="dropdown-item">Create League</Link>
                  <Link to="/join-league" className="dropdown-item">Join League</Link>
                  <Link to="/my-leagues" className="dropdown-item">My Leagues</Link>
                </div>
              </div>
              <div className="nav-dropdown">
                <span className="nav-link dropdown-toggle user-menu">
                  {user.name}
                </span>
                <div className="dropdown-menu">
                  <Link to="/profile" className="dropdown-item">Profile</Link>
                  <Link to="/settings" className="dropdown-item">Settings</Link>
                  <button 
                    onClick={handleLogout} 
                    className="dropdown-item logout-btn"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // Logged-out navigation
            <div className="navbar-nav">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/about" className="nav-link">About</Link>
              <Link to="/how-it-works" className="nav-link">How it Works</Link>
              <button 
                onClick={onLoginClick} 
                className="nav-btn login-btn"
              >
                Login
              </button>
              <button 
                onClick={onLoginClick} 
                className="nav-btn register-btn"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        {user ? (
          // Logged-in mobile menu
          <div className="mobile-nav">
            <Link to="/" className="mobile-nav-link" onClick={closeMobileMenu}>
              Home
            </Link>
            <Link to="/select-team" className="mobile-nav-link" onClick={closeMobileMenu}>
              Select Stock Team
            </Link>
            <div className="mobile-dropdown">
              <span className="mobile-dropdown-title">Private Leagues</span>
              <Link to="/create-league" className="mobile-nav-link sub" onClick={closeMobileMenu}>
                Create League
              </Link>
              <Link to="/join-league" className="mobile-nav-link sub" onClick={closeMobileMenu}>
                Join League
              </Link>
              <Link to="/my-leagues" className="mobile-nav-link sub" onClick={closeMobileMenu}>
                My Leagues
              </Link>
            </div>
            <div className="mobile-dropdown">
              <span className="mobile-dropdown-title">{user.name}</span>
              <Link to="/profile" className="mobile-nav-link sub" onClick={closeMobileMenu}>
                Profile
              </Link>
              <Link to="/settings" className="mobile-nav-link sub" onClick={closeMobileMenu}>
                Settings
              </Link>
              <button 
                onClick={handleLogout} 
                className="mobile-nav-link sub logout-btn"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          // Logged-out mobile menu
          <div className="mobile-nav">
            <Link to="/" className="mobile-nav-link" onClick={closeMobileMenu}>
              Home
            </Link>
            <Link to="/about" className="mobile-nav-link" onClick={closeMobileMenu}>
              About
            </Link>
            <Link to="/how-it-works" className="mobile-nav-link" onClick={closeMobileMenu}>
              How it Works
            </Link>
            <button 
              onClick={() => { onLoginClick(); closeMobileMenu(); }} 
              className="mobile-nav-btn login-btn"
            >
              Login
            </button>
            <button 
              onClick={() => { onLoginClick(); closeMobileMenu(); }} 
              className="mobile-nav-btn register-btn"
            >
              Sign Up
            </button>
          </div>
        )}
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMobileMenu}></div>
      )}
    </nav>
  );
};

export default Navbar;