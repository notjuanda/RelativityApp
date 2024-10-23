// src/components/Input.jsx
import PropTypes from 'prop-types';

const Input = ({ type, value, onChange, placeholder, className }) => (
    <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`border border-gray-300 rounded py-2 px-3 w-full ${className}`}
    />
);

Input.propTypes = {
    type: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    className: PropTypes.string,
};

Input.defaultProps = {
    type: 'text',
    placeholder: '',
    className: '',
};

export default Input;
