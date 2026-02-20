const AttendanceModel = require('../Models/AttendanceModel');

// Mark or update attendance for an employee on a date
const markAttendance = async (req, res) => {
  try {
    const { employId, date, status } = req.body;

    if (!employId || !date || !status) {
      return res.status(400).json({ message: 'Missing required fields', success: false });
    }

    const existing = await AttendanceModel.findOne({ employId, date });
    if (existing) {
      existing.status = status;
      await existing.save();
      return res.status(200).json({ message: 'Attendance updated', success: true, data: existing });
    }

    const att = new AttendanceModel({ employId, date, status });
    await att.save();
    res.status(201).json({ message: 'Attendance marked', success: true, data: att });
  } catch (err) {
    console.error('markAttendance error', err);
    res.status(500).json({ message: 'Internal server error', success: false, error: err.message });
  }
};

// Get attendance for a specific date (optional filter by employId)
const getAttendanceByDate = async (req, res) => {
  try {
    const { date, employId } = req.query;

    if (!date) {
      return res.status(400).json({ message: 'date query param required (YYYY-MM-DD)', success: false });
    }

    const filter = { date };
    if (employId) filter.employId = employId;

    const records = await AttendanceModel.find(filter).populate('employId', 'name email department');
    res.status(200).json({ message: 'Attendance fetched', success: true, data: records });
  } catch (err) {
    console.error('getAttendanceByDate error', err);
    res.status(500).json({ message: 'Internal server error', success: false, error: err.message });
  }
};

// Get monthly attendance summary. Query: ?month=YYYY-MM [&employId=...]
const getMonthlyAttendance = async (req, res) => {
  try {
    const { month, employId } = req.query;

    if (!month) {
      return res.status(400).json({ message: 'month query param required (YYYY-MM)', success: false });
    }

    const filter = { date: { $regex: `^${month}` } };
    if (employId) filter.employId = employId;

    const records = await AttendanceModel.find(filter).populate('employId', 'name email department');

    // Aggregate totals and per-employee counts
    let totalPresent = 0;
    let totalAbsent = 0;
    const perEmployMap = {};

    records.forEach((r) => {
      const id = r.employId ? r.employId._id.toString() : 'unknown';
      if (!perEmployMap[id]) {
        perEmployMap[id] = {
          employId: r.employId || null,
          present: 0,
          absent: 0,
        };
      }
      if (r.status === 'present') {
        totalPresent++;
        perEmployMap[id].present++;
      } else {
        totalAbsent++;
        perEmployMap[id].absent++;
      }
    });

    const perEmploy = Object.values(perEmployMap);

    res.status(200).json({
      message: 'Monthly attendance fetched',
      success: true,
      data: {
        totalPresent,
        totalAbsent,
        perEmploy,
      },
    });
  } catch (err) {
    console.error('getMonthlyAttendance error', err);
    res.status(500).json({ message: 'Internal server error', success: false, error: err.message });
  }
};

module.exports = {
  markAttendance,
  getAttendanceByDate,
  getMonthlyAttendance,
};
