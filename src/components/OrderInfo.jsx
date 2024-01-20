import React from 'react';
import Modal from 'react-modal';
import { SlClose } from "react-icons/sl";
import { format, parseISO, setDate } from 'date-fns';

const BookInfo = ({ isOpen, onClose, order, customer, book }) => {
  const formatOrderDate = (orderDate) => {
    const parsedDate = parseISO(orderDate);
    return format(parsedDate, 'yyyy-MM-dd HH:mm:ss');
  };
  const customStyles = {
    content: {
      top: '5%',
      left: '50%',
      transform: 'translate(-50%, -5%)',
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
          Order Info
        </div>
        <SlClose className='hover:bg-red-300 rounded-full text-red-500 text-[25px] ml-auto' />
      </div>
      {order && customer && book ? (
        <div>
          <div className=' flex flex-row m-3'><div className="w-1/3 font-bold">Date of order</div><div className='flex w-full items-center justify-end pr-5'>{formatOrderDate(order.orderDate)}</div></div>
          {order.returnDate ? (
            <div className=' flex flex-row m-3'><div className="w-1/3 font-bold">Date of return</div><div className='flex w-full items-center justify-end pr-5'>{formatOrderDate(order.returnDate)}</div></div>
          ) : (
            <div className='flex flex-row m-3'><div className="w-1/3 font-bold">Date of return</div><div className='flex w-full items-center justify-end pr-5  text-red-600'>Not returned</div></div>)}
          <div className='flex flex-row m-3'><div className="w-1/3 font-bold">Book Id</div><div className='flex w-full items-center justify-end pr-5'>{order.bookId}</div></div>
          <div className='flex flex-row m-3'><div className="font-bold">Author</div><div className='flex w-full items-center justify-end pr-5'>{book.author}</div></div>
          <div className='flex flex-row m-3'><div className="font-bold">Genre</div><div className='flex w-full items-center justify-end pr-5'>{book.genre}</div></div>
          <div className='flex flex-row m-3'><div className="font-bold">Rating</div><div className='flex w-full items-center justify-end pr-5'>{book.rating}</div></div>
          <div className='flex flex-row m-3'><div className="font-bold">Owner</div><div className='flex w-full items-center justify-end pr-5'>{`${customer.name} ${customer.surname}`}</div></div>
          <div className='flex flex-row m-3'><div className="w-1/3 font-bold">Owner Id</div><div className='flex w-full items-center justify-end pr-5'>{customer.Id}</div></div>
          <div className='flex flex-col mr-3 ml-3 mt-8'>
            <div className="flex font-bold">Book description</div>
            <div className='flex mt-2'>{book.description}</div>
          </div>
        </div>

      ) : (
        <h1>Unexpected error</h1>
      )}
    </Modal>
  );
};

export default BookInfo
