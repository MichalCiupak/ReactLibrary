import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
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
    // const result = findMostFrequentString(booksByTitles);



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
                label: 'Liczba Książek',
                data: booksCountByGenre.map((item) => item.count),
                backgroundColor: 'rgba(75, 4, 4, 1)', // Kolor wypełnienia słupków
                borderColor: 'rgba(75, 192, 192, 1)', // Kolor obramowania słupków
                borderWidth: 1,
            },
        ],
    };

    const chartDataOrderedBooks = {
        labels: booksCountByGenre.map((item) => item.genre),
        datasets: [
            {
                label: 'Liczba Książek',
                data: orderedBooksCountByGenre.map((item) => item.count),
                backgroundColor: 'rgba(75, 4, 4, 1)', // Kolor wypełnienia słupków
                borderColor: 'rgba(75, 192, 192, 1)', // Kolor obramowania słupków
                borderWidth: 1,
            },
        ],
    };



    return (
        <div className="flex bg-white m-10 p-10 shadow-lg rounded-lg">
            <div className='m-10 bg-green-400'>
                Liczba uzytkownikow
                {CustomerAmount}
            </div>
            <div className='m-10 bg-green-400'>
                liczba ksiazek teraz wypozyczonych
                {OrderedBooksNow}
            </div>
            <div className='m-10 bg-green-400'>
                najczesciej wypozyczana ksiazka
                {booksByTitlesAmount}
            </div>
            <div className='m-10 bg-green-400'>
                najczesciej wypozyczana ksiazka
                {booksByTitlesAmount}
            </div>
            ddffee
            stat
            <div className='w-[600px]'>
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
            <div className='w-[600px]'>
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



        </div>

    )
}

export default Statistics