import WhiteBackground from '../assets/whitebackground.png';
import BookIcon from '../assets/BookIcon.png';
import React, { useState } from 'react';

const Return = () => {
    const [bookId, setBookId] = useState('');
    const [ownerId, setOwnerId] = useState('');
    const [book, setBook] = useState(null);
    const [customer, setCustomer] = useState(null);
    const [responseData, setResponseData] = useState(null);

    const returnBook = async () => {
        const urlBook = 'https://libraryappgrpc.azurewebsites.net/v1/book/return';
        const urlOrder = 'https://libraryappgrpc.azurewebsites.net/v1/order/return';

        console.log("odanie")

        const requestDataBook = {
            id: parseInt(bookId),
            CurrentOwnerId: parseInt(ownerId)
        };
        const requestDataOrder = {
            bookId: parseInt(bookId),
            customerId: parseInt(ownerId)
        };

        try {
            const responseBook = await fetch(urlBook, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestDataBook),
            });

            console.log(bookId)
            console.log(ownerId)

            const responseOrder = await fetch(urlOrder, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestDataOrder),
            });
            console.log(responseData)
            if (responseBook.ok && responseOrder.ok) {
                const responseDatatmp = await responseBook.json();
                setResponseData(responseDatatmp);
                console.log(`Book returned successfully`);
            } else {
                console.error('Error returning book:', responseBook.statusText);
            }

        } catch (error) {
            console.error('Error returning book:', error.message);
        }
    };

    const handleBookChange = (e) => {
        const fetchDataBook = async () => {
            try {
                const response = await fetch(`https://libraryappgrpc.azurewebsites.net/v1/book/${e.target.value}`);
                const result = await response.json();
                setBook(result);
                console.log(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchDataBook();
        setBookId(e.target.value);
    };

    const handleOwnerChange = (e) => {
        const fetchDataOrd = async () => {
            try {
                const response = await fetch(`https://libraryappgrpc.azurewebsites.net/v1/customer/${e.target.value}`);
                const result = await response.json();
                setCustomer(result);
                console.log(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchDataOrd();
        setOwnerId(e.target.value);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <div className='min-h-screen bg-gray-300 items-center justify-center flex object-cover bg-opacity-60' style={{ backgroundImage: `url(${WhiteBackground})` }}>

            <div className="flex flex-col shadow-md bg-white p-5 w-3/4  rounded-lg m-5">
                <div className='flex items-center justify-center'>
                    <img src={BookIcon} alt='logo' className='w-10' />
                    <span className="text-black p-2 font-bold font-serif text-lg"> Library <br></br>Dashboard</span>
                </div>

                <div className=' w-full'>
                    <div className='flex p-3 font-bold text-[17px]'>
                        <h2 >Return book to the library system</h2>
                    </div>

                    <form className="flex flex-row w-full items-center" onSubmit={handleFormSubmit}>
                        <div className='flex m-2 w-full'>
                            <div className='flex w-1/2 flex-col font-bold text-[12px] '>
                                <label className='flex p-1 ml-3 mr-3'>Book ID:</label>
                                <input
                                    className='flex p-1 ml-3 mr-3 rounded-md border border-gray-300'
                                    type="number"
                                    value={bookId}
                                    onChange={handleBookChange}
                                    required
                                    placeholder="Enter book ID"
                                />
                                <div className=' m-2 p-2 flex items-center justify-center'>
                                    <label className='flex m-1'>{book?.title}</label>

                                </div>
                            </div>
                            <div className='flex w-1/2 flex-col font-bold text-[12px] '>
                                <label className='flex p-1 ml-3 mr-3' >Owner ID:</label>
                                <input
                                    className='flex p-1 ml-3 mr-3 rounded-md border border-gray-300 '
                                    type="number"
                                    value={ownerId}
                                    onChange={handleOwnerChange}
                                    required
                                    placeholder="Enter owner ID"
                                />
                                <div className=' m-2 p-2 flex items-center justify-center'>
                                    <label className='flex m-1'>{customer?.name}</label>
                                    <label className='flex m-1'>{customer?.surname}</label>

                                </div>
                            </div>
                        </div>
                        <button onClick={() => returnBook()} className="flex items-center w-1/3 justify-center m-auto bg-violet-400 w-1/2 p-2 font-bold rounded-lg mt-5 hover:bg-violet-500 hover:scale-105" type="submit">Return book to system</button>
                    </form>
                </div>
                {responseData ? (
                    <div className='text-green-300'>Book returned successfully</div>
                ) : (
                    <div></div>
                )}
            </div>

        </div >
    )
}

export default Return