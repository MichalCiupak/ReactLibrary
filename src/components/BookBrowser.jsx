import React from 'react';
import BookDropdown from "./BookDropdown"


const BookBrowser = ({ onTitleChange }) => {


  return (
    <div className='flex m-auto pl-20 w-1/2'>

      <input
        className='rounded-full w-full p-3 m-5 border border-gray-300 focus:outline-none'
        type="text"
        id="titleInput"
        placeholder="Enter title..."
        onChange={(e) => onTitleChange(e.target.value)}

      />


    </div>
  );
};

export default BookBrowser
