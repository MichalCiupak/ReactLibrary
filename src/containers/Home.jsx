import Sidebar from "../components/Sidebar"
import Statistics from "./Statistics"
import BookList from "./BookList"
import Return from "./Return"
import WhiteBackground from '../assets/whitebackground.png';
import { Link, Route, Routes } from 'react-router-dom';

const Home = () => {
    return (
        <div className='flex bg-cover bg-center object-cover bg-opacity-100' style={{ backgroundImage: `url(${WhiteBackground})` }}>
            <div className="hidden md:flex h-screen flex-initial">
                <Sidebar />
            </div>
            <div className="pb-2 flex-1 h-screen overflow-y-scroll">
                <Routes>

                    <Route path='/s' element={<Statistics />} />
                    <Route path='/b' element={<BookList />} />
                    <Route path='/r' element={<Return />} />
                </Routes>
            </div>

        </div >
    )
}

export default Home