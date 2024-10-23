// src/components/Modal.jsx
import PropTypes from 'prop-types';

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl">{title}</h2>
            <button onClick={onClose} className="text-red-500 font-bold">
                &times;
            </button>
            </div>
            <div>{children}</div>
        </div>
        </div>
    );
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default Modal;
