
import './App.css';
import Login from './containers/Login';
import Home from './containers/Home';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/*" element={<Home />} />

    </Routes>

  );
}

export default App;
