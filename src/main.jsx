// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import './index.css';
import App from './App';
import AdminPage from './Pages/AdminPage';
import Login from './Pages/Login';
import Register from './Pages/Register'
import Logout from './Pages/logout';


const MainApp = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/logout" element={<Logout />} />

    </Routes>
  </Router>
);

ReactDOM.createRoot(document.getElementById('root')).render(<MainApp />);
