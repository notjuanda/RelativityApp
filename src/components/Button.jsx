// src/components/Button.jsx
import PropTypes from 'prop-types';

const Button = ({ children, onClick, type = 'button', className = '' }) => (
    <button
        type={type}
        onClick={onClick}
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${className}`}
    >
        {children}
    </button>
);

Button.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    className: PropTypes.string,
};

Button.defaultProps = {
    type: 'button',
    className: '',
    onClick: () => {},
};

export default Button;
