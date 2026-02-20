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

const allowedOrigins = [
    'https://employee-management-system.vercel.app',
    'http://localhost:3000',
    'http://localhost:5173',
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
    origin: allowedOrigins,
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
