const express = require('express');
const router = express.Router();
const { markAttendance, getAttendanceByDate, getMonthlyAttendance } = require('../controllers/AttendanceController');
const { verifyToken, requireAdmin } = require('../Middlewares/AuthMiddleware');

// POST /api/attendance  -> { employId, date, status }
router.post('/', verifyToken, requireAdmin, markAttendance);

// GET /api/attendance?date=YYYY-MM-DD[&employId=...]
router.get('/', verifyToken, getAttendanceByDate);

// GET /api/attendance/monthly?month=YYYY-MM[&employId=...]
router.get('/monthly', verifyToken, getMonthlyAttendance);

module.exports = router;
