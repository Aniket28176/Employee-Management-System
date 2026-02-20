import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployTable from './EmployTable';
import AddEmploy from './AddEmploy';
import { DeleteEmployById, GetAllEmploys } from '../api';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { notify } from '../utils';

const EmployManagementApp = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [employObj, setEmployObj] = useState(null);

    const [employsData, setEmploysData] = useState({
        employs: [],
        pagination: {
            currentPage: 1,
            pageSize: 5,
            totalEmploys: 0,
            totalPages: 0
        }
    });

    const fetchEmploys = async (search = '', page = 1, limit = 5) => {
        try {
            const data = await GetAllEmploys(search, page, limit);
            setEmploysData(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        fetchEmploys();
    }, []);

    const handleSearch = (e) => {
        fetchEmploys(e.target.value);
    };

    const handleUpdateEmploy = (emp) => {
        setEmployObj(emp);
        setShowModal(true);
    };

    const role = localStorage.getItem('role');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('name');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
            
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
                Employ Management App
            </h1>

            <div className="w-full max-w-6xl bg-white shadow-lg rounded-xl p-6">
                
                {/* Top Controls */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                    
                    <div className="flex gap-3">
                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition duration-200"
                        >
                            Add Employ
                        </button>

                        {role === 'admin' && (
                            <Link to="/attendance" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition duration-200">
                                Attendance
                            </Link>
                        )}

                        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">Logout</button>
                    </div>

                    <input
                        onChange={handleSearch}
                        type="text"
                        placeholder="Search Employ..."
                        className="w-full md:w-1/2 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Table */}
                <EmployTable
                    employs={employsData.employs}
                    pagination={employsData.pagination}
                    fetchEmploys={fetchEmploys}
                    handleUpdateEmploy={handleUpdateEmploy}
                />

                {/* Modal */}
                <AddEmploy
                    fetchEmploys={fetchEmploys}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    employObj={employObj}
                />
            </div>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
            />
        </div>
    );
};

export default EmployManagementApp;
