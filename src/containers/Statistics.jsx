import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const Statistics = () => {
    const [books, setBooks] = useState(null);
    const [customers, setCustomers] = useState(null);
    const [bookHistory, setBookHistory] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response1 = await fetch('https://libraryappgrpc.azurewebsites.net/v1/book');
                const result1 = await response1.json();
                setBooks(result1);

                const response2 = await fetch('https://libraryappgrpc.azurewebsites.net/v1/customer');
                const result2 = await response2.json();
                setCustomers(result2);

                const response3 = await fetch('https://libraryappgrpc.azurewebsites.net/v1/statistics');
                const result3 = await response3.json();
                setBookHistory(result3);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    function findMostFrequentString(strings) {
        if (!strings || strings.length === 0) {
            console.error('List of strings is empty');
            return null;
        }
        const stringOccurrences = {};

        strings.forEach((str) => {
            if (stringOccurrences[str]) {
                stringOccurrences[str]++;
            } else {
                stringOccurrences[str] = 1;
            }
        });
        let mostFrequentString;
        let maxOccurrences = 0;

        Object.entries(stringOccurrences).forEach(([str, occurrences]) => {
            if (occurrences > maxOccurrences) {
                maxOccurrences = occurrences;
                mostFrequentString = str;
            }
        });

        return {
            mostFrequentString: mostFrequentString,
            occurrences: maxOccurrences,
        };
    }

    const booksByTitles = books?.book.map((book) => book.title);
    const booksByTitlesAmount = [...new Set(booksByTitles)].length;
    const orderedBooksByTitles = bookHistory?.Order.map((order) => order.bookTitle);
    const orderedBooksByTitlesAmount = [...new Set(orderedBooksByTitles)].length;
    const topBook = findMostFrequentString(booksByTitles);


    const CustomerAmount = customers?.customer.length;
    const OrderedBooksNow = books?.book.filter((book) => book.availability === false).length;

    const genres = books?.book.map((book) => book.genre);
    const uniqueGenres = [...new Set(genres)];


    const orderedBooksCountByGenre = uniqueGenres.map((genre) => ({
        genre,
        count: bookHistory?.Order.filter((order) => order.bookGenre === genre).length,
    }));

    const booksCountByGenre = uniqueGenres.map((genre) => ({
        genre,
        count: genres.filter((g) => g === genre).length,
    }));

    const chartDataBooks = {
        labels: booksCountByGenre.map((item) => item.genre),
        datasets: [
            {
                label: 'Number of books per category',
                data: booksCountByGenre.map((item) => item.count),
                backgroundColor: 'rgba(199, 66, 205, 0.8)',
                borderColor: 'rgba(175, 44, 181, 0.8)',
                borderWidth: 1,
            },
        ],
    };

    const chartDataOrderedBooks = {
        labels: booksCountByGenre.map((item) => item.genre),
        datasets: [
            {
                label: 'Number of ordered books per category',
                data: orderedBooksCountByGenre.map((item) => item.count),
                backgroundColor: 'rgba(54, 149, 206, 0.8)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const pieData = {
        labels: ['Ordered books', 'Books never ordered'],
        datasets: [
            {
                data: [booksByTitlesAmount - orderedBooksByTitlesAmount, orderedBooksByTitlesAmount],
                backgroundColor: ['#FF6384', '#36A2EB'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB'],
            },
        ],
    };




    return (
        <div className="flex flex-col bg-gray-200 m-10 p-10 shadow-lg rounded-lg">
            <div className='grid grid-cols-4 gap-4'>
                <div className='flex m-10 p-3 rounded-lg hover:scale-105 items-center font-bold bg-white shadow-md'>
                    <div className='text-[14px] p-2'>Number of registered users:</div>
                    <div className='text-[28px] p-2'>{CustomerAmount}</div>
                </div>
                <div className='flex m-10 p-3 rounded-lg hover:scale-105 items-center font-bold bg-white shadow-md'>
                    <div className='text-[14px] p-2'>Number of currently ordered books:</div>
                    <div className='text-[28px] p-2'>{OrderedBooksNow}</div>
                </div>
                <div className='flex m-10 p-3 rounded-lg hover:scale-105 items-center font-bold bg-white shadow-md'>
                    <div className='text-[14px] p-2'>Number of available titles:</div>
                    <div className='text-[28px] p-2'>{booksByTitlesAmount}</div>
                </div>
                <div className='flex flex-col m-10 p-3 rounded-lg hover:scale-105 items-center font-bold bg-white shadow-md'>
                    <div className='flex flex-row items-center'>
                        <div className='text-[14px] p-2'>Most frequently ordered title:</div>
                        <div className='text-[28px] p-2'>{topBook?.mostFrequentString}</div>
                    </div>
                    <div className='flex flex-row items-center'>
                        <div className='text-[12px] p-2'>Number of orders:</div>
                        <div className='text-[22px] p-2'>{topBook?.occurrences}</div>
                    </div>
                </div>
            </div>
            <div className='flex flex-row'>
                <div>
                    <div className='flex m-5 bg-white p-5 items-center rounded-lg shadow-md flex w-[600px]'>
                        <Bar
                            data={chartDataBooks}
                            options={{
                                scales: {
                                    y: {
                                        type: 'linear',
                                        beginAtZero: true,
                                    },
                                },
                            }}
                        />
                    </div>
                    <div className='flex m-5 bg-white p-5 items-center rounded-lg shadow-md flex w-[600px]'>
                        <Bar
                            data={chartDataOrderedBooks}
                            options={{
                                scales: {
                                    y: {
                                        type: 'linear',
                                        beginAtZero: true,
                                    },
                                },
                            }}
                        />

                    </div>
                </div>

                <div className='flex w-full items-center justify-center'>
                    <Pie data={pieData} />
                </div>
            </div>
        </div>

    )
}

export default Statistics