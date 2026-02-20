const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');

const app = express();   // IMPORTANT

const port = process.env.PORT || 5881;

require('./Models/db');

const EmployRouter = require('./Routes/EmployRouter');
const AttendanceRouter = require('./Routes/AttendanceRouter');
const AuthRouter = require('./Routes/AuthRouter');

const allowedOrigins = [
    'https://employee-management-system.vercel.app',
    'https://employee-management-system-2-m53o.onrender.com', // ✅ ADD THIS
    'http://localhost:3000',
    'http://localhost:5173',
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

app.use(bodyParser.json());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('EMPLOY MANAGEMENT SYSTEM BACKEND RUNNING');
});

app.get('/employ', (req, res) => {
    res.send('EMPLOY DETAILS');
});

app.use('/api/employs', EmployRouter);
app.use('/api/attendance', AttendanceRouter);
app.use('/api/auth', AuthRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal server error' });
});

// 🔥 THIS WAS MISSING
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});