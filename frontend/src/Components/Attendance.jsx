import React, { useEffect, useState } from 'react';
import { GetAllEmploys, GetAttendanceByDate, MarkAttendance } from '../api';
import { notify } from '../utils';
import { Link, useNavigate } from 'react-router-dom';

const Attendance = () => {
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [employs, setEmploys] = useState([]);
  const [attendanceMap, setAttendanceMap] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (!token) return navigate('/login');
    if (role !== 'admin') return navigate('/employ');
  }, []);

  const fetchEmploys = async () => {
    const data = await GetAllEmploys('', 1, 1000);
    setEmploys(data.employs || []);
  };

  const fetchAttendance = async (d) => {
    const records = await GetAttendanceByDate(d);
    const map = {};
    (records || []).forEach((r) => {
      map[r.employId._id] = r.status;
    });
    setAttendanceMap(map);
  };

  useEffect(() => {
    fetchEmploys();
    fetchAttendance(date);
  }, []);

  const handleDateChange = (e) => {
    const d = e.target.value;
    setDate(d);
    fetchAttendance(d);
  };

  const handleToggle = (id, status) => {
    setAttendanceMap((prev) => ({ ...prev, [id]: status }));
  };

  const saveAttendance = async (id) => {
    const status = attendanceMap[id] || 'absent';
    const payload = { employId: id, date, status };
    const res = await MarkAttendance(payload);
    if (res.success) {
      notify(res.message || 'Saved', 'success');
    } else {
      notify(res.message || 'Save failed', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Attendance</h2>
          <div className="flex gap-3">
            <Link to="/employ" className="px-4 py-2 bg-gray-200 rounded">Back</Link>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <label className="font-medium">Date:</label>
          <input type="date" value={date} onChange={handleDateChange} className="border px-3 py-1 rounded" />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2">Department</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {employs.map((e) => (
                <tr key={e._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{e.name}</td>
                  <td className="px-4 py-2">{e.department}</td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => handleToggle(e._id, 'present')}
                        className={`px-3 py-1 rounded ${attendanceMap[e._id] === 'present' ? 'bg-green-600 text-white' : 'bg-gray-100'}`}>
                        Present
                      </button>
                      <button
                        onClick={() => handleToggle(e._id, 'absent')}
                        className={`px-3 py-1 rounded ${attendanceMap[e._id] === 'absent' ? 'bg-red-600 text-white' : 'bg-gray-100'}`}>
                        Absent
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button onClick={() => saveAttendance(e._id)} className="px-3 py-1 bg-blue-600 text-white rounded">Save</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
