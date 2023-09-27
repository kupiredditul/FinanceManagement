import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firsbase';
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';

const cardStyles = {
  height: '150px',
  width: '300px',
  margin: 'auto',
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
  padding: '16px',
  marginBottom: '16px',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
};
const cardstyle={
    display:"flex"
}

const Chartdata = () => {
  const [rows, setRows] = useState([]);
  const [amount, setAmount] = useState(null);
  const [diff, setDiff] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    axios
      .get('YOUR_API_ENDPOINT')
      .then((response) => {
        setRows(response.data);
      })
      .catch((error) => {
        console.error('Error fetching API data:', error);
      });

    fetchDataFromFirestore();
  }, []);

  const fetchDataFromFirestore = async () => {
    try {
      const q = query(collection(db, 'your_collection_name'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => doc.data());
      setTableData(data);
    } catch (error) {
      console.error('Error fetching Firestore data:', error);
    }
  };

  const renderExpensesWidget = () => {
    return (
      <div className="widget">
        <span className="title">EXPENSES</span>
        <br />
        <span className="counter">{'$' + amount}</span>
        <br />
        <span className="link">
          <button type="button">See all expenses</button>
        </span>
        <br />
        <div>
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: 'rgba(0, 128, 0, 0.2)', color: 'green' }}
          />
        </div>
      </div>
    );
  };

  const renderSavingsWidget = () => {
    return (
      <div className="widget">
        <span className="title">SAVINGS</span>
        <br />
        <span className="counter">{'$' + amount}</span>
        <br />
        <span className="link">
          <button type="button">See all savings</button>
        </span>
        <br />
        <div>
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: 'rgba(0, 128, 0, 0.2)', color: 'green' }}
          />
        </div>
      </div>
    );
  };

  const renderEarningsWidget = () => {
    return (
      <div className="widget">
        <span className="title">EARNINGS</span>
        <br />
        <span className="counter">{'$' + amount}</span>
        <br />
        <span className="link">
          <button type="button">View net earnings</button>
        </span>
        <br />
        <div>
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: 'rgba(0, 128, 0, 0.2)', color: 'green' }}
          />
        </div>
      </div>
    );
  };

  const renderChart = () => {
    const data = [
      { name: 'January', Total: 1200 },
      { name: 'February', Total: 2100 },
      { name: 'March', Total: 800 },
      { name: 'April', Total: 1600 },
      { name: 'May', Total: 900 },
      { name: 'June', Total: 1700 },
    ];
    return (
      <div className="chart">
        <div className="title">Last 6 Months (Revenue)</div>
        <ResponsiveContainer width="100%" aspect={2 / 1}>
          <AreaChart
            data={data}
            width={730}
            height={250}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" stroke="gray" />
            <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="Total"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#total)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <div className="combined-component">
      {/* Widgets */}
      <div className="widgets" style={cardstyle}>
        <div style={cardStyles}>{renderExpensesWidget()}</div>
        <div style={cardStyles}>{renderSavingsWidget()}</div>
        <div style={cardStyles}>{renderEarningsWidget()}</div>
      </div>

      <div className="chart-container d-flex" >

        <div className="featured container col-lg-4">
          <div className="top">
            <h1 className="title">Total Revenue</h1>
            <MoreVertIcon fontSize="small" />
          </div>
          <div className="bottom">
            <div className="featuredChart">
              <CircularProgressbar value={70} text={'70%'} strokeWidth={5} />
            </div>
            <p className="title">Total sales made today</p>
            <p className="amount">$420</p>
            <p className="desc">Previous transactions processing. Last payments may not be included.</p>
            <div className="summary">
              <div className="item">
                <div className="itemTitle">Target</div>
                <div className="itemResult negative">
                  <KeyboardArrowDownIcon fontSize="small" />
                  <div className="resultAmount">$12.4k</div>
                </div>
              </div>
              <div className="item">
                <div className="itemTitle">Last Week</div>
                <div className="itemResult positive">
                  <KeyboardArrowUpOutlinedIcon fontSize="small" />
                  <div className="resultAmount">$12.4k</div>
                </div>
              </div>
              <div className="item">
                <div className="itemTitle">Last Month</div>
                <div className="itemResult positive">
                  <KeyboardArrowUpOutlinedIcon fontSize="small" />
                  <div className="resultAmount">$12.4k</div>
                </div>
              </div>
            </div>
          </div>
        </div>
<div className='a2 container col-lg-8'><div className="chart">{renderChart()}</div></div>
        
      </div>

     
      <div className="container " style={{ margin: 'auto', width: '80%' }}>
        {/* Table */}
        <div className='container mt-5'>
        <TableContainer component={Paper} className="table">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="tableCell"> ID</TableCell>
                <TableCell className="tableCell">Drivers</TableCell>
                {/* <TableCell className="tableCell">Customer</TableCell> */}
                <TableCell className="tableCell">Date</TableCell>
                <TableCell className="tableCell">Amount</TableCell>
                <TableCell className="tableCell">Payment Method</TableCell>
                <TableCell className="tableCell">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="tableCell">{row.id}</TableCell>
                  <TableCell className="tableCell">
                    <div className="cellWrapper">
                      <img src={row.img} alt="" className="image" />
                      {row.product}
                    </div>
                  </TableCell>
                  <TableCell className="tableCell">{row.customer}</TableCell>
                  <TableCell className="tableCell">{row.date}</TableCell>
                  <TableCell className="tableCell">{row.amount}</TableCell>
                  <TableCell className="tableCell">{row.method}</TableCell>
                  <TableCell className="tableCell">
                    <span className={`status ${row.status}`}>{row.status}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default Chartdata;
