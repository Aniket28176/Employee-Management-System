import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GetEmployDetailsById, GetMonthlyAttendance } from '../api';
import PieDonut from './PieDonut';

const EmployDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [employ, setEmploy] = useState(null);
    const [monthlySummary, setMonthlySummary] = useState({ totalPresent:0, totalAbsent:0 });
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) navigate('/login');
    }, []);

    const fetchEmployDetails = async () => {
        try {
            const data = await GetEmployDetailsById(id);
            setEmploy(data);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchEmployDetails();
    }, [id]);

    useEffect(() => {
        const fetchSummary = async () => {
            const month = new Date().toISOString().slice(0,7); // YYYY-MM
            const data = await GetMonthlyAttendance(month, id);
            setMonthlySummary(data || { totalPresent:0, totalAbsent:0 });
        };
        if (id) fetchSummary();
    }, [id]);

    if (!employ) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-gray-500 text-lg">Employ not found</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg overflow-hidden">
                
                {/* Header */}
                <div className="bg-blue-600 text-white px-6 py-4">
                    <h2 className="text-2xl font-semibold">Employ Details</h2>
                </div>

                {/* Body */}
                <div className="p-6 flex flex-col md:flex-row gap-6">

                    {/* Profile Image */}
                    <div className="md:w-1/3 flex justify-center">
                        <img
                            src={employ.profileImage}
                            alt={employ.name}
                            className="w-48 h-48 object-cover rounded-lg shadow"
                        />
                    </div>

                    {/* Details */}
                    <div className="md:w-2/3 space-y-3">
                        <h4 className="text-xl font-bold">{employ.name}</h4>
                        <p><span className="font-semibold">Email:</span> {employ.email}</p>
                        <p><span className="font-semibold">Phone:</span> {employ.phone}</p>
                        <p><span className="font-semibold">Department:</span> {employ.department}</p>
                        <p><span className="font-semibold">Salary:</span> {employ.salary}</p>

                        <div className="mt-4 flex items-center gap-6">
                            <div className="flex items-center gap-4">
                                <PieDonut present={monthlySummary.totalPresent} absent={monthlySummary.totalAbsent} size={84} stroke={16} />
                                <div>
                                    <div className="text-sm">Present: <span className="font-semibold">{monthlySummary.totalPresent}</span></div>
                                    <div className="text-sm">Absent: <span className="font-semibold">{monthlySummary.totalAbsent}</span></div>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate('/employ')}
                                className="ml-auto bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition duration-200"
                            >
                                Back
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployDetails;

