import React, { useState } from 'react';
import { Login as LoginApi } from '../api';
import { notify } from '../utils';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await LoginApi({ email, password });
    if (res && res.success) {
      const { token, role, name } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('name', name);
      notify('Login successful', 'success');
      navigate('/employ');
    } else {
      notify(res.message || 'Login failed', 'error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full border px-3 py-2 rounded" />
          <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full border px-3 py-2 rounded" />
          <button className="w-full bg-blue-600 text-white px-4 py-2 rounded">Login</button>
        </form>
        <p className="mt-4 text-sm">Don't have an account? <Link to="/signup" className="text-blue-600">Signup</Link></p>
      </div>
    </div>
  );
};

export default Login;
