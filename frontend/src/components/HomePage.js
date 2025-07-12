// HomePage.js
import React, { useState, useEffect } from 'react';

const HomePage = ({ user, onLogout }) => {
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
    <div>
      <nav>
        <h1>Welcome, {user.name}!</h1>
        <button onClick={onLogout}>Logout</button>
      </nav>
      
      <main>
        <h2>Your Data</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default HomePage;