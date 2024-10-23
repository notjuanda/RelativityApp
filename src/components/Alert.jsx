// src/components/Alert.jsx
import PropTypes from 'prop-types';

const Alert = ({ message, type, onClose }) => {
    const colors = {
        info: 'bg-blue-100 border-blue-500 text-blue-700',
        success: 'bg-green-100 border-green-500 text-green-700',
        warning: 'bg-yellow-100 border-yellow-500 text-yellow-700',
        error: 'bg-red-100 border-red-500 text-red-700',
    };

    return (
        <div className={`border-l-4 p-4 ${colors[type]} mb-4`}>
        <div className="flex justify-between items-center">
            <span>{message}</span>
            <button onClick={onClose} className="ml-2 text-lg font-bold">
            &times;
            </button>
        </div>
        </div>
    );
};

Alert.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
    onClose: PropTypes.func.isRequired,
};

Alert.defaultProps = {
    type: 'info',
};

export default Alert;
