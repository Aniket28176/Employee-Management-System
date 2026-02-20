import React, { useEffect, useState } from 'react';
import { GetMonthlyAttendance } from '../api';
import PieDonut from './PieDonut';
import { Link, useNavigate } from 'react-router-dom';

const MonthlyAttendance = () => {
  const getDefaultMonth = () => new Date().toISOString().slice(0, 7); // YYYY-MM
  const [month, setMonth] = useState(getDefaultMonth());
  const [summary, setSummary] = useState({ totalPresent: 0, totalAbsent: 0, perEmploy: [] });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/login');
  }, []);

  const fetchSummary = async (m) => {
    const data = await GetMonthlyAttendance(m);
    setSummary(data || { totalPresent: 0, totalAbsent: 0, perEmploy: [] });
  };

  useEffect(() => {
    fetchSummary(month);
  }, [month]);

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Monthly Attendance</h2>
          <div className="flex gap-3">
            <Link to="/employ" className="px-4 py-2 bg-gray-200 rounded">Back</Link>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <label className="font-medium">Month:</label>
          <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} className="border px-3 py-1 rounded" />
        </div>

        <div className="flex gap-8 items-center mb-6">
          <PieDonut present={summary.totalPresent} absent={summary.totalAbsent} />
          <div>
            <p className="text-lg font-medium">Present: <span className="font-semibold">{summary.totalPresent}</span></p>
            <p className="text-lg font-medium">Absent: <span className="font-semibold">{summary.totalAbsent}</span></p>
            <p className="text-sm text-gray-500 mt-2">Month: {month}</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Employees</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2">Present</th>
                  <th className="px-4 py-2">Absent</th>
                  <th className="px-4 py-2">Profile</th>
                </tr>
              </thead>
              <tbody>
                {summary.perEmploy.map((p) => (
                  <tr key={p.employId ? p.employId._id : Math.random()} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{p.employId ? p.employId.name : 'Unknown'}</td>
                    <td className="px-4 py-2 text-center">{p.present}</td>
                    <td className="px-4 py-2 text-center">{p.absent}</td>
                    <td className="px-4 py-2 text-center">
                      {p.employId ? <Link to={`/employ/${p.employId._id}`} className="text-blue-600 hover:underline">View</Link> : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyAttendance;
