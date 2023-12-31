import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const AdminDashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [driverCount, setDriverCount] = useState(0);
  const [riderCount, setRiderCount] = useState(0);
  const [vehicleTypeCount, setVehicleTypeCount] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [recentRides, setRecentRides] = useState([]);

  useEffect(() => {
    // Fetch user count data from your API
     fetch('/api/userCount').then(response => response.json()).then(data => setUserCount(data.count));

    // Fetch driver count data from your API
     fetch('/api/driverCount').then(response => response.json()).then(data => setDriverCount(data.count));

    // Fetch rider count data from your API
     fetch('/api/riderCount').then(response => response.json()).then(data => setRiderCount(data.count));

    // Fetch vehicle type count data from your API
     fetch('/api/vehicleTypeCount').then(response => response.json()).then(data => setVehicleTypeCount(data.count));

    // Fetch revenue data from your API
     fetch('/api/revenue').then(response => response.json()).then(data => setRevenue(data.revenue));

    // Fetch recent ride list data from your API
     fetch('/api/recentRides').then(response => response.json()).then(data => setRecentRides(data));
  }, []);

  return (
    <div>
      <Typography variant="h4"></Typography>
      <div className="summary-cards">
        {/* <Card>
          <CardContent>
            <Typography variant="h6">User </Typography>
            <Typography variant="body2">Total Users: {userCount}</Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6">Driver </Typography>
            <Typography variant="body2">Total Drivers: {driverCount}</Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6">Rider </Typography>
            <Typography variant="body2">Total Riders: {riderCount}</Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6">Vehicle Type </Typography>
            <Typography variant="body2">Total Vehicle Types: {vehicleTypeCount}</Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6">Revenue </Typography>
            <Typography variant="body2">Total Revenue: ${revenue}</Typography>
          </CardContent>
        </Card> */}
      <Card>
  <CardContent>
    <Typography variant="h6">Summary</Typography>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow className="table-header-row">
            <TableCell className="table-header-cell">Category</TableCell>
            <TableCell className="table-header-cell">Total</TableCell>
            <TableCell className="table-header-cell">Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow className="table-row">
            <TableCell className="table-cell">User Summary</TableCell>
            <TableCell className="table-cell">{userCount}</TableCell>
            <TableCell className="table-cell">This table row displays the total number of users in the system.</TableCell>
          </TableRow>
          <TableRow className="table-row">
            <TableCell className="table-cell">Driver Summary</TableCell>
            <TableCell className="table-cell">{driverCount}</TableCell>
            <TableCell className="table-cell">This table row displays the total number of drivers in the system.</TableCell>
          </TableRow>
          <TableRow className="table-row">
            <TableCell className="table-cell">Rider Summary</TableCell>
            <TableCell className="table-cell">{riderCount}</TableCell>
            <TableCell className="table-cell">This table row displays the total number of riders in the system.</TableCell>
          </TableRow>
          <TableRow className="table-row">
            <TableCell className="table-cell">Vehicle Type Summary</TableCell>
            <TableCell className="table-cell">{vehicleTypeCount}</TableCell>
            <TableCell className="table-cell">This table row displays the total number of vehicle types in the system.</TableCell>
          </TableRow>
          <TableRow className="table-row">
            <TableCell className="table-cell">Revenue Summary</TableCell>
            <TableCell className="table-cell revenue-cell">${revenue}</TableCell>
            <TableCell className="table-cell">This table row displays the total revenue generated by the system.</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  </CardContent>
</Card>


      </div>

      <Card>
        <CardContent>
          <Typography variant="h6">Recent Ride List</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Driver</TableCell>
                  <TableCell>Rider</TableCell>
                  <TableCell>Start Time</TableCell>
                  <TableCell>End Time</TableCell>
                  <TableCell>Fare</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentRides.map((ride) => (
                  <TableRow key={ride.id}>
                    <TableCell>{ride.driver}</TableCell>
                    <TableCell>{ride.rider}</TableCell>
                    <TableCell>{ride.startTime}</TableCell>
                    <TableCell>{ride.endTime}</TableCell>
                    <TableCell>${ride.fare}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
