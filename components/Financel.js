import React, { useEffect, useState } from 'react';

const Financel = () => {
  // State variables for total revenue, transactions, and driver payouts
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0); // Define totalEarnings
  const [driverPayouts, setDriverPayouts] = useState([]);

  useEffect(() => {
    // Fetch total revenue data from your API
    fetch('/api/totalRevenue')
      .then((response) => response.json())
      .then((data) => setTotalRevenue(data.totalRevenue))
      .catch((error) => console.error('Error fetching total revenue:', error));

    // Fetch transaction history from your API
    fetch('/api/transactionHistory')
      .then((response) => response.json())
      .then((data) => setTransactions(data.transactions))
      .catch((error) => console.error('Error fetching transaction history:', error));

    // Fetch total earnings data from your API
    fetch('/api/totalEarnings')
      .then((response) => response.json())
      .then((data) => setTotalEarnings(data.totalEarnings))
      .catch((error) => console.error('Error fetching total earnings:', error));

    // Fetch driver payouts from your API
    fetch('/api/driverPayouts')
      .then((response) => response.json())
      .then((data) => setDriverPayouts(data.driverPayouts))
      .catch((error) => console.error('Error fetching driver payouts:', error));
  }, []);

  return (
    <div>
      <h2>Financial Management</h2>
      <table>
        <thead>
          <tr>
            <th colSpan={2}>Total Revenue</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Total Revenue:</td>
            <td>${totalRevenue}</td>
          </tr>
        </tbody>
      </table>

      <table>
        <thead>
          <tr>
            <th colSpan={4}>Transaction History</th>
          </tr>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Source</th>
            <th>Destination</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.date}</td>
              <td>${transaction.amount}</td>
              <td>{transaction.source}</td>
              <td>{transaction.destination}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <table>
        <thead>
          <tr>
            <th colSpan={3}>Driver Earnings and Payouts</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Total Earnings:</td>
            <td>${totalEarnings}</td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th>Driver</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {driverPayouts.map((payout) => (
            <tr key={payout.id}>
              <td>{payout.driver}</td>
              <td>${payout.amount}</td>
              <td>{payout.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Financel;
