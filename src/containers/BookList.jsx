import React, { useState, useRef, useEffect } from 'react';
import Spinner from '../components/Spinner';
import BookBrowser from '../components/BookBrowser';
import BookDisplay from '../components/BookDisplay'
import BookDropdown from '../components/BookDropdown';


const BookList = () => {
    const [filter, setFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('title');
    const [data, setData] = useState(null);
    console.log(typeFilter);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://localhost:7145/v1/book');
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleFilterChange = (selectedFilter) => {
        setTypeFilter(selectedFilter);
    };

    return (

        <div className="flex justify-center bg-white min-h-[500px] m-7 p-10 shadow-lg rounded-lg">


            <div className='w-full'>
                <div className='flex w-full flex-row'>
                    <BookBrowser onTitleChange={setFilter} />
                    <BookDropdown
                        options={[
                            { value: 'title', label: 'Title' },
                            { value: 'author', label: 'Author' },
                            { value: 'genre', label: 'Genre' },
                            // Add more options as needed
                        ]}
                        onSelect={handleFilterChange}
                    /></div>


                {data ? (
                    // Jeśli dane są dostępne, renderuj je
                    <BookDisplay data={data} filter={filter} typeFilter={typeFilter} />
                ) : (
                    // Jeśli dane są w trakcie ładowania, możesz dodać animację ładowania lub inny komunikat
                    <Spinner message="Searching for books" />
                )
                }
            </div>
        </div >
    )
}

export default BookList