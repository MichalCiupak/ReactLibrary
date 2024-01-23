import React, { useState, useEffect } from 'react';
import { FaRegAddressBook } from "react-icons/fa";
import OrderInfo from './OrderInfo'
import { format, parseISO } from 'date-fns';

const OrderDisplay = ({ orders, filter, typeFilter }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [books, setBooks] = useState({});
  const [customers, setCustomers] = useState({});
  const [visibleRecords, setVisibleRecords] = useState(20);

  const openModal = (order, book, customer) => {
    setSelectedOrder(order);
    setSelectedBook(book);
    setSelectedCustomer(customer);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setSelectedBook(null);
    setSelectedCustomer(null);
    setModalOpen(false);
  };

  const showMore = () => {
    setVisibleRecords(visibleRecords + 10);
  };

  const showAll = () => {
    setVisibleRecords(orders.length);
  };

  const fetchData = async () => {
    try {
      const bookPromises = orders.map(async (order) => {
        const response = await fetch(`https://libraryappgrpc.azurewebsites.net/v1/book/${order.bookId}`);
        return { [order.bookId]: await response.json() };
      });

      const customerPromises = orders.map(async (order) => {
        const response = await fetch(`https://libraryappgrpc.azurewebsites.net/v1/customer/${order.customerId}`);
        return { [order.customerId]: await response.json() };
      });

      const bookResults = await Promise.all(bookPromises);
      const customerResults = await Promise.all(customerPromises);

      setBooks((prevBooks) => ({ ...prevBooks, ...Object.assign(...bookResults) }));
      setCustomers((prevCustomers) => ({ ...prevCustomers, ...Object.assign(...customerResults) }));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [orders]);

  useEffect(() => {
  }, [books, customers]);

  const formatOrderDate = (orderDate) => {
    const parsedDate = parseISO(orderDate);
    return format(parsedDate, 'yyyy-MM-dd HH:mm:ss');
  };

  const filteredData = orders.filter((order) => {
    let obj;
    if (typeFilter === "title") {
      obj = books[order.bookId];
    } else if (typeFilter === "name" || typeFilter === "surname") {
      obj = customers[order.customerId];
    } else {
      console.error("Invalid typeFilter value");
      return false;
    }
    if (obj) {
      return obj[typeFilter]?.toLowerCase().includes(filter.toLowerCase());
    }
    return false;
  }
  );

  return (
    <div>
      <div className=' flex-col bg-gray-200 m-auto  rounded-lg'>
        <OrderInfo isOpen={isModalOpen} onClose={closeModal} order={selectedOrder} customer={selectedCustomer} book={selectedBook}>
        </OrderInfo>
        <div className=' flex flex-row text-[15px] m-1 font-bold'>


          <div className='ml-[70px] flex items-center justify-center'>Id</div>
          <div className='w-1/5 flex ml-5 items-center justify-center '>Order Date</div>
          <div className='w-1/5 flex items-center justify-center'>Book</div>
          <div className='w-1/5 flex items-center justify-center'>Customer</div>
          <div className='w-[90px] flex items-center justify-left'>State</div>
          <div className=' w-1/5 flex items-center justify-center'>Return Date</div>
        </div>
        {
          filteredData.slice(0, visibleRecords).map((order) => (
            <div onClick={() => openModal(order, books[order.bookId], customers[order.customerId])} key={order.Id} className='flex  flex-row text-[15px] hover:bg-gray-300 hover:cursor-pointer bg-gray-100 pl-3  m-0.5'>
              <span className='text-gray-500 text-[30px] mt-3 mb-3 mr-3'><FaRegAddressBook /></span>
              <div className=' p-3 flex items-center justify-center'>{order.Id.toString().padStart(3, '0')}</div>

              <div className='w-1/5 flex items-center justify-center pl-5'>{formatOrderDate(order.orderDate)}</div>


              <div className='w-1/5 flex items-center justify-center'>{books[order.bookId]?.title || 'Loading...'}</div>
              <div className='w-1/5 ml-2 flex items-center justify-center'>{`${customers[order.customerId]?.name} ${customers[order.customerId]?.surname}`}</div>
              <div className='w-[90px] flex items-center justify-left'>{order.state}</div>
              {order.returnDate ? (
                <div className=' w-1/5 flex items-center justify-center'>{formatOrderDate(order.returnDate)}</div>
              ) : (
                <div className=' w-1/5 flex items-center justify-center'>NA</div>
              )}

            </div>
          ))
        }

      </div >
      <div className='flex flex-row items-center justify-center text-[15px] m-5 font-bold'>
        <div onClick={() => showMore()} className='flex bg-gray-300 hover:cursor-pointer hover:bg-gray-400 rounded-lg m-3 p-2'>Show More</div>
        <div onClick={() => showAll()} className='flex bg-gray-300 hover:cursor-pointer hover:bg-gray-400 rounded-lg m-3 p-2'>Show All</div>
      </div>
    </div>
  );
};

export default OrderDisplay
