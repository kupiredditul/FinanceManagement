// src/components/FinancialManagement.js

// src/components/FinancialManagement.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Management = () => {
  const [earnings, setEarnings] = useState(0);
  const [approvedDrivers, setApprovedDrivers] = useState([]);
  const [activeDrivers, setActiveDrivers] = useState([]);
  const [unapprovedDrivers, setUnapprovedDrivers] = useState([]);
  const [totalRides, setTotalRides] = useState(0);
  const [completedRides, setCompletedRides] = useState(0);
  const [cancelledRides, setCancelledRides] = useState(0);
  const [runningRides, setRunningRides] = useState(0);

  useEffect(() => {
    // Fetch total earnings
    axios.get('/api/earnings')
      .then((response) => setEarnings(response.data[0].total))
      .catch((error) => console.error('Error fetching earnings:', error));

    // Fetch approved drivers
    axios.get('/api/approvedDrivers')
      .then((response) => setApprovedDrivers(response.data))
      .catch((error) => console.error('Error fetching approved drivers:', error));

    // Fetch active drivers
    axios.get('/api/activeDrivers')
      .then((response) => setActiveDrivers(response.data))
      .catch((error) => console.error('Error fetching active drivers:', error));

    // Fetch unapproved drivers
    axios.get('/api/unapprovedDrivers')
      .then((response) => setUnapprovedDrivers(response.data))
      .catch((error) => console.error('Error fetching unapproved drivers:', error));

    // Fetch ride data (total, completed, canceled, running rides)
    axios.get('/api/ridesData')
      .then((response) => {
        setTotalRides(response.data.totalRides);
        setCompletedRides(response.data.completedRides);
        setCancelledRides(response.data.cancelledRides);
        setRunningRides(response.data.runningRides);
      })
      .catch((error) => console.error('Error fetching ride data:', error));
  }, []);

  return (

    <div >
      <h2>Financial and Ride Management</h2>
<div className='card-container'>
      <div className="card">
        <h3>Total Earnings</h3>
        <p>${earnings}</p>
      </div>

      <div className="card">
        <h3>Approved Drivers</h3>
        <ul>
          {approvedDrivers.map((driver) => (
            <li key={driver._id}>{driver.name}</li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h3>Active Drivers</h3>
        <ul>
          {activeDrivers.map((driver) => (
            <li key={driver._id}>{driver.name}</li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h3>Unapproved Drivers</h3>
        <ul>
          {unapprovedDrivers.map((driver) => (
            <li key={driver._id}>{driver.name}</li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h3>Total Rides</h3>
        <p>{totalRides}</p>
      </div>

      <div className="card">
        <h3>Completed Rides</h3>
        <p>{completedRides}</p>
      </div>

      <div className="card">
        <h3>Cancelled Rides</h3>
        <p>{cancelledRides}</p>
      </div>

      <div className="card">
        <h3>Running Rides</h3>
        <p>{runningRides}</p>
      </div>
      </div>
    </div>
  );
};

export default Management;
