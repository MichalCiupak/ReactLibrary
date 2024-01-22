import Login from './containers/Login';
import Home from './containers/Home';
import { Routes, Route, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react'

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const user = null;

    if (!user) navigate('/login');
  }, [])
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/*" element={<Home />} />

    </Routes>

  );
}

export default App;
