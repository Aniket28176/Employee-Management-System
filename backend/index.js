const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const port = process.env.PORT || 5881;
require('./Models/db');
const EmployRouter = require('./Routes/EmployRouter');
const AttendanceRouter = require('./Routes/AttendanceRouter');
const AuthRouter = require('./Routes/AuthRouter');
const cors = require('cors');

app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true
}));
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send('EMPLOY MANAGEMENT SYSTEM BACKEND RUNNING');
});

app.get('/employ',(req,res)=>{
    res.send('EMPLOY DETAILS');
});

app.use('/api/employs',EmployRouter);
app.use('/api/attendance', AttendanceRouter);
app.use('/api/auth', AuthRouter);
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal server error' });
});
