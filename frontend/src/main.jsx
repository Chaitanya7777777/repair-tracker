import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import TrackPage from './pages/TrackPage';
import AdminPage from './pages/AdminPage';
import './styles.css';

function App() {
  return (
    <BrowserRouter>
      <div className="topbar">
        <div className="brand">Repair Tracker (MVP)</div>
        <nav>
          <Link to="/">Track</Link>
          <Link to="/admin">Admin</Link>
        </nav>
      </div>

      <div className="container">
        <Routes>
          <Route path="/" element={<TrackPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(<App />);
