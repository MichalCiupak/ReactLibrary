import WhiteBackground from '../assets/whitebackground.png';
import BookIcon from '../assets/BookIcon.png';
import React, { useEffect, useState } from 'react';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Perform authentication logic with email and password
        console.log('Email:', email);
        console.log('Password:', password);
        // Add authentication logic here, such as calling an API
    };
    return (
        <div className='min-h-screen bg-gray-300 items-center justify-center flex object-cover bg-opacity-60' style={{ backgroundImage: `url(${WhiteBackground})` }}>

            <div className="flex flex-col shadow-md bg-white items-center p-5 justify-center rounded-lg w-1/2">
                <div className='flex items-center justify-center'>
                    <img src={BookIcon} alt='logo' className='w-10' />
                    <span className="text-black p-2 font-bold font-serif text-lg"> Library <br></br>Dashboard</span>
                </div>

                <div className='m-3 w-1/2'>
                    <div className='flex p-3 font-bold  m-3 items-center text-[17px] justify-center'>
                        <h2 >Login In</h2>
                    </div>

                    <form onSubmit={handleFormSubmit}>
                        <div className='flex flex-col font-bold text-[12px] '>
                            <label className='flex p-1 ml-3 mr-3'>Email:</label>
                            <input
                                className='flex p-1 ml-3 mr-3 rounded-md border border-gray-300'
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                required
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className='flex flex-col font-bold text-[12px] '>
                            <label className='flex p-1 ml-3 mr-3' >Password:</label>
                            <input
                                className='flex p-1 ml-3 mr-3 rounded-md border border-gray-300 '
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                                placeholder="Enter your password"
                            />
                        </div>
                        <button className="flex items-center justify-center m-auto bg-violet-400 w-1/2 p-2 font-bold rounded-lg mt-5 hover:bg-violet-500 hover:scale-105" type="submit">Login</button>
                    </form>
                </div>
            </div>

        </div >
    )
}

export default Login