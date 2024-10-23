// src/components/TextArea.jsx
import PropTypes from 'prop-types';

const TextArea = ({ value, onChange, placeholder, className }) => (
    <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`border border-gray-300 rounded py-2 px-3 w-full ${className}`}
        rows={5}
    />
);

TextArea.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    className: PropTypes.string,
};

TextArea.defaultProps = {
    placeholder: '',
    className: '',
};

export default TextArea;
