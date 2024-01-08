import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaChartBar, FaBook, FaHistory } from 'react-icons/fa';
import { BiBookReader } from "react-icons/bi";
import BookIcon from '../assets/BookIcon.png';

const Sidebar = () => {
  const isNotActiveStyle = 'flex text-[14px] px-5 gap-3 font-extrabold w-full min-h-[40px] items-center capitalize transition-transform transform hover:scale-105';
  const isActiveStyle = 'flex items-center text-[14px] bg-white px-5 gap-3 font-extrabold w-full rounded-full min-h-[40px] transition-all duratin-200 ease-in-out capitalize text-black';

  return (
    <div className='flex flex-col rounded-r-[40px] bg-gradient-to-b from-purple-400 to-violet-700 h-full overflow-y-scroll min-w-190 max-w-250 hide-scrollbar'>

      <div className='flex items-center justify-center'>
        <Link to="/login" className='flex gap-2 my-2 pt-1 items-center hover:transform hover:scale-110 transition-transform'>
          <img src={BookIcon} alt='logo' className='w-10' />
          <span className="text-white font-bold font-serif text-lg"> Library <br></br>Dashboard</span>
        </Link>
      </div>
      <div className='flex flex-col m-auto justify-between min-h-[200px] text-white'>
        <div className='flex'>
          <NavLink to='/s'
            className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}>
            < FaChartBar />
            Statistics
          </NavLink>
        </div>
        <div className='flex'>
          <NavLink to='/r'
            className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}>
            <BiBookReader />
            Book Returning
          </NavLink>
        </div>
        <div className='flex'>
          <NavLink to='/h'
            className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}>
            < FaHistory />
            History
          </NavLink>
        </div>
        <div className='flex'>
          <NavLink to='/b'
            className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}>
            < FaBook />
            Books
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
