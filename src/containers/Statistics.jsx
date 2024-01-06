import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
// import Plot from 'react-plotly.js';
// import Plotly from 'plotly.js';
// import Chart from 'react-apexcharts';
import Chart from 'chart.js/auto';

const Statistics = () => {
    const [books, setBooks] = useState(null);
    const [orders, setOrders] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://localhost:7145/v1/book');
                const result = await response.json();
                setBooks(result);
                console.log(result)

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

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

    // const orderedBooks = orders?.Order.firter((order)=>order.)
    const orderedGenres = orders?.Order.map((order) => order.genre)
    const genres = books?.book.map((book) => book.genre);
    const uniqueGenres = [...new Set(genres)];

    const booksCountByGenre = uniqueGenres.map((genre) => ({
        genre,
        count: genres.filter((g) => g === genre).length,
    }));

    const chartData = {
        labels: booksCountByGenre.map((item) => item.genre),
        datasets: [
            {
                label: 'Liczba Książek',
                data: booksCountByGenre.map((item) => item.count),
                backgroundColor: 'rgba(75, 192, 192, 0.6)', // Kolor wypełnienia słupków
                borderColor: 'rgba(75, 192, 192, 1)', // Kolor obramowania słupków
                borderWidth: 1,
            },
        ],
    };



    return (
        <div className="flex bg-white m-10 p-10 shadow-lg rounded-lg">
            stat
            <div className='w-[600px]'>
                <Bar
                    data={chartData}
                    options={{
                        scales: {
                            y: {
                                type: 'linear', // Tutaj określasz typ skali jako 'linear'
                                beginAtZero: true,
                            },
                        },
                    }}
                />
            </div>



        </div>

    )
}

export default Statistics