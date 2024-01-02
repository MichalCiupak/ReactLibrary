import React, { useState, useRef, useEffect } from 'react';
import { FaBookBookmark } from "react-icons/fa6";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";


const History = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://localhost:7145/v1/book');
                const result = await response.json();
                setData(result);
                console.log(result);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex justify-center bg-white min-h-[500px] m-7 p-10 shadow-lg rounded-lg">


            {data ? (
                // Jeśli dane są dostępne, renderuj je
                <div className=' flex-col bg-gray-300 w-4/5'>
                    {data.book.map((book) => (
                        <div key={book.Id} className='flex  flex-row text-[15px] hover:bg-gray-300 hover:cursor-pointer bg-gray-100 pl-3  m-0.5'>

                            <span className='text-gray-500 text-[30px] mt-3 mb-3 mr-3'><FaBookBookmark /></span>
                            <div className=' p-3 flex items-center justify-center'>{book.Id.toString().padStart(3, '0')}</div>
                            <div className='w-2/5 flex items-center justify-left pl-5'>{book.title}</div>
                            <div className='w-1/5 flex items-center justify-center'>{book.author}</div>
                            <div className='w-1/5 flex items-center justify-center'>{book.genre}</div>
                            <div className=' w-20 flex items-center justify-center'>{book.rating}</div>
                            {book.availability ? (
                                // Jeśli warunek jest prawdziwy
                                <span className='w-20 flex items-center justify-center text-green-500 text-[30px] ml-auto '><IoMdCheckmarkCircleOutline /></span>
                            ) : (
                                // Jeśli warunek jest fałszywy
                                <span className='w-20 text-red-500 flex items-center justify-center text-[30px] ml-auto'><IoMdCheckmarkCircleOutline /></span>
                            )}

                        </div>
                    ))}
                    <h1>{data.book[0].title}</h1>


                </div>
            ) : (
                // Jeśli dane są w trakcie ładowania, możesz dodać animację ładowania lub inny komunikat
                <p>Loading...</p>
            )}
        </div>
    )
}

export default History