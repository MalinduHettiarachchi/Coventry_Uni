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
import Ldash from './Pages/Lecturer/LDashboard/ldash'
import Sdash from './Pages/Student/SDashboard/sdash'
import WDash from './Pages/Web Admin/WDashboard/wdash';

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
          <Route path="/le" element={<Ldash />} />
          <Route path="/st" element={<Sdash />} />
          <Route path="/ambassadors" element={<WDash />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
