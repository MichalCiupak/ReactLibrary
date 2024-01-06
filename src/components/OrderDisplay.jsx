import React, { useState, useRef, useEffect } from 'react';
import { FaBookBookmark } from "react-icons/fa6";
import { FaRegAddressBook } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { Link, Route, Routes } from 'react-router-dom';
import BookInfo from './BookInfo'
import { format, parseISO } from 'date-fns';

const OrderDisplay = ({ orders }) => {
  const [bookTitles, setBookTitles] = useState({});

  const fetchBookTitle = async (bookId) => {
    try {
      const response = await fetch(`https://localhost:7145/v1/book/${bookId}`);
      const data = await response.json();
      setBookTitles((prevTitles) => ({ ...prevTitles, [bookId]: data.title }));
      console.log()
    } catch (error) {
      console.error('Error fetching book title:', error);
    }
  };

  useEffect(() => {
    orders.Order.forEach((order) => {
      fetchBookTitle(order.bookId);
    });
  }, [orders]);

  const formatOrderDate = (orderDate) => {
    const parsedDate = parseISO(orderDate);
    return format(parsedDate, 'yyyy-MM-dd HH:mm:ss');
  };


  return (
    <div className=' flex-col bg-gray-200 m-auto '>

      <div className='flex flex-row text-[15px] m-1 font-bold'>


        <div className='ml-[70px] flex items-center justify-center'>Id</div>
        <div className='w-2/5 flex items-center justify-center '>Order Date</div>
        <div className='w-1/5 flex items-center justify-center'>Book</div>
        <div className='w-1/5 flex items-center justify-center'>Customer</div>
        <div className=' w-20 flex items-center justify-center'>State</div>
        <div className=' w-20 flex items-center justify-center'>Return Date</div>
      </div>
      {orders.Order.map((order) => (
        <div className='flex  flex-row text-[15px] hover:bg-gray-300 hover:cursor-pointer bg-gray-100 pl-3  m-0.5'>
          <span className='text-gray-500 text-[30px] mt-3 mb-3 mr-3'><FaRegAddressBook /></span>
          <div className=' p-3 flex items-center justify-center'>{order.Id.toString().padStart(3, '0')}</div>

          <div className='w-2/5 flex items-center justify-left pl-5'>{formatOrderDate(order.orderDate)}</div>


          <div className='w-1/5 flex items-center justify-center'>{bookTitles[order.bookId] || 'Loading...'}</div>
          <div className='w-1/5 flex items-center justify-center'>{order.customerId}</div>
          <div className=' w-20 flex items-center justify-center'>{order.state}</div>
          {order.returnDate ? (
            <div className=' w-20 flex items-center justify-center'>{formatOrderDate(order.returnDate)}</div>
          ) : (
            <div className=' w-20 flex items-center justify-center'>NA</div>
          )}



        </div>
      ))}



    </div>
  );
};

export default OrderDisplay
