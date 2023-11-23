import Navbar from './components/Navbar';
import './index.css';
import { Routes, Route } from 'react-router-dom';
import React from 'react';
import Login from './components/Login';
import Registration from './components/Registration';
import Verifyemail from './components/Verifyemail';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Registration />} />
        <Route exact path="/user/verify/:token" element={<Verifyemail />} />

      </Routes>
    </>
  );
}

export default App;
