import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaChartBar, FaBook, FaHistory } from 'react-icons/fa';
// import { ToTosArrowForward } from 'react-icons/io';
import BookIcon from '../assets/BookIcon.png';
import PurpleBackground from '../assets/purpleback.jpg';
// import { categories } from '../utils/data';

const Sidebar = () => {
  // const handleCloseSidebar = () => {
  //   if (closeToggle) closeToggle(false);
  // }

  const isNotActiveStyle = 'flex text-[16px] px-5 gap-3 font-extrabold w-full min-h-[40px] items-center capitalize transition-transform transform hover:scale-105';
  const isActiveStyle = 'flex items-center text-[16px] bg-white px-5 gap-3 font-extrabold w-full rounded-l-full min-h-[40px] transition-all duratin-200 ease-in-out capitalize text-black';




  return (
    <div className='flex flex-col justify-between rounded-r-md bg-cover bg-center h-full overflow-y-scroll min-w-190 max-w-250 hide-scrollbar' style={{ backgroundImage: `url(${PurpleBackground})` }}>





      <div className='flex items-center justify-center'>
        <Link to="/" className='flex gap-2 my-2 pt-1 items-center hover:transform hover:scale-110 transition-transform'>
          <img src={BookIcon} alt='logo' className='w-10' />
          <span className="text-white font-bold font-serif text-lg"> Library <br></br>Dashboard</span>
        </Link>
      </div>
      <div className='flex flex-col justify-between min-h-[200px] text-white'>
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
            < FaBook />
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
      </div>

      {/* <div className='flex flex-col gap-5'>
          <NavLink to='/' 
          className={({isActive}) => isActive ? isActiveStyle : isNotActiveStyle}
          onClick={handleCloseSidebar}>
            <RiHomeFill/>
            Home
          </NavLink>
          <h3 className='mt-2 px-5 text-base 2xl:text-xl'>Discover categories</h3>
          {categories.slice(0, categories.length - 1).map((category) => (
            <NavLink to={`/category/${category.name}`}
            className={({isActive}) => isActive ? isActiveStyle : isNotActiveStyle}
            onClick={handleCloseSidebar}
            key={category.name}>
            <img src={category.image}
            className='w-6 h-6 rounded-full shadow-sm'
            alt='category'
            />
              {category.name}
            </NavLink>
          ))}
        </div> */}

      {/* {user && (
        <Link to={`user-profile/${user._id}`}
        className='flex my-5 mb-3 gap-2 items-center bg-white rounded-lg shadow-lg mx-3'
        onClick={handleCloseSidebar}>
          <img src={user.image} className='w-10 h-10 rounded-full' alt='user-profile'/>
          <p>{user.userName}</p>
        </Link>
      )}  */}
      tekst jakis
    </div>
  )
}

export default Sidebar
