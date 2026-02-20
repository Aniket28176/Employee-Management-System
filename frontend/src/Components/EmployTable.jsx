import React from 'react'
import { Link } from 'react-router-dom'
import { DeleteEmployById } from '../api';
import { notify } from '../utils';

function EmployTable({
    employs = [],
    pagination = {},
    fetchEmploys,
    handleUpdateEmploy
}) {

    const headers = ['Name', 'Email', 'Phone', 'Department', 'Actions'];

    const { currentPage = 1, totalPages = 1 } = pagination || {};


    const handlePagination = (page) => {
        fetchEmploys('', page, 5);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            handlePagination(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            handlePagination(currentPage - 1);
        }
    };

    const handleDeleteEmploy = async (id) => {
        try {
            const { success, message } = await DeleteEmployById(id);
            if (success) {
                notify(message, 'success');
            } else {
                notify(message, 'error');
            }
            fetchEmploys();
        } catch (err) {
            console.error(err);
            notify('Failed to delete Employ', 'error');
        }
    };

    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <div className="overflow-x-auto">
            
            {/* Table */}
            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                    <tr>
                        {headers.map((header, i) => (
                            <th
                                key={i}
                                className="px-6 py-3 text-left text-sm font-semibold text-gray-600"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {employs.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="text-center py-6 text-gray-500">
                                Data Not Found
                            </td>
                        </tr>
                    ) : (
                        employs.map((emp) => (
                            <tr key={emp._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <Link
                                        to={`/employ/${emp._id}`}
                                        className="text-blue-600 hover:underline"
                                    >
                                        {emp.name}
                                    </Link>
                                </td>

                                <td className="px-6 py-4">{emp.email}</td>
                                <td className="px-6 py-4">{emp.phone}</td>
                                <td className="px-6 py-4">{emp.department}</td>

                                <td className="px-6 py-4 flex gap-3">
                                    <button
                                        onClick={() => handleUpdateEmploy(emp)}
                                        className="text-yellow-600 hover:text-yellow-700 font-medium"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleDeleteEmploy(emp._id)}
                                        className="text-red-600 hover:text-red-700 font-medium"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
                
                <span className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm">
                    Page {currentPage} of {totalPages}
                </span>

                <div className="flex flex-wrap gap-2">

                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 border rounded-md ${
                            currentPage === 1
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'hover:bg-gray-100'
                        }`}
                    >
                        Previous
                    </button>

                    {pageNumbers.map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePagination(page)}
                            className={`px-3 py-1 border rounded-md ${
                                currentPage === page
                                    ? 'bg-blue-600 text-white'
                                    : 'hover:bg-gray-100'
                            }`}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1 border rounded-md ${
                            currentPage === totalPages
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'hover:bg-gray-100'
                        }`}
                    >
                        Next
                    </button>

                </div>
            </div>
        </div>
    );
}

export default EmployTable;

