import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UcusArama from './UcusArama';
import UcusSecimi from './UcusSecimi';
import KoltukSecimi from './KoltukSecimi';
import BiletOnay from './BiletOnay';
import Odeme from './Odeme';
import Rezervasyon from './Rezervasyon';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UcusArama />} />
        <Route path="/ucus-secimi" element={<UcusSecimi />} />
        <Route path="/koltuk-secimi" element={<KoltukSecimi />} />
        <Route path="/bilet-onay" element={<BiletOnay />} />
        <Route path="/odeme" element={<Odeme />} />
        <Route path="/rezervasyon" element={<Rezervasyon />} />
      </Routes>
    </Router>
  );
}

export default App;
