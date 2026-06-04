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

const frontendUrls = process.env.FRONTEND_URL
    ? process.env.FRONTEND_URL.split(',').map(url => url.trim()).filter(Boolean)
    : [];

const allowedOrigins = [
    'https://employee-management-system.vercel.app',
    'https://employee-management-system-1-awkg.onrender.com',
    'http://localhost:3000',
    'http://localhost:5173',
    ...frontendUrls
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) {
            return callback(null, true);
        }

        if (allowedOrigins.includes(origin) || /^https:\/\/.*\.onrender\.com$/.test(origin)) {
            return callback(null, true);
        }

        callback(new Error('Not allowed by CORS'));
    },
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