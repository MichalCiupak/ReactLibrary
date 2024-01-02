import React from 'react';

const BookDropdown = ({ options, onSelect }) => {
  return (
    <div className='flex m-5 ml-auto w-1/2'>
      <select
        onChange={(e) => onSelect(e.target.value)}
        className="p-2 border border-gray-300 rounded-md"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BookDropdown;
