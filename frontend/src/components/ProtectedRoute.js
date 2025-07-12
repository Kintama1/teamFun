import React from 'react';

const ProtectedRoute = ({ user, children, onLoginClick }) => {
  // If user is not logged in, show login prompt
  if (!user) {
    return (
      <main style={{ padding: '2rem 1rem', paddingTop: '5rem' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ 
            background: '#fef3c7', 
            border: '1px solid #f59e0b',
            padding: '2rem', 
            borderRadius: '8px',
            marginTop: '2rem'
          }}>
            <h2 style={{ color: '#92400e', marginTop: 0 }}>Login Required</h2>
            <p style={{ color: '#92400e' }}>
              You need to be logged in to access this page.
            </p>
            <button 
              onClick={onLoginClick}
              style={{
                background: '#2563eb',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '6px',
                fontSize: '1rem',
                cursor: 'pointer',
                marginTop: '1rem'
              }}
            >
              Login / Sign Up
            </button>
          </div>
        </div>
      </main>
    );
  }

  // If user is logged in, render the protected content
  return children;
};

export default ProtectedRoute;