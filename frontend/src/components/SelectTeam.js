import React from 'react';

const SelectTeam = ({ user }) => {
  return (
    <main style={{ padding: '2rem 1rem', paddingTop: '5rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1>Select Your Stock Team</h1>
        <p>Welcome, {user?.name}! Choose your 3 stocks for this week's competition.</p>
        
        <div style={{ 
          background: '#f9fafb', 
          padding: '2rem', 
          borderRadius: '8px', 
          marginTop: '2rem',
          border: '2px dashed #d1d5db'
        }}>
          <h2>Stock Selection Interface</h2>
          <p>This will be where users can:</p>
          <ul style={{ paddingLeft: '2rem' }}>
            <li>Search for stocks</li>
            <li>View stock prices and info</li>
            <li>Select 3 stocks for their team</li>
            <li>See their current selections</li>
            <li>Submit their team for the week</li>
          </ul>
          <p><strong>Coming soon...</strong></p>
        </div>
      </div>
    </main>
  );
};

export default SelectTeam;