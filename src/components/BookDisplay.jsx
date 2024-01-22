import React, { useState } from 'react';
import { FaBookBookmark } from "react-icons/fa6";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import BookInfo from '../components/BookInfo'

const BookDisplay = ({ data, filter, typeFilter }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [visibleRecords, setVisibleRecords] = useState(20);

  const openModal = (book) => {
    setSelectedBook(book);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedBook(null);
    setModalOpen(false);
  };

  const showMore = () => {
    setVisibleRecords(visibleRecords + 10);
  };

  const showAll = () => {
    setVisibleRecords(data.book.length);
  };

  const filteredData = data.book.filter(
    (book) => book[typeFilter].toLowerCase().includes(filter.toLowerCase())
  );


  return (
    <div>
      <div className=' flex-col bg-gray-200 m-auto rounded-lg'>
        <BookInfo isOpen={isModalOpen} onClose={closeModal} book={selectedBook}>
        </BookInfo>
        <div className='flex flex-row text-[15px] m-1 font-bold'>

          <div className='ml-[70px] flex items-center justify-center'>Id</div>
          <div className='w-2/5 flex items-center justify-center '>Title</div>
          <div className='w-1/5 flex items-center justify-center'>Author</div>
          <div className='w-1/5 flex items-center justify-center'>Genre</div>
          <div className=' w-20 flex items-center justify-center'>Rating</div>
          <div className=' w-20 flex items-center justify-center'>Availability</div>
        </div>
        {filteredData.slice(0, visibleRecords).map((book) => (
          <div onClick={() => openModal(book)} key={book.Id} className='flex  flex-row text-[15px] hover:bg-gray-300 hover:cursor-pointer bg-gray-100 pl-3  m-0.5'>
            <span className='text-gray-500 text-[30px] mt-3 mb-3 mr-3'><FaBookBookmark /></span>
            <div className=' p-3 flex items-center justify-center'>{book.Id.toString().padStart(3, '0')}</div>

            <div className='w-2/5 flex items-center justify-left pl-5'>{book.title}</div>


            <div className='w-1/5 flex items-center justify-center'>{book.author}</div>
            <div className='w-1/5 flex items-center justify-center'>{book.genre}</div>
            <div className=' w-20 flex items-center justify-center'>{book.rating}</div>
            {book.availability ? (
              <span className='w-20 flex items-center justify-center text-green-500 text-[30px] ml-auto '><IoMdCheckmarkCircleOutline /></span>
            ) : (
              <span className='w-20 text-red-500 flex items-center justify-center text-[30px] ml-auto'><IoMdCheckmarkCircleOutline /></span>
            )}

          </div>
        ))}

      </div>
      <div className='flex flex-row items-center justify-center text-[15px] m-5 font-bold'>
        <div onClick={() => showMore()} className='flex bg-gray-300 hover:cursor-pointer hover:bg-gray-400 rounded-lg m-3 p-2'>Show More</div>
        <div onClick={() => showAll()} className='flex bg-gray-300 hover:cursor-pointer hover:bg-gray-400 rounded-lg m-3 p-2'>Show All</div>
      </div>
    </div>
  );
};

export default BookDisplay
