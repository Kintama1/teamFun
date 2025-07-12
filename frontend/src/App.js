import React, { useState, useEffect } from 'react';
import AuthWrapper from './components/AuthWrapper';
import HomePage from './components/HomePage';
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
      {/* Always show navbar */}
      <Navbar 
        user={user} 
        onLoginClick={handleLoginClick} 
        onLogout={handleLogout} 
      />
      
      {/* Main content */}
      <HomePage 
        user={user} 
        onLogout={handleLogout} 
        onLoginClick={handleLoginClick}
      />
      
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