import React, { useState, useEffect } from 'react';
import AuthWrapper from './components/AuthWrapper';
import HomePage from './components/HomePage';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      {user ? (
        <HomePage user={user} onLogout={handleLogout} />
      ) : (
        <AuthWrapper onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}
export default App;
