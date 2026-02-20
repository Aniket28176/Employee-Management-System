import React from 'react';
import { useEffect, useState } from 'react';
import { notify } from '../utils';
import { CreateEmploy, UpdateEmployById } from '../api';

function AddEmploy({
    showModal, setShowModal, fetchEmploys, employObj
}) {
    const [employ, setEmploy] = useState({
        name: '',
        email: '',
        phone: '',
        department: '',
        salary: '',
        profileImage: null
    });
    const [updateMode, setUpdateMode] = useState(false);

    useEffect(() => {
        if (employObj) {
            setEmploy(employObj);
            setUpdateMode(true);
        }
    }, [employObj]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmploy({ ...employ, [name]: value });
    };

    const handleFileChange = (e) => {
        setEmploy({ ...employ, profileImage: e.target.files[0] });
    };

    const resetEmployStates = () => {
        setEmploy({
            name: '',
            email: '',
            phone: '',
            department: '',
            salary: '',
            profileImage: null,
        })
    }

    const handleAddEmploy = async (e) => {
        e.preventDefault();
        try {
            const { success, message } = updateMode ?
                await UpdateEmployById(employ, employ._id)
                : await CreateEmploy(employ);

            if (success) {
                notify(message, 'success')
            } else {
                notify(message, 'error')
            }

            setShowModal(false);
            resetEmployStates();
            fetchEmploys();
            setUpdateMode(false);
        } catch (err) {
            console.error(err);
            notify('Failed to create Employ', 'error')
        }
    }

    const handleModalClose = () => {
        setShowModal(false);
        setUpdateMode(false);
        resetEmployStates();
    }

    if (!showModal) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6">
                
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">
                        {updateMode ? 'Update Employ' : 'Add Employ'}
                    </h2>
                    <button
                        onClick={handleModalClose}
                        className="text-gray-500 hover:text-black text-xl"
                    >
                        ×
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleAddEmploy} className="space-y-4">

                    <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={employ.name}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={employ.email}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={employ.phone}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Department</label>
                        <input
                            type="text"
                            name="department"
                            value={employ.department}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Salary</label>
                        <input
                            type="text"
                            name="salary"
                            value={employ.salary}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Profile Image</label>
                        <input
                            type="file"
                            name="profileImage"
                            onChange={handleFileChange}
                            className="w-full text-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition duration-200"
                    >
                        {updateMode ? 'Update' : 'Save'}
                    </button>

                </form>
            </div>
        </div>
    )
}

export default AddEmploy;