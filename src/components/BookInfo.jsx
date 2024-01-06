import React from 'react';
import Modal from 'react-modal';
import { SlClose } from "react-icons/sl";

const BookInfo = ({ isOpen, onClose, book, children }) => {
  const customStyles = {
    content: {
      top: '20%',
      left: '50%',
      transform: 'translate(-50%, -20%)',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Example Modal"
      style={customStyles}
    >
      <div className='flex w-full items-center justify-center mb-8' onClick={onClose}>
        <div className='flex w-full items-center justify-center font-extrabold text-[25px]'>
          Book Info
        </div>
        <SlClose className='hover:bg-red-300 rounded-full text-red-500 text-[25px] ml-auto' />
      </div>
      {book ? (
        // Jeśli warunek jest prawdziwy
        <div>
          <div className='flex flex-row m-3'><div className="font-bold">Title</div><div className='flex w-full items-center justify-end pr-5'>{book.title}</div></div>
          <div className='flex flex-row m-3'><div className="font-bold">Author</div><div className='flex w-full items-center justify-end pr-5'>{book.author}</div></div>
          <div className='flex flex-row m-3'><div className="font-bold">Genre</div><div className='flex w-full items-center justify-end pr-5'>{book.genre}</div></div>
          <div className='flex flex-row m-3'><div className="font-bold">Rating</div><div className='flex w-full items-center justify-end pr-5'>{book.rating}</div></div>
          {book.availability ? (
            <div className='flex flex-row m-3'><div className="font-bold">Availability</div><div className='flex w-full items-center justify-end pr-5 text-green-600'>Available</div></div>
          ) : (
            <div className='flex flex-row m-3'><div className="font-bold">Availability</div><div className='flex w-full items-center justify-end pr-5  text-red-600'>Unavailable</div></div>)}
          <div className='flex flex-col mr-3 ml-3 mt-8'>
            <div className="flex font-bold">Description</div>
            <div className='flex mt-2'>{book.description}</div>
          </div>
        </div>



      ) : (
        // Jeśli warunek jest fałszywy
        <h1>dd</h1>
      )}
    </Modal>
  );
};

export default BookInfo
