const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AttendanceSchema = new Schema({
  employId: {
    type: Schema.Types.ObjectId,
    ref: 'employees',
    required: true,
  },
  date: {
    type: String, // store as YYYY-MM-DD for easy querying
    required: true,
  },
  status: {
    type: String,
    enum: ['present', 'absent'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const AttendanceModel = mongoose.model('attendances', AttendanceSchema);
module.exports = AttendanceModel;
