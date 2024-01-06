import React, { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
import Browser from '../components/Browser';
import BookDisplay from '../components/BookDisplay'
import Dropdown from '../components/Dropdown';


const BookList = () => {
    const [filter, setFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('title');
    const [data, setData] = useState(null);
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

        <div className='m-10 rounded-lg'>
            <div className=' flex w-full flex-row'>
                <Browser onTitleChange={setFilter} />
                <Dropdown
                    options={[
                        { value: 'title', label: 'Title' },
                        { value: 'author', label: 'Author' },
                        { value: 'genre', label: 'Genre' },
                    ]}
                    onSelect={handleFilterChange}
                />
            </div>


            {data ? (
                <BookDisplay data={data} filter={filter} typeFilter={typeFilter} />
            ) : (
                <Spinner message="Searching for books" />
            )
            }
        </div>
    )
}

export default BookList