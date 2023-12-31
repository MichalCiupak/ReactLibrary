import Sidebar from "../components/Sidebar"
import Statistics from "./Statistics"
import History from "./History"
import Return from "./Return"
import WhiteBackground from '../assets/whiteback.jpg';
import { Link, Route, Routes } from 'react-router-dom';

const Home = () => {
    return (
        <div className='flex bg-cover bg-center bg-opacity-30' style={{ backgroundImage: `url(${WhiteBackground})` }}>
            <div className="hidden md:flex h-screen flex-initial">
                <Sidebar />
            </div>
            <div className="pb-2 flex-1 h-screen overflow-y-scroll">
                <Routes>

                    <Route path='/s' element={<Statistics />} />
                    <Route path='/h' element={<History />} />
                    <Route path='/r' element={<Return />} />
                </Routes>
            </div>

        </div >
    )
}

export default Home