import React from 'react';


const BookBrowser = ({ onTitleChange }) => {

  return (
    <div className='flex m-auto pl-20'>
      <input
        className='rounded-full w-1/2 p-3 m-5 border border-gray-300'
        type="text"
        id="titleInput"
        placeholder="Enter title..."
        onChange={(e) => onTitleChange(e.target.value)}

      />


    </div>
  );
};

export default BookBrowser
