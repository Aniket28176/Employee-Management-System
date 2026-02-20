import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import EmployeeManagementApp from './Components/EmployeeManagementApp';
import EmployeeDetails from './Components/EmployeeDetails';
import Attendance from './Components/Attendance';
import MonthlyAttendance from './Components/MonthlyAttendance';
import Login from './Components/Login';
import Signup from './Components/Signup';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/employ" />} />
          <Route path="/employ" element={<EmployeeManagementApp />} />
          <Route path="/employ/:id" element={<EmployeeDetails />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/attendance/monthly" element={<MonthlyAttendance />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

