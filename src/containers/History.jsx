import React, { useState, useEffect } from 'react';
import OrderDisplay from "../components/OrderDisplay"
import Spinner from '../components/Spinner';
import Browser from '../components/Browser';
import Dropdown from '../components/Dropdown';

const History = () => {
    const [filter, setFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('state');
    const [orders, setOrders] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://localhost:7145/v1/order');
                const result = await response.json();
                setOrders(result);
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
        <div className=' m-10 rounded-lg'>
            <div className='sticky top-0 flex w-full flex-row'>
                <Browser onTitleChange={setFilter} />
                <Dropdown
                    options={[
                        { value: 'state', label: 'State' }
                    ]}
                    onSelect={handleFilterChange}
                />
            </div>
            {orders ? (
                <OrderDisplay orders={orders} filter={filter} typeFilter={typeFilter} />
            ) : (
                <Spinner message="Searching for orders" />
            )
            }


        </div>
    )
}

export default History