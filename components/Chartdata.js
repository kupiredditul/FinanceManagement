import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const Chartdata = () => {
  const [chartData, setChartData] = useState({});
  
  useEffect(() => {
    // Fetch chart data from your API
    fetch('/api/chartData')
      .then((response) => response.json())
      .then((data) => {
        // Process the fetched data and set it to the chartData state
        const chartData = {
          labels: data.labels, // Labels for the X-axis
          datasets: [
            {
              label: 'Data from Database', // Dataset label
              backgroundColor: 'rgba(75,192,192,0.2)', // Bar color
              borderColor: 'rgba(75,192,192,1)', // Border color
              borderWidth: 1, // Border width
              data: data.values, // Data points for the Y-axis
            },
          ],
        };
        setChartData(chartData);
      })
      .catch((error) => console.error('Error fetching chart data:', error));
  }, []);

  return (
    <div>
      <h2>Bar Chart</h2>
      <div style={{ maxWidth: '400px', margin: '20px auto' }}>
        <Bar
          data={chartData}
          options={{
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Chartdata;
