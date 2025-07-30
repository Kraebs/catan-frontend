import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Tabelle from './pages/Tabelle';
import Spiel from './pages/Spiel';
import Admin from './pages/Admin';
import Kontakt from './pages/Kontakt';
import Impressum from './pages/Impressum';
import NotFound from './pages/NotFound';
import './style.css';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tabelle" element={<Tabelle />} />
        <Route path="/spiel" element={<Spiel />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/kontakt" element={<Kontakt />} />
        <Route path="/impressum" element={<Impressum />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
