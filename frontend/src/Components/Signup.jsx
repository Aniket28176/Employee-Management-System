import React, { useState } from 'react';
import { Signup as SignupApi } from '../api';
import { notify } from '../utils';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('employee');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await SignupApi({ name, email, password, role });
    if (res && res.success) {
      notify('Signup successful. Please login.', 'success');
      navigate('/login');
    } else {
      notify(res.message || 'Signup failed', 'error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Signup</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} className="w-full border px-3 py-2 rounded" />
          <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full border px-3 py-2 rounded" />
          <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full border px-3 py-2 rounded" />
          <div>
            <label className="mr-3">Role:</label>
            <select value={role} onChange={(e)=>setRole(e.target.value)} className="border px-2 py-1 rounded">
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button className="w-full bg-green-600 text-white px-4 py-2 rounded">Signup</button>
        </form>
        <p className="mt-4 text-sm">Already have an account? <Link to="/login" className="text-blue-600">Login</Link></p>
      </div>
    </div>
  );
};

export default Signup;
