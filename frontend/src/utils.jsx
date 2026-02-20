import { toast } from 'react-toastify';

export const notify = (message, type = 'info') => {

    const toastTypes = {
        success: toast.success,
        error: toast.error,
        warning: toast.warning,
        info: toast.info
    };

    const showToast = toastTypes[type] || toast.info;

    showToast(message);
};
