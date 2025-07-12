import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthWrapper from './components/AuthWrapper';
import HomePage from './components/HomePage';
import About from './components/About';
import HowItWorks from './components/HowItWorks';
import SelectTeam from './components/SelectTeam';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const handleLoginClick = () => {
    setShowAuthModal(true);
  };

  const handleCloseModal = () => {
    setShowAuthModal(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      {/* Always show navbar - single source of truth */}
      <Navbar 
        user={user} 
        onLoginClick={handleLoginClick} 
        onLogout={handleLogout} 
      />
      
      {/* Main content - now using Routes instead of just HomePage */}
      <Routes>
        <Route 
          path="/" 
          element={
            <HomePage 
              user={user} 
              onLogout={handleLogout} 
              onLoginClick={handleLoginClick}
            />
          } 
        />
        <Route path="/about" element={<About />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        
        {/* Protected Routes */}
        <Route 
          path="/select-team" 
          element={
            <ProtectedRoute user={user} onLoginClick={handleLoginClick}>
              <SelectTeam user={user} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute user={user} onLoginClick={handleLoginClick}>
              <Profile user={user} />
            </ProtectedRoute>
          } 
        />
      </Routes>
      
      {/* Auth Modal - only show when needed */}
      {showAuthModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseModal}>×</button>
            <AuthWrapper onLoginSuccess={handleLoginSuccess} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;