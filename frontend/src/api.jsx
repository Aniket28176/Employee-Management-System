const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5882';

/* =====================================
   COMMON RESPONSE HANDLER
===================================== */
const handleResponse = async (response, defaultMessage) => {
    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || defaultMessage);
    }

    return result;
};

const getAuthHeaders = (extra = {}) => {
    const token = localStorage.getItem('token');
    const headers = { ...extra };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return headers;
};

/* =====================================
   EMPLOY APIs
===================================== */

/* GET ALL EMPLOYS */
export const GetAllEmploys = async (search = '', page = 1, limit = 5) => {
    try {
        const response = await fetch(
            `${BASE_URL}/api/employs?search=${search}&page=${page}&limit=${limit}`,
            { headers: getAuthHeaders() }
        );

        const result = await handleResponse(response, 'Failed to fetch employs');

        return result.data;

    } catch (error) {
        console.error('GetAllEmploys Error:', error);

        return {
            employs: [],
            pagination: {
                currentPage: 1,
                pageSize: limit,
                totalEmploys: 0,
                totalPages: 0
            }
        };
    }
};


/* GET EMPLOY DETAILS BY ID */
export const GetEmployDetailsById = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/api/employs/${id}`, { headers: getAuthHeaders() });

        const result = await handleResponse(response, 'Failed to fetch employ details');

        return result.data;

    } catch (error) {
        console.error('GetEmployDetailsById Error:', error);
        return null;
    }
};


/* DELETE EMPLOY BY ID */
export const DeleteEmployById = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/api/employs/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });

        return await handleResponse(response, 'Failed to delete employ');

    } catch (error) {
        console.error('DeleteEmployById Error:', error);

        return {
            success: false,
            message: 'Delete failed'
        };
    }
};


/* CREATE EMPLOY */
export const CreateEmploy = async (employObj) => {
    const formData = new FormData();

    for (const key in employObj) {
        formData.append(key, employObj[key]);
    }

    try {
        const response = await fetch(`${BASE_URL}/api/employs`, {
            method: 'POST',
            body: formData,
            headers: getAuthHeaders()
        });

        return await handleResponse(response, 'Failed to create employ');

    } catch (error) {
        console.error('CreateEmploy Error:', error);

        return {
            success: false,
            message: 'Create failed'
        };
    }
};


/* UPDATE EMPLOY BY ID */
export const UpdateEmployById = async (employObj, id) => {
    const formData = new FormData();

    for (const key in employObj) {
        formData.append(key, employObj[key]);
    }

    try {
        const response = await fetch(`${BASE_URL}/api/employs/${id}`, {
            method: 'PUT',
            body: formData,
            headers: getAuthHeaders()
        });

        return await handleResponse(response, 'Failed to update employ');

    } catch (error) {
        console.error('UpdateEmployById Error:', error);

        return {
            success: false,
            message: 'Update failed'
        };
    }
};


/* =====================================
   ATTENDANCE APIs
===================================== */

/* MARK ATTENDANCE */
export const MarkAttendance = async (payload) => {
    try {
        const response = await fetch(`${BASE_URL}/api/attendance`, {
            method: 'POST',
            headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(payload)
        });

        return await handleResponse(response, 'Failed to mark attendance');

    } catch (error) {
        console.error('MarkAttendance Error:', error);

        return {
            success: false,
            message: 'Mark attendance failed'
        };
    }
};


/* GET ATTENDANCE BY DATE */
export const GetAttendanceByDate = async (date, employId = '') => {
    try {
        const params = new URLSearchParams({ date });

        if (employId) {
            params.append('employId', employId);
        }

        const response = await fetch(
            `${BASE_URL}/api/attendance?${params.toString()}`,
            { headers: getAuthHeaders() }
        );

        const result = await handleResponse(response, 'Failed to fetch attendance');

        return result.data;

    } catch (error) {
        console.error('GetAttendanceByDate Error:', error);
        return [];
    }
};


/* GET MONTHLY ATTENDANCE SUMMARY */
export const GetMonthlyAttendance = async (month, employId = '') => {
    try {
        const params = new URLSearchParams({ month });
        if (employId) params.append('employId', employId);
        const response = await fetch(`${BASE_URL}/api/attendance/monthly?${params.toString()}`, { headers: getAuthHeaders() });
        const result = await handleResponse(response, 'Failed to fetch monthly attendance');
        return result.data;
    } catch (error) {
        console.error('GetMonthlyAttendance Error:', error);
        return { totalPresent: 0, totalAbsent: 0, perEmploy: [] };
    }
};


/* =====================================
   AUTH APIs
===================================== */
export const Signup = async (payload) => {
    try {
        const response = await fetch(`${BASE_URL}/api/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        return await handleResponse(response, 'Failed to signup');
    } catch (err) {
        console.error('Signup Error:', err);
        return { success: false, message: 'Signup failed' };
    }
};

export const Login = async (payload) => {
    try {
        const response = await fetch(`${BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        return await handleResponse(response, 'Failed to login');
    } catch (err) {
        console.error('Login Error:', err);
        return { success: false, message: 'Login failed' };
    }
};
