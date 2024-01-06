import React, { useState, useRef, useEffect } from 'react';
import OrderDisplay from "../components/OrderDisplay"
import Spinner from '../components/Spinner';

const History = () => {

    const [orders, setOrders] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://localhost:7145/v1/order');
                const result = await response.json();
                setOrders(result);
                console.log(result)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    return (
        <div className="flex justify-center bg-white min-h-[500px] m-7 p-10 shadow-lg rounded-lg">
            {orders ? (
                // Jeśli dane są dostępne, renderuj je
                <OrderDisplay orders={orders} />
            ) : (
                // Jeśli dane są w trakcie ładowania, możesz dodać animację ładowania lub inny komunikat
                <Spinner message="Searching for orders" />
            )
            }


        </div>
    )
}

export default History