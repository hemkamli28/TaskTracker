import Navbar from './components/Navbar';
import './index.css';
import {Routes , Route } from 'react-router-dom';
import React from 'react';
import Login from './components/Login';
import Registration from './components/Registration';
function App() {
  return (
    <>
      <Navbar/>
      
      <Routes>
        <Route exact path="/login" element={<Login />}/>
        <Route exact path="/register" element={<Registration />}/>
      </Routes>
    </>
  );
}

export default App;
