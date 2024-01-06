import React from 'react';

const Dropdown = ({ options, onSelect }) => {
  return (
    <div className='flex m-5 ml-auto w-1/2'>
      <select
        onChange={(e) => onSelect(e.target.value)}
        className="p-1 focus:outline-none border border-gray-300 rounded-lg"
      >
        {options.map((option) => (
          <option className="hover:bg-gray-400 flex flex-row " key={option.value} value={option.value}>
            <div className="p-2">{option.label}</div>
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
