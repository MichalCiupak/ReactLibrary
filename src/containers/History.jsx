import React, { useState, useEffect } from 'react';
import OrderDisplay from "../components/OrderDisplay"
import Spinner from '../components/Spinner';
import Browser from '../components/Browser';
import Dropdown from '../components/Dropdown';

const History = () => {
    const [filter, setFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('title');
    const [orders, setOrders] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://libraryappgrpc.azurewebsites.net/v1/order');
                const result = await response.json();
                setOrders(result.Order);
                console.log(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    const ascendingSort = () => {
        const sortedOrders = orders.slice().sort((a, b) =>
            b.orderDate.localeCompare(a.orderDate)
        );
        setOrders(sortedOrders);
    };

    const descendingSort = () => {
        const sortedOrders = orders.slice().sort((a, b) =>
            a.orderDate.localeCompare(b.orderDate)
        );
        setOrders(sortedOrders);
    };

    const handleFilterChange = (selectedFilter) => {
        setTypeFilter(selectedFilter);
    };
    return (
        <div className=' m-10 rounded-lg'>
            <div className='flex w-full flex-row'>
                <Browser onTitleChange={setFilter} />
                <Dropdown
                    options={[
                        { value: 'title', label: 'Title' },
                        { value: 'name', label: 'Name' },
                        { value: 'surname', label: 'Surname' }
                    ]}
                    onSelect={handleFilterChange}
                />
                <div className='flex items-center justify-center text-center border bg-white border-gray-300 rounded-lg p-1 ml-5 mr-5 mb-5 hover:bg-gray-300 hover:cursor-pointer' onClick={() => ascendingSort()}>From newest</div>
                <div className='flex items-center justify-center text-center border bg-white border-gray-300 rounded-lg p-1 ml-5 mr-5 mb-5 hover:bg-gray-300 hover:cursor-pointer' onClick={() => descendingSort()}>From oldest</div>
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