import React, { useState, useEffect } from 'react';

const HomePage = ({ user, onLogout, onLoginClick }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch table data from backend
    fetchTableData();
  }, []);

  const fetchTableData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/data', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      const result = await response.json();
      setData(result.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <main style={{ padding: '2rem 1rem', paddingTop: '5rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1>Welcome to Stock League</h1>
        
        {user && (
          <div style={{ marginBottom: '2rem' }}>
            <h2>Welcome back, {user.username}!</h2>
          </div>
        )}
        
        <section>
          <h2>Current Leaderboard</h2>
          <p>This will be replaced with the proper leaderboard component next.</p>
          
          {/* Temporary data table - will be replaced with leaderboard */}
          {data.length > 0 && (
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#f3f4f6' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', border: '1px solid #e5e7eb' }}>ID</th>
                  <th style={{ padding: '1rem', textAlign: 'left', border: '1px solid #e5e7eb' }}>Name</th>
                  <th style={{ padding: '1rem', textAlign: 'left', border: '1px solid #e5e7eb' }}>Email</th>
                  <th style={{ padding: '1rem', textAlign: 'left', border: '1px solid #e5e7eb' }}>Created</th>
                </tr>
              </thead>
              <tbody>
                {data.map(item => (
                  <tr key={item.id}>
                    <td style={{ padding: '1rem', border: '1px solid #e5e7eb' }}>{item.id}</td>
                    <td style={{ padding: '1rem', border: '1px solid #e5e7eb' }}>{item.name}</td>
                    <td style={{ padding: '1rem', border: '1px solid #e5e7eb' }}>{item.email}</td>
                    <td style={{ padding: '1rem', border: '1px solid #e5e7eb' }}>{item.created_at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </main>
  );
};

export default HomePage;