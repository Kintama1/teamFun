import React from 'react';

const Profile = ({ user }) => {
  return (
    <main style={{ padding: '2rem 1rem', paddingTop: '5rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1>Profile</h1>
        
        {user && (
          <div style={{ 
            background: 'white', 
            padding: '2rem', 
            borderRadius: '8px', 
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            marginTop: '2rem'
          }}>
            <h2>User Information</h2>
            <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
              <div>
                <strong>Name:</strong> {user.username}
              </div>
              <div>
                <strong>Email:</strong> {user.email}
              </div>
              <div>
                <strong>Member Since:</strong> {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'Recently'}
              </div>
            </div>
          </div>
        )}
        
        <div style={{ 
          background: '#f9fafb', 
          padding: '2rem', 
          borderRadius: '8px', 
          marginTop: '2rem',
          border: '2px dashed #d1d5db'
        }}>
          <h2>Profile Features</h2>
          <p>This profile page will include:</p>
          <ul style={{ paddingLeft: '2rem' }}>
            <li>Edit profile information</li>
            <li>View performance history</li>
            <li>See past stock selections</li>
            <li>Track wins/losses</li>
            <li>League participation history</li>
            <li>Account settings</li>
          </ul>
          <p><strong>Coming soon...</strong></p>
        </div>
      </div>
    </main>
  );
};

export default Profile;