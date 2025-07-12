import React, { useState } from 'react';
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
          <h2>Stock League</h2>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-menu">
          {user ? (
            // Logged-in navigation
            <div className="navbar-nav">
              <a href="/" className="nav-link">Home</a>
              <a href="/select-team" className="nav-link">Select Stock Team</a>
              <div className="nav-dropdown">
                <span className="nav-link dropdown-toggle">Private Leagues</span>
                <div className="dropdown-menu">
                  <a href="/create-league" className="dropdown-item">Create League</a>
                  <a href="/join-league" className="dropdown-item">Join League</a>
                  <a href="/my-leagues" className="dropdown-item">My Leagues</a>
                </div>
              </div>
              <div className="nav-dropdown">
                <span className="nav-link dropdown-toggle user-menu">
                  {user.name}
                </span>
                <div className="dropdown-menu">
                  <a href="/profile" className="dropdown-item">Profile</a>
                  <a href="/settings" className="dropdown-item">Settings</a>
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
              <a href="/" className="nav-link">Home</a>
              <a href="/about" className="nav-link">About</a>
              <a href="/how-it-works" className="nav-link">How it Works</a>
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
            <a href="/" className="mobile-nav-link" onClick={closeMobileMenu}>
              Home
            </a>
            <a href="/select-team" className="mobile-nav-link" onClick={closeMobileMenu}>
              Select Stock Team
            </a>
            <div className="mobile-dropdown">
              <span className="mobile-dropdown-title">Private Leagues</span>
              <a href="/create-league" className="mobile-nav-link sub" onClick={closeMobileMenu}>
                Create League
              </a>
              <a href="/join-league" className="mobile-nav-link sub" onClick={closeMobileMenu}>
                Join League
              </a>
              <a href="/my-leagues" className="mobile-nav-link sub" onClick={closeMobileMenu}>
                My Leagues
              </a>
            </div>
            <div className="mobile-dropdown">
              <span className="mobile-dropdown-title">{user.name}</span>
              <a href="/profile" className="mobile-nav-link sub" onClick={closeMobileMenu}>
                Profile
              </a>
              <a href="/settings" className="mobile-nav-link sub" onClick={closeMobileMenu}>
                Settings
              </a>
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
            <a href="/" className="mobile-nav-link" onClick={closeMobileMenu}>
              Home
            </a>
            <a href="/about" className="mobile-nav-link" onClick={closeMobileMenu}>
              About
            </a>
            <a href="/how-it-works" className="mobile-nav-link" onClick={closeMobileMenu}>
              How it Works
            </a>
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