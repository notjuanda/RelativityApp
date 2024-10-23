// src/components/Table.jsx
import PropTypes from 'prop-types';

const Table = ({ headers, data, renderRow }) => (
    <table className="table-auto border-collapse border border-gray-400 w-full">
        <thead>
        <tr>
            {headers.map((header, index) => (
            <th key={index} className="border border-gray-300 px-4 py-2">
                {header}
            </th>
            ))}
        </tr>
        </thead>
        <tbody>
        {data.map((item, index) => (
            <tr key={index}>{renderRow(item)}</tr>
        ))}
        </tbody>
    </table>
);

Table.propTypes = {
    headers: PropTypes.arrayOf(PropTypes.string).isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    renderRow: PropTypes.func.isRequired,
};

export default Table;
