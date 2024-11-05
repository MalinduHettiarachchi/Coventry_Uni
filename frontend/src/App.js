import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/home';
import Login from './Pages/Login/login';
import Lregi from './Pages/LRegi/lregi'

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ourteam" element={<Lregi />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
