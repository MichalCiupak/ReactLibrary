import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
// import Plot from 'react-plotly.js';
// import Plotly from 'plotly.js';
// import Chart from 'react-apexcharts';
import Chart from 'chart.js/auto';

const Statistics = () => {
    const [books, setBooks] = useState(null);
    const [orders, setOrders] = useState(null);
    const [customers, setCustomers] = useState(null);
    const [bookHistory, setBookHistory] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response1 = await fetch('https://localhost:7145/v1/book');
                const result1 = await response1.json();
                setBooks(result1);

                const response2 = await fetch('https://localhost:7145/v1/customer');
                const result2 = await response2.json();
                setCustomers(result2);

                const response3 = await fetch('https://localhost:7145/v1/statistics');
                const result3 = await response3.json();
                setBookHistory(result3);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    function findMostFrequentString(strings) {
        // Utwórz obiekt do zliczania wystąpień każdego stringa
        if (!strings || strings.length === 0) {
            console.error('Lista stringów jest pusta lub null.');
            return null;
        }
        const stringOccurrences = {};

        // Przetwórz listę stringów i zlicz wystąpienia każdego z nich
        strings.forEach((str) => {
            if (stringOccurrences[str]) {
                stringOccurrences[str]++;
            } else {
                stringOccurrences[str] = 1;
            }
        });

        // Znajdź najczęściej występujący string i liczbę jego wystąpień
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

    // const bookOccurrences = {};
    // bookHistory.Order.array.forEach((order) => {
    //     const bookId = order.bookId;

    //     if (bookOccurrences[bookId]) {
    //         bookOccurrences[bookId]++;
    //     } else {
    //         bookOccurrences[bookId] = 1;
    //     }
    // });
    const booksByTitles = books?.book.map((book) => book.title);
    const booksByTitlesAmount = [...new Set(booksByTitles)].length;
    console.log(booksByTitles)
    const topBook = findMostFrequentString(booksByTitles);



    console.log(books)
    console.log(customers)
    console.log(bookHistory)


    const CustomerAmount = customers?.customer.length;
    const OrderedBooksNow = books?.book.filter((book) => book.availability === false).length;


    // const orderedBooks = orders?.Order.filter((order) => order.)
    const orderedGenres = orders?.Order.map((order) => order.genre)
    console.log(bookHistory)
    console.log(books)
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
    // console.log(orderedBooksCountByGenre)
    // console.log(booksCountByGenre)

    const chartDataBooks = {
        labels: booksCountByGenre.map((item) => item.genre),
        datasets: [
            {
                label: 'Liczba książek na kategorie',
                data: booksCountByGenre.map((item) => item.count),
                backgroundColor: 'rgba(199, 66, 205, 0.8)', // Kolor wypełnienia słupków
                borderColor: 'rgba(175, 44, 181, 0.8)', // Kolor obramowania słupków
                borderWidth: 1,
            },
        ],
    };

    const chartDataOrderedBooks = {
        labels: booksCountByGenre.map((item) => item.genre),
        datasets: [
            {
                label: 'Liczba wypożyczonych książek na kategorie',
                data: orderedBooksCountByGenre.map((item) => item.count),
                backgroundColor: 'rgba(54, 149, 206, 0.8)', // Kolor wypełnienia słupków
                borderColor: 'rgba(75, 192, 192, 1)', // Kolor obramowania słupków
                borderWidth: 1,
            },
        ],
    };

    const pieData = {
        labels: ['Label 1', 'Label 2', 'Label 3'],
        datasets: [
            {
                data: [30, 50, 20], // Procentowy udział dla każdej etykiety
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // Kolory dla każdej etykiety
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };




    return (
        <div className="flex flex-col bg-red-200 m-10 p-10 shadow-lg rounded-lg">
            <div className='grid grid-cols-4 gap-4'>
                <div className='flex m-10 p-3 rounded-lg hover:scale-105 items-center font-bold bg-white shadow-md'>
                    <div className='text-[14px] p-2'>Liczba zarejestrowanych użytkowników:</div>
                    <div className='text-[28px] p-2'>{CustomerAmount}</div>
                </div>
                <div className='flex m-10 p-3 rounded-lg hover:scale-105 items-center font-bold bg-white shadow-md'>
                    <div className='text-[14px] p-2'>Liczba obecnie wypożyczonych pozycji:</div>
                    <div className='text-[28px] p-2'>{OrderedBooksNow}</div>
                </div>
                <div className='flex m-10 p-3 rounded-lg hover:scale-105 items-center font-bold bg-white shadow-md'>
                    <div className='text-[14px] p-2'>Liczba dostępnych tytułów:</div>
                    <div className='text-[28px] p-2'>{booksByTitlesAmount}</div>
                </div>
                <div className='flex flex-col m-10 p-3 rounded-lg hover:scale-105 items-center font-bold bg-white shadow-md'>
                    <div className='flex flex-row items-center'>
                        <div className='text-[14px] p-2'>Najczęsciej wypożyczana pozycja:</div>
                        <div className='text-[28px] p-2'>{topBook?.mostFrequentString}</div>
                    </div>
                    <div className='flex flex-row items-center'>
                        <div className='text-[12px] p-2'>Liczba wypożyczeń:</div>
                        <div className='text-[22px] p-2'>{topBook?.occurrences}</div>
                    </div>
                </div>
            </div>

            <div className='flex m-5 bg-white p-5 items-center rounded-lg shadow-md flex w-[600px]'>
                <Bar
                    data={chartDataBooks}
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
            <div className='flex m-5 bg-white p-5 items-center rounded-lg shadow-md flex w-[600px]'>
                <Bar
                    data={chartDataOrderedBooks}
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


            <Pie data={pieData} />
        </div>

    )
}

export default Statistics