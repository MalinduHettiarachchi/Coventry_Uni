import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import Home from './Pages/Home/home';
import Login from './Pages/Login/login';
import Lregi from './Pages/LRegi/lregi'
import Contact from './Pages/Contact/contact'
import About from './Pages/About/about'
import Courses from './Pages/Courses/courses'
import Wdash from './Web Admin/WDashboard/wdash'
import Ldash from './Lecturer/LDashboard/ldash'
import Sdash from './Student/SDashboard/sdash'

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ourteam" element={<Lregi />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/ambassadors" element={<Wdash />} />
          <Route path="/le" element={<Ldash />} />
          <Route path="/st" element={<Sdash />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
