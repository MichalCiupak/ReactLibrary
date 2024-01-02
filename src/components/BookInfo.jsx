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
      <div className='flex w-full items-center justify-center mb-5' onClick={onClose}>
        <div className='flex w-full items-center justify-center font-extrabold text-[25px]'>
          Book Info
        </div>
        <SlClose className='hover:bg-red-300 rounded-full text-red-500 text-[25px] ml-auto' />
      </div>
      {book ? (
        // Jeśli warunek jest prawdziwy
        <h1>ddww{book.description}</h1>
      ) : (
        // Jeśli warunek jest fałszywy
        <h1>dd</h1>
      )}

      <button onClick={onClose}>Zamknij </button>
      {children}
    </Modal>
  );
};

export default BookInfo
