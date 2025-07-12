import React, { useState, useEffect } from 'react';
import './SelectTeam.css';

const SelectTeam = ({ user }) => {
  const [stocks, setStocks] = useState([]);
  const [selectedStocks, setSelectedStocks] = useState([null, null, null]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [canSelect, setCanSelect] = useState(false);
  const [timeMessage, setTimeMessage] = useState('');
  const [currentTeam, setCurrentTeam] = useState(null);
  const [showStockList, setShowStockList] = useState(false);
  const [activeBox, setActiveBox] = useState(null);

  // Check if it's selection time (Friday 5PM - Monday 9AM)
  useEffect(() => {
    checkSelectionTime();
    fetchStocks();
    fetchCurrentTeam();
  }, []);

  const checkSelectionTime = () => {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 5 = Friday, 6 = Saturday
    const hour = now.getHours();
    
    // Friday after 5PM OR Saturday OR Sunday OR Monday before 9AM
    const isFridayAfter5 = day === 5 && hour >= 17;
    const isWeekend = day === 6 || day === 0;
    const isMondayBefore9 = day === 1 && hour < 9;
    
    const canSelectNow = isFridayAfter5 || isWeekend || isMondayBefore9;
    
    setCanSelect(canSelectNow);
    
    if (!canSelectNow) {
      if (day === 1 && hour >= 9) {
        setTimeMessage('Stock selection is closed. You can select your team again from Friday 5:00 PM.');
      } else if (day >= 2 && day <= 4) {
        setTimeMessage('Stock selection is closed. You can select your team again from Friday 5:00 PM.');
      } else if (day === 5 && hour < 17) {
        setTimeMessage(`Stock selection opens today at 5:00 PM (${17 - hour} hours remaining).`);
      }
    } else {
      setTimeMessage('Stock selection is now open! Choose your 3 stocks.');
    }
  };

  const fetchStocks = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/stocks');
      if (response.ok) {
        const data = await response.json();
        setStocks(data);
      } else {
        // Mock data fallback
        setStocks([
          { id: '1', stock_name: 'Apple Inc.', symbol: 'AAPL', price: 175.50 },
          { id: '2', stock_name: 'Microsoft Corporation', symbol: 'MSFT', price: 420.30 },
          { id: '3', stock_name: 'Alphabet Inc.', symbol: 'GOOGL', price: 140.25 },
          { id: '4', stock_name: 'Tesla, Inc.', symbol: 'TSLA', price: 248.75 },
          { id: '5', stock_name: 'Amazon.com, Inc.', symbol: 'AMZN', price: 155.80 },
          { id: '6', stock_name: 'NVIDIA Corporation', symbol: 'NVDA', price: 875.20 },
          { id: '7', stock_name: 'Meta Platforms, Inc.', symbol: 'META', price: 485.60 },
          { id: '8', stock_name: 'Netflix, Inc.', symbol: 'NFLX', price: 625.40 },
          { id: '9', stock_name: 'Adobe Inc.', symbol: 'ADBE', price: 565.90 },
          { id: '10', stock_name: 'Salesforce, Inc.', symbol: 'CRM', price: 275.30 }
        ]);
      }
    } catch (error) {
      console.error('Error fetching stocks:', error);
      // Use mock data
      setStocks([
        { id: '1', stock_name: 'Apple Inc.', symbol: 'AAPL', price: 175.50 },
        { id: '2', stock_name: 'Microsoft Corporation', symbol: 'MSFT', price: 420.30 },
        { id: '3', stock_name: 'Alphabet Inc.', symbol: 'GOOGL', price: 140.25 },
        { id: '4', stock_name: 'Tesla, Inc.', symbol: 'TSLA', price: 248.75 },
        { id: '5', stock_name: 'Amazon.com, Inc.', symbol: 'AMZN', price: 155.80 },
        { id: '6', stock_name: 'NVIDIA Corporation', symbol: 'NVDA', price: 875.20 },
        { id: '7', stock_name: 'Meta Platforms, Inc.', symbol: 'META', price: 485.60 },
        { id: '8', stock_name: 'Netflix, Inc.', symbol: 'NFLX', price: 625.40 },
        { id: '9', stock_name: 'Adobe Inc.', symbol: 'ADBE', price: 565.90 },
        { id: '10', stock_name: 'Salesforce, Inc.', symbol: 'CRM', price: 275.30 }
      ]);
    }
  };

  const fetchCurrentTeam = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/teams/${user.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const team = await response.json();
        if (team) {
          setCurrentTeam(team);
          // Set selected stocks from current team using stock IDs
          const teamStocks = [
            stocks.find(s => s.id === team.stock_1_id),
            stocks.find(s => s.id === team.stock_2_id),
            stocks.find(s => s.id === team.stock_3_id)
          ];
          setSelectedStocks(teamStocks);
        }
      }
    } catch (error) {
      console.error('Error fetching current team:', error);
    }
  };

  const filteredStocks = stocks.filter(stock =>
    stock.stock_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectStock = (stock, boxIndex) => {
    // Check for duplicates
    const isAlreadySelected = selectedStocks.some((selected, index) => 
      selected && selected.id === stock.id && index !== boxIndex
    );
    
    if (isAlreadySelected) {
      setError(`${stock.symbol} is already selected in another position.`);
      setTimeout(() => setError(''), 3000);
      return;
    }

    const newSelected = [...selectedStocks];
    newSelected[boxIndex] = stock;
    setSelectedStocks(newSelected);
    setShowStockList(false);
    setActiveBox(null);
    setError('');
  };

  const removeStock = (boxIndex) => {
    const newSelected = [...selectedStocks];
    newSelected[boxIndex] = null;
    setSelectedStocks(newSelected);
  };

  const openStockSelection = (boxIndex) => {
    if (!canSelect) return;
    setActiveBox(boxIndex);
    setShowStockList(true);
    setSearchTerm('');
  };

  const submitTeam = async () => {
    if (!canSelect) {
      setError('Stock selection is currently closed.');
      return;
    }

    if (selectedStocks.some(stock => !stock)) {
      setError('Please select all 3 stocks before submitting.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const teamData = {
        user_id: user.id,
        team_name: `${user.username || user.name}'s Team`,
        stock_1_id: selectedStocks[0].id,
        stock_2_id: selectedStocks[1].id,
        stock_3_id: selectedStocks[2].id
      };

      const response = await fetch('http://localhost:5000/api/teams', {
        method: currentTeam ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(teamData),
      });

      if (response.ok) {
        setSuccess('Team submitted successfully!');
        fetchCurrentTeam(); // Refresh current team data
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to submit team.');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="select-team-container">
      <div className="select-team-content">
        <h1>Select Your Stock Team</h1>
        
        {/* Time Status */}
        <div className={`time-status ${canSelect ? 'open' : 'closed'}`}>
          <p>{timeMessage}</p>
        </div>

        {/* Current Team Display */}
        {currentTeam && (
          <div className="current-team">
            <h2>Your Current Team</h2>
            <div className="team-info">
              <p><strong>Team Name:</strong> {currentTeam.team_name}</p>
              <p><strong>Points:</strong> {currentTeam.points}</p>
              <div className="current-stocks">
                {selectedStocks[0] && <span>{selectedStocks[0].symbol}</span>}
                {selectedStocks[1] && <span>{selectedStocks[1].symbol}</span>}
                {selectedStocks[2] && <span>{selectedStocks[2].symbol}</span>}
              </div>
            </div>
          </div>
        )}

        {/* Stock Selection Boxes */}
        <div className="stock-selection">
          <h2>Choose Your 3 Stocks</h2>
          <div className="selection-boxes">
            {[0, 1, 2].map((index) => (
              <div key={index} className="stock-box">
                <div className="box-header">
                  <h3>Stock {index + 1}</h3>
                </div>
                <div 
                  className={`stock-display ${!canSelect ? 'disabled' : ''}`}
                  onClick={() => openStockSelection(index)}
                >
                  {selectedStocks[index] ? (
                    <div className="selected-stock">
                      <div className="stock-info">
                        <h4>{selectedStocks[index].symbol}</h4>
                        <p>{selectedStocks[index].stock_name}</p>
                        <span className="price">${selectedStocks[index].price}</span>
                      </div>
                      {canSelect && (
                        <button 
                          className="remove-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeStock(index);
                          }}
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="empty-stock">
                      <div className="plus-icon">+</div>
                      <p>Click to select a stock</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="submit-section">
          <button 
            className="submit-btn"
            onClick={submitTeam}
            disabled={!canSelect || loading || selectedStocks.some(stock => !stock)}
          >
            {loading ? 'Submitting...' : (currentTeam ? 'Update Team' : 'Submit Team')}
          </button>
        </div>

        {/* Messages */}
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
      </div>

      {/* Stock Selection Modal */}
      {showStockList && (
        <div className="modal-overlay" onClick={() => setShowStockList(false)}>
          <div className="stock-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Select Stock for Position {activeBox + 1}</h3>
              <button className="modal-close" onClick={() => setShowStockList(false)}>×</button>
            </div>
            
            <div className="search-section">
              <input
                type="text"
                placeholder="Search stocks by name or symbol..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="stocks-list">
              {filteredStocks.map((stock) => (
                <div
                  key={stock.id}
                  className={`stock-item ${selectedStocks.some(s => s && s.id === stock.id) ? 'disabled' : ''}`}
                  onClick={() => selectStock(stock, activeBox)}
                >
                  <div className="stock-details">
                    <div className="stock-header">
                      <h4>{stock.symbol}</h4>
                      <span className="stock-price">${stock.price}</span>
                    </div>
                    <p className="stock-name">{stock.stock_name}</p>
                  </div>
                  {selectedStocks.some(s => s && s.id === stock.id) && (
                    <div className="selected-indicator">Selected</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectTeam;